'use server'

import { FindGroupBySearchTermFormState } from '@/lib/states/groups'

export async function findBySearchTerm(
  formState: FindGroupBySearchTermFormState,
  formData: FormData,
): Promise<FindGroupBySearchTermFormState> {
  return { errors: {} }
}
