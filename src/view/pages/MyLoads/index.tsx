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
import { LoadModal } from './components/LoadModal';

export function MyLoads() {
  const [loads, setLoads] = useState<IGetLoadResponse[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [currentLoad, setCurrentLoad] = useState<
    IGetLoadResponse | undefined
  >();
  const [loadModalIsOpen, setLoadModalIsOpen] = useState(false);

  const navigate = useNavigate();

  function switchLoadModal() {
    setLoadModalIsOpen(!loadModalIsOpen);
  }

  useEffect(() => {
    async function loadsData() {
      const data = await getContractorLoads();
      setLoads(data);
      setIsLoading(false);
    }

    loadsData();
  }, []);
  return (
    <>
      <Loader visible={isLoading} />
      <Container>
        {currentLoad && (
          <LoadModal
            isVisible={loadModalIsOpen}
            loadData={currentLoad}
            onClose={switchLoadModal}
          />
        )}
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
          <Button style={{ width: 220 }} onClick={() => navigate('/loads/new')}>
            <Plus size={20} weight="bold" />
            Criar Carga
          </Button>
        </header>
        <LoadsContainer>
          {loads?.map((load) => {
            function handleClick() {
              setCurrentLoad(load);
              setLoadModalIsOpen(true);
            }

            return (
              <LoadCard
                key={load.id}
                loadImage={load.loadImages[0]}
                price={load.price}
                createdAt={load.createdAt}
                title={load.title}
                description={load.description}
                pickupCity={load.pickupAddress.city}
                deliveryCity={load.deliveryAddress.city}
                type={load.type}
                handleClick={handleClick}
              />
            );
          })}
        </LoadsContainer>
      </Container>
    </>
  );
}
