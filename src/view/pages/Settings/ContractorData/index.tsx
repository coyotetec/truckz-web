import { useEffect, useMemo, useState } from 'react';
import { Input } from '../../../components/Input';
import { MaskInput } from '../../../components/MaskInput';
import { Container } from './styles';
import { Button } from '../../../components/Button';
import { Check } from '@phosphor-icons/react';
import { useTheme } from 'styled-components';
import { contractorSchema } from './schemas';
import { formErrorType } from '../../../../types/global';
import { formatZodErrors } from '../../../../utils/formatZodErrors';
import {
  findContractor,
  updateContractor,
} from '../../../../services/contractor';
import { formatCnpj, formatCpf, formatPhone } from '../../../../utils/formats';
import { Loader } from '../../../components/Loader';
import { useAuth } from '../../../../hooks/useAuth';
import toast from 'react-hot-toast';
import { localStorageKeys } from '../../../../config/localStorageKeys';

interface IContractorData {
  name: string;
  cnpjCpf: string;
  stateRegistration: string;
  phoneNumber: string;
  whatsappNumber: string;
}

export function ContractorData() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<IContractorData>({
    name: '',
    cnpjCpf: '',
    stateRegistration: '',
    phoneNumber: '',
    whatsappNumber: '',
  });
  const [formErrors, setFormErrors] = useState<formErrorType>(null);
  const canSubmit = useMemo(
    () => contractorSchema.safeParse(data).success,
    [data],
  );
  const theme = useTheme();
  const { setUser } = useAuth();

  function handleDataChange(field: keyof IContractorData, value: string) {
    setData((prevState) => ({ ...prevState, [field]: value }));
  }

  async function handleSubmit(e?: React.FormEvent<HTMLFormElement>) {
    try {
      e?.preventDefault();
      const dataValidation = contractorSchema.safeParse(data);

      if (!dataValidation.success) {
        setFormErrors(formatZodErrors(dataValidation.error));
        return;
      }

      setFormErrors(null);
      setIsLoading(true);

      const response = await updateContractor(data);

      if (response) {
        setUser((prevState) =>
          prevState
            ? {
                ...prevState,
                contractor: {
                  name: response.name,
                },
              }
            : null,
        );

        setUser((prevState) => {
          const newState = prevState
            ? {
                ...prevState,
                contractor: {
                  name: response.name,
                },
              }
            : null;

          if (newState) {
            localStorage.setItem(
              localStorageKeys.USER,
              JSON.stringify(newState),
            );
          }

          return newState;
        });
      }

      setIsLoading(false);
      toast.success('Dados atualizados com sucesso!');
    } catch {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    async function loadContractorData() {
      try {
        setIsLoading(true);
        const response = await findContractor();

        if (response) {
          setData({
            name: response.name,
            cnpjCpf: response.cnpj
              ? formatCnpj(response.cnpj)
              : response.cpf
              ? formatCpf(response.cpf)
              : '',
            stateRegistration: response.stateRegistration,
            phoneNumber: formatPhone(response.phoneNumber),
            whatsappNumber: formatPhone(response.whatsappNumber),
          });
        }

        setIsLoading(false);
      } catch {
        setIsLoading(false);
      }
    }

    loadContractorData();
  }, []);

  return (
    <Container>
      <Loader visible={isLoading} />
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
      <Button onClick={() => handleSubmit()} disabled={!canSubmit}>
        <Check size={24} color={theme.colors.white[100]} weight="bold" />
        Atualizar Dados
      </Button>
    </Container>
  );
}
