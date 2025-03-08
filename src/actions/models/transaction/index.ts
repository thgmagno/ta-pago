'use server'

import { repositories } from '@/database/repositories'
import { getServerSession } from '../session'
import { revalidatePath } from 'next/cache'
import { TransactionType } from '@prisma/client'
import { extractMonthsAndYears } from '@/lib/utils'

export async function setExcluded(transactionId: string) {
  const user = await getServerSession()
  await repositories.transactions.transaction.setExcluded(
    transactionId,
    user.id,
    user.groupId,
  )
  revalidatePath('/')
}

export async function restoreTransactionExcluded(transactionId: string) {
  const user = await getServerSession()
  await repositories.transactions.transaction.restoreTransactionExcluded(
    transactionId,
    user.id,
    user.groupId,
  )
  revalidatePath('/')
}

export async function deletePermanent(transactionId: string) {
  const user = await getServerSession()
  await repositories.transactions.transaction.deletePermanent(
    transactionId,
    user.id,
  )
  revalidatePath('/')
}

export async function getMonthsAndYears(type: TransactionType) {
  const user = await getServerSession()
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

  return { months, years }
}

export async function getScheduledDates(month: string, year: string) {
  const scheduledDateFrom = new Date()
  scheduledDateFrom.setUTCDate(1)
  scheduledDateFrom.setUTCHours(0, 0, 0, 0)

  if (typeof month === 'string' && !isNaN(parseInt(month))) {
    scheduledDateFrom.setUTCMonth(parseInt(month) - 1)
  }

  if (typeof year === 'string' && !isNaN(parseInt(year))) {
    scheduledDateFrom.setUTCFullYear(parseInt(year))
  }

  const scheduledDateTo = new Date(scheduledDateFrom)
  scheduledDateTo.setUTCMonth(scheduledDateFrom.getUTCMonth() + 1)
  scheduledDateTo.setUTCDate(0)
  scheduledDateTo.setUTCHours(23, 59, 59, 999)

  return {
    scheduledDateFrom,
    scheduledDateTo,
  }
}

export async function getStartDates(month: string, year: string) {
  const startDateFrom = new Date()
  startDateFrom.setUTCDate(1)
  startDateFrom.setUTCHours(0, 0, 0, 0)

  if (typeof month === 'string' && !isNaN(parseInt(month))) {
    startDateFrom.setUTCMonth(parseInt(month) - 1)
  }

  if (typeof year === 'string' && !isNaN(parseInt(year))) {
    startDateFrom.setUTCFullYear(parseInt(year))
  }

  const startDateTo = new Date(startDateFrom)
  startDateTo.setUTCMonth(startDateFrom.getUTCMonth() + 1)
  startDateTo.setUTCDate(0)
  startDateTo.setUTCHours(23, 59, 59, 999)

  return {
    startDateFrom,
    startDateTo,
  }
}
