import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Mock function to get user from request - in real app, decode JWT or check session
function getUserFromRequest(request: NextRequest) {
  // This is a simplified example - in real app you'd:
  // 1. Get JWT token from cookies/headers
  // 2. Decode and verify the token
  // 3. Return user data including role

  // For demo purposes, return based on URL patterns
  const url = request.nextUrl.pathname;

  if (url.includes("/admin")) {
    return { role: "ADMIN", id: 1 };
  } else if (url.includes("/client")) {
    return { role: "CLIENT", id: 2 };
  } else if (url.includes("/intern")) {
    return { role: "INTERN", id: 3 };
  }

  return null;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for public routes
  if (
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname === "/" ||
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/about" ||
    pathname === "/contact" ||
    pathname === "/services" ||
    pathname === "/projects" ||
    pathname === "/blog" ||
    pathname.startsWith("/public")
  ) {
    return NextResponse.next();
  }

  // Get user from request (in real app, this would decode JWT)
  const user = getUserFromRequest(request);

  // Redirect to login if no user
  if (!user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Role-based access control for dashboard routes
  if (pathname.startsWith("/dashboard")) {
    if (pathname.startsWith("/dashboard/admin") && user.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    if (pathname.startsWith("/dashboard/client") && user.role !== "CLIENT") {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    if (pathname.startsWith("/dashboard/intern") && user.role !== "INTERN") {
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
      user.role !== "ADMIN"
    ) {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 403 }
      );
    }

    // Add user info to headers for API routes
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-id", user.id.toString());
    requestHeaders.set("x-user-role", user.role);

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
