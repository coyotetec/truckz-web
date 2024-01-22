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

export async function requestPasswordReset(username: string) {
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
    };

    await api.post('/authenticate/request-password-reset', payload);
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.response?.status === 400) {
        const error = err.response.data.error as string;

        if (error === 'user does not exists') {
          throw new APIError('Usuário incorreto');
        }
      }

      if (err.response?.status === 500) {
        throw new APIError('Problemas no servidor, tente novamente mais tarde');
      }
    }
  }
}

interface ResetPasswordArgs {
  userId: string;
  token: string;
  password: string;
}

export async function resetPassword(payload: ResetPasswordArgs) {
  try {
    await api.post('/authenticate/reset-password', payload);
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.response?.status === 400) {
        const error = err.response.data.error as string;

        if (error === 'invalid or expired password reset token') {
          throw new APIError(
            'Seu token expirou ou pode estar inválido, solicite novamente em Esqueci a senha',
          );
        }
      }

      if (err.response?.status === 500) {
        throw new APIError('Problemas no servidor, tente novamente mais tarde');
      }
    }
  }
}
