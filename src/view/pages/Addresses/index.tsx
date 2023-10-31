import { Plus } from '@phosphor-icons/react';
import { Button } from '../../components/Button';
import { AddressesContainer, Container } from './styles';
import { AddressCard } from './components/AddressCard';

export function Addresses() {
  const addresses = 3;
  return (
    <Container>
      <header>
        <div>
          <h1>Seus endereços</h1>
          <p>{`Você possui ${addresses} criados`}</p>
        </div>
        <Button style={{ width: 220 }}>
          <Plus size={20} weight="bold" />
          Criar endereço
        </Button>
      </header>
      <AddressesContainer>
        <AddressCard />
        <AddressCard />
        <AddressCard />
        <AddressCard />
      </AddressesContainer>
    </Container>
  );
}
