import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import { z } from "zod";

const prisma = new PrismaClient();

// Validation schema for bid update
const bidUpdateSchema = z.object({
  amount: z.number().positive().optional(),
  timeline: z.string().optional(),
  coverLetter: z.string().min(10).optional(),
  status: z.enum(["pending", "accepted", "rejected", "withdrawn"]).optional(),
});

// GET /api/bids/[id] - Get bid by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam);

    if (isNaN(id)) {
      return NextResponse.json(
        { error: "Invalid bid ID" },
        { status: 400 }
      );
    }

    const bid = await prisma.bid.findUnique({
      where: { id },
      include: {
        project: {
          include: {
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
          include: {
            user: {
              select: {
                name: true,
                email: true,
              },
            },
            skills: {
              include: {
                skill: true,
              },
            },
          },
        },
      },
    });

    if (!bid) {
      return NextResponse.json(
        { error: "Bid not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ bid });
  } catch (error) {
    console.error("Error fetching bid:", error);
    return NextResponse.json(
      { error: "Failed to fetch bid" },
      { status: 500 }
    );
  }
}

// PUT /api/bids/[id] - Update bid
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam);
    const userId = request.headers.get("x-user-id");
    const userRole = request.headers.get("x-user-role");

    if (isNaN(id)) {
      return NextResponse.json(
        { error: "Invalid bid ID" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const validatedData = bidUpdateSchema.parse(body);

    // Get bid with project and freelancer info
    const bid = await prisma.bid.findUnique({
      where: { id },
      include: {
        project: {
          include: {
            client: true,
          },
        },
        freelancer: {
          include: {
            user: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    if (!bid) {
      return NextResponse.json(
        { error: "Bid not found" },
        { status: 404 }
      );
    }

    // Check permissions
    const isFreelancer = bid.freelancer.userId === parseInt(userId || "0");
    const isClient = bid.project.client.userId === parseInt(userId || "0");
    const isAdmin = userRole === "ADMIN";

    if (!isFreelancer && !isClient && !isAdmin) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 403 }
      );
    }

    // Only freelancer can update bid details (not status)
    if (isFreelancer && validatedData.status) {
      return NextResponse.json(
        { error: "Freelancers cannot change bid status" },
        { status: 403 }
      );
    }

    // Only client or admin can change bid status
    if ((isClient || isAdmin) && validatedData.status) {
      // If accepting bid, update project status and assign freelancer
      if (validatedData.status === "accepted") {
        await prisma.$transaction(async (tx) => {
          // Update bid status
          await tx.bid.update({
            where: { id },
            data: { status: "accepted" },
          });

          // Reject all other bids for this project
          await tx.bid.updateMany({
            where: {
              projectId: bid.projectId,
              id: { not: id },
              status: "pending",
            },
            data: { status: "rejected" },
          });

          // Update project status and assign freelancer
          await tx.project.update({
            where: { id: bid.projectId },
            data: {
              status: "IN_PROGRESS",
              freelancerId: bid.freelancerId,
            },
          });

          // Create contract
          await tx.contract.create({
            data: {
              projectId: bid.projectId,
              freelancerId: bid.freelancerId,
              clientId: bid.project.clientId,
              amount: bid.amount,
              startDate: new Date(),
              status: "active",
            },
          });

          // Create notifications
          await tx.notification.createMany({
            data: [
              {
                userId: bid.freelancer.userId,
                title: "Bid Accepted",
                message: `Your bid for "${bid.project.title}" has been accepted!`,
                type: "bid",
                data: {
                  projectId: bid.projectId,
                  bidId: id,
                },
              },
              {
                userId: bid.project.client.userId,
                title: "Project Started",
                message: `Project "${bid.project.title}" has been assigned to ${bid.freelancer.user.name}`,
                type: "project",
                data: {
                  projectId: bid.projectId,
                  freelancerId: bid.freelancerId,
                },
              },
            ],
          });
        });
      } else {
        // Just update bid status
        await prisma.bid.update({
          where: { id },
          data: { status: validatedData.status },
        });

        // Create notification for freelancer
        await prisma.notification.create({
          data: {
            userId: bid.freelancer.userId,
            title: "Bid Status Updated",
            message: `Your bid for "${bid.project.title}" has been ${validatedData.status}`,
            type: "bid",
            data: {
              projectId: bid.projectId,
              bidId: id,
            },
          },
        });
      }
    } else {
      // Update bid details (only freelancer can do this)
      await prisma.bid.update({
        where: { id },
        data: {
          amount: validatedData.amount,
          timeline: validatedData.timeline,
          coverLetter: validatedData.coverLetter,
        },
      });
    }

    // Return updated bid
    const updatedBid = await prisma.bid.findUnique({
      where: { id },
      include: {
        project: {
          include: {
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
          include: {
            user: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json({ bid: updatedBid });
  } catch (error) {
    console.error("Error updating bid:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to update bid" },
      { status: 500 }
    );
  }
}

// DELETE /api/bids/[id] - Delete bid (withdraw)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam);
    const userId = request.headers.get("x-user-id");

    if (isNaN(id)) {
      return NextResponse.json(
        { error: "Invalid bid ID" },
        { status: 400 }
      );
    }

    // Get bid to check ownership
    const bid = await prisma.bid.findUnique({
      where: { id },
      include: {
        freelancer: true,
      },
    });

    if (!bid) {
      return NextResponse.json(
        { error: "Bid not found" },
        { status: 404 }
      );
    }

    // Only freelancer can delete their own bid
    if (bid.freelancer.userId !== parseInt(userId || "0")) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 403 }
      );
    }

    // Only pending bids can be deleted
    if (bid.status !== "pending") {
      return NextResponse.json(
        { error: "Only pending bids can be withdrawn" },
        { status: 400 }
      );
    }

    await prisma.bid.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Bid withdrawn successfully" });
  } catch (error) {
    console.error("Error deleting bid:", error);
    return NextResponse.json(
      { error: "Failed to delete bid" },
      { status: 500 }
    );
  }
}
