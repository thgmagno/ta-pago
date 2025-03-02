'use server'

import { ReceiptSchema } from '@/lib/schemas/transactions'
import { ReceiptFormState } from '@/lib/states/transactions'
import { getServerSession } from '@/actions/models/session'

export async function create(
  formState: ReceiptFormState,
  formData: FormData,
): Promise<ReceiptFormState> {
  const parsed = ReceiptSchema.safeParse(Object.fromEntries(formData.entries()))

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors }
  }

  try {
    const user = await getServerSession()

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
