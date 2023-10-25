import { loads } from './mockLoads';
import { LoadCard } from './components/LoadCard';
import { Button, Container, Content, LoadsContainer } from './styles';
import { Plus } from '@phosphor-icons/react';

export function MyLoads() {
  return (
    <Container>
      <Content>
        <div className="head">
          <div>
            <h1>Cargas Criadas</h1>
            <p>{`Você possui ${loads.length}`} cargas</p>
          </div>
          <Button>
            <Plus size={20} weight="bold" />
            Criar Carga
          </Button>
        </div>
        <LoadsContainer>
          <LoadCard />
          <LoadCard />
          <LoadCard />
          <LoadCard />
        </LoadsContainer>
      </Content>
    </Container>
  );
}
