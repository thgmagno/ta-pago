'use server'

import { ReservationComplete } from '@/lib/types'
import { getServerSession } from '@/actions/models/session'
import { actions } from '@/actions'
import { tags } from '@/lib/tags'

export async function findAll({
  month,
  year,
}: {
  month?: string | null
  year?: string | null
}): Promise<ReservationComplete[]> {
  const user = await getServerSession()
  const { dateFrom: startDateFrom, dateTo: startDateTo } =
    await actions.transactions.transaction.getDatesRange(month, year)

  return actions.cache.fetcher('/find-all/reserves', {
    method: 'POST',
    body: JSON.stringify({
      user,
      params: { startDateFrom, startDateTo },
    }),
    next: { tags: [tags.findAllReserves] },
  })
}

export async function findAllMonthsAndYears(): Promise<{
  months: string[]
  years: string[]
}> {
  const user = await getServerSession()

  return actions.cache.fetcher('/find-all/months-and-years', {
    method: 'POST',
    body: JSON.stringify({ user, type: 'RESERVATION' }),
    next: { tags: [tags.findAllMonthsAndYearsReserves] },
  })
}
