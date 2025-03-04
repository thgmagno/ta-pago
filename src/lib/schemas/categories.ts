import { CategoryType } from '@prisma/client'
import { z } from 'zod'

// Validação para Categoria
export const CategorySchema = z.object({
  id: z.string().optional(),
  name: z
    .string()
    .min(1, { message: 'A descrição é obrigatória' })
    .max(30, { message: 'A descrição excede o limite de 60 caracteres' }),
  type: z.enum(
    [...Object.values(CategoryType)] as [CategoryType, ...CategoryType[]],
    { message: 'O tipo da categoria é inválido' },
  ),
})
