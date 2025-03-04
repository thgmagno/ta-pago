import { VisibilityType } from '@prisma/client'
import { z } from 'zod'

// Validação para Categoria
export const GroupSchema = z.object({
  id: z.string().optional(),
  name: z
    .string()
    .min(1, { message: 'O nome é obrigatório' })
    .max(30, { message: 'O nome excede o limite de 30 caracteres' }),
  description: z
    .string()
    .min(1, { message: 'A descrição é obrigatória' })
    .max(30, { message: 'A descrição excede o limite de 60 caracteres' }),
  visibility: z.enum(
    [...Object.values(VisibilityType)] as [VisibilityType, ...VisibilityType[]],
    { message: 'Valor inválido para o campo "Visibilidade"' },
  ),
})
