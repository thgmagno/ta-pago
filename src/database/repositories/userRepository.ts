import { prisma } from '@/database/prisma'
import { cookies } from 'next/headers'
import { signOut as endSession } from '@/auth'
import { handleDatabaseOperation } from '@/database/helper'

export async function deactivateAccount(userId: string) {
  return handleDatabaseOperation(async () => {
    await prisma.$transaction([
      prisma.category.deleteMany({ where: { userId } }),
      prisma.group.deleteMany({ where: { creatorUserId: userId } }),
      prisma.transaction.deleteMany({ where: { userId } }),
      prisma.session.deleteMany({ where: { userId } }),
      prisma.groupInvitation.deleteMany({ where: { userId } }),
      prisma.groupJoinRequest.deleteMany({ where: { userId } }),
      prisma.groupMember.deleteMany({ where: { userId } }),
      prisma.notification.deleteMany({ where: { userId } }),
      prisma.user.update({ where: { id: userId }, data: { active: false } }),
    ])
  }, 'Conta desativada com sucesso')
}

export async function signOut() {
  return handleDatabaseOperation(async () => {
    const cookieStore = await cookies()
    cookieStore.delete('authjs.session-token')
    return endSession({ redirect: true, redirectTo: '/entrar' })
  }, 'Desconectado com sucesso')
}
