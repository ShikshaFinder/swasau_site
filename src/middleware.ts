import { NextRequest, NextResponse } from "next/server";
import { config } from "./lib/config";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Security headers
  const response = NextResponse.next();

  // CORS headers
  const origin = request.headers.get("origin");
  if (origin && config.security.allowedOrigins.includes(origin)) {
    response.headers.set("Access-Control-Allow-Origin", origin);
  }

  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Client"
  );
  response.headers.set("Access-Control-Allow-Credentials", "true");

  // Security headers
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  // Handle preflight requests
  if (request.method === "OPTIONS") {
    return new NextResponse(null, { status: 200, headers: response.headers });
  }

  // API route protection
  if (pathname.startsWith("/api/")) {
    // Skip auth for public endpoints
    if (pathname === "/api/auth/signin" || pathname === "/api/auth/signout") {
      return response;
    }

    // Validate origin for sensitive endpoints
    if (
      pathname.startsWith("/api/upload") ||
      pathname.startsWith("/api/start-analyze")
    ) {
      const clientType = request.headers.get("x-client");
      const isValidOrigin = validateOrigin(request);

      if (!isValidOrigin && clientType !== "Extension") {
        return NextResponse.json(
          { error: "Invalid origin" },
          { status: 403, headers: response.headers }
        );
      }
    }

    // Rate limiting (simple implementation)
    const clientIp =
      request.ip || request.headers.get("x-forwarded-for") || "unknown";
    const rateLimitKey = `rate_limit:${clientIp}`;

    // In production, use Redis or similar for rate limiting
    // For now, we'll skip rate limiting in development
    if (process.env.NODE_ENV === "production") {
      // Implement rate limiting logic here
    }
  }

  return response;
}

function validateOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  const clientType = request.headers.get("x-client");

  // Allow browser extension
  if (clientType === "Extension") {
    return true;
  }

  // Check allowed origins
  if (origin && config.security.allowedOrigins.includes(origin)) {
    return true;
  }

  return false;
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
