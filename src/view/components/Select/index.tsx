import { Wrapper } from './styles';
import { Dropdown } from 'primereact/dropdown';

export interface IOption {
  value: string;
  label: string;
}

interface SelectProps {
  name?: string;
  label?: string;
  placeholder?: string;
  wrapperStyle?: React.CSSProperties;
  options?: IOption[];
  value: string | undefined | null;
  onChange: (value: string) => void;
}

export function Select({
  name,
  label,
  placeholder,
  wrapperStyle,
  options,
  value,
  onChange,
}: SelectProps) {
  return (
    <Wrapper style={wrapperStyle}>
      {label && <label htmlFor={name}>{label}</label>}

      <Dropdown
        id={name}
        options={options}
        value={value}
        onChange={(e) => onChange(e.value)}
        optionLabel="label"
        placeholder={placeholder}
        emptyMessage="Nenhum item"
      />
    </Wrapper>
  );
}
