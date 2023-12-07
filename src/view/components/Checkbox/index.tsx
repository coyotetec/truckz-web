import { Wrapper } from './styles';

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
  value?: string;
}

export function Checkbox({ label, checked, onChange, value }: CheckboxProps) {
  return (
    <Wrapper>
      <input
        type="checkbox"
        value={value}
        checked={checked}
        onChange={() => onChange(!checked)}
      />
      {label}
    </Wrapper>
  );
}
