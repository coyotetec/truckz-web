import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Logo } from '../../components/Logo';
import { Container } from './styles';
import { useMemo, useState } from 'react';
import { formErrorType } from '../../../types/global';
import { loginSchema } from './schemas';
import { formatZodErrors } from '../../../utils/formatZodErrors';
import { Loader } from '../../components/Loader';
import { APIError } from '../../../errors/APIError';
import toast from 'react-hot-toast';
import { deleteAccount } from '../../../services/authetication';
import { ConcludedModal } from './modals/ConcludedModal';

export function DeleteAccount() {
  const [concludedModalVisible, setConcludedModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [formErrors, setFormErrors] = useState<formErrorType>(null);
  const canSubmit = useMemo(
    () => loginSchema.safeParse({ username, password }).success,
    [username, password],
  );

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

      await deleteAccount({
        username: loginValidation.data.username,
        password: loginValidation.data.password,
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

  return (
    <Container>
      <Loader visible={isLoading} />
      <ConcludedModal visible={concludedModalVisible} />
      <main className="content">
        <Logo height={40} />
        <h1>Delete sua conta</h1>
        <p>
          Caso você realmente queira deletar sua conta por favor preencha os
          dados abaixo.
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
          <div className="actions">
            <Button type="submit" disabled={!canSubmit} danger>
              Deletar Conta
            </Button>
          </div>
        </form>
      </main>
      <div className="image" />
    </Container>
  );
}
