import { NextResponse } from "next/server";
import { searchFor } from "@/lib/elastic";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");

    if (!query) {
        return NextResponse.json(
            { error: "Query parameter is required" },
            { status: 400 }
        );
    }

    const searchResult = await searchFor(query);

    if (!searchResult) {
        return NextResponse.json(
            { error: "Search failed" },
            { status: 404 }
        );
    }

    const hits = searchResult?.hits;

    if (!hits) {
        return NextResponse.json(
            { error: "No results found" },
            { status: 500 }
        );
    }

    const res = []
    for (const hit of hits) {
        res.push({
            date: (hit["_source"] as any)["date"],
            title: (hit["_source"] as any)["title"]
        })
    }

    return NextResponse.json({
        hits: res
    });
}