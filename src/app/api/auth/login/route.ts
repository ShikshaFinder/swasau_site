import { NextRequest, NextResponse } from "next/server";
import { createSessionToken } from "@/lib/auth";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Simple authentication for testing
    if (email === "test@example.com" && password === "password") {
      const sessionToken = createSessionToken({
        id: "1",
        email: "test@example.com",
        name: "Test User",
        role: "user",
        createdAt: new Date(),
      });

      const response = NextResponse.json({
        success: true,
        message: "Login successful",
        user: {
          id: "1",
          email: "test@example.com",
          name: "Test User",
          role: "user",
        },
      });

      // Set session cookie
      response.cookies.set("session-token", sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      return response;
    }

    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}

export async function OPTIONS(request: NextRequest): Promise<NextResponse> {
  return new NextResponse(null, { status: 200 });
}
