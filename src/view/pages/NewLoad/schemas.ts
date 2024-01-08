import { isBefore, parse, startOfToday } from 'date-fns';
import { z } from 'zod';

export const loadSchema = z
  .object({
    title: z.string().trim().nonempty({
      message: 'Título da carga é obrigatório',
    }),
    price: z.string().trim().nonempty({
      message: 'Preço da entrega é obrigatório',
    }),
    length: z.string().trim().nonempty({
      message: 'Obrigatório',
    }),
    width: z.string().trim().nonempty({
      message: 'Obrigatório',
    }),
    height: z.string().trim().nonempty({
      message: 'Obrigatório',
    }),
    dimensionsUnit: z.string(),
    weight: z.string().trim().nonempty({
      message: 'Peso da carga obrigatório',
    }),
    weightUnit: z.string(),
    description: z.string().trim(),
    fullLoad: z.boolean(),
    complementLoad: z.boolean(),
  })
  .superRefine((data, ctx) => {
    if (!data.fullLoad && !data.complementLoad) {
      ctx.addIssue({
        code: 'custom',
        message: 'É necessário selecionar pelo menos uma das opções',
        path: ['fullLoad'],
      });
    }
  });

export const addressSchema = z
  .object({
    pickupAddress: z.object(
      {
        id: z.string().optional(),
        name: z.string(),
        zipcode: z.string().optional(),
        address: z.string(),
        number: z.number().optional().nullish(),
        district: z.string(),
        reference: z.string().optional(),
        city: z.string(),
        state: z.string(),
        latitude: z.number(),
        longitude: z.number(),
      },
      {
        invalid_type_error: 'Selecione um local de coleta',
        required_error: 'Digite ou selecione um endereço de coleta',
      },
    ),
    pickupDate: z
      .string()
      .refine((data) => data.length !== 10, {
        message: 'Insira uma data de coleta válida',
      })
      .transform((data) => parse(data, 'dd/MM/yyyy', new Date()))
      .refine((data) => !isNaN(data.valueOf()), {
        message: 'Insira uma data de coleta válida',
      })
      .refine((data) => !isBefore(data, startOfToday()), {
        message: 'A data precisa ser a partir de hoje',
      }),
    deliveryAddress: z.object(
      {
        id: z.string().optional(),
        name: z.string(),
        zipcode: z.string().optional(),
        address: z.string(),
        number: z.number().optional().nullish(),
        district: z.string(),
        reference: z.string().optional(),
        city: z.string(),
        state: z.string(),
        latitude: z.number(),
        longitude: z.number(),
      },
      {
        invalid_type_error: 'Selecione um local de entrega',
        required_error: 'Digite ou selecione um endereço de entrega',
      },
    ),
    deliveryDate: z
      .string()
      .refine((data) => data.length !== 10, {
        message: 'Insira uma data de coleta válida',
      })
      .transform((data) => parse(data, 'dd/MM/yyyy', new Date()))
      .refine((data) => !isNaN(data.valueOf()), {
        message: 'Insira uma data de entrega válida',
      })
      .refine((data) => !isBefore(data, startOfToday()), {
        message: 'A data precisa ser a partir de hoje',
      }),
  })
  .superRefine((data, ctx) => {
    if (isBefore(data.deliveryDate, data.pickupDate)) {
      ctx.addIssue({
        code: 'custom',
        message: 'Entrega não pode ser antes da coleta',
        path: ['deliveryDate'],
      });
    }
  });
