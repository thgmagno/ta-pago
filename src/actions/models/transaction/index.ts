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
