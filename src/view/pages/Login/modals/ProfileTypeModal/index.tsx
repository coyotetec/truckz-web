import { Package, Truck } from '@phosphor-icons/react';
import { Modal } from '../../../../components/Modal';
import { useTheme } from 'styled-components';
import { Content } from './styles';
import { useNavigate } from 'react-router-dom';

interface ProfileTypeModalProps {
  visible: boolean;
  onClose: () => void;
}

export function ProfileTypeModal({ visible, onClose }: ProfileTypeModalProps) {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Modal visible={visible} onClose={onClose}>
      <Content>
        <h5>Quem é você?</h5>
        <p>Em qual desses papeis você mais se encaixa?</p>
        <button>
          <Truck size={24} color={theme.colors.complementary.green[500]} />
          Sou motorista e faço transportes
        </button>
        <button
          onClick={() =>
            navigate('/sign-up/contractor', {
              replace: true,
            })
          }
        >
          <Package size={24} color={theme.colors.complementary.green[500]} />
          Preciso anunciar transportes
        </button>
      </Content>
    </Modal>
  );
}
