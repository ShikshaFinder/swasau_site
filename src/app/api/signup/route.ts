import { PrismaClient } from "@/generated/prisma";
import { hash } from "bcryptjs";
import { randomBytes } from "crypto";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();
    if (!name || !email || !password) {
      return new Response(JSON.stringify({ error: "Missing fields" }), {
        status: 400,
      });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return new Response(JSON.stringify({ error: "Email already in use" }), {
        status: 409,
      });
    }

    // Hash password
    const hashedPassword = await hash(password, 10);

    // Generate verification token
    const verificationToken = randomBytes(32).toString("hex");

    // Create user with verification token
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword, verificationToken },
    });

    // Send verification email
    const apiKey = process.env.RESEND_API_KEY;
    if (apiKey) {
      const verifyUrl = `https://swasau.com/verify-email?token=${verificationToken}`;
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "no-reply@swasau.com",
          to: email,
          subject: "Verify your email",
          html: `<p>Welcome! Please <a href='${verifyUrl}'>click here</a> to verify your email address.</p>`,
        }),
      });
    }

    return new Response(
      JSON.stringify({
        message:
          "User created. Please check your email to verify your account.",
        user: { id: user.id, email: user.email, name: user.name },
      }),
      { status: 201 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
