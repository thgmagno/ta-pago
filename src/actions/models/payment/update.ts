'use server'

import { actions } from '@/actions'
import { repositories } from '@/database/repositories'
import { PaymentSchema } from '@/lib/schemas/transactions'
import { PaymentFormState } from '@/lib/states/transactions'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function update(
  formState: PaymentFormState,
  formData: FormData,
): Promise<PaymentFormState> {
  const parsed = PaymentSchema.safeParse(Object.fromEntries(formData.entries()))

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors }
  }

  if (!parsed.data.id) {
    return { errors: { _form: 'Parâmetros inválidos' } }
  }

  try {
    const user = await actions.session.getServerSession()

    const transaction =
      await repositories.transactions.transaction.findTransactionByPaymentId(
        parsed.data.id,
        user.id,
        user.groupId,
      )

    if (!transaction.data?.id) {
      return { errors: { _form: 'Transação não encontrada' } }
    }

    await repositories.transactions.payment.update({
      transaction: {
        id: transaction.data.id,
        groupId: parsed.data.isShared ? user.groupId : null,
        categoryId: parsed.data.categoryId,
        description: parsed.data.description,
      },
      payment: {
        id: parsed.data.id,
        paidAt: parsed.data.paidAt,
        scheduledDate: parsed.data.scheduledDate,
        amount: parsed.data.amount,
        status: parsed.data.status,
        paymentMethod: parsed.data.paymentMethod,
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
  redirect('/financas/pagamentos')
}
