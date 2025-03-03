'use server'

import { auth, signIn, signOut } from '@/auth'
import { redirect } from 'next/navigation'

type GetServerSessionReturn<T = undefined> = T extends 'id' | 'email' | 'name'
  ? string
  : {
      id: string
      email: string
      name: string
      image: string | null | undefined
      groupId: string | null
    }

export async function getServerSession<
  T extends 'id' | 'email' | 'name' | undefined = undefined,
>(get?: T): Promise<GetServerSessionReturn<T>> {
  const user = await auth().then((res) => res?.user)

  if (!user || !user.email) redirect('/entrar')

  console.log(user)

  if (get === 'id') {
    return String(user.id) as GetServerSessionReturn<T>
  }

  if (get === 'email') {
    return String(user.email) as GetServerSessionReturn<T>
  }

  if (get === 'name') {
    return String(user.name) as GetServerSessionReturn<T>
  }

  return {
    id: user.id,
    email: user.email,
    name: user.name ?? 'Sem nome',
    image: user?.image,
    groupId: user?.groupId ? user.groupId : null,
  } as GetServerSessionReturn<T>
}

export async function loginWithGoogle() {
  return signIn('google')
}

export async function signOutAndRedirect() {
  return signOut().then(redirect('/entrar'))
}
