import { forwardRef, useImperativeHandle, useState } from 'react';
import { Input } from '../../../../components/Input';
import { MaskInput } from '../../../../components/MaskInput';
import { PasswordCheck } from '../../../../components/PasswordCheck';
import { formErrorType } from '../../../../../types/global';

export interface IContractorData {
  name: string;
  cnpjCpf: string;
  stateRegistration: string;
  email: string;
  username: string;
  password: string;
  phoneNumber: string;
  whatsappNumber: string;
}

interface ContractorDataProps {
  value: IContractorData;
  errors: formErrorType;
}

export type contractorDataRefType = {
  getData: () => IContractorData;
};

export const ContractorData = forwardRef<
  contractorDataRefType,
  ContractorDataProps
>(({ value, errors }, ref) => {
  const [data, setData] = useState<IContractorData>(value);

  function handleDataChange(field: keyof IContractorData, value: string) {
    setData((prevState) => ({ ...prevState, [field]: value }));
  }

  useImperativeHandle(ref, () => ({
    getData() {
      return data;
    },
  }));

  return (
    <>
      <Input
        name="name"
        label="Nome da Empresa"
        placeholder="Nome fantasia"
        value={data.name}
        onChange={(e) => handleDataChange('name', e.target.value)}
        error={errors?.name}
      />
      <MaskInput
        name="cnpjCpf"
        label="CNPJ / CPF"
        placeholder="CNPJ da empresa ou seu CPF"
        mask={['000.000.000-00', '00.000.000/0000-00']}
        value={data.cnpjCpf}
        onChange={(value) => handleDataChange('cnpjCpf', value)}
        error={errors?.cnpjCpf}
      />
      <MaskInput
        name="stateSubscription"
        label="Inscrição Estadual"
        placeholder="Inscrição estadual"
        mask={Number}
        scale={0}
        value={data.stateRegistration}
        onChange={(value) => handleDataChange('stateRegistration', value)}
        error={errors?.stateRegistration}
      />
      <Input
        name="email"
        label="E-mail"
        placeholder="E-mail para contato"
        value={data.email}
        onChange={(e) => handleDataChange('email', e.target.value)}
        error={errors?.email}
      />
      <Input
        name="username"
        label="Nome de Usuário"
        placeholder="Nome de usuário"
        value={data.username}
        onChange={(e) => handleDataChange('username', e.target.value)}
        error={errors?.username}
      />
      <Input
        type="password"
        name="password"
        label="Senha"
        placeholder="Uma senha forte"
        value={data.password}
        onChange={(e) => handleDataChange('password', e.target.value)}
        error={errors?.password}
      />
      <PasswordCheck password={data.password} />
      <MaskInput
        name="phoneNumber"
        label="Telefone para Contato"
        placeholder="Número para contato"
        mask={'(00) 00000-0000'}
        value={data.phoneNumber}
        onChange={(value) => handleDataChange('phoneNumber', value)}
        error={errors?.phoneNumber}
      />
      <MaskInput
        name="whatsappNumber"
        label="Whatsapp"
        placeholder="Número do Whatsapp"
        mask={'(00) 00000-0000'}
        value={data.whatsappNumber}
        onChange={(value) => handleDataChange('whatsappNumber', value)}
        error={errors?.whatsappNumber}
      />
    </>
  );
});

ContractorData.displayName = 'ContractorData';
