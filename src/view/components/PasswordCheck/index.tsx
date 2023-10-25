import { Check } from '@phosphor-icons/react';
import { CheckCircle, Wrapper } from './styles';
import { useTheme } from 'styled-components';
import { useEffect, useState } from 'react';

interface PasswordCheckProps {
  password: string;
}

export function PasswordCheck({ password }: PasswordCheckProps) {
  const [passwordCheck, setPasswordCheck] = useState({
    eightCharacters: password.length >= 8,
    alphanumeric: /[a-zA-Z]/.test(password) && /\d/.test(password),
  });
  const theme = useTheme();

  function handleCheckPassword(value: string) {
    if (value.length >= 8) {
      setPasswordCheck((prevState) => ({
        ...prevState,
        eightCharacters: true,
      }));
    } else {
      setPasswordCheck((prevState) => ({
        ...prevState,
        eightCharacters: false,
      }));
    }

    if (/[a-zA-Z]/.test(value) && /\d/.test(value)) {
      setPasswordCheck((prevState) => ({
        ...prevState,
        alphanumeric: true,
      }));
    } else {
      setPasswordCheck((prevState) => ({
        ...prevState,
        alphanumeric: false,
      }));
    }
  }

  useEffect(() => {
    handleCheckPassword(password);
  }, [password]);

  return (
    <Wrapper>
      <div className="check">
        <CheckCircle active={passwordCheck.eightCharacters}>
          {passwordCheck.eightCharacters && (
            <Check color={theme.colors.black[400]} weight="bold" size={14} />
          )}
        </CheckCircle>
        <span>8+ caracteres</span>
      </div>
      <div className="check">
        <CheckCircle active={passwordCheck.alphanumeric}>
          {passwordCheck.alphanumeric && (
            <Check color={theme.colors.black[400]} weight="bold" size={14} />
          )}
        </CheckCircle>
        <span>Conter letras e números</span>
      </div>
    </Wrapper>
  );
}
