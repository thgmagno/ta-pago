'use server'

import { handleDatabaseOperation } from '../helper'
import { prisma } from '../prisma'

export async function findTransactionByPaymentId(
  paymentId: string,
  userId: string,
  groupId?: string | null,
) {
  return handleDatabaseOperation(async () => {
    return await prisma.transaction.findFirst({
      where: {
        payments: { some: { id: paymentId } },
        AND: [{ userId }, { OR: [{ groupId }, { userId }] }],
      },
    })
  }, 'Busca realizada com sucesso')
}

export async function findTransactionByReceiptId(
  receiptId: string,
  userId: string,
  groupId?: string | null,
) {
  return handleDatabaseOperation(async () => {
    return await prisma.transaction.findFirst({
      where: {
        receipts: { some: { id: receiptId } },
        AND: [{ userId }, { OR: [{ groupId }, { userId }] }],
      },
    })
  }, 'Busca realizada com sucesso')
}

export async function findTransactionByReserveId(
  reserveId: string,
  userId: string,
  groupId?: string | null,
) {
  return handleDatabaseOperation(async () => {
    return await prisma.transaction.findFirst({
      where: {
        reserves: { some: { id: reserveId } },
        AND: [{ userId }, { OR: [{ groupId }, { userId }] }],
      },
    })
  }, 'Busca realizada com sucesso')
}
