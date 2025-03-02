import { Group } from '@prisma/client'
import { prisma } from '@/database/prisma'
import { nanoid } from 'nanoid'
import { handleDatabaseOperation } from '@/database/helper'

export async function create(
  group: Pick<Group, 'name' | 'creatorUserId' | 'description' | 'visibility'>,
) {
  return handleDatabaseOperation(async () => {
    const tag = await generateUniqueTag()
    return await prisma.group.create({ data: { ...group, tag } })
  }, 'Grupo criado com sucesso')
}

export async function edit(
  data: Partial<Group>,
  creatorUserId: string,
  groupId: string,
) {
  return handleDatabaseOperation(async () => {
    return await prisma.group.updateMany({
      where: {
        id: groupId,
        creatorUserId,
      },
      data,
    })
  }, 'Grupo editado com sucesso')
}

export async function destroy(groupId: string, creatorUserId: string) {
  return handleDatabaseOperation(async () => {
    return await prisma.group.deleteMany({
      where: {
        id: groupId,
        creatorUserId,
      },
    })
  }, 'Grupo excluído com sucesso')
}

export async function listMembers(groupId: string) {
  return handleDatabaseOperation(async () => {
    return await prisma.groupMember.findMany({
      where: { groupId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    })
  }, 'Membros do grupo listados com sucesso')
}

export async function findUnique(searchTerm: string) {
  return handleDatabaseOperation(async () => {
    return await prisma.group.findFirst({
      where: {
        visibility: 'PUBLIC',
        OR: [
          { name: { contains: searchTerm, mode: 'insensitive' } },
          { tag: { equals: searchTerm } },
        ],
      },
    })
  }, 'Grupo encontrado com sucesso')
}

async function generateUniqueTag(): Promise<string> {
  let tagUnica = ''
  let tagExiste = true

  while (tagExiste) {
    tagUnica = nanoid(4)
      .replace(/[^A-Z0-9]/g, '')
      .toUpperCase()
    const tagExistente = await prisma.group.findUnique({
      where: { tag: tagUnica },
    })

    tagExiste = !!tagExistente
  }

  return tagUnica
}
