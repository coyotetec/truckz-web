import { LoadCard } from './components/LoadCard';
import { Container, Content, LoadsContainer } from './styles';
import { Button } from '../../components/Button';
import { Plus } from '@phosphor-icons/react';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { getContractorLoads } from '../../../services/load';
import { IGetLoadResponse } from '../../../types/load';
import { Loader } from '../../components/Loader';

export function MyLoads() {
  const [loads, setLoads] = useState<IGetLoadResponse[]>();
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  useEffect(() => {
    async function LoadsData() {
      const data = await getContractorLoads();
      setLoads(data);
      setIsLoading(false);
    }

    LoadsData();
  }, []);
  return (
    <Container>
      <Content>
        <div className="head">
          <div>
            <h1>Cargas Criadas</h1>
            <p>{`Você possui ${loads?.length}`} cargas</p>
          </div>
          <Button onClick={() => navigate('/loads/new', { replace: true })}>
            <Plus size={20} weight="bold" />
            Criar Carga
          </Button>
        </div>
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
      </Content>
    </Container>
  );
}
