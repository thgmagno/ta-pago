'use server'

import { repositories } from '@/database/repositories'
import { getServerSession } from '@/actions/models/session'

export async function deactivateAccount() {
  const userId = await getServerSession('id')
  return repositories.users.user.deactivateAccount(userId)
}
