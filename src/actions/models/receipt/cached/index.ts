'use server'

import { ReceiptComplete } from '@/lib/types'
import { getServerSession } from '@/actions/models/session'
import { actions } from '@/actions'
import { tags } from '@/lib/tags'

export async function findAll({
  month,
  year,
}: {
  month?: string | null
  year?: string | null
}): Promise<ReceiptComplete[]> {
  const user = await getServerSession()
  const { dateFrom: scheduledDateFrom, dateTo: scheduledDateTo } =
    await actions.transactions.transaction.getDatesRange(month, year)

  return actions.cache.fetcher('/find-all/receipts', {
    method: 'POST',
    body: JSON.stringify({
      user,
      params: { scheduledDateFrom, scheduledDateTo },
    }),
    next: { tags: [tags.findAllReceipts] },
  })
}

export async function findAllMonthsAndYears(): Promise<{
  months: string[]
  years: string[]
}> {
  const user = await getServerSession()

  return actions.cache.fetcher('/find-all/months-and-years', {
    method: 'POST',
    body: JSON.stringify({ user, type: 'RECEIPT' }),
    next: { tags: [tags.findAllMonthsAndYearsReceipts] },
  })
}
