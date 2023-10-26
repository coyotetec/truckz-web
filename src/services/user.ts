import { AxiosError } from 'axios';
import { localStorageKeys } from '../config/localStorageKeys';
import { api } from './utils/api';
import { APIError } from '../errors/APIError';
import {
  CheckUsernameResponse,
  IFindUserByIdResponse,
  IUpdateUserResponse,
} from '../types/user';
import { IUserData } from '../view/pages/Settings/UserData';

export async function checkUsername(username: string) {
  try {
    const { data } = await api.get<CheckUsernameResponse>(
      `/user/${username}/available`,
    );

    return data;
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.response?.status === 500) {
        throw new APIError('Problemas no servidor, tente novamente mais tarde');
      }
    }
  }
}

export async function findUserById(id: string) {
  try {
    const token = localStorage.getItem(localStorageKeys.AUTH_TOKEN);
    const { data } = await api.get<IFindUserByIdResponse>(`/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.response?.status === 500) {
        throw new APIError('Problemas no servidor, tente novamente mais tarde');
      }
    }
  }
}

interface UpdateUserArgs {
  userData: IUserData;
  image: File | null;
}

export async function updateUser({ userData, image }: UpdateUserArgs) {
  try {
    const token = localStorage.getItem(localStorageKeys.AUTH_TOKEN);
    const formData = new FormData();

    if (image) {
      formData.append('avatar', image);
    }
    formData.append('email', userData.email);
    formData.append('username', userData.username);
    if (userData.password) {
      formData.append('password', userData.password);
    }

    const { data } = await api.put<IUpdateUserResponse>(`/user`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (err) {
    if (err instanceof AxiosError) {
      console.log(JSON.stringify(err.response?.data));
      if (err.response?.status === 500) {
        throw new APIError('Problemas no servidor, tente novamente mais tarde');
      }
    }
  }
}
