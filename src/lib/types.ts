import {
  Category,
  Payment,
  Receipt,
  Reserve,
  Transaction,
} from '@prisma/client'
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

export type SearchParams = Promise<{
  [key: string]: string
}>

export type PaymentComplete = Payment & {
  transaction:
    | (Transaction & {
        category: Category | null
      })
    | null
}

export type ReceiptComplete = Receipt & {
  transaction:
    | (Transaction & {
        category: Category | null
      })
    | null
}

export type ReservationComplete = Reserve & {
  transaction:
    | (Transaction & {
        category: Category | null
      })
    | null
}
