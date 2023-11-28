import { z } from 'zod';

export const addressSchema = z.object({
  name: z.string().trim().min(1, {
    message: 'Nome do endereço é obrigatório',
  }),
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
