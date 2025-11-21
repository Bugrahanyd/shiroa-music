import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('accessToken')?.value;
  const { pathname } = request.nextUrl;

  // Public paths that don't require auth
  const publicPaths = ['/'];

  // If user has token and tries to access root, redirect to tracks
  if (token && pathname === '/') {
    return NextResponse.redirect(new URL('/tracks', request.url));
  }

  // If user doesn't have token and tries to access protected route, redirect to root
  if (!token && !publicPaths.includes(pathname)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
