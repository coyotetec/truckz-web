import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Content } from './styles';
import { LoadData, LoadDataRefType } from './components/LoadData';
import {
  PickupAndDelivery,
  PickupAndDeliveryRefType,
} from './components/PickupAndDelivery';
import { ArrowLeft, Check } from '@phosphor-icons/react';
import { Button } from '../../components/Button';
import { loadSchema, addressSchema } from './schemas';
import { formErrorType } from '../../../types/global';
import { formatZodErrors } from '../../../utils/formatZodErrors';
import { createLoad } from '../../../services/load';
import { IAddressResponse } from '../../../types/address';
import { getAddresses } from '../../../services/addresses';
import { Loader } from '../../components/Loader';

export function NewLoad() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const loadDataRef = useRef<LoadDataRefType>(null);
  const pickupAndDeliveryRef = useRef<PickupAndDeliveryRefType>(null);
  const [loadDataFormErrors, setLoadDataFormErrors] =
    useState<formErrorType>(null);
  const [pickupAndDeliveryFormErrors, setPickupAndDeliveryFormErrors] =
    useState<formErrorType>(null);
  const [addresses, setAddresses] = useState<IAddressResponse[] | undefined>(
    [],
  );

  async function handleSubmit() {
    setIsLoading(true);
    const loadData = loadDataRef.current?.getData();
    const pickupAndDeliveryData = pickupAndDeliveryRef.current?.getData();

    const loadDataValidation = loadSchema.safeParse(loadData);

    const pickupAndDeliveryValidation = addressSchema.safeParse(
      pickupAndDeliveryData,
    );

    if (!loadDataValidation.success) {
      return setLoadDataFormErrors(formatZodErrors(loadDataValidation.error));
    }

    if (!pickupAndDeliveryValidation.success) {
      return setPickupAndDeliveryFormErrors(
        formatZodErrors(pickupAndDeliveryValidation.error),
      );
    }

    setLoadDataFormErrors(null);
    setPickupAndDeliveryFormErrors(null);

    loadData &&
      pickupAndDeliveryData &&
      (await createLoad({ loadData, addressData: pickupAndDeliveryData }));

    setTimeout(() => {
      setIsLoading(false);
      navigate('/loads');
    }, 1000);
  }

  useEffect(() => {
    async function getAddressesData() {
      const data = await getAddresses();
      setAddresses(data);
    }
    getAddressesData();
  }, []);

  return (
    <Container>
      <Loader visible={isLoading} />
      <header>
        <ArrowLeft size={32} weight="bold" onClick={() => navigate('/loads')} />
        <div>
          <h1>Nova Carga</h1>
          <p>Preencha os dados e tenha divulgue sua carga para os motoristas</p>
        </div>
      </header>
      <Content>
        <LoadData ref={loadDataRef} formErrors={loadDataFormErrors} />
        <PickupAndDelivery
          ref={pickupAndDeliveryRef}
          formErrors={pickupAndDeliveryFormErrors}
          addresses={addresses}
        />
      </Content>
      <Button onClick={handleSubmit}>
        <Check size={24} weight="bold" />
        Criar Carga
      </Button>
    </Container>
  );
}
