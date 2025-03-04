'use server'

import { actions } from '@/actions'
import { repositories } from '@/database/repositories'
import { PaymentComplete } from '@/lib/types'
import { redirect } from 'next/navigation'

export async function findUnique(paymentId: string): Promise<PaymentComplete> {
  const user = await actions.session.getServerSession()

  const payment = await repositories.transactions.payment.findUnique(
    paymentId,
    user.id,
    user.groupId,
  )

  if (!payment.data) return redirect('/financas/pagamentos')

  return payment.data
}
