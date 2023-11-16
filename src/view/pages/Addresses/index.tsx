import { useEffect, useState } from 'react';
import { Plus } from '@phosphor-icons/react';
import { Button } from '../../components/Button';
import { AddressesContainer, Container } from './styles';
import { AddressCard } from './components/AddressCard';
import { getAddresses } from '../../../services/addresses';
import { IAddressResponse } from '../../../types/address';
import { Loader } from '../../components/Loader';

export function Addresses() {
  const [addresses, setAddress] = useState<IAddressResponse[] | undefined>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function addressesData() {
      const data = await getAddresses();
      setAddress(data);
      setIsLoading(false);
    }

    addressesData();
  }, []);

  return (
    <Container>
      <header>
        <div>
          <h1>Seus endereços</h1>
          {addresses ? (
            <p>{`Você possui ${addresses.length} criados`}</p>
          ) : (
            <p>Você ainda não possui endereços cadastrados</p>
          )}
        </div>
        <Button style={{ width: 220 }} onClick={() => console.log('fui')}>
          <Plus size={20} weight="bold" />
          Criar endereço
        </Button>
      </header>
      <AddressesContainer>
        <Loader visible={isLoading} />
        {addresses?.map(
          ({ id, address, city, district, name, state, number }) => (
            <AddressCard
              key={id}
              name={name}
              address={address}
              city={city}
              district={district}
              number={number}
              state={state}
            />
          ),
        )}
      </AddressesContainer>
    </Container>
  );
}
