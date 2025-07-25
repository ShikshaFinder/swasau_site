import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

// Helper function to validate API token
async function validateToken(token: string) {
  const apiToken = await prisma.apiToken.findUnique({
    where: { token },
    include: { user: true },
  });

  if (!apiToken) {
    return null;
  }

  // Update last used timestamp
  await prisma.apiToken.update({
    where: { id: apiToken.id },
    data: { lastUsed: new Date() },
  });

  return apiToken.user;
}

// POST - Submit captured request from browser extension
export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return new Response(
        JSON.stringify({ error: "Missing or invalid authorization header" }),
        {
          status: 401,
        }
      );
    }

    const token = authHeader.substring(7);
    const user = await validateToken(token);
    if (!user) {
      return new Response(JSON.stringify({ error: "Invalid token" }), {
        status: 401,
      });
    }

    const { url, method, headers, body } = await req.json();
    if (!url || !method) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
        }
      );
    }

    // Create request record
    const request = await prisma.request.create({
      data: {
        userId: user.id,
        url,
        method,
        headers: headers || {},
        body: body || null,
        status: "pending",
      },
    });

    return new Response(
      JSON.stringify({
        message: "Request captured successfully",
        requestId: request.id,
      }),
      { status: 201 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}

// GET - Fetch requests for dashboard (requires session/token validation)
export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return new Response(
        JSON.stringify({ error: "Missing or invalid authorization header" }),
        {
          status: 401,
        }
      );
    }

    const token = authHeader.substring(7);
    const user = await validateToken(token);
    if (!user) {
      return new Response(JSON.stringify({ error: "Invalid token" }), {
        status: 401,
      });
    }

    // Get URL parameters for pagination
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    // Fetch requests with analysis
    const requests = await prisma.request.findMany({
      where: { userId: user.id },
      include: {
        analysis: true,
      },
      orderBy: { timestamp: "desc" },
      skip,
      take: limit,
    });

    // Get total count
    const total = await prisma.request.count({
      where: { userId: user.id },
    });

    return new Response(
      JSON.stringify({
        requests,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
