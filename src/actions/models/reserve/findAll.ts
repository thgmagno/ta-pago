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
  const { startDateFrom, startDateTo } =
    await actions.transactions.transaction.getStartDates(month, year)

  return repositories.transactions.reserve.findAll({
    order: 'asc',
    startDateFrom,
    startDateTo,
    endDateFrom: undefined,
    endDateTo: undefined,
    userId: user.id,
    groupId: user.groupId,
    status: undefined,
  })
}
