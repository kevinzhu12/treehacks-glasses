"use client";

import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";

export interface NoteContent {
  title: string;
  body: string;
  snapshot: string;
  todos: string;
  reflection: string;
  tags: string[];
}

export interface Note {
  date: string;
  content: NoteContent;
}

export default function NotePage() {
  const params = useParams();
  const [note, setNote] = useState<Note | null>(null);


  const loadNote = async () => {
    if (!params.id) return;
    try{
        const response = await fetch(`/api/notes/load?date=${params.id}`);
        const data = await response.json();
        
        if (data && !data.error) {
          const loadedNote = {
            date: params.id as string,
            content: data,
          };
          setNote(loadedNote);
        }
    } catch (error) {
      console.error("Error loading note:", error);
    }
  }

  useEffect(() => {
    loadNote();
    setInterval(() => {
      loadNote();
    }, 1000)
  }, [params.id]);

  const handleTitleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };
  const tagColors = [
    "#1F93FF",
    "#FF1F9E",
    "#B81FFF",
    "#1F4FFF",
    "#FF221F",
    "#DA1FFF",
    "#1FD6FF",
    "#FF1F5A",
    "#1F2EFF",
    "#FF441F",
    "#1F71FF",
    "#961FFF",
    "#1FB4FF",
    "#FF1F39",
    "#1FF8FF",
    "#FF661F",
    "#531FFF",
    "#FF1FBF",
    "#311FFF",
    "#FF1F7C",
    "#751FFF",
    "#1F8FFF",
    "#FF871F",
    "#FB1FFF",
  ];

  if (!note) {
    return (
      <main className="min-h-screen bg-[#faf9f6]">
        <div className="max-w-6xl mx-auto px-8 py-12">
          <p className="text-gray-400">Loading...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#faf9f6] card">
      <div className="max-w-6xl mx-auto px-8 py-12">
        {/* Title section */}
        <p className="text-4xl font-bold mb-2 text-gray-800 tracking-tight" >
          {note.content.title}
        </p>
        <p className="text-gray-400 mb-8 text-md">{note.date}</p>

        <p className="text-gray-400">
          {note.content.tags.map((tag, index) => (
            <span
              key={index}
              style={{
                backgroundColor: `${tagColors[index % tagColors.length]}80`, // added opacity
                color: `${tagColors[index % tagColors.length]}`,
                fontFamily:
                  'ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol"',
              }}
              className="rounded-full px-2 py-1 text-sm mr-1.5 font-semibold"
            >
              {tag}
            </span>
          ))}
        </p>

        <div className="grid grid-cols-[minmax(0,_550px)_minmax(0,_1fr)] gap-12 pt-4 mt-4">
          {/* Main content */}
          <div
            className="min-h-[500px] text-gray-800 text-md leading-relaxed focus:outline-none break-words"
            style={{
              fontFamily:
                'ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol"',
            }}
          >
            <ReactMarkdown
              className="content-body card"
              remarkPlugins={[remarkBreaks]}
            >
              {note.content.body}
            </ReactMarkdown>
          </div>

          {/* Additional notes sections */}
          <div className="space-y-8">
            {/* Snapshot section */}
            <div>
              <h3 className="text-md uppercase tracking-wider text-gray-500 font-medium mb-2">
                Snapshot
              </h3>
              <div className="card min-h-[120px] text-base text-gray-800 focus:outline-none rounded-lg" >
                {note.content.snapshot}
              </div>
            </div>

            {/* Todos section */}
            <div>
              <h3 className="text-md uppercase tracking-wider text-gray-500 font-medium mb-2">
                Todos
              </h3>
              <div className="card min-h-[120px] text-base text-gray-800 focus:outline-none rounded-lg whitespace-pre-line">
                {note.content.todos}
              </div>
            </div>

            {/* Reflection section */}
            <div>
              <h3 className="text-md uppercase tracking-wider text-gray-500 font-medium mb-2">
                Reflection
              </h3>
              <div className="card min-h-[120px] text-base text-gray-800 focus:outline-none rounded-lg">
                {note.content.reflection}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
  }
