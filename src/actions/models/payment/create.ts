'use server'

import { actions } from '@/actions'
import { repositories } from '@/database/repositories'
import { PaymentSchema } from '@/lib/schemas/transactions'
import { PaymentFormState } from '@/lib/states/transactions'
import { tags } from '@/lib/tags'
import { revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'

export async function create(
  formState: PaymentFormState,
  formData: FormData,
): Promise<PaymentFormState> {
  const parsed = PaymentSchema.safeParse(Object.fromEntries(formData.entries()))

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors }
  }

  try {
    const user = await actions.session.getServerSession()

    await repositories.transactions.payment.create({
      transaction: {
        userId: user.id,
        groupId: parsed.data.isShared ? user.groupId : null,
        categoryId: parsed.data.categoryId,
        description: parsed.data.description,
      },
      payment: {
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

  revalidateTag(tags.findAllPayments)
  redirect('/financas/pagamentos')
}
