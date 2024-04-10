import { z } from 'zod';

export const loginSchema = z.object({
  username: z.string().trim().min(1, {
    message: 'CPF, CNPJ ou nome de usuário é obrigatório',
  }),
  password: z
    .string()
    .trim()
    .superRefine((data, ctx) => {
      if (data.length < 8) {
        return ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'A senha deve ter pelo menos 8 caracteres',
        });
      }

      if (!(/[a-zA-Z]/.test(data) && /\d/.test(data))) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'A senha deve conter letras e números',
        });
      }
    }),
});
