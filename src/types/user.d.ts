export interface CheckUsernameResponse {
  available: boolean;
}

export interface IFindUserByIdResponse {
  active: boolean;
  avatarUrl: string;
  contractorId: string;
  createdAt: string;
  email: string;
  id: string;
  password: string;
  username: string;
}

export interface IUpdateUserResponse {
  id: string;
  active: boolean;
  email: string;
  username: string;
  password: string;
  avatarUrl: string;
  createdAt: string;
  contractorId: string;
}
