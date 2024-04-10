import { IAddressResponse, ICompanyAddress } from '../types/address';
import { citiesOptions } from '../utils/citiesOptions';
import { getGeocodingAddress } from './googleMaps';
import { api } from './utils/api';

export async function getAddresses() {
  const { data } = await api.get<IAddressResponse[]>('/addresses');

  return data;
}

export async function findAddressById(id: string) {
  const { data } = await api.get<IAddressResponse>(`/addresses/${id}`);

  return data;
}

interface ICreateAddressData extends ICompanyAddress {
  name: string;
}

export async function createAddress(addressData: ICreateAddressData) {
  const geocondingData = await getGeocodingAddress({
    address: addressData.address,
    number: addressData.number,
    district: addressData.district,
    state: addressData.state || '',
    city: addressData.city || '',
  });
  const payload = {
    name: addressData.name,
    zipcode: addressData.zipcode,
    address: addressData.address,
    ...(addressData.number && { number: Number(addressData.number) }),
    district: addressData.district,
    reference: addressData.reference,
    state: addressData.state,
    city:
      addressData.state &&
      citiesOptions[addressData.state].find(
        (item) => item.value === addressData.city,
      )?.label,
    latitude: geocondingData.results[0].geometry.location.lat,
    longitude: geocondingData.results[0].geometry.location.lng,
  };

  api.post('/addresses', payload);
}

export async function updateAddress(
  id: string,
  addressData: ICreateAddressData,
) {
  const geocondingData = await getGeocodingAddress({
    address: addressData.address,
    number: addressData.number,
    district: addressData.district,
    state: addressData.state || '',
    city: addressData.city || '',
  });
  const payload = {
    name: addressData.name,
    zipcode: addressData.zipcode,
    address: addressData.address,
    ...(addressData.number && { number: Number(addressData.number) }),
    district: addressData.district,
    reference: addressData.reference,
    state: addressData.state,
    city:
      addressData.state &&
      citiesOptions[addressData.state].find(
        (item) => item.value === addressData.city,
      )?.label,
    latitude: geocondingData.results[0].geometry.location.lat,
    longitude: geocondingData.results[0].geometry.location.lng,
  };

  api.put(`/addresses/${id}`, payload);
}

export async function deleteAddress(id: string) {
  await api.delete<IAddressResponse>(`/addresses/${id}`);
}
