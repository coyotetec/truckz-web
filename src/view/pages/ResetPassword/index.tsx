import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Logo } from '../../components/Logo';
import { Container } from './styles';
import { useEffect, useMemo, useState } from 'react';
import { formErrorType } from '../../../types/global';
import { resetPasswordSchema } from './schemas';
import { formatZodErrors } from '../../../utils/formatZodErrors';
import { Loader } from '../../components/Loader';
import { APIError } from '../../../errors/APIError';
import { useTheme } from 'styled-components';
import toast from 'react-hot-toast';
import { ArrowLeft } from '@phosphor-icons/react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { resetPassword } from '../../../services/authetication';
import { ConcludedModal } from './modals/ConcludedModal';
import { PasswordCheck } from '../../components/PasswordCheck';

export function ResetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [concludedModalVisible, setConcludedModalVisible] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userId, setUserId] = useState('');
  const [token, setToken] = useState('');
  const [formErrors, setFormErrors] = useState<formErrorType>(null);
  const canSubmit = useMemo(
    () => resetPasswordSchema.safeParse({ password, confirmPassword }).success,
    [password, confirmPassword],
  );
  const theme = useTheme();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  async function handleSubmit(e?: React.FormEvent<HTMLFormElement>) {
    try {
      e?.preventDefault();
      const requestResetValidation = resetPasswordSchema.safeParse({
        password,
        confirmPassword,
      });

      if (!requestResetValidation.success) {
        setFormErrors(formatZodErrors(requestResetValidation.error));
        return;
      }

      setFormErrors(null);
      setIsLoading(true);

      await resetPassword({
        password,
        token,
        userId,
      });

      setConcludedModalVisible(true);
    } catch (err) {
      if (err instanceof APIError) {
        toast.error(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const tokenParam = searchParams.get('token');
    const userIdParam = searchParams.get('id');

    if (tokenParam) {
      setToken(tokenParam);
    }

    if (userIdParam) {
      setUserId(userIdParam);
    }
  }, [searchParams]);

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
          Alterar a senha
        </h1>
        <p>
          Informe uma senha que siga as regras definidas para que possamos
          altera-lá no sistema.
        </p>
        <form onSubmit={handleSubmit}>
          <Input
            type="password"
            name="password"
            label="Senha"
            placeholder="Uma senha forte"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={formErrors?.password}
          />
          <PasswordCheck password={password} />
          <Input
            type="password"
            name="confirmPassword"
            label="Confirmação de Senha"
            placeholder="Confirme sua senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={formErrors?.password}
          />
          <div className="actions">
            <Button type="submit" disabled={!canSubmit}>
              Alterar senha
            </Button>
          </div>
        </form>
      </main>
      <div className="image" />
    </Container>
  );
}
