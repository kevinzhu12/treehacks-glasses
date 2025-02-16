import { getAllNoteNames } from "@/lib/storage";
import { NextResponse } from "next/server";


// finds note id by name
export async function GET(request: Request) {
    try {
      const { searchParams } = new URL(request.url);
      const name = searchParams.get("name");
  
      if (!name) {
        return NextResponse.json(
          { error: "Name parameter is required" },
          { status: 400 }
        );
      }
  
      const idToName: Record<string, string> = getAllNoteNames();

      for (const date in idToName) {
        if (idToName[date] === name) {
          return NextResponse.json(date);
        }
      }
  
      return NextResponse.json({ error: "Note not found" }, { status: 404 });
    } catch (error) {
      console.error("Error reading note:", error);
      return NextResponse.json(
        { error: "Failed to fetch note" },
        { status: 500 }
      );
    }
  }
  