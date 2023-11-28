import toast from 'react-hot-toast';
import { APIError } from '../../../../../errors/APIError';
import { deleteAddress } from '../../../../../services/addresses';
import { IAddressResponse } from '../../../../../types/address';
import { Button } from '../../../../components/Button';
import { Modal } from '../../../../components/Modal';
import { Content } from './styles';

interface ConfirmDeleteModalProps {
  data: IAddressResponse;
  visible: boolean;
  onClose: () => void;
  onConfirmDelete: (id: string) => void;
}

export function ConfirmDeleteModal({
  data,
  visible,
  onClose,
  onConfirmDelete,
}: ConfirmDeleteModalProps) {
  async function handleDeleteAddress() {
    try {
      await deleteAddress(data.id);
      onConfirmDelete(data.id);
      onClose();
    } catch (err) {
      if (err instanceof APIError) {
        toast.error(err.message);
      }
    }
  }
  return (
    <Modal visible={visible} onClose={onClose}>
      <Content>
        <h5>Deletar {data.name}?</h5>
        <p>
          Você tem certeza que deseja deletar esse endereço? Esta ação é
          irreverssível.
        </p>
        <div className="actions">
          <Button secondary onClick={onClose}>
            Cancelar
          </Button>
          <Button danger onClick={handleDeleteAddress}>
            Deletar
          </Button>
        </div>
      </Content>
    </Modal>
  );
}
