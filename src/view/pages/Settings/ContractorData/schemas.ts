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
  phoneNumber: z.string().trim().length(15, {
    message: 'Insira um telefone válido',
  }),
  whatsappNumber: z.string().trim().length(15, {
    message: 'Insira um whatsapp válido',
  }),
});
