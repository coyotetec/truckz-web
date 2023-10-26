import { AxiosError } from 'axios';
import { APIError } from '../errors/APIError';
import { api } from './utils/api';
import { IMakeLoginResponse } from '../types/authentication';

interface MakeLoginArgs {
  username: string;
  password: string;
}

export async function makeLogin({ username, password }: MakeLoginArgs) {
  try {
    const payload = {
      ...(username.replace(/\D+/g, '').length === 11 && {
        cpf: username.replace(/\D+/g, ''),
      }),
      ...(username.replace(/\D+/g, '').length === 14 && {
        cnpj: username.replace(/\D+/g, ''),
      }),
      ...(username.replace(/\D+/g, '').length !== 14 &&
        username.replace(/\D+/g, '').length !== 11 && {
          username,
        }),
      password,
    };

    const { data } = await api.post<IMakeLoginResponse>(
      '/authenticate/login',
      payload,
    );

    return data;
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.response?.status === 400) {
        const error = err.response.data.error as string;

        if (error === 'user does not exists') {
          throw new APIError('Usuário incorreto');
        }

        if (error === 'incorrect password') {
          throw new APIError('Senha incorreta');
        }
      }

      if (err.response?.status === 500) {
        throw new APIError('Problemas no servidor, tente novamente mais tarde');
      }
    }
  }
}
