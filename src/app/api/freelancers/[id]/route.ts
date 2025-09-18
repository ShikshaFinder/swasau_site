import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

// GET /api/freelancers/[id] - Get freelancer profile by ID
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

    const freelancer = await prisma.freelancer.findUnique({
      where: { id },
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
        skills: {
          include: {
            skill: true,
          },
        },
        portfolios: true,
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

    if (!freelancer) {
      return NextResponse.json(
        { error: "Freelancer not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ freelancer });
  } catch (error) {
    console.error("Error fetching freelancer:", error);
    return NextResponse.json(
      { error: "Failed to fetch freelancer" },
      { status: 500 }
    );
  }
}

// PUT /api/freelancers/[id] - Update freelancer profile
export async function PUT(
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
    const {
      phone,
      bio,
      title,
      hourlyRate,
      availability,
      timezone,
      languages,
      experience,
      education,
      certifications,
      portfolio,
      github,
      linkedin,
      twitter,
      website,
      photoUrl,
      resumeUrl,
    } = body;

    const updatedFreelancer = await prisma.freelancer.update({
      where: { id },
      data: {
        phone,
        bio,
        title,
        hourlyRate: hourlyRate ? parseFloat(hourlyRate) : undefined,
        availability,
        timezone,
        languages: languages || [],
        experience,
        education,
        certifications: certifications || [],
        portfolio,
        github,
        linkedin,
        twitter,
        website,
        photoUrl,
        resumeUrl,
        profileCompletion: calculateProfileCompletion(body),
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

    return NextResponse.json({ freelancer: updatedFreelancer });
  } catch (error) {
    console.error("Error updating freelancer:", error);
    return NextResponse.json(
      { error: "Failed to update freelancer" },
      { status: 500 }
    );
  }
}

// Helper function to calculate profile completion percentage
function calculateProfileCompletion(data: any): number {
  const fields = [
    "phone",
    "bio",
    "title",
    "hourlyRate",
    "availability",
    "timezone",
    "languages",
    "experience",
    "education",
    "certifications",
    "portfolio",
    "github",
    "linkedin",
    "photoUrl",
    "resumeUrl",
  ];

  const completedFields = fields.filter(field => {
    const value = data[field];
    return value !== undefined && value !== null && value !== "";
  });

  return Math.round((completedFields.length / fields.length) * 100);
}


