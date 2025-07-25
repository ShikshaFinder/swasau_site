import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email, name } = await req.json();
    if (!email) {
      return new Response(JSON.stringify({ error: "Missing email" }), {
        status: 400,
      });
    }

    // Check if already on waitlist
    const existing = await prisma.waitlist.findUnique({ where: { email } });
    if (existing) {
      return new Response(
        JSON.stringify({ error: "Email already on waitlist" }),
        { status: 409 }
      );
    }

    // Add to waitlist
    const entry = await prisma.waitlist.create({
      data: { email, name },
    });

    return new Response(
      JSON.stringify({ message: "Added to waitlist!", entry }),
      { status: 201 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
