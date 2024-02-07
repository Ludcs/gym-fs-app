import { NextResponse } from 'next/server';

export function middleware(request) {
  let token = request.cookies.get('token');
  console.log({ token });

  if (!token && request.nextUrl.pathname.startsWith('/admin')) {
    const response = NextResponse.redirect(new URL('/login', request.url));
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
