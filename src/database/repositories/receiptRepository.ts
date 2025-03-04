import { prisma } from '@/database/prisma'
import { ReceiptMethodType, ReceiptStatus } from '@prisma/client'
import { handleDatabaseOperation } from '@/database/helper'

type CreateReceipt = {
  transaction: {
    userId: string
    groupId?: string | null
    categoryId?: string | null
    description?: string | null
  }
  receipt: {
    receivedAt?: Date
    scheduledDate: Date
    amount: number
    status: ReceiptStatus
    receiptMethod?: ReceiptMethodType
  }
}

type UpdateReceipt = {
  transaction: Partial<CreateReceipt['transaction']> & {
    id: string
  }
  receipt: Partial<CreateReceipt['receipt']> & {
    id: string
  }
}

interface FindAllParameters {
  order: 'asc' | 'desc'
  receivedAtFrom?: Date
  receivedAtTo?: Date
  scheduledDateFrom?: Date
  scheduledDateTo?: Date
  userId?: string
  groupId?: string | null
  status?: ReceiptStatus
}

export async function create(params: CreateReceipt) {
  return handleDatabaseOperation(async () => {
    const [transaction, receipt] = await prisma.$transaction([
      prisma.transaction.create({
        data: {
          type: 'RECEIPT',
          categoryId: params.transaction.categoryId,
          description: params.transaction.description,
          groupId: params.transaction.groupId,
          userId: params.transaction.userId,
        },
      }),
      prisma.receipt.create({
        data: {
          receivedAt: params.receipt.receivedAt,
          scheduledDate: params.receipt.scheduledDate,
          amount: params.receipt.amount,
          status: params.receipt.status,
          receiptMethod: params.receipt.receiptMethod,
          transactionId: undefined,
        },
      }),
    ])

    await prisma.receipt.update({
      where: { id: receipt.id },
      data: { transactionId: transaction.id },
    })
  }, 'Recebimento criado com sucesso')
}

export async function findAll(params: FindAllParameters) {
  return handleDatabaseOperation(async () => {
    return await prisma.receipt.findMany({
      where: {
        transaction: {
          type: 'RECEIPT',
          OR: [{ userId: params.userId }, { groupId: params.groupId }],
        },
        receivedAt: {
          gte: params.receivedAtFrom || undefined,
          lte: params.receivedAtTo || undefined,
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
  receiptId: string,
  userId?: string,
  groupId?: string | null,
) {
  return handleDatabaseOperation(async () => {
    return await prisma.receipt.findUnique({
      where: {
        id: receiptId,
        AND: { OR: [{ transaction: { userId, groupId } }] },
      },
      include: {
        transaction: {
          include: { category: true },
        },
      },
    })
  }, 'Recebimento encontrado com sucesso')
}

export async function findByTransaction(
  transactionId: string,
  userId?: string,
  groupId?: string | null,
) {
  return handleDatabaseOperation(async () => {
    return await prisma.receipt.findFirst({
      where: {
        transactionId,
        AND: { OR: [{ transaction: { userId, groupId } }] },
      },
    })
  }, 'Busca realizada com sucesso')
}

export async function update(params: UpdateReceipt) {
  return handleDatabaseOperation(async () => {
    await prisma.$transaction([
      prisma.transaction.update({
        where: { id: params.transaction.id },
        data: {
          categoryId: params.transaction.categoryId,
          description: params.transaction.description,
          groupId: params.transaction.groupId,
          receipts: {
            update: {
              where: {
                id: params.receipt.id,
                transactionId: params.transaction.id,
              },
              data: {
                receivedAt: params.receipt.receivedAt,
                scheduledDate: params.receipt.scheduledDate,
                amount: params.receipt.amount,
                status: params.receipt.status,
                receiptMethod: params.receipt.receiptMethod,
              },
            },
          },
        },
      }),
    ])
  }, 'Pagamento atualizado com sucesso')
}

export async function updateInBatch() {}
