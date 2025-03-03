'use server'

import { actions } from '@/actions'
import { ReceiptSchema } from '@/lib/schemas/transactions'
import { ReserveFormState } from '@/lib/states/transactions'

export async function create(
  formState: ReserveFormState,
  formData: FormData,
): Promise<ReserveFormState> {
  const parsed = ReceiptSchema.safeParse(Object.fromEntries(formData.entries()))

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors }
  }

  try {
    const user = await actions.session.getServerSession()

    const newRecord = {}
  } catch (error) {
    if (error instanceof Error) {
      return {
        errors: { _form: error.message },
      }
    }
  }

  return { errors: {} }
}
