import { z } from 'zod'

// Validação para Payment
export const PaymentSchema = z.object({
  dueDate: z.date({ message: 'A data de vencimento é obrigatória' }),
  amountPaid: z
    .string()
    .min(1, { message: 'O valor pago é obrigatório' })
    .refine((val) => !isNaN(Number(val)), {
      message: 'O valor pago deve ser um número',
    })
    .transform((val) => Number(val))
    .refine((val) => val > 0, { message: 'O valor pago deve ser positivo' }),
  status: z.string().min(1, { message: 'O status do pagamento é obrigatório' }),
  paymentMethod: z
    .string()
    .min(1, { message: 'O método de pagamento é obrigatório' }),
  categoryId: z.string().optional(),
  description: z.string().optional(),
})

// Validação para Receipt
export const ReceiptSchema = z.object({
  receiptDate: z.date({ message: 'A data do recibo é obrigatória' }),
  amountReceived: z
    .string()
    .min(1, { message: 'O valor recebido é obrigatório' })
    .refine((val) => !isNaN(Number(val)), {
      message: 'O valor recebido deve ser um número',
    })
    .transform((val) => Number(val))
    .refine((val) => val > 0, {
      message: 'O valor recebido deve ser positivo',
    }),
  status: z.string().min(1, { message: 'O status do recibo é obrigatório' }),
  receiptMethod: z
    .string()
    .min(1, { message: 'O método de recebimento é obrigatório' }),
})

// Validação para Reserve
export const ReserveSchema = z.object({
  startDate: z.date({ message: 'A data de início da reserva é obrigatória' }),
  endDate: z
    .date()
    .optional()
    .refine((val) => val === null || (val && val > new Date()), {
      message:
        'A data de término da reserva não pode ser anterior à data de início',
    }),
  yield: z
    .string()
    .min(1, { message: 'O rendimento é obrigatório' })
    .refine((val) => !isNaN(Number(val)), {
      message: 'O rendimento deve ser um número',
    })
    .transform((val) => Number(val))
    .refine((val) => val > 0, {
      message: 'O rendimento deve ser um valor positivo',
    }),
  status: z.string().min(1, { message: 'O status da reserva é obrigatório' }),
})
