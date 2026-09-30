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

  const isExploreRoute = pathWithoutLocale.startsWith('/explore');

  // Daftar path publik yang tidak boleh menggunakan prefix /id atau /en
  const isStrictPublicRoute =
    pathWithoutLocale === '/' ||
    pathWithoutLocale.startsWith('/login') ||
    pathWithoutLocale.startsWith('/register') ||
    pathWithoutLocale.startsWith('/forgot-password') ||
    pathWithoutLocale.startsWith('/secure');

  if (isStrictPublicRoute || isExploreRoute) {
    // Kalau sudah login tapi akses halaman strict public (seperti login/register) -> lempar ke beranda
    if (token && !pathWithoutLocale.startsWith('/secure')) {
      if (isExploreRoute && pathWithoutLocale.startsWith('/explore/post/')) {
        const slug = pathWithoutLocale.split('/explore/post/')[1];
        if (slug) {
          const postId = slug.slice(-36);
          console.log(`[Middleware] Authenticated user on explore post, redirecting to home with postId=${postId}`);
          // Default redirect to /id/home
          const redirectUrl = new URL(`/id/home?postId=${postId}`, request.url);
          return NextResponse.redirect(redirectUrl);
        }
      } else if (isStrictPublicRoute) {
        console.log(`[Middleware] Authenticated user on strict public route, redirecting to /id/home`);
        return NextResponse.redirect(new URL('/id/home', request.url));
      }
      // If it's just /explore, let them see it even if logged in!
    }
    
    // Kalau user maksa masuk ke /id/login (Strict Public Route), redirect balik ke /login (tanpa locale)
    if (isStrictPublicRoute && pathname.match(localePattern)) {
      console.log(`[Middleware] Removing locale prefix from strict public route`);
      const redirectUrl = new URL(pathWithoutLocale, request.url);
      redirectUrl.search = request.nextUrl.search; // Bawa query params nya!
      return NextResponse.redirect(redirectUrl);
    }
    
    // Bebaskan akses
    if (isExploreRoute && !pathname.match(localePattern)) {
      // Explore route BUTUH locale, jalankan next-intl middleware
      return intlMiddleware(request);
    }
    
    return isStrictPublicRoute ? NextResponse.next() : intlMiddleware(request);
  }

  // Jika ini BUKAN public route (berarti halaman yang butuh login seperti /home)
  if (!token) {
    // Kalau belum login, lempar ke login (tanpa locale)
    console.log(`[Middleware] No token, redirecting to /login`);
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Khusus route internal (beranda, profil), jalankan next-intl middleware 
  // agar otomatis diredirect ke /id/home atau /en/home
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    // Match semua path kecuali static files, api, dan webhooks
    '/((?!api|webhooks|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|json)$).*)',
  ],
};
