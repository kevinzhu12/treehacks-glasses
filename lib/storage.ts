// lib/storage.ts

import fs from "fs";
// const fs = require("fs");

import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const TRANSCRIPT_FILE = path.join(DATA_DIR, "transcripts.json");
const NOTES_FILE = path.join(DATA_DIR, "notes.json");
const GRAPH_FILE = path.join(DATA_DIR, "connections.json");

export interface NoteContent {
  title: string;
  body: string;
  snapshot: string;
  todos: string;
  reflection: string;
  tags: string[];
}

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initialize empty file if it doesn't exist
if (!fs.existsSync(TRANSCRIPT_FILE)) {
  fs.writeFileSync(TRANSCRIPT_FILE, JSON.stringify([]));
}
if (!fs.existsSync(NOTES_FILE)) {
  fs.writeFileSync(NOTES_FILE, JSON.stringify([]));
}

if (!fs.existsSync(GRAPH_FILE)) {
  fs.writeFileSync(GRAPH_FILE, JSON.stringify([]));
}

export function getTranscripts(): string[] {
  try {
    const data = fs.readFileSync(TRANSCRIPT_FILE, "utf-8");

    console.log("READING TRANSCRIPTS", data);
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading transcripts:", error);
    return [];
  }
}

// returns a mapping of dates to note names
export function getAllNoteNames(): Record<string, string> {
  try {
    const data = fs.readFileSync(NOTES_FILE, "utf-8");
    const notes: Record<string, NoteContent> = JSON.parse(data);
    return Object.entries(notes).reduce((acc, [date, note]) => {
      acc[date] = note.title;
      return acc;
    }, {} as Record<string, string>);
  } catch (error) {
    console.error("Error reading notes:", error);
    return {};
  }
}

export function getGraph(): Record<string, string[]> {
  try {
    const data = fs.readFileSync(GRAPH_FILE, "utf-8");
    const graph: Record<string, string[]> = JSON.parse(data);
    return graph;
  } catch (error) {
    console.error("Error reading graph:", error);
    return {};
  }
}

export function getNoteContent(date: string): NoteContent | null {
  try {
    const data = fs.readFileSync(NOTES_FILE, "utf-8");
    const notes: Record<string, NoteContent> = JSON.parse(data);
    return notes[date] || null;
  } catch (error) {
    console.error("Error reading notes:", error);
    return null;
  }
}

// export function getAllNotes(): Record<string, NoteContent> {
//   try {
//     const data = fs.readFileSync(NOTES_FILE, "utf-8");
//     return JSON.parse(data);
//   } catch (error) {
//     console.error("Error reading notes:", error);
//     return {};
//   }
// }

export function writeNote(date: string, content: NoteContent): void {
  try {
    const data = fs.readFileSync(NOTES_FILE, "utf-8");
    const notes: Record<string, NoteContent> = JSON.parse(data);
    notes[date] = content;

    fs.writeFileSync(NOTES_FILE, JSON.stringify(notes, null, 2));
  } catch (error) {
    console.error("Error saving note:", error);
    throw error;
  }
}

export function writeGraph(content: any): void {
  try {
    const data = fs.readFileSync(GRAPH_FILE, "utf-8");
    const graph: Record<string, any> = JSON.parse(data);

    content["Links"].forEach((link: any) => {
      if (
        !graph["links"].some((existingLink: any) => {
          return (
            existingLink.source === link.source &&
            existingLink.target === link.target
          );
        })
      ) {
        graph["links"].push(link);
      }
    });

    console.log("WE JUST ADDED TO GRAPH: ", content["Links"]);
    fs.writeFileSync(GRAPH_FILE, JSON.stringify(graph, null, 2));
  } catch (error) {
    console.error("Error saving graph:", error);
    throw error;
  }
}

export function writeNodes(content: any): void {
  try {
    const data = fs.readFileSync(GRAPH_FILE, "utf-8");
    const graph: Record<string, any> = JSON.parse(data);

    // Check if node with same id already exists
    const index = graph["nodes"].findIndex(
      (node: any) => node.id === content["id"]
    );
    if (index !== -1) {
      console.log(
        "Node with id",
        content["id"],
        "already exists. Replacing it."
      );
      graph["nodes"].splice(index, 1);
    }

    graph["nodes"].push(content);
    console.log("Added new node with id", content["id"]);

    fs.writeFileSync(GRAPH_FILE, JSON.stringify(graph, null, 2));
  } catch (error) {
    console.error("Error saving graph:", error);
    throw error;
  }
}

export function saveTranscripts(chunks: string[]): void {
  try {
    fs.writeFileSync(TRANSCRIPT_FILE, JSON.stringify(chunks, null, 2));
  } catch (error) {
    console.error("Error saving transcripts:", error);
    throw error;
  }
}

export function clearTranscripts(): void {
  saveTranscripts([]);
}
