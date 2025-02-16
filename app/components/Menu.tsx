"use client";

import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Menu() {
  return (
    <div className="fixed top-0 right-0 p-4 flex items-center gap-4">
      <Link
        href="/notes"
        className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 "
      >
        Graph View
      </Link>
      <ThemeToggle />
    </div>
  );
}
