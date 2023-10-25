import { NavLink } from 'react-router-dom';
import { Logo } from '../Logo';
import { Container } from './style';
import { Package, Truck, MapPin, Gear, SignOut } from '@phosphor-icons/react';
import { useTheme } from 'styled-components';
import userPlaceholder from '../../../assets/images/user-placeholder.png';

export function Sidebar() {
  const theme = useTheme();

  return (
    <Container>
      <Logo height={32} />
      <nav className="menu-items">
        <NavLink to="/my-loads">
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
      </nav>
      <footer>
        <div className="profile">
          <img src={userPlaceholder} alt="Foto de perfil" />
          <strong>Floraplac MDF</strong>
        </div>
        <button type="button" className="signout-button">
          Sair da conta
          <SignOut size={24} color={theme.colors.white[800]} />
        </button>
      </footer>
    </Container>
  );
}
