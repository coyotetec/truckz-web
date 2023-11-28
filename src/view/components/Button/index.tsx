import { ButtonHTMLAttributes } from 'react';
import { Container } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  secondary?: boolean;
  danger?: boolean;
}

export function Button({ children, ...rest }: ButtonProps) {
  return <Container {...rest}>{children}</Container>;
}
