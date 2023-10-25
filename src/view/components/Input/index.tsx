import { InputHTMLAttributes, useState } from 'react';
import { Container, Wrapper } from './styles';
import { EyeSlash } from '@phosphor-icons/react';
import { useTheme } from 'styled-components';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name?: string;
  label?: string;
  wrapperStyle?: React.CSSProperties;
  error?: string;
}

export function Input({
  name,
  label,
  type,
  wrapperStyle,
  error,
  ...rest
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const theme = useTheme();

  return (
    <Wrapper style={wrapperStyle}>
      {label && <label htmlFor={name}>{label}</label>}
      <Container>
        <input
          id={name}
          type={type !== 'password' ? type : showPassword ? 'text' : 'password'}
          {...rest}
        />
        {type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword((prevState) => !prevState)}
          >
            <EyeSlash size={20} color={theme.colors.white[400]} weight="bold" />
          </button>
        )}
      </Container>
      {error && <span className="error">{error}</span>}
    </Wrapper>
  );
}
