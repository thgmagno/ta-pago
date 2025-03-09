'use server'

import { repositories } from '@/database/repositories'
import { UserAuthenticated } from '@/lib/types'
import { extractMonthsAndYears } from '@/lib/utils'

export async function POST(request: Request) {
  const {
    user,
    type,
  }: {
    user: UserAuthenticated
    type: string
  } = await request.json()

  let months: string[] = []
  let years: string[] = []

  if (type === 'PAYMENT') {
    const payments = await repositories.transactions.payment.findAll({
      order: 'asc',
      paidAtFrom: undefined,
      paidAtTo: undefined,
      scheduledDateFrom: undefined,
      scheduledDateTo: undefined,
      userId: user.id,
      groupId: user.groupId,
      status: undefined,
    })

    const result = extractMonthsAndYears(payments.data ?? [])

    months = result.months
    years = result.years
  }

  if (type === 'RECEIPT') {
    const receipts = await repositories.transactions.receipt.findAll({
      order: 'asc',
      receivedAtFrom: undefined,
      receivedAtTo: undefined,
      scheduledDateFrom: undefined,
      scheduledDateTo: undefined,
      userId: user.id,
      groupId: user.groupId,
      status: undefined,
    })

    const result = extractMonthsAndYears(receipts.data ?? [])

    months = result.months
    years = result.years
  }

  if (type === 'RESERVATION') {
    const reserves = await repositories.transactions.reserve.findAll({
      order: 'asc',
      startDateFrom: undefined,
      startDateTo: undefined,
      endDateFrom: undefined,
      endDateTo: undefined,
      userId: user.id,
      groupId: user.groupId,
      status: undefined,
    })

    const result = extractMonthsAndYears(reserves.data ?? [])

    months = result.months
    years = result.years
  }

  return Response.json({ months, years })
}
