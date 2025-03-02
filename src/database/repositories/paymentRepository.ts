import { prisma } from '@/database/prisma'
import { Transaction, Payment } from '@prisma/client'
import { handleDatabaseOperation } from '@/database/helper'

interface CreatePayment {
  transaction: Omit<Transaction, 'id' | 'type'>
  payment: Omit<Payment, 'id' | 'transactionId' | 'transaction'>
}

interface FindAllParameters {
  orderBy: 'description' | 'creationDate' | 'amount'
  order: 'asc' | 'desc'
  creationDateFrom?: Date
  creationDateTo?: Date
  dueDateFrom?: Date
  dueDateTo?: Date
  userId?: string
  groupId?: string
}

export async function create(params: CreatePayment) {
  return handleDatabaseOperation(async () => {
    const [transaction] = await prisma.$transaction([
      prisma.transaction.create({
        data: {
          type: 'PAYMENT',
          amount: params.transaction.amount ?? 0,
          categoryId: params.transaction.categoryId,
          description: params.transaction.description ?? '-',
          groupId: params.transaction.groupId,
          userId: params.transaction.userId,
        },
      }),
      prisma.payment.create({
        data: {
          dueDate: params.payment.dueDate,
          amountPaid: params.payment.amountPaid,
          status: params.payment.status,
          paymentMethod: params.payment.paymentMethod,
          transactionId: undefined,
        },
      }),
    ])

    await prisma.payment.update({
      where: { id: transaction.id },
      data: { transactionId: transaction.id },
    })
  }, 'Pagamento criado com sucesso')
}

export async function edit(
  paymentId: string,
  data: Partial<Payment>,
  userId?: string,
  groupId?: string,
) {
  return handleDatabaseOperation(async () => {
    return await prisma.payment.update({
      where: {
        id: paymentId,
        AND: [{ OR: [{ transaction: { userId, groupId } }] }],
      },
      data,
    })
  }, 'Pagamento editado com sucesso')
}

export async function confirm(
  paymentId: string,
  userId?: string,
  groupId?: string,
) {
  return handleDatabaseOperation(async () => {
    return await prisma.payment.update({
      where: {
        id: paymentId,
        AND: { OR: [{ transaction: { userId, groupId } }] },
      },
      data: { status: 'PAID' },
    })
  }, 'Pagamento confirmado com sucesso')
}

export async function cancel(
  paymentId: string,
  userId?: string,
  groupId?: string,
) {
  return handleDatabaseOperation(async () => {
    return await prisma.payment.update({
      where: {
        id: paymentId,
        AND: { OR: [{ transaction: { userId, groupId } }] },
      },
      data: { status: 'CANCELLED' },
    })
  }, 'Pagamento cancelado com sucesso')
}

export async function findUnique(
  paymentId: string,
  userId?: string,
  groupId?: string,
) {
  return handleDatabaseOperation(async () => {
    return await prisma.payment.findUnique({
      where: {
        id: paymentId,
        AND: { OR: [{ transaction: { userId, groupId } }] },
      },
    })
  }, 'Pagamento encontrado com sucesso')
}

export async function findAll(params: FindAllParameters) {
  return handleDatabaseOperation(async () => {
    return await prisma.transaction.findMany({
      where: {
        OR: [{ userId: params.userId }, { groupId: params.groupId }],
        creationDate: {
          gte: params.creationDateFrom || undefined,
          lte: params.creationDateTo || undefined,
        },
      },
      include: {
        payments: {
          where: {
            dueDate: {
              gte: params.dueDateFrom || undefined,
              lte: params.dueDateTo || undefined,
            },
          },
        },
      },
      orderBy: {
        [params.orderBy]: params.order,
      },
    })
  }, 'Busca realizada com sucesso')
}

export async function destroy(
  paymentId: string,
  userId?: string,
  groupId?: string,
) {
  return handleDatabaseOperation(async () => {
    const payment = await findUnique(paymentId, userId, groupId)

    if (!payment?.data?.transactionId) {
      throw new Error('Pagamento não encontrado')
    }

    return prisma.$transaction([
      prisma.payment.delete({
        where: {
          id: paymentId,
          AND: [{ OR: [{ transaction: { userId, groupId } }] }],
        },
      }),
      prisma.transaction.delete({
        where: { id: payment.data.transactionId },
      }),
    ])
  }, 'Pagamento deletado com sucesso')
}
