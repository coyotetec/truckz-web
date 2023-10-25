import { NavLink, Outlet } from 'react-router-dom';
import { Container, Sidebar } from './styles';

export function SettingsLayout() {
  return (
    <Container>
      <Sidebar>
        <h4>Configurações</h4>
        <nav className="items">
          <NavLink to="/settings/user-data">Dados de Usuário</NavLink>
          <NavLink to="/settings/contractor-data">Dados de Contratante</NavLink>
        </nav>
      </Sidebar>
      <Outlet />
    </Container>
  );
}
