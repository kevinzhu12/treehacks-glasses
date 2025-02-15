import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const TRANSCRIPT_FILE = path.join(DATA_DIR, 'transcripts.json');
const NOTES_FILE = path.join(DATA_DIR, 'notes.json');

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
        const data = fs.readFileSync(TRANSCRIPT_FILE, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading transcripts:', error);
        return [];
    }
}

export function getAllNotes(): Record<string, string[]> {
    try {
        const data = fs.readFileSync(TRANSCRIPT_FILE, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading transcripts:', error);
        return {};
    }
}

export function saveTranscripts(chunks: string[]): void {
    try {
        fs.writeFileSync(TRANSCRIPT_FILE, JSON.stringify(chunks, null, 2));
    } catch (error) {
        console.error('Error saving transcripts:', error);
        throw error;
    }
}

export function clearTranscripts(): void {
    saveTranscripts([]);
}
