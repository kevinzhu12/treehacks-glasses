"use client";

import Sidebar from "../components/Sidebar";
import { useState, useEffect } from "react";
import { NoteContent } from "./[id]/page";

export default function NotesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [notes, setNotes] = useState<Record<string, NoteContent>>({});

  useEffect(() => {
    async function fetchNotes() {
      const response = await fetch("/api/notes/all");
      const savedNotes = await response.json();
      setNotes(savedNotes);
    }

    fetchNotes();
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  return (
    <div className="flex">
      <Sidebar notes={notes} />
      <div className="ml-64 flex-1">{children}</div>
    </div>
  );
}
