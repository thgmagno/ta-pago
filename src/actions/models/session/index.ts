import { auth } from '@/auth'
import { redirect } from 'next/navigation'

type GetServerSessionReturn<T = undefined> = T extends 'id' | 'email' | 'name'
  ? string
  : {
      id: string
      email: string
      name: string
      image: string | null | undefined
    }

export async function getServerSession<
  T extends 'id' | 'email' | 'name' | undefined = undefined,
>(get?: T): Promise<GetServerSessionReturn<T>> {
  const user = await auth().then((res) => res?.user)

  if (!user || !user.email || !user.id) redirect('/entrar')

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
  } as GetServerSessionReturn<T>
}
