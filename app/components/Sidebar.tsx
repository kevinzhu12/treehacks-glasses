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

  const deleteNote = (id: string, e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation from Link

    // const existingNotes = JSON.parse(localStorage.getItem("notes") || "[]");
    // const updatedNotes = existingNotes.filter((note: Note) => note.id !== id);
    // localStorage.setItem("notes", JSON.stringify(updatedNotes));
    // window.dispatchEvent(new Event("storage"));

    // // If we're on the deleted note's page, redirect to /notes
    // if (pathname === `/notes/${id}`) {
    //   router.push("/notes");
    // }
  };

  return (
    <nav className="w-64 h-screen border-r border-gray-200 p-4 fixed left-0 top-0 bg-[#faf9f6]">
      {/* <button
        onClick={createNewNote}
        className="block mb-8 text-sm text-gray-500 hover:text-gray-800"
      >
        + New Note
      </button> */}

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
              <div className="font-medium truncate">{date}</div>
              <div className="text-xs text-gray-400">{notes[date].title}</div>
            </div>
            <button
              onClick={(e) => deleteNote(date, e)}
              className="opacity-0 group-hover:opacity-100 ml-2 p-1 text-gray-400 hover:text-gray-600"
              aria-label="Delete note"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </Link>
        ))}
      </div>
    </nav>
  );
}
