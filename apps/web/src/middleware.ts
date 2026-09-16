import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';

// Intl middleware untuk handle locale detection & redirect
const intlMiddleware = createMiddleware(routing);

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const pathname = request.nextUrl.pathname;

  console.log(`[Middleware] Path: ${pathname} | HasToken: ${!!token}`);

  // Strip locale prefix untuk keperluan auth check
  // e.g., /id/beranda -> /beranda, /en/login -> /login
  const localePattern = /^\/(id|en)(\/|$)/;
  const pathWithoutLocale = pathname.replace(localePattern, '/');

  // Rute auth (tidak boleh diakses kalau sudah login)
  const isAuthRoute =
    pathWithoutLocale === '/login' ||
    pathWithoutLocale === '/register' ||
    pathWithoutLocale === '/forgot-password' ||
    pathWithoutLocale.startsWith('/secure');

  // Rute root
  const isRootRoute = pathWithoutLocale === '/';

  // Kalau tidak ada token dan bukan auth/root route → redirect ke /{locale}/login
  if (!token && !isAuthRoute && !isRootRoute) {
    // Ambil locale dari URL, atau pakai default 'id'
    const localeMatch = pathname.match(/^\/(id|en)/);
    const locale = localeMatch ? localeMatch[1] : routing.defaultLocale;
    console.log(`[Middleware] No token, redirecting to /${locale}/login`);
    return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
  }

  // Kalau sudah login dan coba akses auth route atau root → redirect ke /{locale}/beranda
  if (token && (isAuthRoute && pathWithoutLocale !== '/secure') || (token && isRootRoute)) {
    const localeMatch = pathname.match(/^\/(id|en)/);
    const locale = localeMatch ? localeMatch[1] : routing.defaultLocale;
    console.log(`[Middleware] Already authenticated, redirecting to /${locale}/beranda`);
    return NextResponse.redirect(new URL(`/${locale}/beranda`, request.url));
  }

  // Biarkan next-intl middleware handle sisanya (locale detection, redirect, dll)
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    // Match semua path kecuali static files
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|json)$).*)',
  ],
};
