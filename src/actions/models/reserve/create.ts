'use server'

import { actions } from '@/actions'
import { repositories } from '@/database/repositories'
import { ReserveSchema } from '@/lib/schemas/transactions'
import { ReserveFormState } from '@/lib/states/transactions'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function create(
  formState: ReserveFormState,
  formData: FormData,
): Promise<ReserveFormState> {
  const parsed = ReserveSchema.safeParse(Object.fromEntries(formData.entries()))

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors }
  }

  try {
    const user = await actions.session.getServerSession()

    await repositories.transactions.reserve.create({
      transaction: {
        userId: user.id,
        groupId: parsed.data.isShared ? user.groupId : null,
        categoryId: parsed.data.categoryId,
        description: parsed.data.description,
      },
      reserve: {
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
