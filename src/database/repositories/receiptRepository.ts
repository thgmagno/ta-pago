import { prisma } from '@/database/prisma'
import { Transaction, Receipt, ReceiptStatus } from '@prisma/client'
import { handleDatabaseOperation } from '@/database/helper'

interface CreateReceipt {
  transaction: Omit<Transaction, 'id' | 'type'>
  receipt: Omit<Receipt, 'id' | 'transactionId' | 'transaction'>
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
    const [transaction] = await prisma.$transaction([
      prisma.transaction.create({
        data: {
          type: 'RECEIPT',
          amount: params.transaction.amount ?? 0,
          categoryId: params.transaction.categoryId,
          description: params.transaction.description ?? '-',
          groupId: params.transaction.groupId,
          userId: params.transaction.userId,
        },
      }),
      prisma.receipt.create({
        data: {
          receiptDate: params.receipt.receiptDate,
          amountReceived: params.receipt.amountReceived,
          status: params.receipt.status,
          receiptMethod: params.receipt.receiptMethod,
          transactionId: undefined,
        },
      }),
    ])

    await prisma.receipt.update({
      where: { id: transaction.id },
      data: { transactionId: transaction.id },
    })
  }, 'Recebimento criado com sucesso')
}

export async function edit(
  receiptId: string,
  data: Partial<Receipt>,
  userId?: string,
  groupId?: string | null,
) {
  return handleDatabaseOperation(async () => {
    return await prisma.receipt.update({
      where: {
        id: receiptId,
        AND: [{ OR: [{ transaction: { userId, groupId } }] }],
      },
      data,
    })
  }, 'Recebimento editado com sucesso')
}

export async function confirm(
  receiptId: string,
  userId?: string,
  groupId?: string | null,
) {
  return handleDatabaseOperation(async () => {
    return await prisma.receipt.update({
      where: {
        id: receiptId,
        AND: { OR: [{ transaction: { userId, groupId } }] },
      },
      data: { status: 'RECEIVED' },
    })
  }, 'Recebimento confirmado com sucesso')
}

export async function cancel(
  receiptId: string,
  userId?: string,
  groupId?: string | null,
) {
  return handleDatabaseOperation(async () => {
    return await prisma.receipt.update({
      where: {
        id: receiptId,
        AND: { OR: [{ transaction: { userId, groupId } }] },
      },
      data: { status: 'CANCELLED' },
    })
  }, 'Recebimento cancelado com sucesso')
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
        OR: [{ transaction: { userId, groupId } }],
      },
      include: {
        transaction: {
          include: { category: true },
        },
      },
    })
  }, 'Recebimento encontrado com sucesso')
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

export async function destroy(
  receiptId: string,
  userId?: string,
  groupId?: string | null,
) {
  return handleDatabaseOperation(async () => {
    const receipt = await findUnique(receiptId, userId, groupId)

    if (!receipt?.data?.transactionId) {
      throw new Error('Recebimento não encontrado')
    }

    return prisma.$transaction([
      prisma.receipt.delete({
        where: {
          id: receiptId,
          AND: [{ OR: [{ transaction: { userId, groupId } }] }],
        },
      }),
      prisma.transaction.delete({
        where: { id: receipt.data.transactionId },
      }),
    ])
  }, 'Recebimento deletado com sucesso')
}
