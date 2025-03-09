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
      startDateFrom: string
      startDateTo: string
    }
  } = await request.json()

  const startDateFrom = new Date(params.startDateFrom)
  const startDateTo = new Date(params.startDateTo)

  const reserves = await repositories.transactions.reserve.findAll({
    order: 'asc',
    startDateFrom,
    startDateTo,
    endDateFrom: undefined,
    endDateTo: undefined,
    userId: user.id,
    groupId: user.groupId,
    status: undefined,
  })

  return Response.json(reserves.data)
}
