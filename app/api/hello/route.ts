import { getGraph } from "@/lib/storage";
import { NextResponse } from "next/server";

export async function GET() {
  const graph = getGraph();

  return NextResponse.json({
    graph,
  });
}
