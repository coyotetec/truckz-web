import { NavLink } from 'react-router-dom';
import { Logo } from '../Logo';
import { Button, Container } from './style';

import { Package, Truck, MapPin, Gear, SignOut } from '@phosphor-icons/react';

export function Sidebar() {
  return (
    <Container>
      <div>
        <Logo className="logo" height={32} />
        <NavLink to="/my-loads">
          <Button>
            <Package size={24} />
            Minhas Cargas
          </Button>
        </NavLink>
        <NavLink to="/drivers">
          <Button>
            <Truck size={24} />
            Motoristas Próximos
          </Button>
        </NavLink>
        <NavLink to="/addresses">
          <Button>
            <MapPin size={24} />
            Endereços
          </Button>
        </NavLink>
        <hr />
        <NavLink to="/settings">
          <Button>
            <Gear size={24} />
            Configurações
          </Button>
        </NavLink>
      </div>
      <Button action="exit">
        Sair da conta
        <SignOut />
      </Button>
    </Container>
  );
}
