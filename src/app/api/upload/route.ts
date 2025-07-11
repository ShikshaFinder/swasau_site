import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { r2Service } from "@/lib/r2";
import { UploadResponse } from "@/lib/types";

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

    // Parse multipart form data
    const formData = await request.formData();

    const capturedDataFile = formData.get("captured_data.txt") as File;
    const networkLogFile = formData.get("network_log.json") as File;

    if (!capturedDataFile || !networkLogFile) {
      return NextResponse.json(
        { error: "Both captured_data.txt and network_log.json are required" },
        { status: 400 }
      );
    }

    // Validate file types and sizes
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (capturedDataFile.size > maxSize || networkLogFile.size > maxSize) {
      return NextResponse.json(
        { error: "File size exceeds 10MB limit" },
        { status: 400 }
      );
    }

    // Convert files to buffers
    const capturedDataBuffer = Buffer.from(
      await capturedDataFile.arrayBuffer()
    );
    const networkLogBuffer = Buffer.from(await networkLogFile.arrayBuffer());

    // Upload files to R2
    const [capturedDataKey, networkLogKey] = await Promise.all([
      r2Service.uploadFile(
        user.id,
        "captured_data.txt",
        capturedDataBuffer,
        "text/plain"
      ),
      r2Service.uploadFile(
        user.id,
        "network_log.json",
        networkLogBuffer,
        "application/json"
      ),
    ]);

    // Generate file URLs (optional - for client reference)
    const capturedDataUrl = `${
      process.env.R2_PUBLIC_URL || ""
    }/${capturedDataKey}`;
    const networkLogUrl = `${process.env.R2_PUBLIC_URL || ""}/${networkLogKey}`;

    // Log the upload
    console.log(`Files uploaded for user ${user.id}:`, {
      capturedDataKey,
      networkLogKey,
      timestamp: new Date().toISOString(),
    });

    const response: UploadResponse = {
      success: true,
      fileUrls: {
        capturedData: capturedDataUrl,
        networkLog: networkLogUrl,
      },
      userId: user.id,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload files" },
      { status: 500 }
    );
  }
}

// Handle OPTIONS for CORS
export async function OPTIONS(request: NextRequest): Promise<NextResponse> {
  return new NextResponse(null, { status: 200 });
}
