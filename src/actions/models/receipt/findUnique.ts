'use server'

import { actions } from '@/actions'
import { repositories } from '@/database/repositories'
import { ReceiptComplete } from '@/lib/types'
import { redirect } from 'next/navigation'

export async function findUnique(receiptId: string): Promise<ReceiptComplete> {
  const user = await actions.session.getServerSession()

  const receipt = await repositories.transactions.receipt.findUnique(
    receiptId,
    user.id,
    user.groupId,
  )

  if (!receipt.data) return redirect('/financas/recebimentos')

  return receipt.data
}
