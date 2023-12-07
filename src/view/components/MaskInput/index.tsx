import { forwardRef } from 'react';
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
  thousandsSeparator?: string;
  radix?: string;
  nomalizeZeros?: boolean;
  padFractionalZeros?: boolean;
  min?: number;
  max?: number;
  blocksOptions?: any;
}

export const MaskInput = forwardRef<HTMLInputElement, MaskInputProps>(
  (
    {
      name,
      label,
      wrapperStyle,
      placeholder,
      mask,
      scale,
      error,
      value,
      onChange,
      min,
      max,
      radix = ',',
      blocksOptions,
    },
    ref,
  ) => {
    return (
      <Wrapper style={wrapperStyle}>
        {label && <label htmlFor={name}>{label}</label>}
        <Container>
          <IMaskInput
            inputRef={ref}
            id={name}
            placeholder={placeholder}
            mask={mask}
            scale={scale}
            value={value}
            onAccept={(value) => (onChange ? onChange(value) : null)}
            min={min}
            max={max}
            radix={radix}
            blocks={blocksOptions}
          />
        </Container>
        {error && <span className="error">{error}</span>}
      </Wrapper>
    );
  },
);

MaskInput.displayName = 'MaskInput';
