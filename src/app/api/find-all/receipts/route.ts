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

  const receipts = await repositories.transactions.receipt.findAll({
    order: 'asc',
    receivedAtFrom: undefined,
    receivedAtTo: undefined,
    scheduledDateFrom,
    scheduledDateTo,
    userId: user.id,
    groupId: user.groupId,
    status: undefined,
  })

  return Response.json(receipts.data)
}
