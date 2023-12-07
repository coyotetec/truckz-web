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
import { APIError } from '../../../errors/APIError';
import { createContractor } from '../../../services/contractor';
import { ConcludedModal } from './modals/ConcludedModal';
import toast from 'react-hot-toast';
import { checkUsername } from '../../../services/user';
import { Loader } from '../../components/Loader';

export function ContractorSignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [concludedModalVisible, setConcludedModalVisible] = useState(false);
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

  async function handleCheckUsername(value: string) {
    try {
      if (value) {
        setIsLoading(true);
        const data = await checkUsername(value);

        if (data) {
          return data.available;
        }
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function persistData() {
    if (contractorDataRef.current) {
      const contractorDataResponse = contractorDataRef.current.getData();
      const contractorDataValidation = contractorSchema.safeParse(
        contractorDataResponse,
      );
      const usernameIsAvailable = await handleCheckUsername(
        contractorDataResponse.username,
      );

      if (!contractorDataValidation.success || !usernameIsAvailable) {
        setContractorData(contractorDataResponse);
        setContractorErrors({
          ...(!contractorDataValidation.success &&
            formatZodErrors(contractorDataValidation.error)),
          ...(!usernameIsAvailable && {
            username: 'Nome de usuário não disponível',
          }),
        });
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

      setImage(logoImageResponse);
      setImageErrors(null);
      return true;
    }
  }

  async function handleNextStep(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const canContinue = await persistData();

    if (canContinue) {
      if (currentStep === stepsTitles.length - 1) {
        return handleSubmit();
      }

      setCurrentStep((prevState) =>
        prevState < stepsTitles.length - 1 ? prevState + 1 : prevState,
      );
    }
  }

  async function handlePreviousStep() {
    const canContinue = await persistData();

    if (canContinue) {
      setCurrentStep((prevState) =>
        prevState > 0 ? prevState - 1 : prevState,
      );
    }
  }

  async function handleSubmit() {
    try {
      setIsLoading(true);
      const imageLogo =
        image || (logoImageRef.current ? logoImageRef.current.getData() : null);

      await createContractor({
        contractorData,
        addressData,
        image: imageLogo,
      });

      setConcludedModalVisible(true);
    } catch (err) {
      if (err instanceof APIError) {
        toast.error(err.message);
      }
    } finally {
      setIsLoading(false);
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
      <Loader visible={isLoading} />
      <ConcludedModal visible={concludedModalVisible} />
      <main className="content">
        <h1>
          <button
            className="back-button"
            onClick={() =>
              navigate('/login', {
                replace: true,
              })
            }
          >
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
            {currentStep !== 0 && (
              <Button type="button" onClick={handlePreviousStep}>
                <ArrowLeft
                  size={20}
                  color={theme.colors.white[100]}
                  weight="bold"
                />
                Anterior
              </Button>
            )}
            <Button type="submit">
              {currentStep === stepsTitles.length - 1 ? 'Cadastrar' : 'Próximo'}
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
