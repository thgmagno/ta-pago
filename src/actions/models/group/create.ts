'use server'

import { actions } from '@/actions'
import { repositories } from '@/database/repositories'
import { GroupSchema } from '@/lib/schemas/groups'
import { GroupFormState } from '@/lib/states/groups'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function create(
  formState: GroupFormState,
  formData: FormData,
): Promise<GroupFormState> {
  const parsed = GroupSchema.safeParse(Object.fromEntries(formData.entries()))

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors }
  }

  try {
    const user = await actions.session.getServerSession()

    const { data } = await repositories.groups.group.create({
      creatorUserId: user.id,
      name: parsed.data.name,
      description: parsed.data.description,
      visibility: parsed.data.visibility,
    })

    if (!data) {
      return {
        errors: { _form: 'Erro ao criar grupo' },
      }
    }

    const cookieStore = await cookies()
    cookieStore.set(
      `temporary-cookie-${user.id}`,
      JSON.stringify({ groupId: data.groupId }),
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
