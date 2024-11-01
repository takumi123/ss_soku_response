// middleware.ts
import { auth } from '@/app/auth';

export default auth;

export const config = {
  matcher: [
    '/users/:path*',
    '/settings/:path*', 
    '/admin/:path*',
    '/((?!auth|api|_next/static|_next/image|favicon.ico).*)'
  ]
};
