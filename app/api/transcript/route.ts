/**
 * HTTP POST endpoint to recieve snippets of a transcript and store them
 */

import { NextResponse } from "next/server";
import {
  getTranscripts,
  saveTranscripts,
  clearTranscripts,
  getAllNoteNames,
  writeNote,
  getNoteContent,
  getGraph,
  writeGraph,
} from "@/lib/storage";
import { buildNote } from "@/lib/notetaker";

// import { sendOpenAIRequest } from "../../../lib/requests";
import { useState } from "react";
// import { ingestData } from "@/lib/elastic";

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

    const timestamp = new Date().getTime();

    chunks.push(`${timestamp}: ${text}`);

    saveTranscripts(chunks);

    // If we exceed the maximum chunks, process the complete transcript
    if (chunks.length >= MAX_CHUNKS) {
      // const completeTranscript = chunks.join(" ");
      console.log("=== Completed Transcript ===");
      // console.log(completeTranscript);
      // console.log("=========================");

      //get existing notes here
      const noteNames = getAllNoteNames();
      const currGraph = getGraph();
      const date = new Date().toISOString().slice(0, 10);

      if (date in noteNames) {
        const existingNote = getNoteContent(date);
        const [note, graph] = await buildNote(
          chunks,
          JSON.stringify(existingNote),
          currGraph
        );
        console.log(note);
        console.log("graph", graph);

        writeNote(date, note);
        writeGraph(graph);
      } else {
        const [note, graph] = await buildNote(chunks);
        console.log(note);

        writeNote(date, note);
        writeGraph(graph);
      }

      clearTranscripts();
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
