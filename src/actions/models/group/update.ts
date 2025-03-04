'use server'

import { actions } from '@/actions'
import { repositories } from '@/database/repositories'
import { GroupSchema } from '@/lib/schemas/groups'
import { GroupFormState } from '@/lib/states/groups'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function update(
  formState: GroupFormState,
  formData: FormData,
): Promise<GroupFormState> {
  const parsed = GroupSchema.safeParse(Object.fromEntries(formData.entries()))

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors }
  }

  try {
    const user = await actions.session.getServerSession()

    if (!parsed.data.id) {
      return { errors: { _form: 'Parâmetros inválidos' } }
    }

    await repositories.groups.group.update(
      {
        name: parsed.data.name,
        description: parsed.data.description,
        visibility: parsed.data.visibility,
      },
      user.id,
      parsed.data.id,
    )
  } catch (error) {
    if (error instanceof Error) {
      return {
        errors: { _form: error.message },
      }
    }
  }

  revalidatePath('/')
  redirect('/grupo')
}
