export type UnitType =
  | 'meters'
  | 'centimeters'
  | 'grams'
  | 'kilograms'
  | 'tons';

export type LoadType = 'full' | 'complement' | 'full_complement';

export interface ILoad {
  loadImages?: File[];
  title: string;
  height: string;
  width: string;
  length: string;
  dimensionsUnit: UnitType | string;
  weight: string;
  weightUnit: UnitType | string;
  description: string;
  price: string;
  fullLoad: boolean;
  complementLoad: boolean;
}

interface ILoadAddress {
  id: string;
  name: string;
  zipcode?: string;
  address: string;
  number: number;
  district: string;
  reference?: string;
  state: string;
  city: string;
  latitude: number;
  longitude: number;
  userId?: string;
}

interface ILoadContractor {
  id: string;
  cnpj?: string;
  cpf?: string;
  name: string;
  phoneNumber: string;
  stateRegistration: string;
  whatsappNumber: string;
  avatarUrl: string;
  createdAt: string;
  mainAddress: {
    city: string;
    state: string;
  };
}

export interface IGetLoadResponse {
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
  loadImages: string[];
  type: string;
}

export interface IGetCloseLoadResponse {
  id: string;
  title: string;
  status: string;
  type: string;
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
  loadImages: string[];
  contractorId: string;
  contractor: ILoadContractor;
}

export interface ILoadData {
  id: string;
  title: string;
  type: string;
  status: string;
  price: number;
  length: number;
  width: number;
  height: number;
  dimensionsUnit: UnitType;
  weight: number;
  weightUnit: UnitType;
  description: string;
  pickupAddress: ILoadAddress;
  pickupDate: string;
  deliveryAddress: ILoadAddress;
  deliveryDate: string;
  createdAt: string;
  seenTimes: number;
  loadImages: string[];
}

export interface ILoadDataCard {
  id: string;
  title: string;
  status: string;
  type: string;
  price: number;
  length: number;
  width: number;
  height: number;
  dimensionsUnit: UnitType;
  weight: number;
  weightUnit: UnitType;
  description: string;
  pickupAddress: ILoadAddress;
  pickupDate: string;
  deliveryAddress: ILoadAddress;
  deliveryDate: string;
  createdAt: string;
  seenTimes: number;
  loadImages: string[];
  contractor: ILoadContractor;
}
