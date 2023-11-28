import { useEffect, useRef, useState } from 'react';
import { AddressForm, AddressFormRefType } from '../../components/AddressForm';
import { Container } from './styles';
import { formErrorType } from '../../../types/global';
import { Button } from '../../components/Button';
import { ArrowLeft, Check } from '@phosphor-icons/react';
import { Loader } from '../../components/Loader';
import { useNavigate, useParams } from 'react-router-dom';
import { findAddressById, updateAddress } from '../../../services/addresses';
import { compareAddressObject } from '../../../utils/compareAddressObject';
import { IAddressResponse } from '../../../types/address';
import { addressSchema } from '../NewAddress/schemas';
import { formatZodErrors } from '../../../utils/formatZodErrors';

export function UpdateAddress() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const addressFormDataRef = useRef<AddressFormRefType>(null);
  const [addressResponse, setAddressResponse] = useState<IAddressResponse>();
  const [formErrors, setFormErrors] = useState<formErrorType>(null);

  async function handleSubmit() {
    setIsLoading(true);
    const addressFormData = addressFormDataRef.current?.getData();
    let willUpdate: boolean | null = null;

    if (addressFormData && addressResponse) {
      willUpdate = compareAddressObject(
        {
          ...addressFormData,
          number: addressFormData.number
            ? Number(addressFormData.number)
            : null,
        },
        addressResponse,
      );
    }

    if (!willUpdate) {
      setIsLoading(false);
      return navigate('/addresses');
    }

    const addressDataValidation = addressSchema.safeParse(addressFormData);

    if (!addressDataValidation.success) {
      setIsLoading(false);
      return setFormErrors(formatZodErrors(addressDataValidation.error));
    }

    id && (await updateAddress(id, addressDataValidation.data));

    setTimeout(() => {
      setIsLoading(false);
      navigate('/addresses');
    }, 1000);
  }

  useEffect(() => {
    async function getAddressData() {
      if (id) {
        const addressData = await findAddressById(id);
        addressData && addressFormDataRef.current?.setData(addressData);
        setAddressResponse(addressData);
      }
    }
    getAddressData();
  }, [id]);

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
            <h1>Atualizar Endereço</h1>
            <p>Preencha os dados e atualize seu endereço</p>
          </div>
        </header>
        <AddressForm formErrors={formErrors} ref={addressFormDataRef} />
        <Button type="submit" onClick={handleSubmit}>
          <Check size={24} weight="bold" />
          Atualizar Endereço
        </Button>
      </Container>
    </>
  );
}

// 1. setar o loading OK
// 2. pegar o dados do formulário OK
// 3. comparara se há alguma diferença entre os dados recebidos da API e os dados do formulário OK
// 4. se houver diferença, validar dados e setar erros caso haja OK
// 5. enviar dados para API
// 6. se não ouver diferença, desligar o loaging e redirecionar para page de addresses OK
