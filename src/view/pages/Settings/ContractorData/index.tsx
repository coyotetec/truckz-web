import { useState } from 'react';
import { Input } from '../../../components/Input';
import { MaskInput } from '../../../components/MaskInput';
import { Container } from './styles';
import { Button } from '../../../components/Button';
import { Check } from '@phosphor-icons/react';
import { useTheme } from 'styled-components';
import { contractorSchema } from './schemas';
import { formErrorType } from '../../../../types/global';
import { formatZodErrors } from '../../../../utils/formatZodErrors';

interface IContractorData {
  name: string;
  cnpjCpf: string;
  stateRegistration: string;
  phoneNumber: string;
  whatsappNumber: string;
}

export function ContractorData() {
  const [data, setData] = useState<IContractorData>({
    name: '',
    cnpjCpf: '',
    stateRegistration: '',
    phoneNumber: '',
    whatsappNumber: '',
  });
  const [formErrors, setFormErrors] = useState<formErrorType>(null);
  const theme = useTheme();

  function handleDataChange(field: keyof IContractorData, value: string) {
    setData((prevState) => ({ ...prevState, [field]: value }));
  }

  function handleSubmit(e?: React.FormEvent<HTMLFormElement>) {
    e?.preventDefault();
    const dataValidation = contractorSchema.safeParse(data);

    if (!dataValidation.success) {
      setFormErrors(formatZodErrors(dataValidation.error));
      return;
    }

    setFormErrors(null);
  }

  return (
    <Container>
      <h1>Dados do Contratante</h1>
      <p>Atualize suas informações de contratante</p>
      <form onSubmit={handleSubmit}>
        <Input
          name="name"
          label="Nome da Empresa"
          placeholder="Nome fantasia"
          value={data.name}
          onChange={(e) => handleDataChange('name', e.target.value)}
          error={formErrors?.name}
        />
        <MaskInput
          name="cnpjCpf"
          label="CNPJ / CPF"
          placeholder="CNPJ da empresa ou seu CPF"
          mask={['000.000.000-00', '00.000.000/0000-00']}
          value={data.cnpjCpf}
          onChange={(value) => handleDataChange('cnpjCpf', value)}
          error={formErrors?.cnpjCpf}
        />
        <MaskInput
          name="stateRegistration"
          label="Inscrição Estadual"
          placeholder="Inscrição estadual"
          mask={Number}
          scale={0}
          value={data.stateRegistration}
          onChange={(value) => handleDataChange('stateRegistration', value)}
          error={formErrors?.stateRegistration}
        />
        <MaskInput
          name="phoneNumber"
          label="Telefone para Contato"
          placeholder="Número para contato"
          mask={'(00) 00000-0000'}
          value={data.phoneNumber}
          onChange={(value) => handleDataChange('phoneNumber', value)}
          error={formErrors?.phoneNumber}
        />
        <MaskInput
          name="whatsappNumber"
          label="Whatsapp"
          placeholder="Número do Whatsapp"
          mask={'(00) 00000-0000'}
          value={data.whatsappNumber}
          onChange={(value) => handleDataChange('whatsappNumber', value)}
          error={formErrors?.whatsappNumber}
        />
        <button type="submit" style={{ display: 'none' }} />
      </form>
      <Button onClick={() => handleSubmit()}>
        <Check size={24} color={theme.colors.white[100]} weight="bold" />
        Atualizar Dados
      </Button>
    </Container>
  );
}
