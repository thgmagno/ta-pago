'use server'

import { actions } from '@/actions'
import { repositories } from '@/database/repositories'
import { ReserveSchema } from '@/lib/schemas/transactions'
import { ReserveFormState } from '@/lib/states/transactions'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function update(
  formState: ReserveFormState,
  formData: FormData,
): Promise<ReserveFormState> {
  const parsed = ReserveSchema.safeParse(Object.fromEntries(formData.entries()))

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors }
  }

  if (!parsed.data.id) {
    return { errors: { _form: 'Parâmetros inválidos' } }
  }

  try {
    const user = await actions.session.getServerSession()

    const transaction =
      await repositories.transactions.transaction.findTransactionByReserveId(
        parsed.data.id,
        user.id,
        user.groupId,
      )

    if (!transaction.data?.id) {
      return { errors: { _form: 'Transação não encontrada' } }
    }

    await repositories.transactions.reserve.update({
      transaction: {
        id: transaction.data.id,
        groupId: user.groupId,
        categoryId: parsed.data.categoryId,
        description: parsed.data.description,
      },
      reserve: {
        id: parsed.data?.id,
        amount: parsed.data.amount,
        yield: parsed.data.yield,
        startDate: parsed.data.startDate,
        endDate: parsed.data.indeterminate ? undefined : parsed.data.endDate,
        status: parsed.data.status,
      },
    })
  } catch (error) {
    if (error instanceof Error) {
      return {
        errors: { _form: error.message },
      }
    }
  }

  revalidatePath('/')
  redirect('/financas/reservas')
}
