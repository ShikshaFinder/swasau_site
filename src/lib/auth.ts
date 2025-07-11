import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { config } from "./config";
import { User } from "./types";

// In-memory user store (replace with database in production)
const users = new Map<string, User>();

// Initialize with a test user
users.set("test@example.com", {
  id: "1",
  email: "test@example.com",
  name: "Test User",
  role: "user",
  createdAt: new Date(),
});

export async function getSession(req: NextRequest): Promise<User | null> {
  try {
    // For API routes, we'll use a simple session check
    // In production, you'd want to use NextAuth.js properly
    const authHeader = req.headers.get("authorization");
    const sessionToken = req.cookies.get("session-token")?.value;

    if (authHeader?.startsWith("Bearer ")) {
      const token = authHeader.substring(7);
      // Validate token and return user
      return validateToken(token);
    }

    if (sessionToken) {
      return validateSessionToken(sessionToken);
    }

    return null;
  } catch (error) {
    console.error("Session validation error:", error);
    return null;
  }
}

export function validateToken(token: string): User | null {
  // Simple token validation - replace with JWT or proper token validation
  if (token === "valid-token") {
    return users.get("test@example.com") || null;
  }
  return null;
}

export function validateSessionToken(token: string): User | null {
  // Simple session token validation
  if (token === "valid-session") {
    return users.get("test@example.com") || null;
  }
  return null;
}

export function validateOrigin(req: NextRequest): boolean {
  const origin = req.headers.get("origin");
  const clientType = req.headers.get("x-client");

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

export function createSessionToken(user: User): string {
  // In production, use proper JWT or session management
  return `session-${user.id}-${Date.now()}`;
}

export function requireAuth(req: NextRequest): User {
  const user = getSession(req);
  if (!user) {
    throw new Error("Authentication required");
  }
  return user;
}
