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
        AND: [{ OR: [{ groupId }, { userId }] }],
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
        AND: [{ OR: [{ groupId }, { userId }] }],
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
        AND: [{ OR: [{ groupId }, { userId }] }],
      },
    })
  }, 'Busca realizada com sucesso')
}

export async function setExcluded(
  transactionId: string,
  userId: string,
  groupId?: string | null,
) {
  return handleDatabaseOperation(async () => {
    return await prisma.transaction.update({
      where: {
        id: transactionId,
        AND: [{ OR: [{ groupId }, { userId }] }],
      },
      data: { deletedAt: new Date() },
    })
  }, 'Transação excluída com sucesso')
}

export async function restoreTransactionExcluded(
  transactionId: string,
  userId: string,
  groupId?: string | null,
) {
  return handleDatabaseOperation(async () => {
    return await prisma.transaction.update({
      where: {
        id: transactionId,
        AND: [{ OR: [{ groupId }, { userId }] }],
      },
      data: { deletedAt: null },
    })
  }, 'Transação restaurada com sucesso')
}

export async function deletePermanent(transactionId: string, userId: string) {
  return handleDatabaseOperation(async () => {
    return await prisma.transaction.delete({
      where: {
        id: transactionId,
        userId,
      },
    })
  }, 'Transação excluída com sucesso')
}
