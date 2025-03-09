'use server'

import { repositories } from '@/database/repositories'
import { UserAuthenticated } from '@/lib/types'

export async function POST(request: Request) {
  const {
    user,
    params,
  }: {
    user: UserAuthenticated
    params: {
      scheduledDateFrom: string
      scheduledDateTo: string
    }
  } = await request.json()

  const scheduledDateFrom = new Date(params.scheduledDateFrom)
  const scheduledDateTo = new Date(params.scheduledDateTo)

  const payments = await repositories.transactions.payment.findAll({
    order: 'asc',
    paidAtFrom: undefined,
    paidAtTo: undefined,
    scheduledDateFrom,
    scheduledDateTo,
    userId: user.id,
    groupId: user.groupId,
    status: undefined,
  })

  return Response.json(payments.data)
}
