import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/api/auth')) {
    return NextResponse.next()
  }

  const authHeader = request.headers.get('Authorization')
  const apiSecret = process.env.API_SECRET

  if (!authHeader || authHeader !== apiSecret) {
    return NextResponse.error().status
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/api/:path*'],
}
