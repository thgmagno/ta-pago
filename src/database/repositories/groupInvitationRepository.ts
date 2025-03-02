import { GroupInvitation, GroupInvitationStatus } from '@prisma/client'
import { prisma } from '@/database/prisma'
import { handleDatabaseOperation } from '@/database/helper'

export async function sendInvitation(invitation: GroupInvitation) {
  return handleDatabaseOperation(async () => {
    return await prisma.groupInvitation.create({ data: invitation })
  }, 'Convite enviado com sucesso')
}

export async function acceptInvitation(invitationId: string) {
  return handleDatabaseOperation(async () => {
    return await prisma.groupInvitation.update({
      where: { id: invitationId },
      data: { status: 'ACCEPTED' },
    })
  }, 'Convite aceito')
}

export async function declineInvitation(invitationId: string) {
  return handleDatabaseOperation(async () => {
    return await prisma.groupInvitation.update({
      where: { id: invitationId },
      data: { status: 'REJECTED' },
    })
  }, 'Convite recusado')
}

export async function findAll(
  groupId?: string,
  status?: GroupInvitationStatus,
) {
  return handleDatabaseOperation(async () => {
    return await prisma.groupInvitation.findMany({
      where: { groupId, status },
      orderBy: { sendDate: 'desc' },
    })
  }, 'Busca realizada com sucesso')
}
