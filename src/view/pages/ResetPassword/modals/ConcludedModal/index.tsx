import { ArrowRight } from '@phosphor-icons/react';
import { Button } from '../../../../components/Button';
import { Modal } from '../../../../components/Modal';
import { Container } from './styles';
import { useNavigate } from 'react-router-dom';

interface ConcludedModalProps {
  visible: boolean;
}

export function ConcludedModal({ visible }: ConcludedModalProps) {
  const navigate = useNavigate();

  return (
    <Modal visible={visible}>
      <Container>
        <h5>Senha alterada!</h5>
        <p>
          Agora você pode entrar na sua conta com sua nova senha. E aproveitar
          de todas as funcionalidades do truckz.
        </p>
        <Button
          onClick={() =>
            navigate('/login', {
              replace: true,
            })
          }
        >
          Ir para tela de login
          <ArrowRight size={20} weight="bold" />
        </Button>
      </Container>
    </Modal>
  );
}
