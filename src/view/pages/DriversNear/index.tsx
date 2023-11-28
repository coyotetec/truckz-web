import { useCallback, useEffect, useState } from 'react';
import { DriverCard } from './components/DriverCard';
import { Container, DriversContainer } from './styles';
import { getNearDrivers } from '../../../services/driver';
import toast from 'react-hot-toast';
import { IGetDriversNearResponse } from '../../../types/driver';
import { Loader } from '../../components/Loader';

interface ICoords {
  latitude: number;
  longitude: number;
}

export function DriversNear() {
  const [isLoading, setIsLoading] = useState(true);
  const [drivers, setDrivers] = useState<IGetDriversNearResponse[]>([]);

  const getCurrentPosition = useCallback(async () => {
    if (!navigator.geolocation) {
      toast.error('Função não suportada em seu navegador');
      return;
    }
    return new Promise<ICoords>((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        () => {
          toast.error('Não foi possível capturar sua localização atual');
        },
      );
    });
  }, []);

  useEffect(() => {
    async function loadAddresses() {
      try {
        setIsLoading(true);
        const coords = await getCurrentPosition();

        if (coords) {
          const response = await getNearDrivers(coords);

          if (response) {
            setDrivers(response);
          }
        }

        setIsLoading(false);
      } catch {
        setIsLoading(false);
      }
    }

    loadAddresses();
  }, [getCurrentPosition]);

  return (
    <Container>
      <Loader visible={isLoading} />
      <header>
        <h1>Motoristas Próximos</h1>
        <p>{`Encontramos ${drivers.length} ${
          drivers.length === 1 ? 'motorista' : 'motoristas'
        }`}</p>
      </header>
      <DriversContainer>
        {drivers.map((driver) => (
          <DriverCard key={driver.id} data={driver} />
        ))}
      </DriversContainer>
    </Container>
  );
}
