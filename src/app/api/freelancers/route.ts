import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import { z } from "zod";

const prisma = new PrismaClient();

// Validation schema for freelancer profile
const freelancerProfileSchema = z.object({
  phone: z.string().optional(),
  bio: z.string().optional(),
  title: z.string().optional(),
  hourlyRate: z.number().positive().optional(),
  availability: z.string().optional(),
  timezone: z.string().optional(),
  languages: z.array(z.string()).optional(),
  experience: z.string().optional(),
  education: z.string().optional(),
  certifications: z.array(z.string()).optional(),
  portfolio: z.string().url().optional(),
  github: z.string().url().optional(),
  linkedin: z.string().url().optional(),
  twitter: z.string().url().optional(),
  website: z.string().url().optional(),
  photoUrl: z.string().url().optional(),
  resumeUrl: z.string().url().optional(),
});

// GET /api/freelancers - Get freelancers with filters
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search");
    const skills = searchParams.get("skills")?.split(",");
    const category = searchParams.get("category");
    const minRate = searchParams.get("minRate");
    const maxRate = searchParams.get("maxRate");
    const availability = searchParams.get("availability");

    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {
      status: "active",
      isAvailable: true,
    };

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { bio: { contains: search, mode: "insensitive" } },
        { user: { name: { contains: search, mode: "insensitive" } } },
      ];
    }

    if (skills && skills.length > 0) {
      where.skills = {
        hasSome: skills,
      };
    }

    if (minRate || maxRate) {
      where.hourlyRate = {};
      if (minRate) where.hourlyRate.gte = parseFloat(minRate);
      if (maxRate) where.hourlyRate.lte = parseFloat(maxRate);
    }

    if (availability) {
      where.availability = availability;
    }

    const [freelancers, total] = await Promise.all([
      prisma.freelancer.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              emailVerified: true,
            },
          },
          skills: {
            include: {
              skill: true,
            },
          },
        },
        skip,
        take: limit,
        orderBy: {
          averageRating: "desc",
        },
      }),
      prisma.freelancer.count({ where }),
    ]);

    return NextResponse.json({
      freelancers,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching freelancers:", error);
    return NextResponse.json(
      { error: "Failed to fetch freelancers" },
      { status: 500 }
    );
  }
}

// POST /api/freelancers - Create or update freelancer profile
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
    const validatedData = freelancerProfileSchema.parse(body);

    // Check if freelancer profile exists
    const existingFreelancer = await prisma.freelancer.findUnique({
      where: { userId: parseInt(userId) },
    });

    let freelancer;
    if (existingFreelancer) {
      // Update existing profile
      freelancer = await prisma.freelancer.update({
        where: { userId: parseInt(userId) },
        data: {
          ...validatedData,
          profileCompletion: calculateProfileCompletion(validatedData),
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
    } else {
      // Create new profile
      freelancer = await prisma.freelancer.create({
        data: {
          userId: parseInt(userId),
          ...validatedData,
          profileCompletion: calculateProfileCompletion(validatedData),
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
    }

    return NextResponse.json({ freelancer });
  } catch (error) {
    console.error("Error creating/updating freelancer profile:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to create/update profile" },
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


