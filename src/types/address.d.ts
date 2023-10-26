export interface IAddressResponse {
  id: string;
  name: string;
  zipcode?: string;
  address: string;
  number?: number;
  district: string;
  reference?: string;
  city: string;
  state: string;
  latitude: number;
  longitude: number;
  userId: string;
}

export interface ICompanyAddress {
  zipcode: string;
  address: string;
  number: string;
  district: string;
  reference: string;
  state: string | null;
  city: string | null;
}

export interface ISelectedAddress {
  id?: string;
  name: string;
  zipcode?: string;
  address: string;
  number?: number;
  district: string;
  reference?: string;
  city: string;
  state: string;
  latitude: number;
  longitude: number;
}

export interface IAddress {
  pickupAddress: ISelectedAddress | null;
  pickupDate: string;
  deliveryAddress: ISelectedAddress | null;
  deliveryDate: string;
}
