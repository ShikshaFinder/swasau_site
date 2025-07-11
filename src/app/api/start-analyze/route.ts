import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { r2Service } from "@/lib/r2";
import { azureService } from "@/lib/azure";
import { AnalyzeResponse } from "@/lib/types";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Authenticate user
    const user = await getSession(request);
    if (!user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // Validate origin
    const origin = request.headers.get("origin");
    const clientType = request.headers.get("x-client");

    if (!origin && clientType !== "Extension") {
      return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
    }

    // Check if required files exist
    const [capturedDataExists, networkLogExists] = await Promise.all([
      r2Service.fileExists(user.id, "captured_data.txt"),
      r2Service.fileExists(user.id, "network_log.json"),
    ]);

    if (!capturedDataExists || !networkLogExists) {
      return NextResponse.json(
        { error: "Required files not found. Please upload files first." },
        { status: 400 }
      );
    }

    // Generate unique job ID
    const jobId = `scan-${uuidv4()}`;

    // Generate signed URLs for Azure container
    const signedUrls = await r2Service.generateSignedUrlsForScan(
      user.id,
      jobId
    );

    // Start Azure Container Instance
    const containerGroupName = await azureService.startSecurityScan(
      user.id,
      jobId,
      {
        capturedDataUrl: signedUrls.capturedDataUrl,
        networkLogUrl: signedUrls.networkLogUrl,
        outputUrl: signedUrls.outputUrl,
        userId: user.id,
        jobId,
      }
    );

    // Log the scan trigger
    console.log(`Security scan triggered for user ${user.id}:`, {
      jobId,
      containerGroupName,
      timestamp: new Date().toISOString(),
    });

    const response: AnalyzeResponse = {
      status: "queued",
      jobId,
      estimatedTime: "30s",
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Start analyze error:", error);
    return NextResponse.json(
      { error: "Failed to start security analysis" },
      { status: 500 }
    );
  }
}

// Handle OPTIONS for CORS
export async function OPTIONS(request: NextRequest): Promise<NextResponse> {
  return new NextResponse(null, { status: 200 });
}
