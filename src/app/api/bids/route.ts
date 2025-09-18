import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import { z } from "zod";

const prisma = new PrismaClient();

// Validation schema for bid
const bidSchema = z.object({
  projectId: z.number(),
  amount: z.number().positive("Amount must be positive"),
  timeline: z.string().optional(),
  coverLetter: z.string().min(10, "Cover letter must be at least 10 characters").optional(),
});

// GET /api/bids - Get bids with filters
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get("projectId");
    const freelancerId = searchParams.get("freelancerId");
    const status = searchParams.get("status");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    const skip = (page - 1) * limit;

    const where: any = {};

    if (projectId) {
      where.projectId = parseInt(projectId);
    }

    if (freelancerId) {
      where.freelancerId = parseInt(freelancerId);
    }

    if (status) {
      where.status = status;
    }

    const [bids, total] = await Promise.all([
      prisma.bid.findMany({
        where,
        include: {
          project: {
            select: {
              id: true,
              title: true,
              description: true,
              category: true,
              budget: true,
              deadline: true,
              status: true,
              client: {
                select: {
                  company: true,
                  user: {
                    select: {
                      name: true,
                      email: true,
                    },
                  },
                },
              },
            },
          },
          freelancer: {
            select: {
              id: true,
              title: true,
              hourlyRate: true,
              averageRating: true,
              totalProjects: true,
              user: {
                select: {
                  name: true,
                  email: true,
                },
              },
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        skip,
        take: limit,
      }),
      prisma.bid.count({ where }),
    ]);

    return NextResponse.json({
      bids,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching bids:", error);
    return NextResponse.json(
      { error: "Failed to fetch bids" },
      { status: 500 }
    );
  }
}

// POST /api/bids - Create new bid
export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id");
    if (!userId) {
      return NextResponse.json(
        { error: "User ID required" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const validatedData = bidSchema.parse(body);

    // Get freelancer ID from user ID
    const freelancer = await prisma.freelancer.findUnique({
      where: { userId: parseInt(userId) },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    if (!freelancer) {
      return NextResponse.json(
        { error: "Freelancer profile not found" },
        { status: 404 }
      );
    }

    // Check if project exists and is open for bidding
    const project = await prisma.project.findUnique({
      where: { id: validatedData.projectId },
      include: {
        client: true,
      },
    });

    if (!project) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    if (project.status !== "PENDING") {
      return NextResponse.json(
        { error: "Project is not open for bidding" },
        { status: 400 }
      );
    }

    // Check if freelancer already bid on this project
    const existingBid = await prisma.bid.findUnique({
      where: {
        projectId_freelancerId: {
          projectId: validatedData.projectId,
          freelancerId: freelancer.id,
        },
      },
    });

    if (existingBid) {
      return NextResponse.json(
        { error: "You have already bid on this project" },
        { status: 409 }
      );
    }

    // Create bid
    const bid = await prisma.bid.create({
      data: {
        projectId: validatedData.projectId,
        freelancerId: freelancer.id,
        amount: validatedData.amount,
        timeline: validatedData.timeline,
        coverLetter: validatedData.coverLetter,
      },
      include: {
        project: {
          select: {
            title: true,
            client: {
              select: {
                user: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
        freelancer: {
          select: {
            user: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    // Create notification for client
    await prisma.notification.create({
      data: {
        userId: project.client.userId,
        title: "New Bid Received",
        message: `${freelancer.user.name} has submitted a bid for your project "${project.title}"`,
        type: "bid",
        data: {
          projectId: project.id,
          bidId: bid.id,
          freelancerId: freelancer.id,
        },
      },
    });

    return NextResponse.json({ bid }, { status: 201 });
  } catch (error) {
    console.error("Error creating bid:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to create bid" },
      { status: 500 }
    );
  }
}
