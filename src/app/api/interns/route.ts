import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import { z } from "zod";

const prisma = new PrismaClient();

// Validation schema for intern application
const internApplicationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  qualification: z.string().min(1, "Qualification is required"),
  resumeLink: z.string().url("Resume link must be a valid URL"),
  portfolio: z.string().url().optional().or(z.literal("")),
  github: z.string().url().optional().or(z.literal("")),
  linkedin: z.string().url().optional().or(z.literal("")),
  skills: z.string().min(1, "Skills are required"),
  experience: z.string().optional(),
  project: z.string().optional(),
  whyJoin: z.string().min(10, "Please provide a detailed reason for joining"),
});

export async function GET() {
  try {
    const interns = await prisma.intern.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ interns });
  } catch (error) {
    console.error("Error fetching interns:", error);
    return NextResponse.json(
      { error: "Failed to fetch interns" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate the request body
    const validatedData = internApplicationSchema.parse(body);

    // Check if email already exists
    const existingIntern = await prisma.intern.findUnique({
      where: { email: validatedData.email },
    });

    if (existingIntern) {
      return NextResponse.json(
        { error: "An application with this email already exists" },
        { status: 400 }
      );
    }

    // Create new intern application
    const intern = await prisma.intern.create({
      data: validatedData,
    });

    return NextResponse.json(
      {
        message: "Application submitted successfully!",
        intern,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Error creating intern application:", error);
    return NextResponse.json(
      { error: "Failed to submit application", details: error },
      { status: 500 }
    );
  }
}
