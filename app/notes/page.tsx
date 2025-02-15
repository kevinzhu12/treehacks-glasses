"use client";

import React, { useState } from "react";
import { sendOpenAIRequest } from "../../lib/requests";
import { redirect } from "next/navigation";
import Notes from "../components/Notes";

export default function NotesHome() {
  const [response, setResponse] = useState<string>("");
  const fetch = require("node-fetch");

  const handleButtonClick = async () => {
    try {
      const response = await fetch("/api/transcript"); // promise
      const transcripts = await response.json();
      const prompt = transcripts.join(" ");
      console.log("Prompt: ", prompt);

      const resultResponse = await fetch("/api/openai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const result = await resultResponse.json();
      setResponse(result.choices[0].message.content);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="min-h-screen bg-[#faf9f6]">
      <div className="max-w-3xl mx-auto px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-6 text-gray-800">Welcome</h1>
          <div className="text-gray-500 mb-8">
            Click "New Note" in the sidebar to start writing
          </div>
          <div>
            <button onClick={handleButtonClick}>Send Request</button>
            {/* <p>Response: {response}</p> */}
            <Notes text={response} />
          </div>
        </div>
      </div>
    </main>
  );
}
