import { ArrowLeft } from '@phosphor-icons/react';
import { Logo } from '../../components/Logo';
import { Container } from './styles';
import { useTheme } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { DownloadIosButton } from './components/DownloadIosButton';
import { DownloadAndroidButton } from './components/DownloadAndroidButton';
import mockupAndroid from '../../../assets/images/mockup-android.png';

export function DriverSignUp() {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Container>
      <main className="content">
        <Logo height={40} />
        <h1>
          {' '}
          <button
            className="back-button"
            onClick={() =>
              navigate('/login', {
                replace: true,
              })
            }
          >
            <ArrowLeft
              size={32}
              color={theme.colors.white[100]}
              weight="bold"
            />
          </button>
          Baixe o aplicativo
        </h1>
        <div className="app-display">
          <img src={mockupAndroid} alt="Celular com aplicativo truckz" />
          <div>
            <p>
              Para fazer a criação da sua conta instale o aplicativo{' '}
              <b>truckz</b>.
            </p>
            <DownloadIosButton />
            <DownloadAndroidButton />
          </div>
        </div>
      </main>
      <div className="image" />
    </Container>
  );
}
