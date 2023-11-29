import { InputHTMLAttributes, LegacyRef, useState } from 'react';
import { Container, Wrapper } from './styles';
import { EyeSlash } from '@phosphor-icons/react';
import { useTheme } from 'styled-components';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name?: string;
  label?: string;
  wrapperStyle?: React.CSSProperties;
  error?: string;
  refInput?: LegacyRef<HTMLInputElement>;
}

export function Input({
  name,
  label,
  type,
  wrapperStyle,
  error,
  refInput,
  ...rest
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const theme = useTheme();

  return (
    <Wrapper style={wrapperStyle}>
      {label && <label htmlFor={name}>{label}</label>}
      <Container>
        <input
          ref={refInput}
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
