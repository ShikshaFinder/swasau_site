import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import { z } from "zod";

const prisma = new PrismaClient();

// Validation schema for skill
const skillSchema = z.object({
  name: z.string().min(1, "Skill name is required"),
  category: z.string().optional(),
  description: z.string().optional(),
});

// GET /api/skills - Get all skills with optional filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    const category = searchParams.get("category");
    const limit = parseInt(searchParams.get("limit") || "50");

    const where: any = {};
    
    if (search) {
      where.name = {
        contains: search,
        mode: "insensitive",
      };
    }

    if (category) {
      where.category = category;
    }

    const skills = await prisma.skill.findMany({
      where,
      take: limit,
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json({ skills });
  } catch (error) {
    console.error("Error fetching skills:", error);
    return NextResponse.json(
      { error: "Failed to fetch skills" },
      { status: 500 }
    );
  }
}

// POST /api/skills - Create new skill (Admin only)
export async function POST(request: NextRequest) {
  try {
    const userRole = request.headers.get("x-user-role");
    if (userRole !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const validatedData = skillSchema.parse(body);

    const skill = await prisma.skill.create({
      data: validatedData,
    });

    return NextResponse.json({ skill }, { status: 201 });
  } catch (error) {
    console.error("Error creating skill:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to create skill" },
      { status: 500 }
    );
  }
}


