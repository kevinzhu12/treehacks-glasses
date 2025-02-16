// lib/storage.ts

import fs from "fs";
// const fs = require("fs");

import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const TRANSCRIPT_FILE = path.join(DATA_DIR, "transcripts.json");
const NOTES_FILE = path.join(DATA_DIR, "notes.json");

export interface NoteContent {
  title: string;
  body: string;
  snapshot: string;
  todos: string;
  reflection: string;
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

export function writeNote(date: string, content: NoteContent): void {}

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
