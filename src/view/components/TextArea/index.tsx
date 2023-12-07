import { Container, Wrapper } from './styles';

interface TextAreaProps {
  name?: string;
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
}

export function TextArea({
  name,
  label,
  placeholder,
  value,
  onChange,
}: TextAreaProps) {
  return (
    <Wrapper>
      {label && <label htmlFor={name}>{label}</label>}
      <Container
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </Wrapper>
  );
}
