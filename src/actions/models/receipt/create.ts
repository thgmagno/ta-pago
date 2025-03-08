'use server'

import { actions } from '@/actions'
import { repositories } from '@/database/repositories'
import { ReceiptSchema } from '@/lib/schemas/transactions'
import { ReceiptFormState } from '@/lib/states/transactions'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function create(
  formState: ReceiptFormState,
  formData: FormData,
): Promise<ReceiptFormState> {
  const parsed = ReceiptSchema.safeParse(Object.fromEntries(formData.entries()))

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors }
  }

  try {
    const user = await actions.session.getServerSession()

    await repositories.transactions.receipt.create({
      transaction: {
        userId: user.id,
        groupId: parsed.data.isShared ? user.groupId : null,
        categoryId: parsed.data.categoryId,
        description: parsed.data.description,
      },
      receipt: {
        receivedAt: parsed.data.receivedAt,
        scheduledDate: parsed.data.scheduledDate,
        amount: parsed.data.amount,
        status: parsed.data.status,
        receiptMethod: parsed.data.receiptMethod,
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
  redirect('/financas/recebimentos')
}
