import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const path = request.nextUrl.pathname;
  
  console.log(`[Middleware] Accessing path: ${path} | HasToken: ${!!token}`);

  // Rute auth (Nggak boleh diakses kalau udah login)
  const isAuthRoute = path === '/login' || path === '/register' || path === '/forgot-password' || path.startsWith('/secure');
  
  // Rute landing page (Boleh diakses siapa aja, tapi kalau udah login mending diarahkan ke /beranda)
  const isRootRoute = path === '/';

  // Kalau nggak ada token dan rutenya BUKAN rute auth dan BUKAN root, lempar ke /login
  // Artinya rute seperti /beranda, /profile akan diproteksi.
  if (!token && !isAuthRoute && !isRootRoute) {
    console.log(`[Middleware] No token found for private route, redirecting to /login`);
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Kalau sudah punya token dan coba akses halaman auth ATAU halaman root, lempar ke /beranda
  if (token && (isAuthRoute && path !== '/secure') || (token && isRootRoute)) {
    console.log(`[Middleware] Already authenticated, redirecting to /beranda`);
    return NextResponse.redirect(new URL('/beranda', request.url));
  }

  return NextResponse.next();
}

// Menentukan path mana aja yang di-handle middleware ini
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - logo (public assets)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|logo.*|.*\\.(?:svg|png|jpg|jpeg|gif|webp|json)$).*)',
  ],
};
