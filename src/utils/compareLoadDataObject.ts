import { IAddressResponse, ISelectedAddress } from '../types/address';
import { LoadType, UnitType } from '../types/load';
import { ILoadResponseUpdate } from '../view/pages/UpdateLoad';
import { IAddressToUpdate, compareAddressObject } from './compareAddressObject';
import { convertStringDateInUTC } from './convertStringDateInUTC';
interface ILoadData {
  loadImages?: File[];
  title: string;
  height: number;
  width: number;
  length: number;
  dimensionsUnit: UnitType | string;
  weight: number;
  weightUnit: UnitType | string;
  description: string;
  price: number;
  type: LoadType;
  pickupAddress: ISelectedAddress;
  deliveryAddress: ISelectedAddress;
  pickupDate: string;
  deliveryDate: string;
}

export function compareLoadDataObject(
  loadData: ILoadData,
  loadResponse: ILoadResponseUpdate,
) {
  const keysToCompare: (keyof ILoadData)[] = [
    'title',
    'weight',
    'weightUnit',
    'height',
    'width',
    'length',
    'dimensionsUnit',
    'price',
    'description',
    'pickupAddress',
    'deliveryAddress',
    'pickupDate',
    'deliveryDate',
    'type',
  ];

  loadData.pickupDate = convertStringDateInUTC(loadData.pickupDate);
  loadData.deliveryDate = convertStringDateInUTC(loadData.deliveryDate);

  const fileNamesLoadData = loadData.loadImages?.map((file) => file.name);

  const filteredLoadImages = loadResponse.loadImages?.filter(
    (file) => fileNamesLoadData?.includes(file.name),
  );

  if (filteredLoadImages.length !== loadResponse.loadImages?.length) {
    return true;
  }

  for (const key of keysToCompare) {
    if (
      typeof loadData[key] === 'object' &&
      typeof loadResponse[key] === 'object'
    ) {
      const compareAddress = compareAddressObject(
        loadData[key] as IAddressToUpdate,
        loadResponse[key] as IAddressResponse,
      );
      if (compareAddress) return true;
    }

    if (
      loadData[key] !== loadResponse[key] &&
      typeof loadData[key] !== 'object'
    ) {
      console.log({
        loadData: loadData[key],
        loadResponse: loadResponse[key],
      });
      return true;
    }
  }

  return false;
}
