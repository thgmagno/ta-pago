'use server'

import { repositories } from '@/database/repositories'
import { getServerSession } from '../session'

export async function findAll() {
  const user = await getServerSession()

  return repositories.transactions.payment.findAll({
    order: 'asc',
    paidAtFrom: undefined,
    paidAtTo: undefined,
    scheduledDateFrom: undefined,
    scheduledDateTo: undefined,
    userId: user.id,
    groupId: user.groupId,
    status: undefined,
  })
}
