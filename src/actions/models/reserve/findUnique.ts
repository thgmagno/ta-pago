'use server'

import { actions } from '@/actions'
import { repositories } from '@/database/repositories'
import { ReservationComplete } from '@/lib/types'
import { redirect } from 'next/navigation'

export async function findUnique(
  reserveId: string,
): Promise<ReservationComplete> {
  const user = await actions.session.getServerSession()

  const reserve = await repositories.transactions.reserve.findUnique(
    reserveId,
    user.id,
    user.groupId,
  )

  if (!reserve.data) return redirect('/financas/reservas')

  return reserve.data
}
