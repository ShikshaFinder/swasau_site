import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import { z } from "zod";

const prisma = new PrismaClient();

// Validation schema for updating intern
const updateInternSchema = z.object({
  name: z.string().min(2).optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  qualification: z.string().optional(),
  resumeLink: z.string().url().optional(),
  portfolio: z.string().url().optional().or(z.literal("")),
  github: z.string().url().optional().or(z.literal("")),
  linkedin: z.string().url().optional().or(z.literal("")),
  skills: z.string().optional(),
  experience: z.string().optional(),
  project: z.string().optional(),
  whyJoin: z.string().optional(),
  photoUrl: z.string().url().optional(),
  isSelected: z.boolean().optional(),
  status: z.enum(["pending", "selected", "rejected"]).optional(),
  adminNotes: z.string().optional(),
});

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);

    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid intern ID" }, { status: 400 });
    }

    const intern = await prisma.intern.findUnique({
      where: { id },
    });

    if (!intern) {
      return NextResponse.json({ error: "Intern not found" }, { status: 404 });
    }

    return NextResponse.json({ intern });
  } catch (error) {
    console.error("Error fetching intern:", error);
    return NextResponse.json(
      { error: "Failed to fetch intern" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);

    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid intern ID" }, { status: 400 });
    }

    const body = await request.json();
    const validatedData = updateInternSchema.parse(body);

    // If email is being updated, check for duplicates
    if (validatedData.email) {
      const existingIntern = await prisma.intern.findFirst({
        where: {
          email: validatedData.email,
          id: { not: id },
        },
      });

      if (existingIntern) {
        return NextResponse.json(
          { error: "An intern with this email already exists" },
          { status: 400 }
        );
      }
    }

    // Update selectedAt if isSelected is being set to true
    if (validatedData.isSelected === true) {
      validatedData.selectedAt = new Date();
    }

    const intern = await prisma.intern.update({
      where: { id },
      data: validatedData,
    });

    return NextResponse.json({
      message: "Intern updated successfully",
      intern,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Error updating intern:", error);
    return NextResponse.json(
      { error: "Failed to update intern" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);

    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid intern ID" }, { status: 400 });
    }

    await prisma.intern.delete({
      where: { id },
    });

    return NextResponse.json({
      message: "Intern deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting intern:", error);
    return NextResponse.json(
      { error: "Failed to delete intern" },
      { status: 500 }
    );
  }
}
