import { loads } from './mockLoads';
import { LoadCard } from '../../components/LoadCard';
import { Button, Container, Content, LoadsContainer } from './style';

export function MyLoads() {
  return (
    <Container>
      <Content>
        <div className="head">
          <div>
            <h1>Cargas Criadas</h1>
            <span>{`Você possui ${loads.length}`} cargas</span>
          </div>
          <Button>Criar Carga</Button>
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
