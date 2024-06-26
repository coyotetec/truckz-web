import { parse } from 'date-fns';
import { api } from './utils/api';
import { IAddress } from '../types/address';
import { IGetLoadResponse, ILoad } from '../types/load';
import { validateLoadType } from '../utils/validateLoadType';

export async function getContractorLoads() {
  const { data } = await api.get<IGetLoadResponse[]>('/loads');

  return data;
}

interface CreateLoadArgs {
  loadData: ILoad;
  addressData: IAddress;
}

export async function createLoad({ loadData, addressData }: CreateLoadArgs) {
  const formData = new FormData();

  formData.append('title', loadData.title);
  formData.append(
    'price',
    String(
      parseFloat(
        loadData.price.replace('R$ ', '').replace(/\./g, '').replace(',', '.'),
      ),
    ),
  );
  formData.append(
    'type',
    validateLoadType(loadData.fullLoad, loadData.complementLoad) || '',
  );
  formData.append(
    'length',
    String(parseFloat(loadData.length.replace(',', '.'))),
  );
  formData.append(
    'width',
    String(parseFloat(loadData.width.replace(',', '.'))),
  );
  formData.append(
    'height',
    String(parseFloat(loadData.height.replace(',', '.'))),
  );
  formData.append('dimensionsUnit', String(loadData.dimensionsUnit));
  formData.append(
    'weight',
    String(parseFloat(loadData.weight.replace(',', '.'))),
  );
  formData.append('weightUnit', String(loadData.weightUnit));
  formData.append('description', loadData.description);
  formData.append(
    'pickupDate',
    parse(addressData.pickupDate, 'dd/MM/yyyy', new Date()).toJSON(),
  );
  formData.append(
    'deliveryDate',
    parse(addressData.deliveryDate, 'dd/MM/yyyy', new Date()).toJSON(),
  );

  if (addressData.pickupAddress?.id) {
    formData.append('pickupAddressId', addressData.pickupAddress.id);
  } else if (addressData.pickupAddress) {
    formData.append(
      'pickupAddress',
      JSON.stringify({
        name: addressData.pickupAddress.name,
        zipcode: addressData.pickupAddress.zipcode,
        address: addressData.pickupAddress.address,
        number: addressData.pickupAddress.number,
        district: addressData.pickupAddress.district,
        reference: addressData.pickupAddress.reference,
        state: addressData.pickupAddress.state,
        city: addressData.pickupAddress.city,
        latitude: addressData.pickupAddress.latitude,
        longitude: addressData.pickupAddress.longitude,
      }),
    );
  }

  if (addressData.deliveryAddress?.id) {
    formData.append('deliveryAddressId', addressData.deliveryAddress.id);
  } else if (addressData.deliveryAddress) {
    formData.append(
      'deliveryAddress',
      JSON.stringify({
        name: addressData.deliveryAddress.name,
        zipcode: addressData.deliveryAddress.zipcode,
        address: addressData.deliveryAddress.address,
        number: addressData.deliveryAddress.number,
        district: addressData.deliveryAddress.district,
        reference: addressData.deliveryAddress.reference,
        state: addressData.deliveryAddress.state,
        city: addressData.deliveryAddress.city,
        latitude: addressData.deliveryAddress.latitude,
        longitude: addressData.deliveryAddress.longitude,
      }),
    );
  }

  loadData.loadImages &&
    loadData.loadImages.forEach((image) => {
      formData.append('images', image);
    });

  const { data } = await api.post('/loads', formData);

  return data;
}

interface UpdateLoadArgs {
  id: string;
  loadData: ILoad;
  addressData: IAddress;
  images: File[];
}

export async function updateLoad({
  id,
  loadData,
  addressData,
  images,
}: UpdateLoadArgs) {
  const formData = new FormData();

  formData.append('title', loadData.title);
  formData.append(
    'price',
    String(
      parseFloat(
        loadData.price.replace('R$ ', '').replace(/\./g, '').replace(',', '.'),
      ),
    ),
  );
  formData.append(
    'type',
    validateLoadType(loadData.fullLoad, loadData.complementLoad) || '',
  );
  formData.append(
    'length',
    String(parseFloat(loadData.length.replace(',', '.'))),
  );
  formData.append(
    'width',
    String(parseFloat(loadData.width.replace(',', '.'))),
  );
  formData.append(
    'height',
    String(parseFloat(loadData.height.replace(',', '.'))),
  );
  formData.append('dimensionsUnit', String(loadData.dimensionsUnit));
  formData.append(
    'weight',
    String(parseFloat(loadData.weight.replace(',', '.'))),
  );
  formData.append('weightUnit', String(loadData.weightUnit));
  formData.append('description', loadData.description);
  formData.append(
    'pickupDate',
    parse(addressData.pickupDate, 'dd/MM/yyyy', new Date()).toJSON(),
  );
  formData.append(
    'deliveryDate',
    parse(addressData.deliveryDate, 'dd/MM/yyyy', new Date()).toJSON(),
  );

  if (addressData.pickupAddress?.id) {
    formData.append('pickupAddressId', addressData.pickupAddress.id);
  } else if (addressData.pickupAddress) {
    formData.append(
      'pickupAddress',
      JSON.stringify({
        name: addressData.pickupAddress.name,
        zipcode: addressData.pickupAddress.zipcode,
        address: addressData.pickupAddress.address,
        number: addressData.pickupAddress.number,
        district: addressData.pickupAddress.district,
        reference: addressData.pickupAddress.reference,
        state: addressData.pickupAddress.state,
        city: addressData.pickupAddress.city,
        latitude: addressData.pickupAddress.latitude,
        longitude: addressData.pickupAddress.longitude,
      }),
    );
  }

  if (addressData.deliveryAddress?.id) {
    formData.append('deliveryAddressId', addressData.deliveryAddress.id);
  } else if (addressData.deliveryAddress) {
    formData.append(
      'deliveryAddress',
      JSON.stringify({
        name: addressData.deliveryAddress.name,
        zipcode: addressData.deliveryAddress.zipcode,
        address: addressData.deliveryAddress.address,
        number: addressData.deliveryAddress.number,
        district: addressData.deliveryAddress.district,
        reference: addressData.deliveryAddress.reference,
        state: addressData.deliveryAddress.state,
        city: addressData.deliveryAddress.city,
        latitude: addressData.deliveryAddress.latitude,
        longitude: addressData.deliveryAddress.longitude,
      }),
    );
  }

  images.forEach((image) => {
    formData.append('images', image);
  });

  const { data } = await api.put(`/loads/${id}`, formData);

  return data;
}

interface CloseLoadArgs {
  id: string;
  status: 'finished' | 'cancelled';
}

export async function closeLoad({ id, status }: CloseLoadArgs) {
  await api.delete(`/loads/${id}?`, {
    data: {
      status,
    },
  });
}

export async function findLoadById(id: string) {
  const { data } = await api.get<IGetLoadResponse>(`/loads/${id}`);

  return data;
}
