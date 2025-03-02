import { RoleType } from '@prisma/client'
import { prisma } from '@/database/prisma'
import { handleDatabaseOperation } from '@/database/helper'

export async function removeMember(memberId: string, groupId?: string) {
  return handleDatabaseOperation(async () => {
    return await prisma.groupMember.deleteMany({
      where: { id: memberId, groupId },
    })
  }, 'Membro removido com sucesso')
}

export async function changeRole(
  memberId: string,
  role: RoleType,
  groupId: string,
) {
  return handleDatabaseOperation(async () => {
    return await prisma.groupMember.updateMany({
      where: { id: memberId, groupId },
      data: { role },
    })
  }, 'Cargo do membro alterado com sucesso')
}

export async function leaveGroup(userId: string, groupId?: string) {
  return handleDatabaseOperation(async () => {
    return await prisma.groupMember.deleteMany({
      where: { userId, groupId },
    })
  }, 'Você saiu do grupo')
}

export async function findAll(userId: string, groupId: string) {
  return handleDatabaseOperation(async () => {
    return await prisma.groupMember.findMany({
      where: { groupId, userId },
      orderBy: { user: { name: 'asc' } },
    })
  }, 'Busca realizada com sucesso')
}
