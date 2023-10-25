import { Container, Wrapper } from './styles';
import { IMaskInput } from 'react-imask';

interface MaskInputProps {
  name?: string;
  label?: string;
  wrapperStyle?: React.CSSProperties;
  placeholder?: string;
  mask: any;
  scale?: number;
  error?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export function MaskInput({
  name,
  label,
  wrapperStyle,
  placeholder,
  mask,
  scale,
  error,
  value,
  onChange,
}: MaskInputProps) {
  return (
    <Wrapper style={wrapperStyle}>
      {label && <label htmlFor={name}>{label}</label>}
      <Container>
        <IMaskInput
          id={name}
          placeholder={placeholder}
          mask={mask}
          scale={scale}
          value={value}
          onAccept={(value) => (onChange ? onChange(value) : null)}
        />
      </Container>
      {error && <span className="error">{error}</span>}
    </Wrapper>
  );
}
