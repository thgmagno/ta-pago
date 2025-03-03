'use server'

import { CategoryFormState } from '@/lib/states/categories'

export async function create(
  formState: CategoryFormState,
  formData: FormData,
): Promise<CategoryFormState> {
  return { errors: {} }
}
