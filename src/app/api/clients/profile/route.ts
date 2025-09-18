import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import { z } from "zod";

const prisma = new PrismaClient();

// Validation schema for client profile
const clientProfileSchema = z.object({
  company: z.string().optional(),
  phone: z.string().optional(),
  industry: z.string().optional(),
  companySize: z.string().optional(),
  website: z.string().url().optional(),
  description: z.string().optional(),
  registrationNumber: z.string().optional(),
  gstNumber: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  pincode: z.string().optional(),
});

// GET /api/clients/profile - Get client profile
export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id");
    if (!userId) {
      return NextResponse.json(
        { error: "User ID required" },
        { status: 401 }
      );
    }

    const client = await prisma.client.findUnique({
      where: { userId: parseInt(userId) },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            emailVerified: true,
            createdAt: true,
          },
        },
        projects: {
          select: {
            id: true,
            title: true,
            status: true,
            createdAt: true,
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 10,
        },
        reviews: {
          include: {
            reviewer: {
              select: {
                name: true,
              },
            },
            project: {
              select: {
                title: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 10,
        },
      },
    });

    if (!client) {
      return NextResponse.json(
        { error: "Client profile not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ client });
  } catch (error) {
    console.error("Error fetching client profile:", error);
    return NextResponse.json(
      { error: "Failed to fetch client profile" },
      { status: 500 }
    );
  }
}

// PUT /api/clients/profile - Update client profile
export async function PUT(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id");
    if (!userId) {
      return NextResponse.json(
        { error: "User ID required" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const validatedData = clientProfileSchema.parse(body);

    const client = await prisma.client.upsert({
      where: { userId: parseInt(userId) },
      update: validatedData,
      create: {
        userId: parseInt(userId),
        ...validatedData,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            emailVerified: true,
          },
        },
      },
    });

    return NextResponse.json({ client });
  } catch (error) {
    console.error("Error updating client profile:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to update client profile" },
      { status: 500 }
    );
  }
}


