import { api } from './utils/api';
import { IMakeLoginResponse } from '../types/authentication';

interface MakeLoginArgs {
  username: string;
  password: string;
}

export async function makeLogin({ username, password }: MakeLoginArgs) {
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
}

export async function requestPasswordReset(username: string) {
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
}

interface ResetPasswordArgs {
  userId: string;
  token: string;
  password: string;
}

export async function resetPassword(payload: ResetPasswordArgs) {
  await api.post('/authenticate/reset-password', payload);
}

export async function deleteAccount({ username, password }: MakeLoginArgs) {
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

  await api.delete('/authenticate/delete-account', {
    data: payload,
  });
}
