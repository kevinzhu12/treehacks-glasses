"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { NoteContent } from "../notes/[id]/page";
import { useState } from "react";

export default function Sidebar({
  notes,
}: {
  notes: Record<string, NoteContent>;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any>(null);

  const handleSearch = async () => {
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
      const data = await response.json();
      console.log("RESPONSE", data);

      setSearchResults(data.results);
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  return (
    <nav className="sidebar w-64 h-screen border-r border-gray-200 fixed left-0 top-0 bg-[#faf9f6] flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <input
            type="text"
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="w-full px-3 py-2 pr-10 text-sm bg-white text-gray-800 placeholder-gray-400 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-300 transition-colors duration-200"
          />
          <button
            onClick={handleSearch}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-gray-500 hover:text-gray-700 transition-colors duration-200"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-2">
          {searchResults ? (
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Search Results</h3>
              {searchResults.total > 0 ? (
                searchResults.hits.map((hit: any, index: number) => (
                  <div
                    key={index}
                    className="p-2 rounded-lg bg-white shadow-sm border border-gray-100 mb-2"
                  >
                    <div className="text-sm text-gray-800">{hit._source.body}</div>
                    <div className="text-xs text-gray-500 mt-1">{hit._source.date}</div>
                  </div>
                ))
              ) : (
                <div className="text-sm text-gray-500">No results found</div>
              )}
              <button
                onClick={() => setSearchResults(null)}
                className="text-sm text-blue-500 hover:text-blue-600 mt-2"
              >
                Back to all notes
              </button>
            </div>
          ) : (
            Object.keys(notes).map((date) => (
              <Link
                key={date}
                href={`/notes/${date}`}
                className={`block p-2 rounded-lg text-sm transition-colors duration-200 ${
                  pathname === `/notes/${date}`
                    ? "bg-gray-100 text-gray-800"
                    : "text-gray-500 hover:bg-gray-100"
                }`}
              >
                <div className="min-w-0">
                  <div className="text-medium">{notes[date]}</div>
                  <div className="font-medium truncate">{date}</div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </nav>
  );
}