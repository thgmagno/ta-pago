'use server'

import { actions } from '@/actions'
import { cookies } from 'next/headers'

export async function getGroupIdBySession() {
  const user = await actions.session.getServerSession()
  const groupId = user.groupId ?? (await findByCookie(user.id))

  return groupId
}

async function findByCookie(userId: string) {
  const cookieStore = await cookies()
  const rawValue = cookieStore.get(`temporary-cookie-${userId}`)?.value

  if (!rawValue) return undefined

  try {
    const decodedValue = decodeURIComponent(rawValue)
    const { groupId } = JSON.parse(decodedValue)

    return typeof groupId === 'string' ? groupId : undefined
  } catch (error) {
    console.error('Erro ao parsear cookie:', error)
    return undefined
  }
}
