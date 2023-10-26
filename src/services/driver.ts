import { localStorageKeys } from '../config/localStorageKeys';
import { IGetDriversNearResponse } from '../types/driver';
import { api } from './utils/api';

interface GetNearDriversArgs {
  latitude: number;
  longitude: number;
}

export async function getNearDrivers({
  latitude,
  longitude,
}: GetNearDriversArgs) {
  try {
    const token = localStorage.getItem(localStorageKeys.AUTH_TOKEN);
    const { data } = await api.get<IGetDriversNearResponse[]>(`/checkins`, {
      params: {
        latitude,
        longitude,
        radius: 250,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (err) {
    console.log(err);
  }
}
