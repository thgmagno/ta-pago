'use server'

import { actions } from '@/actions'
import { PaymentSchema } from '@/lib/schemas/transactions'
import { PaymentFormState } from '@/lib/states/transactions'

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

    const newRecord = {
      transaction: {
        userId: user.id,
        groupId: '',
        categoryId: parsed.data.categoryId,
        amount: parsed.data.amount,
        description: parsed.data.description,
      },
      payment: {
        paidAt: parsed.data.paidAt,
        scheduledDate: parsed.data.scheduledDate,
        amount: parsed.data.amount,
        status: parsed.data.status,
        paymentMethod: parsed.data.paymentMethod,
      },
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        errors: { _form: error.message },
      }
    }
  }

  return { errors: {} }
}
