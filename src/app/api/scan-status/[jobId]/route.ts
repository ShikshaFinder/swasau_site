import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { azureService } from "@/lib/azure";
import { ScanStatusResponse } from "@/lib/types";

export async function GET(
  request: NextRequest,
  { params }: { params: { jobId: string } }
): Promise<NextResponse> {
  try {
    const { jobId } = params;

    // Authenticate user
    const user = await getSession(request);
    if (!user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // Get job status from Azure service
    const jobStatus = await azureService.getJobStatus(jobId);

    if (!jobStatus) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    // In a real implementation, you'd verify the user owns this job
    // For now, we'll allow access to any job (add proper ownership check)

    const response: ScanStatusResponse = {
      jobId,
      status: jobStatus.status,
      estimatedTime:
        jobStatus.status === "pending" || jobStatus.status === "processing"
          ? "30s"
          : undefined,
      result: jobStatus.result,
    };

    // Log the status check
    console.log(`Scan status checked for job ${jobId}:`, {
      userId: user.id,
      status: jobStatus.status,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Scan status error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve scan status" },
      { status: 500 }
    );
  }
}

// Handle OPTIONS for CORS
export async function OPTIONS(request: NextRequest): Promise<NextResponse> {
  return new NextResponse(null, { status: 200 });
}
