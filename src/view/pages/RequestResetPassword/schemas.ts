import { z } from 'zod';

export const requestResetSchema = z.object({
  username: z.string().trim().min(1, {
    message: 'CPF, CNPJ ou nome de usuário é obrigatório',
  }),
});
