import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath =
    path === "/" || path === "/login" || path === "/auth/login";
  const token = request.cookies.get("token")?.value || "";
  const userRole = request.cookies.get("userRole")?.value || "";

  // Redirect authenticated users away from public paths
  if (isPublicPath && token) {
    if (userRole === "USER") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    } else if (userRole === "SUB_REGISTRAR") {
      return NextResponse.redirect(new URL("/authority", request.url));
    }
  }

  // Protect user routes
  if (
    path.startsWith("/dashboard") ||
    path.startsWith("/properties") ||
    path.startsWith("/search") ||
    path.startsWith("/documents") ||
    path.startsWith("/profile") ||
    path.startsWith("/settings")
  ) {
    if (!token) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
    if (userRole !== "USER") {
      return NextResponse.redirect(new URL("/authority", request.url));
    }
  }

  // Protect authority routes
  if (path.startsWith("/authority")) {
    if (!token) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
    if (userRole !== "SUB_REGISTRAR") {
      return NextResponse.redirect(new URL("/properties", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/auth/login",
    "/properties/:path*",
    "/search/:path*",
    "/documents/:path*",
    "/profile/:path*",
    "/settings/:path*",
    "/authority/:path*",
  ],
};
