import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import { z } from "zod";

const prisma = new PrismaClient();

// Validation schema for file submission
const fileSubmissionSchema = z.object({
  url: z.string().url("Invalid URL"),
  type: z.string().min(1, "File type is required"),
  name: z.string().min(1, "File name is required"),
  source: z.string().optional().default("google_drive"),
});

export async function POST(request: NextRequest) {
  try {
    // Get user from headers (set by middleware)
    const userId = request.headers.get("x-user-id");
    const userRole = request.headers.get("x-user-role");

    if (!userId) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const validatedData = fileSubmissionSchema.parse(body);

    // Create file record in database (you can extend this based on your needs)
    const fileRecord = {
      url: validatedData.url,
      type: validatedData.type,
      name: validatedData.name,
      source: validatedData.source,
      userId: parseInt(userId),
      submittedAt: new Date(),
    };

    // Here you can save to database or process the file
    // For now, we'll just return success
    console.log("File submitted:", fileRecord);

    return NextResponse.json({
      message: "File submitted successfully",
      file: fileRecord,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }

    console.error("File submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit file" },
      { status: 500 }
    );
  }
}
