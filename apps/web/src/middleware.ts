import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';

// Intl middleware untuk handle locale detection & redirect
const intlMiddleware = createMiddleware(routing);

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const pathname = request.nextUrl.pathname;

  console.log(`[Middleware] Path: ${pathname} | HasToken: ${!!token}`);

  // Hapus prefix locale dari pathname untuk pengecekan
  const localePattern = /^\/(id|en)(\/|$)/;
  const pathWithoutLocale = pathname.replace(localePattern, '/');

  // Daftar path publik yang tidak boleh menggunakan prefix /id atau /en
  const isPublicRoute =
    pathWithoutLocale === '/' ||
    pathWithoutLocale.startsWith('/login') ||
    pathWithoutLocale.startsWith('/register') ||
    pathWithoutLocale.startsWith('/forgot-password') ||
    pathWithoutLocale.startsWith('/secure');

  if (isPublicRoute) {
    // Kalau sudah login tapi akses halaman publik (kecuali secure) -> lempar ke beranda
    if (token && !pathWithoutLocale.startsWith('/secure')) {
      console.log(`[Middleware] Authenticated user on public route, redirecting to /id/beranda`);
      return NextResponse.redirect(new URL('/id/beranda', request.url));
    }
    
    // Kalau user maksa masuk ke /id/login, redirect balik ke /login (tanpa locale)
    if (pathname.match(localePattern)) {
      console.log(`[Middleware] Removing locale prefix from public route`);
      return NextResponse.redirect(new URL(pathWithoutLocale, request.url));
    }
    
    // Bebaskan akses tanpa locale (nanti di-handle bawaan browser translate)
    return NextResponse.next();
  }

  // Jika ini BUKAN public route (berarti halaman yang butuh login seperti /beranda)
  if (!token) {
    // Kalau belum login, lempar ke login (tanpa locale)
    console.log(`[Middleware] No token, redirecting to /login`);
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Khusus route internal (beranda, profil), jalankan next-intl middleware 
  // agar otomatis diredirect ke /id/beranda atau /en/beranda
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    // Match semua path kecuali static files, api, dan webhooks
    '/((?!api|webhooks|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|json)$).*)',
  ],
};
