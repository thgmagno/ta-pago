'use server'

import { repositories } from '@/database/repositories'
import { getServerSession } from '../session'

export async function findAll() {
  const user = await getServerSession()

  return repositories.transactions.receipt.findAll({
    order: 'asc',
    receivedAtFrom: undefined,
    receivedAtTo: undefined,
    scheduledDateFrom: undefined,
    scheduledDateTo: undefined,
    userId: user.id,
    groupId: user.groupId,
    status: undefined,
  })
}
