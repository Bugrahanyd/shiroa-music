import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('access_token')?.value;
  const { pathname } = request.nextUrl;

  // Public routes that don't require authentication
  const publicRoutes = [
    '/',
    '/about', 
    '/contact',
    '/partnership',
    '/community'
  ];
  
  // Semi-public routes (accessible but better with auth)
  const semiPublicRoutes = [
    '/discover',
    '/tracks'
  ];

  // Check if current path is public or semi-public
  const isPublicRoute = publicRoutes.some(route => 
    pathname === route || pathname.startsWith(route + '/')
  );
  
  const isSemiPublicRoute = semiPublicRoutes.some(route => 
    pathname === route || pathname.startsWith(route + '/')
  );

  // If it's a public or semi-public route, allow access
  if (isPublicRoute || isSemiPublicRoute) {
    return NextResponse.next();
  }

  // If no token and trying to access protected route, redirect to home
  if (!token) {
    const homeUrl = new URL('/', request.url);
    return NextResponse.redirect(homeUrl);
  }

  // Token exists, allow access
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
