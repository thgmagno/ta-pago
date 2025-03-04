import { prisma } from '@/database/prisma'
import { handleDatabaseOperation } from '@/database/helper'
import { PaymentMethodType, PaymentStatus } from '@prisma/client'

type CreatePayment = {
  transaction: {
    userId: string
    groupId?: string | null
    categoryId?: string | null
    description?: string | null
  }
  payment: {
    paidAt?: Date
    scheduledDate: Date
    amount: number
    status: PaymentStatus
    paymentMethod?: PaymentMethodType
  }
}

type UpdatePayment = {
  transaction: Partial<CreatePayment['transaction']> & {
    id: string
  }
  payment: Partial<CreatePayment['payment']> & {
    id: string
  }
}

interface FindAllParameters {
  order: 'asc' | 'desc'
  paidAtFrom?: Date
  paidAtTo?: Date
  scheduledDateFrom?: Date
  scheduledDateTo?: Date
  userId?: string
  groupId?: string | null
  status?: PaymentStatus
  displayExcludeds?: boolean
}

export async function create(params: CreatePayment) {
  return handleDatabaseOperation(async () => {
    const [transaction, payment] = await prisma.$transaction([
      prisma.transaction.create({
        data: {
          type: 'PAYMENT',
          categoryId: params.transaction.categoryId,
          description: params.transaction.description,
          groupId: params.transaction.groupId,
          userId: params.transaction.userId,
        },
      }),
      prisma.payment.create({
        data: {
          paidAt: params.payment.paidAt,
          scheduledDate: params.payment.scheduledDate,
          amount: params.payment.amount,
          status: params.payment.status,
          paymentMethod: params.payment.paymentMethod,
          transactionId: undefined,
        },
      }),
    ])

    await prisma.payment.update({
      where: { id: payment.id },
      data: { transactionId: transaction.id },
    })
  }, 'Pagamento criado com sucesso')
}

export async function findAll(params: FindAllParameters) {
  return handleDatabaseOperation(async () => {
    return prisma.payment.findMany({
      where: {
        transaction: {
          type: 'PAYMENT',
          deletedAt: params.displayExcludeds ? { not: null } : null,
          OR: [{ userId: params.userId }, { groupId: params.groupId }],
        },
        paidAt: {
          gte: params.paidAtFrom || undefined,
          lte: params.paidAtTo || undefined,
        },
        scheduledDate: {
          gte: params.scheduledDateFrom || undefined,
          lte: params.scheduledDateTo || undefined,
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
  paymentId: string,
  userId?: string,
  groupId?: string | null,
) {
  return handleDatabaseOperation(async () => {
    return await prisma.payment.findUnique({
      where: {
        id: paymentId,
        AND: [
          { transaction: { userId } },
          { OR: [{ transaction: { groupId } }, { transaction: { userId } }] },
        ],
      },
      include: {
        transaction: {
          include: { category: true },
        },
      },
    })
  }, 'Pagamento encontrado com sucesso')
}

export async function update(params: UpdatePayment) {
  return handleDatabaseOperation(async () => {
    await prisma.$transaction([
      prisma.transaction.update({
        where: { id: params.transaction.id },
        data: {
          categoryId: params.transaction.categoryId,
          description: params.transaction.description,
          groupId: params.transaction.groupId,
          payments: {
            update: {
              where: {
                id: params.payment.id,
                transactionId: params.transaction.id,
              },
              data: {
                paidAt: params.payment.paidAt,
                scheduledDate: params.payment.scheduledDate,
                amount: params.payment.amount,
                status: params.payment.status,
                paymentMethod: params.payment.paymentMethod,
              },
            },
          },
        },
      }),
    ])
  }, 'Pagamento atualizado com sucesso')
}

export async function updateInBatch() {}
