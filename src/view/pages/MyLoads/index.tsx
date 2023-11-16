import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { getContractorLoads } from '../../../services/load';
import { IGetLoadResponse } from '../../../types/load';
import { Loader } from '../../components/Loader';
import { LoadCard } from './components/LoadCard';
import { Container, LoadsContainer } from './styles';
import { Button } from '../../components/Button';
import { Plus } from '@phosphor-icons/react';
import { Select } from '../../components/Select';

export function MyLoads() {
  const [loads, setLoads] = useState<IGetLoadResponse[]>();
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  useEffect(() => {
    async function loadsData() {
      const data = await getContractorLoads();
      setLoads(data);
      setIsLoading(false);
    }

    loadsData();
  }, []);
  return (
    <Container>
      <header>
        <div className="left-side">
          <div>
            <h1>Cargas Criadas</h1>
            {loads ? (
              <p>{`Você possui ${loads.length}`} cargas</p>
            ) : (
              <p>Você ainda não possui cargas cadastradas</p>
            )}
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
        <Button
          style={{ width: 220 }}
          onClick={() => navigate('/loads/new', { replace: true })}
        >
          <Plus size={20} weight="bold" />
          Criar Carga
        </Button>
      </header>
      <LoadsContainer>
        <Loader visible={isLoading} />
        {loads?.map(
          ({
            id,
            loadImages,
            price,
            createdAt,
            description,
            pickupAddress,
            deliveryAddress,
            type,
          }) => (
            <LoadCard
              key={id}
              loadImage={loadImages[0]}
              price={price}
              createdAt={createdAt}
              description={description}
              pickupCity={pickupAddress.city}
              deliveryCity={deliveryAddress.city}
              type={type}
            />
          ),
        )}
      </LoadsContainer>
    </Container>
  );
}
