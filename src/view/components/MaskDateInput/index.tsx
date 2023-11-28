import { IMask, IMaskInput } from 'react-imask';
import { Container, Wrapper } from '../MaskInput/styles';
const dateOptions = {
  d: {
    mask: IMask.MaskedRange,
    from: 1,
    to: 31,
    maxLength: 2,
  },
  m: {
    mask: IMask.MaskedRange,
    from: 1,
    to: 12,
    maxLength: 2,
  },
  YYYY: {
    mask: IMask.MaskedRange,
    from: 1900,
    to: 9999,
  },
};

interface MaskDateInputProps {
  name?: string;
  label?: string;
  wrapperStyle?: React.CSSProperties;
  placeholder?: string;
  mask: any;
  error?: string;
  value?: string;
  onChange?: (value: string) => void;
  pattern?: string;
}

export function MaskDateInput({
  wrapperStyle,
  label,
  name,
  mask,
  placeholder,
  value,
  onChange,
  error,
}: MaskDateInputProps) {
  return (
    <Wrapper style={wrapperStyle}>
      {label && <label htmlFor={name}>{label}</label>}
      <Container>
        <IMaskInput
          id={name}
          placeholder={placeholder}
          mask={mask}
          value={value}
          onAccept={(value) => (onChange ? onChange(value) : null)}
          pattern="d`/m`/00000"
          blocks={dateOptions}
        />
      </Container>
      {error && <span className="error">{error}</span>}
    </Wrapper>
  );
}
