import { SelectHTMLAttributes } from 'react';
import { Container, Wrapper } from './styles';
import { CaretDown } from '@phosphor-icons/react';
import { useTheme } from 'styled-components';

export interface IOption {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name?: string;
  label?: string;
  placeholder?: string;
  wrapperStyle?: React.CSSProperties;
  options?: IOption[];
}

export function Select({
  name,
  label,
  placeholder,
  wrapperStyle,
  options,
  ...rest
}: SelectProps) {
  const theme = useTheme();

  return (
    <Wrapper style={wrapperStyle}>
      {label && <label htmlFor={name}>{label}</label>}
      <Container>
        <select id={name} {...rest}>
          <option value="_" disabled selected hidden>
            {placeholder}
          </option>
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <CaretDown
          size={20}
          color={theme.colors.white[400]}
          weight="bold"
          style={{
            position: 'absolute',
            right: 12,
            top: '50%',
            transform: 'translateY(-50%)',
          }}
        />
      </Container>
    </Wrapper>
  );
}
