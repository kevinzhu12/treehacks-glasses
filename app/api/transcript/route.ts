/**
 * HTTP POST endpoint to recieve snippets of a transcript and store them
 */

import { NextResponse } from "next/server";
import {
  getTranscripts,
  saveTranscripts,
  clearTranscripts,
} from "@/lib/storage";
import { buildNote } from "@/lib/notetaker";

// import { sendOpenAIRequest } from "../../../lib/requests";
import { useState } from "react";

export const MAX_CHUNKS = 5;

export async function GET() {
  const chunks = getTranscripts();
  return NextResponse.json(chunks);
}

export async function POST(request: Request) {
  // const [response, setResponse] = useState<string>('');
  try {
    const text = await request.text();

    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    const chunks = getTranscripts();

    chunks.push(text);

    console.log(chunks);

    saveTranscripts(chunks);

    // If we exceed the maximum chunks, process the complete transcript
    if (chunks.length >= MAX_CHUNKS) {
      // const completeTranscript = chunks.join(" ");
      console.log("=== Complete Transcript ===");
      // console.log(completeTranscript);
      // console.log("=========================");

      // CALL THE LLM HERE
      // const note = await buildNote(chunks);
      // console.log(note);
      

      // clearTranscripts();
      return NextResponse.json({
        status: "completed",
        processedTranscript: "complete transcript",
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
