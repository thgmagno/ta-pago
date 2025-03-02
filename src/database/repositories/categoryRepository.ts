import { Category, CategoryType } from '@prisma/client'
import { prisma } from '@/database/prisma'
import { handleDatabaseOperation } from '@/database/helper'

export async function create(category: Category) {
  return handleDatabaseOperation(async () => {
    return await prisma.category.create({ data: category })
  }, 'Categoria criada com sucesso')
}

export async function edit(data: Partial<Category>) {
  return handleDatabaseOperation(async () => {
    return await prisma.category.update({
      where: {
        id: data.id,
        AND: { OR: [{ userId: data.userId }, { groupId: data.groupId }] },
      },
      data,
    })
  }, 'Categoria editada com sucesso')
}

export async function destroy(
  categoryId: string,
  userId?: string,
  groupId?: string,
) {
  return handleDatabaseOperation(async () => {
    return await prisma.category.delete({
      where: { id: categoryId, AND: { OR: [{ userId }, { groupId }] } },
    })
  }, 'Categoria deletada com sucesso')
}

export async function findUnique(
  categoryId: string,
  userId?: string,
  groupId?: string,
) {
  return handleDatabaseOperation(async () => {
    return await prisma.category.findUnique({
      where: { id: categoryId, AND: { OR: [{ userId }, { groupId }] } },
    })
  }, 'Busca realizada com sucesso')
}

export async function findAll(
  type?: CategoryType,
  userId?: string,
  groupId?: string,
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
