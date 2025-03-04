'use server'

import { actions } from '@/actions'
import { repositories } from '@/database/repositories'

export async function findAll() {
  const user = await actions.session.getServerSession()

  const [paymentCategories, receiptCategories, reservationCategories] =
    await Promise.all([
      repositories.categories.category.findAll(
        'PAYMENT',
        user.id,
        user.groupId,
      ),
      repositories.categories.category.findAll(
        'RECEIPT',
        user.id,
        user.groupId,
      ),
      repositories.categories.category.findAll(
        'RESERVATION',
        user.id,
        user.groupId,
      ),
    ])

  return { paymentCategories, receiptCategories, reservationCategories }
}
