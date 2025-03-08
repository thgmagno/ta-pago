import { prisma } from '@/database/prisma'
import { ReserveStatus } from '@prisma/client'
import { handleDatabaseOperation } from '@/database/helper'

type CreateReservation = {
  transaction: {
    userId: string
    groupId?: string | null
    categoryId?: string | null
    description?: string | null
  }
  reserve: {
    amount: number
    yield?: number
    startDate: Date
    endDate?: Date
    status: ReserveStatus
  }
}

type UpdateReserve = {
  transaction: Partial<CreateReservation['transaction']> & {
    id: string
  }
  reserve: Partial<CreateReservation['reserve']> & {
    id: string
  }
}

interface FindAllParameters {
  order: 'asc' | 'desc'
  startDateFrom?: Date
  startDateTo?: Date
  endDateFrom?: Date
  endDateTo?: Date
  userId?: string
  groupId?: string | null
  status?: ReserveStatus
}

export async function create(params: CreateReservation) {
  return handleDatabaseOperation(async () => {
    const [transaction, reserve] = await prisma.$transaction([
      prisma.transaction.create({
        data: {
          type: 'RESERVATION',
          categoryId: params.transaction.categoryId,
          description: params.transaction.description,
          groupId: params.transaction.groupId,
          userId: params.transaction.userId,
        },
      }),
      prisma.reserve.create({
        data: {
          amount: params.reserve.amount,
          yield: params.reserve.yield,
          startDate: params.reserve.startDate,
          ...(params.reserve.endDate && {
            endDate: params.reserve.endDate,
          }),
          status: params.reserve.status,
          transactionId: undefined,
        },
      }),
    ])

    await prisma.reserve.update({
      where: { id: reserve.id },
      data: { transactionId: transaction.id },
    })
  }, 'Reserva criada com sucesso')
}

export async function findAll(params: FindAllParameters) {
  return handleDatabaseOperation(async () => {
    return await prisma.reserve.findMany({
      where: {
        transaction: {
          type: 'RESERVATION',
          deletedAt: null,
          AND: [
            { OR: [{ groupId: params.groupId }, { userId: params.userId }] },
          ],
        },
        startDate: {
          gte: params.startDateFrom,
          lte: params.startDateTo,
        },
        endDate: {
          gte: params.endDateFrom || undefined,
          lte: params.endDateTo || undefined,
        },
        ...(params.status && { status: { equals: params.status } }),
      },
      include: {
        transaction: {
          include: { category: true },
        },
      },
      orderBy: {
        transaction: { description: 'asc' },
      },
    })
  }, 'Busca realizada com sucesso')
}

export async function findUnique(
  reserveId: string,
  userId?: string,
  groupId?: string | null,
) {
  return handleDatabaseOperation(async () => {
    return prisma.reserve.findUnique({
      where: {
        id: reserveId,
        AND: [
          { OR: [{ transaction: { groupId } }, { transaction: { userId } }] },
        ],
      },
      include: {
        transaction: {
          include: { category: true },
        },
      },
    })
  }, 'Reserva encontrada com sucesso')
}

export async function update(params: UpdateReserve) {
  return handleDatabaseOperation(async () => {
    await prisma.$transaction([
      prisma.transaction.update({
        where: { id: params.transaction.id },
        data: {
          categoryId: params.transaction.categoryId,
          description: params.transaction.description,
          groupId: params.transaction.groupId,
          reserves: {
            update: {
              where: {
                id: params.reserve.id,
                transactionId: params.transaction.id,
              },
              data: {
                amount: params.reserve.amount,
                yield: params.reserve.yield,
                startDate: params.reserve.startDate,
                endDate: params.reserve.endDate ? params.reserve.endDate : null,
                status: params.reserve.status,
              },
            },
          },
        },
      }),
    ])
  }, 'Pagamento atualizado com sucesso')
}

export async function updateInBatch() {}
