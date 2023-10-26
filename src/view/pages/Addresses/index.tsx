import { Plus } from '@phosphor-icons/react';
import { Button } from '../../components/Button';
import { AddressesContainer, Container, Content } from './styles';
import { AddressCard } from './components/AddressCard';

export function Addresses() {
  const addresses = 3;
  return (
    <Container>
      <Content>
        <div className="head">
          <div>
            <h1>Seus endereços</h1>
            <p>{`Você possui ${addresses} criados`}</p>
          </div>
          <Button>
            <Plus size={20} weight="bold" />
            Criar endereço
          </Button>
        </div>
        <AddressesContainer>
          <AddressCard />
          <AddressCard />
          <AddressCard />
          <AddressCard />
        </AddressesContainer>
      </Content>
    </Container>
  );
}
