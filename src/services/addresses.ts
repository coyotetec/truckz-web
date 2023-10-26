import { AxiosError } from 'axios';
import { IAddressResponse, ICompanyAddress } from '../types/address';
import { citiesOptions } from '../utils/citiesOptions';
import { getGeocodingAddress } from './googleMaps';
import { api } from './utils/api';
import { APIError } from '../errors/APIError';
import { localStorageKeys } from '../config/localStorageKeys';

export async function getAddresses() {
  try {
    const token = localStorage.getItem(localStorageKeys.AUTH_TOKEN);
    const { data } = await api.get<IAddressResponse[]>('/addresses', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function findAddressById(id: string) {
  try {
    const token = localStorage.getItem(localStorageKeys.AUTH_TOKEN);
    const { data } = await api.get<IAddressResponse>(`/addresses/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (err) {
    console.log(err);
  }
}

interface ICreateAddressData extends ICompanyAddress {
  name: string;
}

export async function createAddress(addressData: ICreateAddressData) {
  try {
    const token = localStorage.getItem(localStorageKeys.AUTH_TOKEN);
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

    api.post('/addresses', payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.response?.status === 400) {
        throw new APIError('Erro na requisição');
      }

      if (err.response?.status === 500) {
        throw new APIError('Problemas no servidor, tente novamente mais tarde');
      }
    }
  }
}

export async function updateAddress(
  id: string,
  addressData: ICreateAddressData,
) {
  try {
    const token = localStorage.getItem(localStorageKeys.AUTH_TOKEN);
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

    api.put(`/addresses/${id}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.response?.status === 400) {
        throw new APIError('Erro na requisição');
      }

      if (err.response?.status === 500) {
        throw new APIError('Problemas no servidor, tente novamente mais tarde');
      }
    }
  }
}
