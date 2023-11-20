import { IAddressResponse } from '../types/address';

interface IAddressToUpdate {
  name: string;
  zipcode?: string;
  address: string;
  number?: number | null;
  district: string;
  reference?: string;
  city: string;
  state: string;
}

export function compareAddressObject(
  addressA: IAddressToUpdate,
  addressB: IAddressResponse,
) {
  const keysToCompare: (keyof IAddressToUpdate)[] = [
    'number',
    'name',
    'zipcode',
    'address',
    'district',
    'reference',
    'city',
    'state',
  ];

  for (const key of keysToCompare) {
    if (addressA[key] !== addressB[key]) {
      console.log({
        addresForm: addressA[key],
        addressResponse: addressB[key],
      });
      return true;
    }
  }
  return false;
}
