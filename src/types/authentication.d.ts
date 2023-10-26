export interface IAuthUser {
  id: string;
  avatarUrl?: string;
  contractor?: {
    name: string;
  };
  driver?: {
    name: string;
    lastCheckin?: {
      id: string;
      active: boolean;
      latitude: number;
      longitude: number;
      city: string;
      state: string;
      checkinAt: string;
      driverId: string;
    };
  };
}

export interface IMakeLoginResponse {
  token: string;
  type: 'contractor' | 'driver' | 'undefined';
  user: IAuthUser;
}
