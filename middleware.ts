// middleware.ts — App Router edge middleware
// Protects every route under /admin/*. Unauthenticated requests are
// redirected to /admin/login.  The login page itself is excluded.

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { validateToken, COOKIE_NAME } from "./lib/adminAuth";

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const { pathname } = request.nextUrl;

  // Allow the login page and its API route through without auth check
  if (
    pathname === "/admin/login" ||
    pathname === "/api/admin/login" ||
    pathname === "/api/admin/logout"
  ) {
    return NextResponse.next();
  }

  // All other /admin paths require a valid session cookie
  if (pathname.startsWith("/admin")) {
    const token = request.cookies.get(COOKIE_NAME)?.value;

    if (!token || !(await validateToken(token))) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  // Only run middleware on /admin/* routes
  matcher: ["/admin/:path*"],
};
