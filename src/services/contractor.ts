import { AxiosError } from 'axios';
import { citiesOptions } from '../utils/citiesOptions';
import { IAddressData } from '../view/pages/ContractorSignUp/steps/AddressData';
import { IContractorData } from '../view/pages/ContractorSignUp/steps/ContractorData';
import { logoImageType } from '../view/pages/ContractorSignUp/steps/LogoImage';
import { getGeocodingAddress } from './googleMaps';
import { APIError } from '../errors/APIError';
import { api } from './utils/api';
import {
  ICreateContractorResponse,
  IFindContractorResponse,
} from '../types/contractor';
import { localStorageKeys } from '../config/localStorageKeys';

interface CreateContractorArgs {
  contractorData: IContractorData;
  addressData: IAddressData;
  image: logoImageType;
}

const fieldMapping = {
  cnpj: 'CNPJ',
  cpf: 'CPF',
  email: 'Email',
  username: 'Nome de Usuário',
};

export async function createContractor({
  contractorData,
  addressData,
  image,
}: CreateContractorArgs) {
  try {
    if (!addressData.state || !addressData.city) {
      return;
    }

    const geocondingData = await getGeocodingAddress({
      address: addressData.address,
      number: addressData.number,
      district: addressData.district,
      state: addressData.state,
      city: addressData.city,
    });

    if (geocondingData?.error_message) {
      throw new APIError(
        'Não foi possível criar sua conta, tente novamente mais tarde',
      );
    }

    const formData = new FormData();

    if (image) {
      formData.append('avatar', image);
    }
    formData.append('name', contractorData.name);
    formData.append('stateRegistration', contractorData.stateRegistration);
    formData.append('email', contractorData.email);
    formData.append('username', contractorData.username);
    formData.append('password', contractorData.password);
    formData.append(
      'phoneNumber',
      contractorData.phoneNumber.replace(/\D+/g, ''),
    );
    formData.append(
      'whatsappNumber',
      contractorData.whatsappNumber.replace(/\D+/g, ''),
    );
    if (contractorData.cnpjCpf.length === 18) {
      formData.append('cnpj', contractorData.cnpjCpf.replace(/\D+/g, ''));
    }
    if (contractorData.cnpjCpf.length === 14) {
      formData.append('cpf', contractorData.cnpjCpf.replace(/\D+/g, ''));
    }
    formData.append(
      'address',
      JSON.stringify({
        zipcode: addressData.zipcode,
        address: addressData.address,
        number: Number(addressData.number),
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
      }),
    );

    const { data } = await api.post<ICreateContractorResponse>(
      '/contractors',
      formData,
    );

    return data;
  } catch (err) {
    if (err instanceof APIError) {
      throw new APIError(err.message);
    }

    if (err instanceof AxiosError) {
      if (err.response?.status === 400) {
        const error = err.response.data.error as string;

        if (error.startsWith('the following fields are already in use:')) {
          const fieldsInUse = error
            .replace('the following fields are already in use: ', '')
            .split(', ')
            .map((item) => fieldMapping[item as keyof typeof fieldMapping]);

          throw new APIError(
            `Já existe um usuário com os seguintes campos: ${fieldsInUse.join(
              ', ',
            )}`,
          );
        }
      }

      if (err.response?.status === 500) {
        throw new APIError('Problemas no servidor, tente novamente mais tarde');
      }
    }
  }
}

export async function findContractor() {
  try {
    const token = localStorage.getItem(localStorageKeys.AUTH_TOKEN);
    const { data } = await api.get<IFindContractorResponse>('/contractors', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.response?.status === 500) {
        throw new APIError('Problemas no servidor, tente novamente mais tarde');
      }
    }
  }
}

export interface UpdateContractorArgs {
  name: string;
  cnpjCpf: string;
  stateRegistration: string;
  phoneNumber: string;
  whatsappNumber: string;
}

export async function updateContractor(payload: UpdateContractorArgs) {
  try {
    const token = localStorage.getItem(localStorageKeys.AUTH_TOKEN);
    const { data } = await api.put<ICreateContractorResponse>(
      '/contractors',
      {
        cnpj:
          payload.cnpjCpf.length === 18
            ? payload.cnpjCpf.replace(/\D+/g, '')
            : undefined,
        cpf:
          payload.cnpjCpf.length === 14
            ? payload.cnpjCpf.replace(/\D+/g, '')
            : undefined,
        phoneNumber: payload.phoneNumber.replace(/\D+/g, ''),
        whatsappNumber: payload.whatsappNumber.replace(/\D+/g, ''),
        name: payload.name,
        stateRegistration: payload.stateRegistration,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return data;
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.response?.status === 400) {
        const error = err.response.data.error as string;

        if (error.startsWith('the following fields are already in use:')) {
          const fieldsInUse = error
            .replace('the following fields are already in use: ', '')
            .split(', ')
            .map((item) => fieldMapping[item as keyof typeof fieldMapping]);

          throw new APIError(
            `Já existe um contratante com os seguintes campos: ${fieldsInUse.join(
              ', ',
            )}`,
          );
        }
      }

      if (err.response?.status === 500) {
        throw new APIError('Problemas no servidor, tente novamente mais tarde');
      }
    }
  }
}
