import { useRef, useState } from 'react';
import { ArrowLeft, Check } from '@phosphor-icons/react';
import { Container } from './styles';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button';
import { addressSchema } from './schemas';
import { formErrorType } from '../../../types/global';
import { formatZodErrors } from '../../../utils/formatZodErrors';
import { createAddress } from '../../../services/addresses';
import { Loader } from '../../components/Loader';
import { AddressForm, AddressFormRefType } from '../../components/AddressForm';

export function NewAddress() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const addressFormDataRef = useRef<AddressFormRefType>(null);
  const [formErrors, setFormErrors] = useState<formErrorType>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    const addressData = addressFormDataRef.current?.getData();
    const addressDataValidation = addressSchema.safeParse(addressData);

    if (!addressDataValidation.success) {
      setIsLoading(false);
      return setFormErrors(formatZodErrors(addressDataValidation.error));
    }

    await createAddress(addressDataValidation.data);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/addresses');
    }, 1000);
  }
  return (
    <>
      <Loader visible={isLoading} />
      <Container>
        <header>
          <ArrowLeft
            size={32}
            weight="bold"
            onClick={() => navigate('/addresses')}
          />
          <div>
            <h1>Novo Endereço</h1>
            <p>Preencha os dados e crie um novo endereço</p>
          </div>
        </header>
        <AddressForm formErrors={formErrors} ref={addressFormDataRef} />
        <Button type="submit" onClick={handleSubmit}>
          <Check size={24} weight="bold" />
          Criar Endereço
        </Button>
      </Container>
    </>
  );
}
