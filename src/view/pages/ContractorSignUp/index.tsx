import { ArrowLeft, ArrowRight } from '@phosphor-icons/react';
import { Button } from '../../components/Button';
import { Container } from './styles';
import { useTheme } from 'styled-components';
import { useRef, useState } from 'react';
import {
  ContractorData,
  IContractorData,
  contractorDataRefType,
} from './steps/ContractorData';
import {
  AddressData,
  IAddressData,
  addressDataRefType,
} from './steps/AddressData';
import { LogoImage, logoImageRefType, logoImageType } from './steps/LogoImage';
import { addressSchema, contractorSchema } from './schemas';
import { formErrorType } from '../../../types/global';
import { formatZodErrors } from '../../../utils/formatZodErrors';
import { useNavigate } from 'react-router-dom';

export function ContractorSignUp() {
  const [currentStep, setCurrentStep] = useState(0);
  const [contractorData, setContractorData] = useState<IContractorData>({
    name: '',
    cnpjCpf: '',
    stateRegistration: '',
    email: '',
    username: '',
    password: '',
    phoneNumber: '',
    whatsappNumber: '',
  });
  const [addressData, setAddressData] = useState<IAddressData>({
    zipcode: '',
    address: '',
    number: '',
    district: '',
    reference: '',
    state: '_',
    city: '_',
  });
  const [image, setImage] = useState<logoImageType>(null);
  const [contractorErrors, setContractorErrors] = useState<formErrorType>(null);
  const [addressErrors, setAddressErrors] = useState<formErrorType>(null);
  const [imageErrors, setImageErrors] = useState<formErrorType>(null);
  const contractorDataRef = useRef<contractorDataRefType>(null);
  const addressDataRef = useRef<addressDataRefType>(null);
  const logoImageRef = useRef<logoImageRefType>(null);
  const theme = useTheme();
  const navigate = useNavigate();
  const stepsTitles = ['Crie sua Conta', 'Endereço', 'Upload da Logo'];

  function persistData() {
    if (contractorDataRef.current) {
      const contractorDataResponse = contractorDataRef.current.getData();
      const contractorDataValidation = contractorSchema.safeParse(
        contractorDataResponse,
      );

      if (!contractorDataValidation.success) {
        setContractorData(contractorDataResponse);
        setContractorErrors(formatZodErrors(contractorDataValidation.error));
        return false;
      }

      setContractorData(contractorDataValidation.data);
      setContractorErrors(null);
      return true;
    }

    if (addressDataRef.current) {
      const addressDataResponse = addressDataRef.current.getData();
      const addressDataValidation =
        addressSchema.safeParse(addressDataResponse);

      if (!addressDataValidation.success) {
        setAddressData(addressDataResponse);
        setAddressErrors(formatZodErrors(addressDataValidation.error));
        return false;
      }

      setAddressData(addressDataValidation.data);
      setAddressErrors(null);
      return true;
    }

    if (logoImageRef.current) {
      const logoImageResponse = logoImageRef.current.getData();

      if (!logoImageResponse) {
        setImageErrors({
          logo: 'Sua logo é obrigatória',
        });
        return false;
      }

      setImage(logoImageRef.current.getData());
      setImageErrors(null);
      return true;
    }
  }

  function handleNextStep(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const canContinue = persistData();

    if (canContinue) {
      setCurrentStep((prevState) =>
        prevState < stepsTitles.length - 1 ? prevState + 1 : prevState,
      );
    }
  }

  function handlePreviousStep() {
    const canContinue = persistData();

    if (canContinue) {
      setCurrentStep((prevState) =>
        prevState > 0 ? prevState - 1 : prevState,
      );
    }
  }

  function StepDisplay() {
    switch (currentStep) {
      case 0:
        return (
          <ContractorData
            ref={contractorDataRef}
            value={contractorData}
            errors={contractorErrors}
          />
        );
      case 1:
        return (
          <AddressData
            ref={addressDataRef}
            value={addressData}
            errors={addressErrors}
          />
        );
      case 2:
        return (
          <LogoImage ref={logoImageRef} value={image} errors={imageErrors} />
        );
    }
  }

  return (
    <Container>
      <main className="content">
        <h1>
          <button className="back-button" onClick={() => navigate('/login')}>
            <ArrowLeft
              size={32}
              color={theme.colors.white[100]}
              weight="bold"
            />
          </button>
          {stepsTitles[currentStep]}
        </h1>
        <p>
          Preencha os dados abaixo e crie sua conta para começar a divulgar suas
          cargas.
        </p>
        <form onSubmit={handleNextStep}>
          <StepDisplay />
          <div className="actions">
            <Button type="button" onClick={handlePreviousStep}>
              <ArrowLeft
                size={20}
                color={theme.colors.white[100]}
                weight="bold"
              />
              Anterior
            </Button>
            <Button type="submit">
              Próximo
              <ArrowRight
                size={20}
                color={theme.colors.white[100]}
                weight="bold"
              />
            </Button>
          </div>
        </form>
      </main>
      <div className="image" />
    </Container>
  );
}
