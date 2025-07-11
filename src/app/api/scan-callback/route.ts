import { NextRequest, NextResponse } from "next/server";
import { config } from "@/lib/config";
import { azureService } from "@/lib/azure";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Verify the callback is from Azure container
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${config.security.extensionSecret}`) {
      return NextResponse.json(
        { error: "Unauthorized callback" },
        { status: 401 }
      );
    }

    // Parse the callback payload
    const body = await request.json();
    const { jobId, userId, status, result, error } = body;

    if (!jobId || !userId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Update job status
    await azureService.updateJobStatus(jobId, status, result, error);

    // Log the callback
    console.log(`Scan callback received for job ${jobId}:`, {
      userId,
      status,
      timestamp: new Date().toISOString(),
      hasResult: !!result,
      hasError: !!error,
    });

    // Clean up Azure container after completion
    if (status === "completed" || status === "failed") {
      setTimeout(() => {
        azureService.cleanupContainer(jobId);
      }, 60000); // Clean up after 1 minute
    }

    return NextResponse.json(
      {
        success: true,
        message: "Callback processed successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Scan callback error:", error);
    return NextResponse.json(
      { error: "Failed to process callback" },
      { status: 500 }
    );
  }
}

// Handle OPTIONS for CORS
export async function OPTIONS(request: NextRequest): Promise<NextResponse> {
  return new NextResponse(null, { status: 200 });
}
