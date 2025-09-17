import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getUserFromRequest, hasRole } from "@/lib/auth";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for public routes
  if (
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/api/signup") ||
    pathname.startsWith("/api/login") ||
    pathname.startsWith("/api/verify-email") ||
    pathname.startsWith("/api/forgot-password") ||
    pathname.startsWith("/api/waitlist") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname === "/" ||
    pathname === "/about" ||
    pathname === "/services" ||
    pathname === "/projects" ||
    pathname === "/blog" ||
    pathname === "/contact" ||
    pathname === "/internship" ||
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/auth/login" ||
    pathname === "/auth/signup" ||
    pathname === "/auth/forgot-password" ||
    pathname === "/verify-email" ||
    pathname === "/waitlist"
  ) {
    return NextResponse.next();
  }

  // Get user from request (JWT-based authentication)
  const user = getUserFromRequest(request);

  // Redirect to login if no user
  if (!user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Role-based access control for dashboard routes
  if (pathname.startsWith("/dashboard")) {
    if (pathname.startsWith("/dashboard/admin") && !hasRole(user, "ADMIN")) {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    if (pathname.startsWith("/dashboard/client") && !hasRole(user, "CLIENT")) {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    if (pathname.startsWith("/dashboard/intern") && !hasRole(user, "INTERN")) {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }

  // API route protection
  if (pathname.startsWith("/api/")) {
    // Admin-only API routes
    if (
      (pathname.startsWith("/api/admin") ||
        pathname.startsWith("/api/assignments") ||
        pathname.startsWith("/api/clients")) &&
      !hasRole(user, "ADMIN")
    ) {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 403 }
      );
    }

    // Add user info to headers for API routes
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-id", user.userId.toString());
    requestHeaders.set("x-user-role", user.role);
    requestHeaders.set("x-user-email", user.email);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
