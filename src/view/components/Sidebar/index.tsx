import { NavLink } from 'react-router-dom';
import { Logo } from '../Logo';
import { Button, Container } from './style';

import { Package, Truck, MapPin, Gear, SignOut } from '@phosphor-icons/react';

export function Sidebar() {
  return (
    <Container>
      <div>
        <Logo className="logo" height={32} />
        <NavLink
          to="/my-loads"
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          <Package size={24} />
          Minhas Cargas
        </NavLink>
        <NavLink to="/drivers">
          <Truck size={24} />
          Motoristas Próximos
        </NavLink>
        <NavLink to="/addresses">
          <MapPin size={24} />
          Endereços
        </NavLink>
        <hr />
        <NavLink to="/settings">
          <Gear size={24} />
          Configurações
        </NavLink>
      </div>
      <Button action="exit">
        Sair da conta
        <SignOut />
      </Button>
    </Container>
  );
}
