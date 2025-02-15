"use client";

import Sidebar from "../components/Sidebar";
import { useState, useEffect } from "react";


export default function NotesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [notes, setNotes] = useState<any[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("notes");
    if (saved) {
      setNotes(JSON.parse(saved));
    }
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
