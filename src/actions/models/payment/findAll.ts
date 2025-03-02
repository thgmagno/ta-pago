'use server'

import { repositories } from '@/database/repositories'
import { getServerSession } from '../session'

export async function findAll() {
  const user = await getServerSession()

  const parameters = {
    orderBy: '', // 'description' | 'creationDate' | 'amount'
    order: '', // 'asc' | 'desc'
    creationDateFrom: '', // Date
    creationDateTo: '', // Date
    dueDateFrom: '', // Date
    dueDateTo: '', // Date
    userId: '', // string
    groupId: '', // string
  }

  return repositories.transactions.payment.findAll(parameters)
}
