import axios from 'axios';
import {
  IGeocodingAddress,
  IGeocodingResponse,
  IReverseGeocodingResponse,
} from '../types/googleMapsApi';

export async function getGeocodingAddress({
  address,
  number,
  district,
  city,
  state,
}: IGeocodingAddress) {
  const { data } = await axios.get<IGeocodingResponse>(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${address}+${number},+${district},+${city},+${state}&key=AIzaSyAty0zkT6uH-yK2NELIO-RTnVxkPIhrxww`,
  );

  return data;
}

interface GetReverseGeocodingArgs {
  latitude: number;
  longitude: number;
}

export async function getReverseGeocoding({
  latitude,
  longitude,
}: GetReverseGeocodingArgs) {
  const { data } = await axios.get<IReverseGeocodingResponse>(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyAty0zkT6uH-yK2NELIO-RTnVxkPIhrxww`,
  );

  return data;
}
