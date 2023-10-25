import { z } from 'zod';

export const contractorSchema = z.object({
  name: z.string().trim().min(1, {
    message: 'Nome da empresa é obrigatório',
  }),
  cnpjCpf: z
    .string()
    .trim()
    .refine((data) => data.length === 14 || data.length === 18, {
      message: 'Insira um CNPJ ou CPF válido',
    }),
  stateRegistration: z.string().trim().min(1, {
    message: 'Inscriçao estadual é obrigatório',
  }),
  email: z.string().trim().email({
    message: 'Insina um email válido',
  }),
  username: z.string().trim().min(1, {
    message: 'Nome de usuário é obrigatório',
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
  phoneNumber: z.string().trim().length(15, {
    message: 'Insira um telefone válido',
  }),
  whatsappNumber: z.string().trim().length(15, {
    message: 'Insira um whatsapp válido',
  }),
});

export const addressSchema = z.object({
  zipcode: z
    .string()
    .trim()
    .refine((data) => data.length === 0 || data.length === 9, {
      message: 'Insira um CEP válido',
    }),
  address: z.string().trim().min(1, {
    message: 'Endereço é obrigatório',
  }),
  number: z.string().trim(),
  district: z.string().trim().min(1, {
    message: 'Bairro é obrigatório',
  }),
  reference: z.string().trim(),
  state: z
    .string({
      invalid_type_error: 'Estado e Cidade são obrigatórios',
    })
    .refine((value) => value !== '_', {
      message: 'Estado e Cidade são obrigatórios',
    }),
  city: z
    .string({
      invalid_type_error: 'Cidade é obrigatório',
    })
    .refine((value) => value !== '_', {
      message: 'Cidade é obrigatório',
    }),
});
