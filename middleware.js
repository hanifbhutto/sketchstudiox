import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const adminSession = request.cookies.get('admin_session');

  // Agar user /admin/login par ja raha hai aur already logged in hai -> dashboard bhej do
  if (pathname === '/admin/login' && adminSession?.value === 'authenticated_studio_admin') {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  // Agar user /admin ke kisi bhi route par hai aur logged in nahi hai -> login page par bhejo
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    if (!adminSession || adminSession.value !== 'authenticated_studio_admin') {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};