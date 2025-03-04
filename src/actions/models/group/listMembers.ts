'use server'

import { repositories } from '@/database/repositories'

export async function findGroupWithMembers(groupId: string) {
  return repositories.groups.group.findGroupWithMembers(groupId)
}
