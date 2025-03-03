'use server'

import { actions } from '@/actions'
import { repositories } from '@/database/repositories'

export async function findAll() {
  const user = await actions.session.getServerSession()

  const paymentCategories = await repositories.categories.category.findAll(
    'PAYMENT',
    user.id,
    user.groupId,
  )

  return { paymentCategories }
}
