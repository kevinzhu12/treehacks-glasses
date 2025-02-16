import { NextResponse } from "next/server";
import { searchFor } from "@/lib/elastic";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const query = searchParams.get("q");

        if (!query) {
            return NextResponse.json(
                { error: "Query parameter is required" },
                { status: 400 }
            );
        }

        const searchResult = await searchFor(query);
        
        return NextResponse.json(searchResult);
    } catch (error) {
        console.error("Search error:", error);
        return NextResponse.json(
            { 
                error: "Search failed", 
                details: error instanceof Error ? error.message : String(error) 
            },
            { status: 500 }
        );
    }
}