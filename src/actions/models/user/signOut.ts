'use server'

import { repositories } from '@/database/repositories'

export async function signOut() {
  return repositories.users.user.signOut()
}
