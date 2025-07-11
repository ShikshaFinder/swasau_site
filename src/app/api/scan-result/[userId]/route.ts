import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { r2Service } from "@/lib/r2";
import { azureService } from "@/lib/azure";
import { config } from "@/lib/config";

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
): Promise<NextResponse> {
  try {
    const { userId } = params;

    // Check if request is from Azure container (using shared secret)
    const authHeader = request.headers.get("authorization");
    const isAzureContainer =
      authHeader === `Bearer ${config.security.extensionSecret}`;

    // If not from Azure container, authenticate user
    let user = null;
    if (!isAzureContainer) {
      user = await getSession(request);
      if (!user) {
        return NextResponse.json(
          { error: "Authentication required" },
          { status: 401 }
        );
      }

      // Ensure user can only access their own results
      if (user.id !== userId) {
        return NextResponse.json({ error: "Access denied" }, { status: 403 });
      }
    }

    // Get the latest scan result for this user
    // In a real implementation, you'd query a database for scan results
    // For now, we'll check the job store and R2 for results

    // Check if there's a scan report file
    const reportFileName = `scan_report_${userId}.json`;
    const reportExists = await r2Service.fileExists(userId, reportFileName);

    if (!reportExists) {
      return NextResponse.json(
        { error: "Scan result not found" },
        { status: 404 }
      );
    }

    // Get the scan report content
    const reportContent = await r2Service.getFileContent(
      userId,
      reportFileName
    );

    if (!reportContent) {
      return NextResponse.json(
        { error: "Failed to read scan result" },
        { status: 500 }
      );
    }

    // Parse the report
    let scanResult;
    try {
      scanResult = JSON.parse(reportContent.toString());
    } catch (error) {
      console.error("Error parsing scan result:", error);
      return NextResponse.json(
        { error: "Invalid scan result format" },
        { status: 500 }
      );
    }

    // Log the result access
    console.log(`Scan result accessed for user ${userId}:`, {
      timestamp: new Date().toISOString(),
      accessedBy: isAzureContainer ? "azure-container" : `user-${user?.id}`,
    });

    return NextResponse.json(
      {
        success: true,
        result: scanResult,
        userId,
        accessedAt: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Scan result error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve scan result" },
      { status: 500 }
    );
  }
}

// Handle OPTIONS for CORS
export async function OPTIONS(request: NextRequest): Promise<NextResponse> {
  return new NextResponse(null, { status: 200 });
}
