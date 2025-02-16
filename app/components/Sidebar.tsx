"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { NoteContent } from "../notes/[id]/page";

export default function Sidebar({
  notes,
}: {
  notes: Record<string, NoteContent>;
}) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav className="sidebar w-64 h-screen border-r border-gray-200 fixed left-0 top-0 bg-[#faf9f6] flex flex-col">
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-2">
          {Object.keys(notes).map((date) => (
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
          ))}
        </div>
      </div>
    </nav>
  );
}