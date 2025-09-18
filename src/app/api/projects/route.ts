import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import { z } from "zod";

const prisma = new PrismaClient();

// Validation schema for creating a project
const createProjectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.enum([
    "IOT",
    "AI",
    "WEBSITE",
    "SOFTWARE",
    "MOBILE_APP",
    "BLOCKCHAIN",
    "CYBERSECURITY",
    "DATA_ANALYTICS",
    "OTHER",
  ]),
  budget: z.number().positive().optional(),
  deadline: z.string().datetime().optional(),
});

// GET /api/projects - Get projects based on user role
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const role = searchParams.get("role");

    if (!userId || !role) {
      return NextResponse.json(
        { error: "Missing userId or role" },
        { status: 400 }
      );
    }

    let projects;

    if (role === "CLIENT") {
      // Clients can only see their own projects
      const client = await prisma.client.findUnique({
        where: { userId: parseInt(userId) },
      });

      if (!client) {
        return NextResponse.json(
          { error: "Client not found" },
          { status: 404 }
        );
      }

      projects = await prisma.project.findMany({
        where: { clientId: client.id },
        include: {
          client: {
            include: { user: { select: { name: true, email: true } } },
          },
          bids: {
            include: {
              freelancer: {
                select: {
                  title: true,
                  user: { select: { name: true } },
                },
              },
            },
          },
          _count: { select: { bids: true } },
        },
        orderBy: { createdAt: "desc" },
      });
    } else if (role === "FREELANCER") {
      // Freelancers can see all public projects and their own bids
      const freelancer = await prisma.freelancer.findUnique({
        where: { userId: parseInt(userId) },
      });

      if (!freelancer) {
        return NextResponse.json(
          { error: "Freelancer not found" },
          { status: 404 }
        );
      }

      projects = await prisma.project.findMany({
        where: {
          OR: [
            { isPublic: true },
            {
              bids: {
                some: { freelancerId: freelancer.id },
              },
            },
          ],
        },
        include: {
          client: {
            include: { user: { select: { name: true, email: true } } },
          },
          bids: {
            where: { freelancerId: freelancer.id },
            include: {
              freelancer: {
                select: {
                  title: true,
                  user: { select: { name: true } },
                },
              },
            },
          },
          _count: { select: { bids: true } },
        },
        orderBy: { createdAt: "desc" },
      });
    } else if (role === "ADMIN") {
      // Admins can see all projects
      projects = await prisma.project.findMany({
        include: {
          client: {
            include: { user: { select: { name: true, email: true } } },
          },
          bids: {
            include: {
              freelancer: {
                select: {
                  title: true,
                  user: { select: { name: true } },
                },
              },
            },
          },
          _count: { select: { bids: true } },
        },
        orderBy: { createdAt: "desc" },
      });
    } else {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }

    return NextResponse.json({ projects });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

// POST /api/projects - Create a new project (CLIENT only)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, role, ...projectData } = body;

    if (role !== "CLIENT") {
      return NextResponse.json(
        { error: "Only clients can create projects" },
        { status: 403 }
      );
    }

    const validatedData = createProjectSchema.parse(projectData);

    // Find the client
    const client = await prisma.client.findUnique({
      where: { userId: parseInt(userId) },
    });

    if (!client) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 });
    }

    const project = await prisma.project.create({
      data: {
        ...validatedData,
        deadline: validatedData.deadline
          ? new Date(validatedData.deadline)
          : null,
        clientId: client.id,
      },
      include: {
        client: {
          include: { user: { select: { name: true, email: true } } },
        },
        _count: { select: { assignments: true } },
      },
    });

    return NextResponse.json({
      message: "Project created successfully",
      project,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Error creating project:", error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}
