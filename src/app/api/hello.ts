import { NextResponse } from "next/server";

function GET(request: Request) {
    return NextResponse.json({ message: "Hello, world!" });
}