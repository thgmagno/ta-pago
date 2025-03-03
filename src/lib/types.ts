import { User as NextAuthUser, Session as NextAuthSession } from 'next-auth'

declare module 'next-auth' {
  interface User {
    groupId?: string | null
  }

  interface Session {
    user: NextAuthUser & {
      id: string
      groupId?: string | null
    }
  }
}
