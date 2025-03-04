import { Category, CategoryType } from '@prisma/client'
import { prisma } from '@/database/prisma'
import { handleDatabaseOperation } from '@/database/helper'

type CreatePayment = {
  name: string
  type: CategoryType
  userId: string
  groupId?: string | null
}

type UpdateCategory = {
  category: Partial<Category> & {
    id: string
    userId: string
    groupId?: string | null
  }
}

export async function create(category: CreatePayment) {
  return handleDatabaseOperation(async () => {
    return await prisma.category.create({ data: category })
  }, 'Categoria criada com sucesso')
}

export async function findAll(
  type?: CategoryType,
  userId?: string,
  groupId?: string | null,
) {
  return handleDatabaseOperation(async () => {
    return await prisma.category.findMany({
      where: {
        type,
        AND: {
          OR: [{ userId }, { groupId }],
        },
      },
      orderBy: {
        name: 'asc',
      },
    })
  }, 'Busca realizada com sucesso')
}

export async function findUnique(
  categoryId: string,
  userId?: string,
  groupId?: string | null,
) {
  return handleDatabaseOperation(async () => {
    return await prisma.category.findUnique({
      where: { id: categoryId, AND: { OR: [{ userId }, { groupId }] } },
    })
  }, 'Busca realizada com sucesso')
}

export async function update(params: UpdateCategory) {
  return handleDatabaseOperation(async () => {
    await prisma.category.update({
      where: {
        id: params.category.id,
        AND: {
          OR: [
            {
              userId: params.category.userId,
              groupId: params.category.groupId,
            },
          ],
        },
      },
      data: {
        name: params.category.name,
        type: params.category.type,
        groupId: params.category.groupId,
      },
    })
  }, 'Categoria atualizada com sucesso')
}

export async function updateInBatch() {}
