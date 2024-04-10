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
  const { data } = await api.get<IGetDriversNearResponse[]>(`/checkins`, {
    params: {
      latitude,
      longitude,
      radius: 250,
    },
  });

  return data;
}
