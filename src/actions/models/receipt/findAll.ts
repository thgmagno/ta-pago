'use server'

import { repositories } from '@/database/repositories'
import { getServerSession } from '../session'
import { actions } from '@/actions'

export async function findAll({
  month,
  year,
}: {
  month: string
  year: string
}) {
  const user = await getServerSession()
  const { scheduledDateFrom, scheduledDateTo } =
    await actions.transactions.transaction.getScheduledDates(month, year)

  return repositories.transactions.receipt.findAll({
    order: 'asc',
    receivedAtFrom: undefined,
    receivedAtTo: undefined,
    scheduledDateFrom,
    scheduledDateTo,
    userId: user.id,
    groupId: user.groupId,
    status: undefined,
  })
}
