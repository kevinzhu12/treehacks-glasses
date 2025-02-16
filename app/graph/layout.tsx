"use client";

import Sidebar from "../components/Sidebar";
import { useState, useEffect } from "react";
import { NoteContent } from "./[id]/page";

export default function NotesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <div className="ml-64 flex-1">{children}</div>
    </div>
  );
}
