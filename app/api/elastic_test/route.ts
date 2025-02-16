import { NextResponse, Request } from 'next/server';
import { searchFor } from '@/lib/elastic';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const q = searchParams.get('q') || '';
        const searchResponse = await searchFor(q);

        return NextResponse.json({
            success: true,
            query: q,
            results: searchResponse,
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.error('Search error:', error);
        return NextResponse.json({
            success: false,
            error: 'Search failed',
            details: error instanceof Error ? error.message : String(error),
        }, { status: 500 });
    }
}

// export async function POST(request: Request) {
//   const body = await request.json();
  
//   return NextResponse.json({
//     message: 'Received POST request',
//     data: body,
//     timestamp: new Date().toISOString(),
//   });
// }