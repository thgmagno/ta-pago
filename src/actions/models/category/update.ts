'use server'

import { actions } from '@/actions'
import { repositories } from '@/database/repositories'
import { CategorySchema } from '@/lib/schemas/categories'
import { CategoryFormState } from '@/lib/states/categories'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function update(
  formState: CategoryFormState,
  formData: FormData,
): Promise<CategoryFormState> {
  const parsed = CategorySchema.safeParse(
    Object.fromEntries(formData.entries()),
  )

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors }
  }

  if (!parsed.data.id) {
    return { errors: { _form: 'Parâmetros inválidos, tente novamente' } }
  }

  try {
    const user = await actions.session.getServerSession()

    await repositories.categories.category.update({
      category: {
        id: parsed.data.id,
        name: parsed.data.name,
        type: parsed.data.type,
        userId: user.id,
        groupId: user.groupId,
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
