import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import { z } from "zod";

const prisma = new PrismaClient();

// Validation schema for assignment
const assignmentSchema = z.object({
  projectId: z.number(),
  internId: z.number(),
  notes: z.string().optional(),
});

// GET /api/assignments - Get assignments (ADMIN only)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const role = searchParams.get("role");

    if (role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const assignments = await prisma.assignment.findMany({
      include: {
        project: {
          include: {
            client: {
              include: { user: { select: { name: true, email: true } } },
            },
          },
        },
        intern: {
          select: {
            name: true,
            email: true,
            skills: true,
            availability: true,
            linkedin: true,
          },
        },
      },
      orderBy: { assignedAt: "desc" },
    });

    return NextResponse.json({ assignments });
  } catch (error) {
    console.error("Error fetching assignments:", error);
    return NextResponse.json(
      { error: "Failed to fetch assignments" },
      { status: 500 }
    );
  }
}

// POST /api/assignments - Create new assignment (ADMIN only)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { role, ...assignmentData } = body;

    if (role !== "ADMIN") {
      return NextResponse.json(
        { error: "Only admins can assign interns" },
        { status: 403 }
      );
    }

    const validatedData = assignmentSchema.parse(assignmentData);

    // Check if assignment already exists
    const existingAssignment = await prisma.assignment.findUnique({
      where: {
        projectId_internId: {
          projectId: validatedData.projectId,
          internId: validatedData.internId,
        },
      },
    });

    if (existingAssignment) {
      return NextResponse.json(
        { error: "Intern is already assigned to this project" },
        { status: 400 }
      );
    }

    const assignment = await prisma.assignment.create({
      data: validatedData,
      include: {
        project: {
          include: {
            client: {
              include: { user: { select: { name: true, email: true } } },
            },
          },
        },
        intern: {
          select: {
            name: true,
            email: true,
            skills: true,
            availability: true,
          },
        },
      },
    });

    // Update project status to IN_PROGRESS if it was PENDING
    await prisma.project.updateMany({
      where: {
        id: validatedData.projectId,
        status: "PENDING",
      },
      data: { status: "IN_PROGRESS" },
    });

    return NextResponse.json({
      message: "Intern assigned successfully",
      assignment,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Error creating assignment:", error);
    return NextResponse.json(
      { error: "Failed to create assignment" },
      { status: 500 }
    );
  }
}

// DELETE /api/assignments - Remove assignment (ADMIN only)
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const role = searchParams.get("role");
    const projectId = searchParams.get("projectId");
    const internId = searchParams.get("internId");

    if (role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    if (!projectId || !internId) {
      return NextResponse.json(
        { error: "Missing projectId or internId" },
        { status: 400 }
      );
    }

    await prisma.assignment.delete({
      where: {
        projectId_internId: {
          projectId: parseInt(projectId),
          internId: parseInt(internId),
        },
      },
    });

    // Check if project has any remaining assignments
    const remainingAssignments = await prisma.assignment.count({
      where: { projectId: parseInt(projectId) },
    });

    // If no assignments left, set project back to PENDING
    if (remainingAssignments === 0) {
      await prisma.project.update({
        where: { id: parseInt(projectId) },
        data: { status: "PENDING" },
      });
    }

    return NextResponse.json({
      message: "Assignment removed successfully",
    });
  } catch (error) {
    console.error("Error removing assignment:", error);
    return NextResponse.json(
      { error: "Failed to remove assignment" },
      { status: 500 }
    );
  }
}
