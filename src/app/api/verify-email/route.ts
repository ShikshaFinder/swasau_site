import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { token } = await req.json();
    if (!token) {
      return new Response(JSON.stringify({ error: "Missing token" }), {
        status: 400,
      });
    }

    // Find user by verification token
    const user = await prisma.user.findFirst({
      where: { verificationToken: token },
    });
    if (!user) {
      return new Response(
        JSON.stringify({ error: "Invalid or expired token" }),
        { status: 400 }
      );
    }

    // Mark user as verified and clear the token
    await prisma.user.update({
      where: { id: user.id },
      data: { emailVerified: true, verificationToken: null },
    });

    return new Response(
      JSON.stringify({ message: "Email verified successfully." }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
