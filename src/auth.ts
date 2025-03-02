import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import Github from 'next-auth/providers/github'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '@/database/prisma'
import { env } from 'root/env'

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [Google, Github],
  session: {
    strategy: 'jwt',
  },
  secret: env.AUTH_SECRET,
  pages: {
    signIn: '/entrar',
  },
})
