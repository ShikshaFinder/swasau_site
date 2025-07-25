import { PrismaClient } from "@/generated/prisma";
import { randomBytes } from "crypto";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email) {
      return new Response(JSON.stringify({ error: "Missing email" }), { status: 400 });
    }

    // Find user
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    // Generate reset token
    const token = randomBytes(32).toString("hex");
    // Store token in DB (add a field to User or create a PasswordReset table in production)
    // For demo, just log it
    console.log(`Reset token for ${email}: ${token}`);

    // Send email using Resend API
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "Missing RESEND_API_KEY" }), { status: 500 });
    }
      const resetUrl = `https://aicybershield.tech/reset-password?token=${token}`;
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: "no-reply@aicybershield.tech",
        to: email,
        subject: "Password Reset",
        html: `<p>Click <a href='${resetUrl}'>here</a> to reset your password.</p>`
      })
    });

    return new Response(JSON.stringify({ message: "Reset email sent" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
} 