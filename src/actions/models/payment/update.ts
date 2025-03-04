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
    return { errors: { _form: 'Parâmetros inválidos, tente novamente' } }
  }

  try {
    const user = await actions.session.getServerSession()

    const payment = await repositories.transactions.payment.findByTransaction(
      parsed.data.id,
      user.id,
      user.groupId,
    )

    if (!payment.data?.id) {
      return { errors: { _form: 'Pagamento não encontrado' } }
    }

    await repositories.transactions.payment.update({
      transaction: {
        id: parsed.data.id,
        groupId: user.groupId,
        categoryId: parsed.data.categoryId,
        description: parsed.data.description,
      },
      payment: {
        id: payment.data?.id,
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
