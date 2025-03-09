'use server'

import { repositories } from '@/database/repositories'
import { getServerSession } from '../session'
import { revalidatePath } from 'next/cache'

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

export async function getDatesRange(
  month?: string | null,
  year?: string | null,
) {
  const currentDate = new Date()

  const selectedYear = Number(year ?? currentDate.getFullYear())
  const selectedMonth = Number(month ?? currentDate.getMonth() + 1)

  const dateFrom = new Date(
    Date.UTC(selectedYear, selectedMonth - 1, 1, 0, 0, 0, 0),
  )
  const dateTo = new Date(
    Date.UTC(selectedYear, selectedMonth, 0, 23, 59, 59, 999),
  )

  return {
    dateFrom,
    dateTo,
  }
}
