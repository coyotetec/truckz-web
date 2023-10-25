import { ArrowRight } from '@phosphor-icons/react';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Logo } from '../../components/Logo';
import { Container } from './styles';
import { useTheme } from 'styled-components';
import { Separator } from './components/Separator';
import { ProfileTypeModal } from './modals/ProfileTypeModal';
import { useState } from 'react';
import { formErrorType } from '../../../types/global';
import { loginSchema } from './schemas';
import { formatZodErrors } from '../../../utils/formatZodErrors';

export function Login() {
  const [profileTypeModalVisible, setProfileTypeModalVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [formErrors, setFormErrors] = useState<formErrorType>(null);
  const theme = useTheme();

  function handleSubmit(e?: React.FormEvent<HTMLFormElement>) {
    e?.preventDefault();
    const loginValidation = loginSchema.safeParse({ username, password });

    if (!loginValidation.success) {
      setFormErrors(formatZodErrors(loginValidation.error));
      return;
    }

    setFormErrors(null);
  }

  return (
    <Container>
      <ProfileTypeModal
        visible={profileTypeModalVisible}
        onClose={() => setProfileTypeModalVisible(false)}
      />
      <main className="content">
        <Logo height={40} />
        <h1>Entre na sua conta ou crie uma nova</h1>
        <p>
          Para desfrutar de todas as oportunidades que a <b>truckz</b> tem para
          você!
        </p>
        <form onSubmit={handleSubmit}>
          <Input
            name="username"
            label="CPF / CNPJ / Nome de Usuário"
            placeholder="CPF / CNPJ / Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={formErrors?.username}
          />
          <Input
            type="password"
            name="password"
            label="Senha"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={formErrors?.password}
          />
          <span>Esqueceu a senha?</span>
          <div className="actions">
            <Button type="submit">
              Login
              <ArrowRight
                size={20}
                color={theme.colors.white[100]}
                weight="bold"
              />
            </Button>
            <Separator />
            <Button
              type="button"
              secondary
              onClick={() => setProfileTypeModalVisible(true)}
            >
              Crie uma nova conta
            </Button>
          </div>
        </form>
      </main>
      <div className="image" />
    </Container>
  );
}
