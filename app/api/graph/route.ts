import { NextResponse } from "next/server";
import { getGraph } from "@/lib/storage";

export async function GET() {
  const graph = getGraph();

  return NextResponse.json({ graph });
}

export async function POST(request: Request) {
  const body = await request.json();

  return NextResponse.json({
    message: "Received POST request",
    data: body,
    timestamp: new Date().toISOString(),
  });
}
