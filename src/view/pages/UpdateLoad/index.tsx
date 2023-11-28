import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { LoadData, LoadDataRefType } from '../NewLoad/components/LoadData';
import {
  PickupAndDelivery,
  PickupAndDeliveryRefType,
} from '../NewLoad/components/PickupAndDelivery';
import { Button } from '../../components/Button';
import { ArrowLeft, Check } from '@phosphor-icons/react';
import { Container, Content } from './styles';
import { formErrorType } from '../../../types/global';
import { IAddressResponse } from '../../../types/address';
import { ILoadAddress, LoadType, UnitType } from '../../../types/load';
import { getAddresses } from '../../../services/addresses';
import { findLoadById, updateLoad } from '../../../services/load';
import { compareLoadDataObject } from '../../../utils/compareLoadDataObject';
import { validateLoadType } from '../../../utils/validateLoadType';
import { convertUrlImageToFile } from '../../../utils/convertUrlImageToFile';
import { formatZodErrors } from '../../../utils/formatZodErrors';
import { addressSchema, loadSchema } from '../NewLoad/schemas';
import { Loader } from '../../components/Loader';

export interface ILoadResponseUpdate {
  id: string;
  title: string;
  status: string;
  price: number;
  length: number;
  width: number;
  height: number;
  dimensionsUnit: UnitType;
  weight: number;
  weightUnit: UnitType;
  description: string;
  pickupAddressId: string;
  pickupAddress: ILoadAddress;
  pickupDate: string;
  deliveryAddressId: string;
  deliveryAddress: ILoadAddress;
  deliveryDate: string;
  createdAt: string;
  seenTimes: number;
  contractorId: string;
  loadImages: File[];
  type: string;
}

export function UpdateLoad() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [addresses, setAddresses] = useState<IAddressResponse[] | undefined>(
    [],
  );
  const [loadResponse, setLoadResponse] = useState<ILoadResponseUpdate>();
  const loadDataRef = useRef<LoadDataRefType>(null);
  const pickupAndDeliveryRef = useRef<PickupAndDeliveryRefType>(null);
  const [loadDataFormErrors, setLoadDataFormErrors] =
    useState<formErrorType>(null);
  const [pickupAndDeliveryFormErrors, setPickupAndDeliveryFormErrors] =
    useState<formErrorType>(null);

  async function handleSubmit() {
    setIsLoading(true);
    const loadData = loadDataRef.current?.getData();
    const pickupAndDeliveryData = pickupAndDeliveryRef.current?.getData();

    let willUpdate: boolean | null = null;

    if (loadData && pickupAndDeliveryData && loadResponse) {
      const loadDataMapped = {
        ...loadData,
        ...pickupAndDeliveryData,
        height: Number(loadData.height),
        weight: Number(loadData.weight),
        width: Number(loadData.width),
        length: Number(loadData.length),
        price: Number(
          loadData.price
            .replace('R$ ', '')
            .replace(/\./g, '')
            .replace(',', '.'),
        ),
        type: validateLoadType(
          loadData.fullLoad,
          loadData.complementLoad,
        ) as LoadType,
      };
      willUpdate = compareLoadDataObject(loadDataMapped, loadResponse);
    }

    if (!willUpdate) {
      setIsLoading(false);
      return navigate('/loads');
    }

    const loadDataValidation = loadSchema.safeParse(loadData);
    const pickupAndDeliveryValidation = addressSchema.safeParse(
      pickupAndDeliveryData,
    );

    if (!loadDataValidation.success) {
      setIsLoading(false);
      return setLoadDataFormErrors(formatZodErrors(loadDataValidation.error));
    }

    if (!pickupAndDeliveryValidation.success) {
      setIsLoading(false);
      return setPickupAndDeliveryFormErrors(
        formatZodErrors(pickupAndDeliveryValidation.error),
      );
    }

    setLoadDataFormErrors(null);
    setPickupAndDeliveryFormErrors(null);

    id &&
      loadData &&
      pickupAndDeliveryData &&
      (await updateLoad({
        id,
        loadData,
        addressData: pickupAndDeliveryData,
        images: loadData!.loadImages,
      }));

    setTimeout(() => {
      setIsLoading(false);
      navigate('/loads');
    }, 1000);
  }

  useEffect(() => {
    async function getDataToUpdateLoad() {
      const addressData = await getAddresses();
      setAddresses(addressData);
      if (id) {
        const loadData = await findLoadById(id);
        const newloadImages = await convertUrlImageToFile(loadData!.loadImages);

        const dataPayload = {
          ...loadData,
          loadImages: newloadImages,
          pickupAddress: {
            ...loadData?.pickupAddress,
            reference: loadData?.pickupAddress?.reference || '',
          },
          deliveryAddress: {
            ...loadData?.deliveryAddress,
            reference: loadData?.deliveryAddress?.reference || '',
          },
        };

        setLoadResponse(dataPayload as ILoadResponseUpdate);

        loadDataRef.current?.setData(dataPayload as ILoadResponseUpdate);
        pickupAndDeliveryRef.current?.setData(
          dataPayload as ILoadResponseUpdate,
        );
      }
    }
    getDataToUpdateLoad();
  }, [id]);

  return (
    <Container>
      <Loader visible={isLoading} />
      <header>
        <ArrowLeft size={32} weight="bold" onClick={() => navigate('/loads')} />
        <div>
          <h1>Atualizar Carga</h1>
          <p>Prencha os dados para atualizar sua carga</p>
        </div>
      </header>
      <Content>
        <LoadData formErrors={loadDataFormErrors} ref={loadDataRef} />
        <PickupAndDelivery
          formErrors={pickupAndDeliveryFormErrors}
          addresses={addresses}
          ref={pickupAndDeliveryRef}
        />
      </Content>
      <Button
        style={{ width: '496px', margin: '1.5rem auto' }}
        onClick={handleSubmit}
      >
        <Check size={24} weight="bold" />
        Atualizar Carga
      </Button>
    </Container>
  );
}
