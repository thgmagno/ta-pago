import { Group } from '@prisma/client'
import { prisma } from '@/database/prisma'
import { nanoid } from 'nanoid'
import { handleDatabaseOperation } from '@/database/helper'

export async function create(
  group: Pick<Group, 'name' | 'creatorUserId' | 'description' | 'visibility'>,
) {
  return handleDatabaseOperation(async () => {
    return await prisma.$transaction(async (tx) => {
      const tag = await generateUniqueTag()

      const newGroup = await tx.group.create({ data: { ...group, tag } })

      await tx.groupMember.create({
        data: {
          userId: group.creatorUserId,
          additionDate: new Date(),
          groupId: newGroup.id,
          role: 'ADMIN',
        },
      })

      return await tx.user.update({
        where: { id: group.creatorUserId },
        data: { groupId: newGroup.id },
      })
    })
  }, 'Grupo criado com sucesso')
}

export async function update(
  data: Partial<Group>,
  creatorUserId: string,
  groupId: string,
) {
  return handleDatabaseOperation(async () => {
    return await prisma.group.update({
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

export async function findGroupWithMembers(groupId: string) {
  return handleDatabaseOperation(async () => {
    const [members, group] = await Promise.all([
      prisma.user.findMany({
        where: { groupId },
      }),
      prisma.group.findUnique({ where: { id: groupId } }),
    ])

    return { members, group }
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

  while (tagExiste || tagUnica.length < 6) {
    tagUnica = nanoid(6)
      .replace(/[^A-Z0-9]/g, '')
      .toUpperCase()
    const tagExistente = await prisma.group.findUnique({
      where: { tag: tagUnica },
    })

    tagExiste = !!tagExistente
  }

  return tagUnica
}
