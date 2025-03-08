import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '@/database/prisma'
import { env } from 'root/env'

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: env.AUTH_GOOGLE_ID,
      clientSecret: env.AUTH_GOOGLE_SECRET,
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  secret: env.AUTH_SECRET,
  pages: {
    signIn: '/entrar',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id
        token.groupId = user.groupId
      }
      return token
    },
    async session({ session, token }) {
      if (token?.sub) {
        session.user.id = token.sub
        session.user.groupId = (token.groupId as string) ?? null
      }
      return session
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async redirect({ url, baseUrl }) {
      return baseUrl
    },
  },
})
