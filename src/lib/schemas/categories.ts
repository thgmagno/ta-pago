import { CategoryType } from '@prisma/client'
import { z } from 'zod'

// Validação para Categoria
export const CategorySchema = z.object({
  id: z.string().cuid().optional(),
  name: z.string().min(1, { message: 'Campo obrigatório' }),
  type: z.enum(
    [...Object.values(CategoryType)] as [CategoryType, ...CategoryType[]],
    { message: 'O tipo da categoria é inválido' },
  ),
})
