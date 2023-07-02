import { NextResponse } from 'next/server'
export function middleware(request) {
  const userToken = request.cookies.get('your-key')?.value;


  if (!userToken && request.nextUrl.pathname !== '/authentication/sign-in') {
    return NextResponse.redirect(new URL('/authentication/sign-in', request.url))
  }

  if (userToken && request.nextUrl.pathname === '/authentication/sign-in') {
    return NextResponse.redirect(new URL('/', request.url))
  }
}
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - authentication (API routes)
     * - static (static files)
     * - favicon.ico (favicon file)
     */
    '/', '/authentication/sign-in',
  ],
}