/**
 * HTTP POST endpoint to recieve snippets of a transcript and store them
 */

import { NextResponse } from "next/server";
import {
  getTranscripts,
  saveTranscripts,
  clearTranscripts,
  writeNote,
} from "@/lib/storage";
import { buildNote } from "@/lib/notetaker";
import { MAX_CHUNKS } from "@/lib/config";

export async function GET() {
  const chunks = getTranscripts();
  return NextResponse.json(chunks);
}

export async function POST(request: Request) {
  try {
    const text = await request.text();

    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    const chunks = getTranscripts();
    chunks.push(text);

    saveTranscripts(chunks);
    // If we exceed the maximum chunks, process the complete transcript
    if (chunks.length >= MAX_CHUNKS) {
      console.log("=== Complete Transcript ===");
      
      // CALL THE LLM HERE
      const note = await buildNote(chunks);
      console.log(note);

      const date = new Date().toISOString().slice(0, 10);
      writeNote(date, note);

      clearTranscripts();
      return NextResponse.json({
        status: "completed",
        processedTranscript: note,
      });
    }

    // Save the updated chunks
    saveTranscripts(chunks);

    return NextResponse.json(
      {
        status: "accumulating",
        currentChunks: chunks.length,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error processing transcript chunk:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
