'use server'

import { repositories } from '@/database/repositories'
import { getServerSession } from '../session'
import { actions } from '@/actions'

export async function findAll({
  month,
  year,
}: {
  month?: string | null
  year?: string | null
}) {
  const user = await getServerSession()
  const { scheduledDateFrom, scheduledDateTo } =
    await actions.transactions.transaction.getScheduledDates(month, year)

  return repositories.transactions.payment.findAll({
    order: 'asc',
    paidAtFrom: undefined,
    paidAtTo: undefined,
    scheduledDateFrom,
    scheduledDateTo,
    userId: user.id,
    groupId: user.groupId,
    status: undefined,
  })
}
