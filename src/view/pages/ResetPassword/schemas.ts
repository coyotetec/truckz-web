import { z } from 'zod';

export const resetPasswordSchema = z
  .object({
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
    confirmPassword: z.string().trim(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'As senhas não conferem',
        path: ['confirmPassword'],
      });
    }
  });
