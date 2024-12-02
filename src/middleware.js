import { NextResponse } from 'next/server'

export function middleware(request) {
//TODO(Az3r1y)
  const cookie= request.cookies.has('nextjs')

  // if ( !cookie && !request.url.includes("/login") ) {
  //   return NextResponse.redirect(new URL('/login', request.url))
  // }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)']
}
 
