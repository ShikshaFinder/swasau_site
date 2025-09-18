import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export interface User {
  id: number;
  email: string;
  name: string;
  role: "CLIENT" | "FREELANCER" | "ADMIN";
  emailVerified: boolean;
}

export interface AuthToken {
  userId: number;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-key";

export function generateToken(user: Omit<User, "emailVerified">): string {
  return jwt.sign(
    {
      userId: user.id,
      email: user.email,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
}

export function verifyToken(token: string): AuthToken | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AuthToken;
  } catch (error) {
    return null;
  }
}

export function getUserFromRequest(request: NextRequest): AuthToken | null {
  // Try to get token from Authorization header
  const authHeader = request.headers.get("authorization");
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.substring(7);
    return verifyToken(token);
  }

  // Try to get token from cookies
  const tokenCookie = request.cookies.get("auth-token");
  if (tokenCookie) {
    return verifyToken(tokenCookie.value);
  }

  return null;
}

export function hasRole(user: AuthToken | null, requiredRole: string): boolean {
  if (!user) return false;

  const roleHierarchy = {
    ADMIN: 3,
    CLIENT: 2,
    FREELANCER: 1,
  };

  const userLevel = roleHierarchy[user.role as keyof typeof roleHierarchy] || 0;
  const requiredLevel =
    roleHierarchy[requiredRole as keyof typeof roleHierarchy] || 0;

  return userLevel >= requiredLevel;
}
