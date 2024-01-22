import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Logo } from '../../components/Logo';
import { Container } from './styles';
import { useMemo, useState } from 'react';
import { formErrorType } from '../../../types/global';
import { requestResetSchema } from './schemas';
import { formatZodErrors } from '../../../utils/formatZodErrors';
import { Loader } from '../../components/Loader';
import { APIError } from '../../../errors/APIError';
import { useTheme } from 'styled-components';
import toast from 'react-hot-toast';
import { ArrowLeft } from '@phosphor-icons/react';
import { useNavigate } from 'react-router-dom';
import { requestPasswordReset } from '../../../services/authetication';
import { ConcludedModal } from './modals/ConcludedModal';

export function RequestResetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [concludedModalVisible, setConcludedModalVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [formErrors, setFormErrors] = useState<formErrorType>(null);
  const canSubmit = useMemo(
    () => requestResetSchema.safeParse({ username }).success,
    [username],
  );
  const theme = useTheme();
  const navigate = useNavigate();

  async function handleSubmit(e?: React.FormEvent<HTMLFormElement>) {
    try {
      e?.preventDefault();
      const requestResetValidation = requestResetSchema.safeParse({ username });

      if (!requestResetValidation.success) {
        setFormErrors(formatZodErrors(requestResetValidation.error));
        return;
      }

      setFormErrors(null);
      setIsLoading(true);

      await requestPasswordReset(requestResetValidation.data.username);

      setConcludedModalVisible(true);
    } catch (err) {
      if (err instanceof APIError) {
        toast.error(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Container>
      <Loader visible={isLoading} />
      <ConcludedModal visible={concludedModalVisible} />
      <main className="content">
        <Logo height={40} />
        <h1>
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
          Esqueci a senha
        </h1>
        <p>
          Insira um dos dados que usou no cadastro e enviaremos em seu email as
          instruções para que você possa alterar sua senha.
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
          <div className="actions">
            <Button type="submit" disabled={!canSubmit}>
              Enviar instruções
            </Button>
          </div>
        </form>
      </main>
      <div className="image" />
    </Container>
  );
}
