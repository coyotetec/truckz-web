import { api } from './utils/api';
import {
  CheckUsernameResponse,
  IFindUserByIdResponse,
  IUpdateUserResponse,
} from '../types/user';
import { IUserData } from '../view/pages/Settings/UserData';

export async function checkUsername(username: string) {
  const { data } = await api.get<CheckUsernameResponse>(
    `/user/${username}/available`,
  );

  return data;
}

export async function findUserById(id: string) {
  const { data } = await api.get<IFindUserByIdResponse>(`/users/${id}`);

  return data;
}

interface UpdateUserArgs {
  userData: IUserData;
  image: File | null;
}

export async function updateUser({ userData, image }: UpdateUserArgs) {
  const formData = new FormData();

  if (image) {
    formData.append('avatar', image);
  }
  formData.append('email', userData.email);
  formData.append('username', userData.username);
  if (userData.password) {
    formData.append('password', userData.password);
  }

  const { data } = await api.put<IUpdateUserResponse>(`/user`, formData);

  return data;
}
