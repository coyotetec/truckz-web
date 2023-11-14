import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Content } from './styles';
import { LoadData, LoadDataRefType } from './components/DataLoad';
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

export function NewLoad() {
  const navigate = useNavigate();
  const loadDataRef = useRef<LoadDataRefType>(null);
  const pickupAndDeliveryRef = useRef<PickupAndDeliveryRefType>(null);
  const [loadDataFormErrors, setLoadDataFormErrors] =
    useState<formErrorType>(null);
  const [pickupAndDeliveryFormErrors, setPickupAndDeliveryFormErrors] =
    useState<formErrorType>(null);

  async function handleSubmit() {
    const loadData = loadDataRef.current?.getData();
    const pickupAndDeliveryData = pickupAndDeliveryRef.current?.getData();

    const loadDataValidation = loadSchema.safeParse(loadData);

    const pickupAndDeliveryValidation = addressSchema.safeParse(
      pickupAndDeliveryData,
    );

    console.log({ loadData, pickupAndDeliveryData });
    if (!loadDataValidation.success) {
      console.log(loadDataValidation.error.issues);
      return setLoadDataFormErrors(formatZodErrors(loadDataValidation.error));
    }

    if (!pickupAndDeliveryValidation.success) {
      console.log(pickupAndDeliveryValidation.error.issues);
      return setPickupAndDeliveryFormErrors(
        formatZodErrors(pickupAndDeliveryValidation.error),
      );
    }

    setLoadDataFormErrors(null);
    setPickupAndDeliveryFormErrors(null);
    loadData &&
      pickupAndDeliveryData &&
      (await createLoad({ loadData, addressData: pickupAndDeliveryData }));
  }

  return (
    <Container>
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
        />
      </Content>
      <Button
        style={{ width: '496px', margin: '1.5rem auto' }}
        onClick={() => handleSubmit()}
      >
        <Check size={24} />
        Criar Carga
      </Button>
    </Container>
  );
}
