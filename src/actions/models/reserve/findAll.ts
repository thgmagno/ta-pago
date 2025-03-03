'use server'

import { repositories } from '@/database/repositories'
import { getServerSession } from '../session'

export async function findAll() {
  const user = await getServerSession()

  return repositories.transactions.reserve.findAll({
    order: 'asc',
    startDateFrom: undefined,
    startDateTo: undefined,
    endDateFrom: undefined,
    endDateTo: undefined,
    userId: user.id,
    groupId: user.groupId,
    status: undefined,
  })
}
