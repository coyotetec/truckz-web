import { ArrowRight } from '@phosphor-icons/react';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Logo } from '../../components/Logo';
import { Container } from './styles';
import { useTheme } from 'styled-components';
import { Separator } from './components/Separator';
import { ProfileTypeModal } from './modals/ProfileTypeModal';
import { useMemo, useState } from 'react';
import { formErrorType } from '../../../types/global';
import { loginSchema } from './schemas';
import { formatZodErrors } from '../../../utils/formatZodErrors';
import { Loader } from '../../components/Loader';
import { APIError } from '../../../errors/APIError';
import { useAuth } from '../../../hooks/useAuth';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

export function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [profileTypeModalVisible, setProfileTypeModalVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [formErrors, setFormErrors] = useState<formErrorType>(null);
  const canSubmit = useMemo(
    () => loginSchema.safeParse({ username, password }).success,
    [username, password],
  );
  const theme = useTheme();
  const { signIn } = useAuth();

  async function handleSubmit(e?: React.FormEvent<HTMLFormElement>) {
    try {
      e?.preventDefault();
      const loginValidation = loginSchema.safeParse({ username, password });

      if (!loginValidation.success) {
        setFormErrors(formatZodErrors(loginValidation.error));
        return;
      }

      setFormErrors(null);
      setIsLoading(true);

      await signIn({
        username: loginValidation.data.username,
        password: loginValidation.data.password,
      });

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      if (err instanceof APIError) {
        toast.error(err.message);
      }
    }
  }

  return (
    <Container>
      <Loader visible={isLoading} />
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
          <Link to="/forgot-password">Esqueceu a senha?</Link>
          <div className="actions">
            <Button type="submit" disabled={!canSubmit}>
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
