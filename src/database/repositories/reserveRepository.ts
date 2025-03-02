import { prisma } from '@/database/prisma'
import { Reserve, Transaction } from '@prisma/client'
import { handleDatabaseOperation } from '@/database/helper'

interface CreateReservation {
  transaction: Omit<Transaction, 'id' | 'type'>
  reserve: Pick<Reserve, 'startDate' | 'status'> &
    Partial<Pick<Reserve, 'endDate' | 'yield'>>
}

interface FindAllParameters {
  orderBy?: string
  order?: 'asc' | 'desc'
  creationDateFrom?: Date
  creationDateTo?: Date
  startDateFrom?: Date
  startDateTo?: Date
  endDateFrom?: Date
  endDateTo?: Date
  userId?: string
  groupId?: string
}

export async function create(params: CreateReservation) {
  return handleDatabaseOperation(async () => {
    const [transaction] = await prisma.$transaction([
      prisma.transaction.create({
        data: {
          type: 'RESERVATION',
          amount: params.transaction.amount ?? 0,
          categoryId: params.transaction.categoryId,
          description: params.transaction.description ?? '-',
          groupId: params.transaction.groupId,
          userId: params.transaction.userId,
        },
      }),
      prisma.reserve.create({
        data: {
          startDate: params.reserve.startDate,
          status: params.reserve.status,
          yield: params.reserve.yield ?? 0,
          endDate: params.reserve.endDate,
          transactionId: undefined,
        },
      }),
    ])

    await prisma.reserve.update({
      where: { id: transaction.id },
      data: { transactionId: transaction.id },
    })
  }, 'Reserva criada com sucesso')
}

export async function edit(
  reserveId: string,
  data: Partial<Reserve>,
  userId?: string,
  groupId?: string,
) {
  return handleDatabaseOperation(async () => {
    return prisma.reserve.update({
      where: {
        id: reserveId,
        AND: [{ OR: [{ transaction: { userId, groupId } }] }],
      },
      data,
    })
  }, 'Reserva editada com sucesso')
}

export async function findUnique(
  reserveId: string,
  userId?: string,
  groupId?: string,
) {
  return handleDatabaseOperation(async () => {
    return prisma.reserve.findUnique({
      where: {
        id: reserveId,
        AND: [{ OR: [{ transaction: { userId, groupId } }] }],
      },
    })
  }, 'Reserva encontrada com sucesso')
}

export async function findAll(params: FindAllParameters) {
  return handleDatabaseOperation(async () => {
    return prisma.transaction.findMany({
      where: {
        OR: [{ userId: params.userId }, { groupId: params.groupId }],
        creationDate: {
          gte: params.creationDateFrom || undefined,
          lte: params.creationDateTo || undefined,
        },
      },
      include: {
        reserves: {
          where: {
            OR: [
              {
                startDate: {
                  gte: params.startDateFrom || undefined,
                  lte: params.startDateTo || undefined,
                },
                endDate: {
                  gte: params.endDateFrom || undefined,
                  lte: params.endDateTo || undefined,
                },
              },
            ],
          },
        },
      },
      orderBy: {
        [params.orderBy ?? 'description']: params.order ?? 'asc',
      },
    })
  }, 'Reservas listadas com sucesso')
}

export async function destroy(
  reserveId: string,
  userId?: string,
  groupId?: string,
) {
  return handleDatabaseOperation(async () => {
    const reserve = await findUnique(reserveId, userId, groupId)

    if (!reserve.data?.transactionId) {
      throw new Error('Reserva não encontrada')
    }

    return prisma.$transaction([
      prisma.reserve.delete({
        where: {
          id: reserveId,
          AND: [{ OR: [{ transaction: { userId, groupId } }] }],
        },
      }),
      prisma.transaction.delete({
        where: { id: reserve.data.transactionId },
      }),
    ])
  }, 'Reserva deletada com sucesso')
}
