import { Modal } from '../../../../components/Modal';
import {
  IAddressResponse,
  ISelectedAddress,
} from '../../../../../types/address';
import { Container, Address } from './styles';
import { formatAddress } from '../../../../../utils/formatAdress';

interface AddressesModalProps {
  visible: boolean;
  onCloseModal: () => void;
  onSelect: (address: ISelectedAddress | null) => void;
  addresses: IAddressResponse[] | undefined;
}

export function AdressesModal({
  visible,
  onCloseModal,
  onSelect,
  addresses,
}: AddressesModalProps) {
  function onSelectAddress(addressId: string) {
    const addressData = addresses?.find((adress) => adress.id === addressId);

    if (addressData) {
      onSelect(addressData);
    }
  }

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
              <small>{formatAddress(address, number, district)}</small>
              <p>{`${city}, ${state}`}</p>
            </Address>
          ),
        )}
      </Container>
    </Modal>
  );
}
