import { Feedback, FeedbackStatus } from '@prisma/client'
import { prisma } from '@/database/prisma'
import { handleDatabaseOperation } from '@/database/helper'

export async function send(feedback: Feedback) {
  return handleDatabaseOperation(async () => {
    return await prisma.feedback.create({ data: feedback })
  }, 'Feedback enviado com sucesso')
}

export async function changeStatus(feedbackId: string, status: FeedbackStatus) {
  return handleDatabaseOperation(async () => {
    return await prisma.feedback.update({
      where: { id: feedbackId },
      data: { status },
    })
  }, 'Status do feedback alterado')
}

export async function findUnique(feedbackId: string) {
  return handleDatabaseOperation(async () => {
    return await prisma.feedback.findUnique({ where: { id: feedbackId } })
  }, 'Busca realizada com sucesso')
}

export async function findAll(status?: FeedbackStatus) {
  return handleDatabaseOperation(async () => {
    return await prisma.feedback.findMany({
      where: { status },
      orderBy: { creationDate: 'desc' },
    })
  }, 'Busca realizada com sucesso')
}
