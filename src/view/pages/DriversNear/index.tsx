import { DriverCard } from './components/DriverCard';
import { Container, DriversContainer } from './styles';

const drivers = 4;

export function DriversNear() {
  return (
    <Container>
      <header>
        <h1>Motoristas Próximos</h1>
        <p>{`Encontramos ${drivers} motoristas`}</p>
      </header>
      <DriversContainer>
        <DriverCard />
        <DriverCard />
        <DriverCard />
        <DriverCard />
        <DriverCard />
        <DriverCard />
      </DriversContainer>
    </Container>
  );
}
