'use server'

import { PaymentComplete } from '@/lib/types'
import { getServerSession } from '@/actions/models/session'
import { actions } from '@/actions'
import { tags } from '@/lib/tags'

export async function findAll({
  month,
  year,
}: {
  month?: string | null
  year?: string | null
}): Promise<PaymentComplete[]> {
  const user = await getServerSession()
  const { dateFrom: scheduledDateFrom, dateTo: scheduledDateTo } =
    await actions.transactions.transaction.getDatesRange(month, year)

  return actions.cache.fetcher('/find-all/payments', {
    method: 'POST',
    body: JSON.stringify({
      user,
      params: { scheduledDateFrom, scheduledDateTo },
    }),
    next: { tags: [tags.findAllPayments] },
  })
}

export async function findAllMonthsAndYears(): Promise<{
  months: string[]
  years: string[]
}> {
  const user = await getServerSession()

  return actions.cache.fetcher('/find-all/months-and-years', {
    method: 'POST',
    body: JSON.stringify({ user, type: 'PAYMENT' }),
    next: { tags: [tags.findAllMonthsAndYearsPayments] },
  })
}
