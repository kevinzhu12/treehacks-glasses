"use client";

import Graph from "../graph/page"

export default function NotesHome() {
  return (
    <main className="min-h-screen bg-[#faf9f6] flex items-center justify-center">
      <div className="text-center max-w-md px-8">
      <div style={{zIndex: 1}} className="graph-display">
          <Graph />
        </div>
        <div className="absolute left-0 right-0 text-center" style={{zIndex: 2, fontFamily : "PT Serif, Helvetica"}}>
          <h1 style={{fontWeight: "bold", fontFamily: "DM Sans, Helvetica", fontSize: "3rem"}} className="text-3xl font-semibold text-gray-800 mb-3">
            Wander
          </h1>
          <p className="text-base text-gray-400 mb-12">
            Capture your thoughts and reflections. Select an entry to begin.
          </p>
          {/* <h2 className="text-xl font-medium text-gray-400">
            Select an entry to begin
          </h2> */}
        </div>
        

        {/* Subtle arrow pointing to sidebar */}
        <div className="absolute left-24 top-1/2 transform -translate-y-1/2 text-gray-300">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </div>
      </div>
    </main>
  );
}
