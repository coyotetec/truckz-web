import { LoadCard } from './components/LoadCard';
import { Container, LoadsContainer } from './styles';
import { Button } from '../../components/Button';
import { Plus } from '@phosphor-icons/react';
import { useState } from 'react';
import { Select } from '../../components/Select';

export function MyLoads() {
  const [loads, setLoads] = useState([]);

  return (
    <Container>
      <header>
        <div className="left-side">
          <div>
            <h1>Cargas Criadas</h1>
            <p>{`Você possui ${loads.length}`} cargas</p>
          </div>
          <Select
            options={[
              { label: 'Todas as cargas', value: 'all' },
              { label: 'Ativas', value: 'active' },
              { label: 'Inativas', value: 'inactive' },
            ]}
            wrapperStyle={{ width: 240 }}
          />
        </div>
        <Button style={{ width: 220 }}>
          <Plus size={20} weight="bold" />
          Criar Carga
        </Button>
      </header>
      <LoadsContainer>
        <LoadCard />
        <LoadCard />
        <LoadCard />
        <LoadCard />
      </LoadsContainer>
    </Container>
  );
}
