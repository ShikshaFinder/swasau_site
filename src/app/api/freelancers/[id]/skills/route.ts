import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import { z } from "zod";

const prisma = new PrismaClient();

// Validation schema for freelancer skill
const freelancerSkillSchema = z.object({
  skillId: z.number(),
  level: z.enum(["beginner", "intermediate", "expert"]).default("intermediate"),
  yearsOfExp: z.number().min(0).optional(),
});

// GET /api/freelancers/[id]/skills - Get freelancer skills
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam);

    if (isNaN(id)) {
      return NextResponse.json(
        { error: "Invalid freelancer ID" },
        { status: 400 }
      );
    }

    const skills = await prisma.freelancerSkill.findMany({
      where: { freelancerId: id },
      include: {
        skill: true,
      },
      orderBy: {
        skill: {
          name: "asc",
        },
      },
    });

    return NextResponse.json({ skills });
  } catch (error) {
    console.error("Error fetching freelancer skills:", error);
    return NextResponse.json(
      { error: "Failed to fetch skills" },
      { status: 500 }
    );
  }
}

// POST /api/freelancers/[id]/skills - Add skill to freelancer
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam);
    const userId = request.headers.get("x-user-id");

    if (isNaN(id)) {
      return NextResponse.json(
        { error: "Invalid freelancer ID" },
        { status: 400 }
      );
    }

    // Check if user owns this profile
    const freelancer = await prisma.freelancer.findUnique({
      where: { id },
    });

    if (!freelancer || freelancer.userId !== parseInt(userId || "0")) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const validatedData = freelancerSkillSchema.parse(body);

    // Check if skill already exists for this freelancer
    const existingSkill = await prisma.freelancerSkill.findUnique({
      where: {
        freelancerId_skillId: {
          freelancerId: id,
          skillId: validatedData.skillId,
        },
      },
    });

    if (existingSkill) {
      return NextResponse.json(
        { error: "Skill already added" },
        { status: 409 }
      );
    }

    const freelancerSkill = await prisma.freelancerSkill.create({
      data: {
        freelancerId: id,
        ...validatedData,
      },
      include: {
        skill: true,
      },
    });

    return NextResponse.json({ skill: freelancerSkill }, { status: 201 });
  } catch (error) {
    console.error("Error adding skill:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to add skill" },
      { status: 500 }
    );
  }
}

// DELETE /api/freelancers/[id]/skills - Remove skill from freelancer
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam);
    const userId = request.headers.get("x-user-id");
    const { searchParams } = new URL(request.url);
    const skillId = searchParams.get("skillId");

    if (isNaN(id) || !skillId) {
      return NextResponse.json(
        { error: "Invalid freelancer ID or skill ID" },
        { status: 400 }
      );
    }

    // Check if user owns this profile
    const freelancer = await prisma.freelancer.findUnique({
      where: { id },
    });

    if (!freelancer || freelancer.userId !== parseInt(userId || "0")) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 403 }
      );
    }

    await prisma.freelancerSkill.delete({
      where: {
        freelancerId_skillId: {
          freelancerId: id,
          skillId: parseInt(skillId),
        },
      },
    });

    return NextResponse.json({ message: "Skill removed successfully" });
  } catch (error) {
    console.error("Error removing skill:", error);
    return NextResponse.json(
      { error: "Failed to remove skill" },
      { status: 500 }
    );
  }
}


