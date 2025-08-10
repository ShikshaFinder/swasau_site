import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import { z } from "zod";

const prisma = new PrismaClient();

// Validation schema for updating project
const updateProjectSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().min(10).optional(),
  category: z
    .enum([
      "IOT",
      "AI",
      "WEBSITE",
      "SOFTWARE",
      "MOBILE_APP",
      "BLOCKCHAIN",
      "CYBERSECURITY",
      "DATA_ANALYTICS",
      "OTHER",
    ])
    .optional(),
  budget: z.number().positive().optional(),
  deadline: z.string().datetime().optional(),
  status: z
    .enum(["PENDING", "IN_PROGRESS", "COMPLETED", "ON_HOLD", "CANCELLED"])
    .optional(),
});

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam);

    if (isNaN(id)) {
      return NextResponse.json(
        { error: "Invalid project ID" },
        { status: 400 }
      );
    }

    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        client: {
          include: { user: { select: { name: true, email: true } } },
        },
        assignments: {
          include: {
            intern: { select: { name: true, skills: true, linkedin: true } },
          },
        },
      },
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ project });
  } catch (error) {
    console.error("Error fetching project:", error);
    return NextResponse.json(
      { error: "Failed to fetch project" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam);

    if (isNaN(id)) {
      return NextResponse.json(
        { error: "Invalid project ID" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { userId, role, ...updateData } = body;

    // Only admins can update project status, clients can update their own projects
    if (role !== "ADMIN" && role !== "CLIENT") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const validatedData = updateProjectSchema.parse(updateData);

    // If client, ensure they own the project
    if (role === "CLIENT") {
      const client = await prisma.client.findUnique({
        where: { userId: parseInt(userId) },
      });

      if (!client) {
        return NextResponse.json(
          { error: "Client not found" },
          { status: 404 }
        );
      }

      const existingProject = await prisma.project.findUnique({
        where: { id },
      });

      if (!existingProject || existingProject.clientId !== client.id) {
        return NextResponse.json(
          { error: "Project not found or access denied" },
          { status: 404 }
        );
      }

      // Clients cannot update status
      delete validatedData.status;
    }

    const project = await prisma.project.update({
      where: { id },
      data: {
        ...validatedData,
        deadline: validatedData.deadline
          ? new Date(validatedData.deadline)
          : undefined,
      },
      include: {
        client: {
          include: { user: { select: { name: true, email: true } } },
        },
        assignments: {
          include: { intern: { select: { name: true, skills: true } } },
        },
        _count: { select: { assignments: true } },
      },
    });

    return NextResponse.json({
      message: "Project updated successfully",
      project,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Error updating project:", error);
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam);

    if (isNaN(id)) {
      return NextResponse.json(
        { error: "Invalid project ID" },
        { status: 400 }
      );
    }

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const role = searchParams.get("role");

    // Only admins and project owners can delete projects
    if (role !== "ADMIN" && role !== "CLIENT") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    if (role === "CLIENT") {
      const client = await prisma.client.findUnique({
        where: { userId: parseInt(userId!) },
      });

      if (!client) {
        return NextResponse.json(
          { error: "Client not found" },
          { status: 404 }
        );
      }

      const existingProject = await prisma.project.findUnique({
        where: { id },
      });

      if (!existingProject || existingProject.clientId !== client.id) {
        return NextResponse.json(
          { error: "Project not found or access denied" },
          { status: 404 }
        );
      }
    }

    await prisma.project.delete({
      where: { id },
    });

    return NextResponse.json({
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    );
  }
}
