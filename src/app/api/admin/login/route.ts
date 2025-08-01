import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Hardcoded admin credentials (in production, use environment variables)
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "swasau2024";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = loginSchema.parse(body);

    // Check credentials
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      // Create a simple session token (in production, use proper JWT)
      const sessionToken = Buffer.from(`${username}:${Date.now()}`).toString(
        "base64"
      );

      const response = NextResponse.json({
        message: "Login successful",
        user: { username, role: "admin" },
      });

      // Set session cookie
      response.cookies.set("admin-session", sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24, // 24 hours
      });

      return response;
    } else {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Login error:", error);
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const sessionToken = request.cookies.get("admin-session");

    if (!sessionToken) {
      return NextResponse.json({ isAuthenticated: false }, { status: 401 });
    }

    // Simple session validation (in production, use proper JWT validation)
    try {
      const decoded = Buffer.from(sessionToken.value, "base64").toString();
      const [username] = decoded.split(":");

      if (username === ADMIN_USERNAME) {
        return NextResponse.json({
          isAuthenticated: true,
          user: { username, role: "admin" },
        });
      }
    } catch (e) {
      // Invalid token
    }

    return NextResponse.json({ isAuthenticated: false }, { status: 401 });
  } catch (error) {
    console.error("Session check error:", error);
    return NextResponse.json(
      { error: "Session check failed" },
      { status: 500 }
    );
  }
}
