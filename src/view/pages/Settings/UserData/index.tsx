import { useState } from 'react';
import { Input } from '../../../components/Input';
import { Container, ImagePreviewContainer } from './styles';
import { Button } from '../../../components/Button';
import { Check } from '@phosphor-icons/react';
import { useTheme } from 'styled-components';
import { PasswordCheck } from '../../../components/PasswordCheck';
import { Dropzone } from '../../../components/Dropzone';
import placeholder from '../../../../assets/images/placeholder.png';
import { userSchema } from './schemas';
import { formErrorType } from '../../../../types/global';
import { formatZodErrors } from '../../../../utils/formatZodErrors';
import { Loader } from '../../../components/Loader';

interface IUserData {
  email: string;
  username: string;
  password: string;
}

export function UserData() {
  const [data, setData] = useState<IUserData>({
    email: '',
    username: '',
    password: '',
  });
  const [image, setImage] = useState<File | null>(null);
  const [formErrors, setFormErrors] = useState<formErrorType>();
  const theme = useTheme();

  function handleDataChange(field: keyof IUserData, value: string) {
    setData((prevState) => ({ ...prevState, [field]: value }));
  }

  function handleSubmit(e?: React.FormEvent<HTMLFormElement>) {
    e?.preventDefault();
    const dataValidation = userSchema.safeParse(data);

    if (!dataValidation.success || !image) {
      setFormErrors({
        ...(!dataValidation.success && formatZodErrors(dataValidation.error)),
        ...(!image && { logo: 'Sua logo é obrigatória' }),
      });
      return;
    }

    setFormErrors(null);
  }

  return (
    <Container>
      {/* <Loader visible /> */}
      <h1>Dados de Usuário</h1>
      <p>Atualize suas informações de usuário</p>
      <form onSubmit={handleSubmit}>
        <Input
          name="email"
          label="E-mail"
          placeholder="E-mail para contato"
          value={data.email}
          onChange={(e) => handleDataChange('email', e.target.value)}
          error={formErrors?.email}
        />
        <Input
          name="username"
          label="Nome de Usuário"
          placeholder="Nome de usuário"
          value={data.username}
          onChange={(e) => handleDataChange('username', e.target.value)}
          error={formErrors?.username}
        />
        <Input
          type="password"
          name="password"
          label="Senha"
          placeholder="Uma senha forte"
          value={data.password}
          onChange={(e) => handleDataChange('password', e.target.value)}
          error={formErrors?.password}
        />
        <PasswordCheck password={data.password} />
        <h5>Logo da Empresa</h5>
        <Dropzone
          message="Arraste seu arquivo aqui, ou clique para selecionar"
          accept={{
            'image/png': ['.png'],
            'image/jpeg': ['.jpeg', '.jpg'],
          }}
          maxFiles={1}
          onDrop={(files) => setImage(files[0] || null)}
        />
        {formErrors?.logo && (
          <span className="error" style={{ marginTop: -12 }}>
            {formErrors?.logo}
          </span>
        )}
        <strong>Pré Visualização</strong>
        <ImagePreviewContainer>
          <img
            className="square"
            src={image ? URL.createObjectURL(image) : placeholder}
            onLoad={() =>
              image ? URL.revokeObjectURL(URL.createObjectURL(image)) : null
            }
            alt="Previsualização da logo"
          />
          <img
            className="rect"
            src={image ? URL.createObjectURL(image) : placeholder}
            onLoad={() =>
              image ? URL.revokeObjectURL(URL.createObjectURL(image)) : null
            }
            alt="Previsualização da logo"
          />
        </ImagePreviewContainer>
        <button type="submit" style={{ display: 'none' }} />
      </form>
      <Button onClick={() => handleSubmit()}>
        <Check size={24} color={theme.colors.white[100]} weight="bold" />
        Atualizar Dados
      </Button>
    </Container>
  );
}
