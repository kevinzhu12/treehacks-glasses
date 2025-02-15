import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const NOTES_FILE = path.join(process.cwd(), 'data', 'notes.json');

// /api/notes/load?date=10-23-2024 -> {"title": x, "body": x, "snapshot": x, "todos": x, "reflection": x}


export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const date = searchParams.get('date');

        if (!date) {
            return NextResponse.json({ error: 'Date parameter is required' }, { status: 400 });
        }

        const data = fs.readFileSync(NOTES_FILE, 'utf-8');
        const notes = JSON.parse(data);

        if (!notes[date]) {
            return NextResponse.json({ error: 'Note not found' }, { status: 404 });
        }

        return NextResponse.json({ note: notes[date] });
    } catch (error) {
        console.error('Error reading note:', error);
        return NextResponse.json({ error: 'Failed to fetch note' }, { status: 500 });
    }
}
