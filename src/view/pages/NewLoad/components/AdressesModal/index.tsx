import { useEffect, useState } from 'react';
import { Modal } from '../../../../components/Modal';
import { getAddresses } from '../../../../../services/addresses';
import {
  IAddressResponse,
  ISelectedAddress,
} from '../../../../../types/address';
import { Container, Address } from './styles';

interface AddressesModalProps {
  visible: boolean;
  onCloseModal: () => void;
  onSelect: (address: ISelectedAddress | null) => void;
}

export function AdressesModal({
  visible,
  onCloseModal,
  onSelect,
}: AddressesModalProps) {
  const [addresses, setAddresses] = useState<IAddressResponse[] | undefined>(
    [],
  );

  function onSelectAddress(addressId: string) {
    const addressData = addresses?.find((adress) => adress.id === addressId);

    if (addressData) {
      onSelect(addressData);
    }
  }

  useEffect(() => {
    async function getAddressesData() {
      const data = await getAddresses();
      setAddresses(data);
    }
    getAddressesData();
  }, []);

  return (
    <Modal visible={visible} onClose={onCloseModal}>
      <Container>
        <h5>Endereços Salvos</h5>
        {addresses?.map(
          ({ id, name, number, address, district, state, city }) => (
            <Address
              key={id}
              onClick={() => {
                onSelectAddress(id);
                onCloseModal();
              }}
            >
              <h5>{name}</h5>
              <small>{`${address}, ${number}, ${district}`}</small>
              <p>{`${city}, ${state}`}</p>
            </Address>
          ),
        )}
      </Container>
    </Modal>
  );
}
