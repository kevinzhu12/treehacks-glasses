"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { NoteContent } from "../notes/[id]/page";
// import { NoteContent } from "@/lib/storage";

export default function Sidebar({
  notes,
}: {
  notes: Record<string, NoteContent>;
}) {
  const pathname = usePathname();
  const router = useRouter();

  // const createNewNote = () => {
  //   // Generate a unique ID
  //   const id = crypto.randomUUID();

  //   // Create new note with current date
  //   const now = new Date();
  //   const newNote = {
  //     id,
  //     title: "Untitled",
  //     content: "Start typing here...",
  //     date: now.toLocaleDateString("en-US", {
  //       weekday: "long",
  //       year: "numeric",
  //       month: "long",
  //       day: "numeric",
  //     }),
  //   };

  //   // Add to localStorage and dispatch storage event
  //   const existingNotes = JSON.parse(localStorage.getItem("notes") || "[]");
  //   localStorage.setItem("notes", JSON.stringify([newNote, ...existingNotes]));
  //   window.dispatchEvent(new Event("storage"));

  //   // Navigate to the new note
  //   router.push(`/notes/${id}`);
  // };



  return (
    <nav className="sidebar w-64 h-screen border-r border-gray-200 fixed left-0 top-0 bg-[#faf9f6] flex flex-col">

      {/* Scrollable notes list */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-2">
          {Object.keys(notes).map((date) => (
            <Link
              key={date}
              href={`/notes/${date}`}
              className={`group flex items-center justify-between p-2 rounded-lg text-sm ${
                pathname === `/notes/${date}`
                  ? "bg-gray-100 text-gray-800"
                  : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              <div className="min-w-0 flex-1">
                <div className="text-medium sidebar">{notes[date]}</div>
                <div className="font-medium truncate">{date}</div>
                
              </div>

            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
