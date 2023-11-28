import { useNavigate } from 'react-router-dom';
import { Container, Content } from './styles';
import { DataLoad } from './components/DataLoad';
import { PickupAndDelivery } from './components/PickupAndDelivery';
import { ArrowLeft } from '@phosphor-icons/react';

export function NewLoad() {
  const navigate = useNavigate();

  return (
    <Container>
      <header>
        <ArrowLeft size={32} weight="bold" onClick={() => navigate('/loads')} />
        <div>
          <h1>Nova Carga</h1>
          <p>Preencha os dados e tenha divulgue sua carga para os motoristas</p>
        </div>
      </header>
      <Content>
        <DataLoad />
        <PickupAndDelivery />
      </Content>
    </Container>
  );
}
