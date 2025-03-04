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
    return { errors: { _form: 'Parâmetros inválidos, tente novamente' } }
  }

  try {
    const user = await actions.session.getServerSession()

    const reserve = await repositories.transactions.reserve.findByTransaction(
      parsed.data.id,
      user.id,
      user.groupId,
    )

    if (!reserve.data?.id) {
      return { errors: { _form: 'Pagamento não encontrado' } }
    }

    await repositories.transactions.reserve.update({
      transaction: {
        id: parsed.data.id,
        groupId: user.groupId,
        categoryId: parsed.data.categoryId,
        description: parsed.data.description,
      },
      reserve: {
        id: reserve.data?.id,
        amount: parsed.data.amount,
        yield: parsed.data.yield,
        startDate: parsed.data.startDate,
        endDate: parsed.data.endDate,
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
