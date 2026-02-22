import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip login and logout pages
  if (pathname === "/admin/login" || pathname === "/admin/logout") {
    return NextResponse.next();
  }

  // Check admin token for all /admin routes
  if (pathname.startsWith("/admin")) {
    const token = request.cookies.get("admin_token");

    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
