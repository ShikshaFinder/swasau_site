import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

// GET /api/admin/stats - Get dashboard statistics (ADMIN only)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const role = searchParams.get("role");

    if (role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // Note: These queries will work once the schema is migrated
    const stats = {
      totalProjects: 0, // await prisma.project.count(),
      ongoingProjects: 0, // await prisma.project.count({ where: { status: "IN_PROGRESS" } }),
      completedProjects: 0, // await prisma.project.count({ where: { status: "COMPLETED" } }),
      totalInterns: 0, // await prisma.intern.count(),
      activeInterns: 0, // await prisma.assignment.groupBy({ by: ["internId"] }).then(groups => groups.length),
      totalClients: 0, // await prisma.client.count(),
      pendingProjects: 0, // await prisma.project.count({ where: { status: "PENDING" } }),
    };

    return NextResponse.json({ stats });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch statistics" },
      { status: 500 }
    );
  }
}
