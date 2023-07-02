import { NextResponse } from 'next/server'
export function middleware(request) {
  const userToken = request.cookies.get('your-key')?.value;
  if(false) {
     return NextResponse.redirect(new URL('/',request.url))
  }
}
export const config = {
  matcher: '/',
}