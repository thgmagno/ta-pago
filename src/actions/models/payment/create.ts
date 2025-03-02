'use server'

import { PaymentSchema } from '@/lib/schemas/transactions'
import { PaymentFormState } from '@/lib/states/transactions'
import { getServerSession } from '@/actions/models/session'

export async function create(
  formState: PaymentFormState,
  formData: FormData,
): Promise<PaymentFormState> {
  const parsed = PaymentSchema.safeParse(Object.fromEntries(formData.entries()))

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors }
  }

  try {
    const user = await getServerSession()

    const newRecord = {
      transaction: {
        userId: user.id,
        groupId: '',
        categoryId: parsed.data.categoryId,
        amount: parsed.data.amountPaid,
        description: parsed.data.description,
      },
      payment: {
        dueDate: parsed.data.dueDate,
        amountPaid: parsed.data.amountPaid,
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
