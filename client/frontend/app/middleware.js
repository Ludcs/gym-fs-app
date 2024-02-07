// import { NextResponse } from 'next/server';

// export function middleware(request) {
// let token = 'token-de-prueba';
// let token = request.cookies.get('token');
// let isAdmin = request.cookies.get('isAdmin');
// let url = request.url;
// console.log({ token });
// console.log({ isAdmin });

// if (!token && url === 'http://localhost:3000/admin') {
//   response.headers.set('Cache-Control', 'no-store');
//   return NextResponse.redirect('http://localhost:3000/');
// }

// if (token && url === 'http://localhost:3000/login') {
//   return NextResponse.redirect('http://localhost:3000/admin');
// }

// if (!token && request.nextUrl.pathname.startsWith('/admin')) {
//   const response = NextResponse.redirect(new URL('/login', request.url));
//   response.headers.set('Cache-Control', 'no-store');
//   return response;
// }

// if (request.nextUrl.pathname.startsWith('/admin') && !token) {
//   const response = NextResponse.rewrite(new URL('/login', request.url));
//   response.cookies.delete('token');
//   return response;
// }
// if (request.nextUrl.pathname.startsWith('/home') && !token) {
//   const response = NextResponse.rewrite(new URL('/login', request.url));
//   response.cookies.delete('token');
//   return response;
// }
// //si ya tengo token y estoy queriendo iniciar otra vez desde login, te mando a /admin directamente
// if (request.nextUrl.pathname.startsWith('/login') && token && isAdmin) {
//   const response = NextResponse.rewrite(new URL('/admin', request.url));
//   return response;
// }
// if (request.nextUrl.pathname.startsWith('/login') && token && !isAdmin) {
//   const response = NextResponse.rewrite(new URL('/home', request.url));
//   return response;
// }

// return NextResponse.next();
//}

// export const config = {
//   // matcher: ['/', '/login', '/admin(.*)', '/home(.*)'],
//   matcher: ['/admin', '/home'],
// };
