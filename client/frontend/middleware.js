import { NextResponse } from 'next/server';

export function middleware(request) {
  let token = request.cookies.get('token');
  let isAdmin = request.cookies.get('isAdmin');

  // console.log('Middleware token:', token);
  // console.log('Middleware isAdmin:', isAdmin);

  if (!token && request.nextUrl.pathname.startsWith('/admin')) {
    const response = NextResponse.redirect(new URL('/login', request.url));
    return response;
  }
  if (
    token &&
    isAdmin.value === 'false' &&
    request.nextUrl.pathname.startsWith('/admin')
  ) {
    const response = NextResponse.redirect(new URL('/home', request.url));
    return response;
  }
  if (
    token &&
    isAdmin.value === 'true' &&
    request.nextUrl.pathname.startsWith('/home')
  ) {
    const response = NextResponse.redirect(new URL('/admin', request.url));
    return response;
  }
  if (!token && request.nextUrl.pathname.startsWith('/home')) {
    const response = NextResponse.redirect(new URL('/login', request.url));
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin(.*)', '/home(.*)'],
};
