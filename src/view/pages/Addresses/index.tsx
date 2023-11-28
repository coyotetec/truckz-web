import { useEffect, useState } from 'react';
import { Plus } from '@phosphor-icons/react';
import { Button } from '../../components/Button';
import { AddressesContainer, Container } from './styles';
import { AddressCard } from './components/AddressCard';
import { useNavigate } from 'react-router-dom';
import { Loader } from '../../components/Loader';
import { IAddressResponse } from '../../../types/address';
import { getAddresses } from '../../../services/addresses';
import { ConfirmDeleteModal } from './modals/ConfirmDeleteModal';

export function Addresses() {
  const [isLoading, setIsLoading] = useState(true);
  const [confirmDeleteModalVisible, setConfirmDeleteModalVisible] =
    useState(false);
  const [addresses, setAddresses] = useState<IAddressResponse[]>([]);
  const [selectedAddress, setSelectedAddress] =
    useState<IAddressResponse | null>(null);
  const navigate = useNavigate();

  function handleDeleteAddress(address: IAddressResponse) {
    setSelectedAddress(address);
    setConfirmDeleteModalVisible(true);
  }

  function handleConfirmDeleteAddress(id: string) {
    setAddresses((prevState) => prevState.filter((item) => item.id !== id));
  }

  useEffect(() => {
    async function loadAddresses() {
      try {
        setIsLoading(true);
        const response = await getAddresses();

        if (response) {
          setAddresses(response);
        }
        setIsLoading(false);
      } catch {
        setIsLoading(false);
      }
    }

    loadAddresses();
  }, []);

  return (
    <Container>
      <Loader visible={isLoading} />
      {selectedAddress && (
        <ConfirmDeleteModal
          data={selectedAddress}
          visible={confirmDeleteModalVisible}
          onClose={() => {
            setConfirmDeleteModalVisible(false);
            setSelectedAddress(null);
          }}
          onConfirmDelete={handleConfirmDeleteAddress}
        />
      )}
      <header>
        <div>
          <h1>Seus endereços</h1>
          <p>{`Você possui ${addresses.length} ${
            addresses.length === 1 ? 'motorista' : 'motoristas'
          }`}</p>
        </div>
        <Button
          style={{ width: 220 }}
          onClick={() => navigate('/addresses/new')}
        >
          <Plus size={20} weight="bold" />
          Criar endereço
        </Button>
      </header>
      <AddressesContainer>
        <Loader visible={isLoading} />
        {addresses.map((address) => (
          <AddressCard
            key={address.id}
            data={address}
            onDelete={handleDeleteAddress}
          />
        ))}
      </AddressesContainer>
    </Container>
  );
}
