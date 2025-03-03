'use server'

import { actions } from '@/actions'
import { repositories } from '@/database/repositories'

export async function deactivateAccount() {
  const userId = await actions.session.getServerSession('id')
  return repositories.users.user.deactivateAccount(userId)
}
