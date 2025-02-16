import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { getNoteContent } from "@/lib/storage";

const NOTES_FILE = path.join(process.cwd(), "data", "notes.json");

// /api/notes/load?date=10-23-2024 -> {"title": x, "body": x, "snapshot": x, "todos": x, "reflection": x}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date");

    if (!date) {
      return NextResponse.json(
        { error: "Date parameter is required" },
        { status: 400 }
      );
    }

    const noteContent = getNoteContent(date);

    if (!noteContent) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 });
    }

    // Return the note content directly without wrapping it in a 'date' key
    return NextResponse.json(noteContent);
  } catch (error) {
    console.error("Error reading note:", error);
    return NextResponse.json(
      { error: "Failed to fetch note" },
      { status: 500 }
    );
  }
}
