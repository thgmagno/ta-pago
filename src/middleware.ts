import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { env } from 'root/env'

const publicRoutes = ['/apoiar', '/entrar', '/sobre']

export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  const isPrivateRoute = Object.values(publicRoutes).every(
    (route) => !pathname.includes(route),
  )

  const token = await getToken({ req: request, secret: env.AUTH_SECRET })
  const isAuthenticated = Boolean(token?.email && token.sub)

  console.log(`DEBUG | TOKEN | ${token}`)
  console.log(`DEBUG | EMAIL | ${token?.email}`)
  console.log(`DEBUG | SUB | ${token?.sub}`)
  console.log(`DEBUG | AUTH_URL | ${env.AUTH_URL}`)

  if (isPrivateRoute) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL(`/entrar`, request.url))
    }
  }

  if (!isPrivateRoute && isAuthenticated) {
    return NextResponse.redirect(new URL(`/`, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher:
    '/((?!api|static|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|gif)).*)',
}
