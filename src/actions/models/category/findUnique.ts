'use server'

import { actions } from '@/actions'
import { repositories } from '@/database/repositories'
import { redirect } from 'next/navigation'

export async function findUnique(categoryId: string) {
  const user = await actions.session.getServerSession()

  const category = await repositories.categories.category.findUnique(
    categoryId,
    user.id,
    user.groupId,
  )

  if (!category.data) return redirect('/financas/categorias')

  return category.data
}
