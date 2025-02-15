import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const NOTES_FILE = path.join(process.cwd(), 'data', 'notes.json');


// /api/notes/all -> {"10-23-2024": "Title", "10-23-2024": "Title", "10-23-2024": "Title",}

export async function GET() {
    try {
        const data = fs.readFileSync(NOTES_FILE, 'utf-8');
        const notes = JSON.parse(data);

        // map dates to title
        const res: Record<string, string> = {}
        for (const date in notes) {
            res[date] = notes[date].title;
        }

        return NextResponse.json(res);
    } catch (error) {
        console.error('Error reading notes:', error);
        return NextResponse.json({ error: 'Failed to fetch notes' }, { status: 500 });
    }
}