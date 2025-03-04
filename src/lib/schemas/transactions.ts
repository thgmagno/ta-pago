import {
  PaymentMethodType,
  PaymentStatus,
  ReceiptMethodType,
  ReceiptStatus,
  ReserveStatus,
} from '@prisma/client'
import { z } from 'zod'

// Validação para Payment
export const PaymentSchema = z.object({
  id: z.string().optional(),
  description: z.string().optional(),
  amount: z
    .string()
    .min(1, { message: 'O valor é obrigatório' })
    .transform((val) =>
      Number(
        val
          .replace(/\./g, '')
          .replace(/[^\d,.-]/g, '')
          .replace(',', '.'),
      ),
    )
    .refine((val) => !isNaN(val), { message: 'O valor deve ser um número' })
    .refine((val) => val > 0, { message: 'O valor deve ser maior que zero' }),
  categoryId: z.string().optional(),
  paidAt: z
    .string()
    .transform((val) => (val ? new Date(val) : undefined))
    .pipe(z.date().optional()),
  scheduledDate: z
    .string()
    .transform((val) => new Date(val))
    .pipe(z.date()),
  paymentMethod: z
    .enum(
      [...Object.values(PaymentMethodType)] as [
        PaymentMethodType,
        ...PaymentMethodType[],
      ],
      { message: 'Método de pagamento inválido' },
    )
    .optional(),
  status: z.enum(
    [...Object.values(PaymentStatus)] as [PaymentStatus, ...PaymentStatus[]],
    { message: 'Status de pagamento inválido' },
  ),
})

// Validação para Receipt
export const ReceiptSchema = z.object({
  id: z.string().optional(),
  description: z.string().optional(),
  amount: z
    .string()
    .min(1, { message: 'O valor é obrigatório' })
    .transform((val) =>
      Number(
        val
          .replace(/\./g, '')
          .replace(/[^\d,.-]/g, '')
          .replace(',', '.'),
      ),
    )
    .refine((val) => !isNaN(val), { message: 'O valor deve ser um número' })
    .refine((val) => val > 0, { message: 'O valor deve ser maior que zero' }),
  categoryId: z.string().optional(),
  receivedAt: z
    .date({ message: 'A data de recebimento é inválida' })
    .optional(),
  scheduledDate: z.date({ message: 'A data de vencimento é obrigatória' }),
  receiptMethod: z
    .enum(
      [...Object.values(ReceiptMethodType)] as [
        ReceiptMethodType,
        ...ReceiptMethodType[],
      ],
      { message: 'Método de recebimento inválido' },
    )
    .optional(),
  status: z.enum(
    [...Object.values(ReceiptStatus)] as [ReceiptStatus, ...ReceiptStatus[]],
    { message: 'Status de recebimento inválido' },
  ),
})

// Validação para Reserve
export const ReserveSchema = z
  .object({
    id: z.string().optional(),
    description: z.string().optional(),
    amount: z
      .string()
      .min(1, { message: 'O valor é obrigatório' })
      .transform((val) =>
        Number(val.replace(/[^\d,.-]/g, '').replace(',', '.')),
      )
      .refine((val) => !isNaN(val), { message: 'O valor deve ser um número' })
      .refine((val) => val > 0, { message: 'O valor deve ser maior que zero' }),
    categoryId: z.string().optional(),
    yield: z
      .string()
      .optional()
      .refine(
        (val) => val === undefined || val.trim() === '' || !isNaN(Number(val)),
        {
          message: 'O rendimento deve ser um número',
        },
      )
      .transform((val) =>
        val !== undefined && val.trim() !== '' ? Number(val) : undefined,
      ),
    startDate: z.date({ message: 'A data de início é obrigatória' }),
    endDate: z.date().optional(),
    status: z.enum(
      [...Object.values(ReserveStatus)] as [ReserveStatus, ...ReserveStatus[]],
      { message: 'Status de reserva inválido' },
    ),
  })
  .superRefine(({ startDate, endDate }, ctx) => {
    if (endDate && endDate < startDate) {
      ctx.addIssue({
        code: 'custom',
        path: ['endDate'],
        message: 'A data de término não pode ser anterior à data de início',
      })
    }
  })
