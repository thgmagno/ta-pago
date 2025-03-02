import { GroupJoinRequest, GroupJoinRequestStatus } from '@prisma/client'
import { prisma } from '@/database/prisma'
import { handleDatabaseOperation } from '@/database/helper'

export async function requestEntry(request: GroupJoinRequest) {
  return handleDatabaseOperation(async () => {
    return await prisma.groupJoinRequest.create({ data: request })
  }, 'Sua solicitação de entrada no grupo foi criada com sucesso')
}

export async function approveRequest(requestId: string) {
  return handleDatabaseOperation(async () => {
    return await prisma.groupJoinRequest.update({
      where: { id: requestId },
      data: { status: 'APPROVED' },
    })
  }, 'Solicitação aprovada')
}

export async function rejectRequest(requestId: string) {
  return handleDatabaseOperation(async () => {
    return await prisma.groupJoinRequest.update({
      where: { id: requestId },
      data: { status: 'REJECTED' },
    })
  }, 'Solicitação rejeitada')
}

export async function findAll(
  status?: GroupJoinRequestStatus,
  userId?: string,
  groupId?: string,
) {
  return handleDatabaseOperation(async () => {
    return await prisma.groupJoinRequest.findMany({
      where: {
        groupId,
        status,
        userId,
      },
      orderBy: {
        requestDate: 'desc',
      },
    })
  }, 'Busca realizada com sucesso')
}
