export interface IGetDriversNearResponse {
  id: string;
  active: boolean;
  latitude: number;
  longitude: number;
  city: string;
  state: string;
  checkinAt: string;
  driverId: string;
  fullName: string;
  phoneNumber: string;
  whatsappNumber: string;
  avatarUrl?: string;
}
