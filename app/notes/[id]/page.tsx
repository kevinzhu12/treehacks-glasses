"use client";

import { useParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";

export default function NotePage() {
  const params = useParams();
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [note, setNote] = useState({
    title: "Untitled",
    content: "Start typing here...",
    date: "",
  });

  useEffect(() => {
    const loadNote = () => {
      const notes = JSON.parse(localStorage.getItem("notes") || "[]");
      const currentNote = notes.find((n: any) => n.id === params.id);

      if (currentNote) {
        setNote(currentNote);
        if (titleRef.current) titleRef.current.textContent = currentNote.title;
        if (contentRef.current)
          contentRef.current.textContent = currentNote.content;
      } else {
        if (titleRef.current) titleRef.current.textContent = "Untitled";
        if (contentRef.current)
          contentRef.current.textContent = "Start typing here...";
      }
    };

    loadNote();
  }, [params.id]);

  const handleTitleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const saveNote = () => {
    const notes = JSON.parse(localStorage.getItem("notes") || "[]");
    const noteIndex = notes.findIndex((n: any) => n.id === params.id);

    if (noteIndex >= 0) {
      notes[noteIndex] = { ...note, id: params.id };
    } else {
      notes.push({ ...note, id: params.id });
    }

    localStorage.setItem("notes", JSON.stringify(notes));
  };

  return (
    <main className="min-h-screen bg-[#faf9f6]">
      <div className="max-w-6xl mx-auto px-8 py-12">
        {/* Title section */}
        <div
          ref={titleRef}
          className="text-4xl font-bold mb-2 text-gray-800 tracking-tight focus:outline-none empty:before:content-['Untitled'] empty:before:text-gray-400"
          contentEditable={true}
          suppressContentEditableWarning={true}
          onKeyDown={handleTitleKeyDown}
          onBlur={(e) => {
            const target = e.currentTarget;
            if (target && target.textContent !== null) {
              setNote((prev) => ({
                ...prev,
                title: target.textContent || "Untitled",
              }));
              saveNote();
            }
          }}
        />
        <div className="text-gray-400 mb-8 text-sm">{note.date}</div>

        {/* Two-column notes layout */}
        <div className="grid grid-cols-[minmax(0,_550px)_minmax(0,_1fr)] gap-12">
          {/* Main notes content */}
          <div
            ref={contentRef}
            className="min-h-[500px] text-gray-800 text-lg leading-relaxed focus:outline-none break-words"
            contentEditable={true}
            suppressContentEditableWarning={true}
            onBlur={(e) => {
              const target = e.currentTarget;
              if (target && target.textContent !== null) {
                setNote((prev) => ({
                  ...prev,
                  content: target.textContent || "",
                }));
                saveNote();
              }
            }}
            style={{
              fontFamily:
                'ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol"',
            }}
          />

          {/* Additional notes sections */}
          <div className="space-y-8">
            {/* Snapshot section */}
            <div>
              <h3 className="text-base font-semibold text-gray-800 mb-3">
                Snapshot
              </h3>
              <div
                className="min-h-[120px] text-base text-gray-800 focus:outline-none  rounded-lg"
                contentEditable={true}
                suppressContentEditableWarning={true}
                onBlur={(e) => {
                  // Add snapshot saving logic here
                }}
              />
            </div>

            {/* Todos section */}
            <div>
              <h3 className="text-base font-semibold text-gray-800 mb-3">
                Todos
              </h3>
              <div
                className="min-h-[120px] text-base text-gray-800 focus:outline-none rounded-lg"
                contentEditable={true}
                suppressContentEditableWarning={true}
                onBlur={(e) => {
                  // Add todos saving logic here
                }}
              />
            </div>

            {/* Reflection section */}
            <div>
              <h3 className="text-base font-semibold text-gray-800 mb-3">
                Reflection
              </h3>
              <div
                className="min-h-[120px] text-base text-gray-800 focus:outline-none rounded-lg"
                contentEditable={true}
                suppressContentEditableWarning={true}
                onBlur={(e) => {
                  // Add reflection saving logic here
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
