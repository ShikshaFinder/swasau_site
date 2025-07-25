import { PrismaClient } from "@/generated/prisma";
import { randomBytes } from "crypto";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return new Response(JSON.stringify({ error: "Missing fields" }), {
        status: 400,
      });
    }

    // Find user
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return new Response(JSON.stringify({ error: "Invalid credentials" }), {
        status: 401,
      });
    }

    // Verify password (you'll need to import bcryptjs)
    const { compare } = await import("bcryptjs");
    const isValid = await compare(password, user.password);
    if (!isValid) {
      return new Response(JSON.stringify({ error: "Invalid credentials" }), {
        status: 401,
      });
    }

    // Generate API token
    const token = randomBytes(32).toString("hex");

    // Check if user already has an API token
    const existingToken = await prisma.apiToken.findFirst({
      where: { userId: user.id },
    });

    let apiToken;
    if (existingToken) {
      // Update existing token
      apiToken = await prisma.apiToken.update({
        where: { id: existingToken.id },
        data: {
          token,
          lastUsed: new Date(),
        },
      });
    } else {
      // Create new token
      apiToken = await prisma.apiToken.create({
        data: {
          token,
          userId: user.id,
          name: "Browser Extension",
        },
      });
    }

    return new Response(
      JSON.stringify({
        message: "Token generated successfully",
        token: apiToken.token,
        user: { id: user.id, email: user.email, name: user.name },
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
