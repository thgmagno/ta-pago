'use server'

import { actions } from '@/actions'
import { repositories } from '@/database/repositories'
import { ReceiptSchema } from '@/lib/schemas/transactions'
import { ReceiptFormState } from '@/lib/states/transactions'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function update(
  formState: ReceiptFormState,
  formData: FormData,
): Promise<ReceiptFormState> {
  const parsed = ReceiptSchema.safeParse(Object.fromEntries(formData.entries()))

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors }
  }

  if (!parsed.data.id) {
    return { errors: { _form: 'Parâmetros inválidos, tente novamente' } }
  }

  try {
    const user = await actions.session.getServerSession()

    const receipt = await repositories.transactions.receipt.findByTransaction(
      parsed.data.id,
      user.id,
      user.groupId,
    )

    if (!receipt.data?.id) {
      return { errors: { _form: 'Pagamento não encontrado' } }
    }

    await repositories.transactions.receipt.update({
      transaction: {
        id: parsed.data.id,
        groupId: user.groupId,
        categoryId: parsed.data.categoryId,
        description: parsed.data.description,
      },
      receipt: {
        id: receipt.data?.id,
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
