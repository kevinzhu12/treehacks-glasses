"use client";

import React, { useState } from "react";
// import { sendOpenAIRequest } from "../../lib/requests";
import { sendMistralRequest } from "../../lib/requests";
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
      
      const resultResponse = await fetch("/api/mistral", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      // console.log("Result Response: ", resultResponse);

      const result = await resultResponse.json();
      console.log("Result IS HERE : ", result);  
      setResponse(result.result);
      // console.log('response', result.body)
    } catch (error) {
      console.log('tHERE IS AN ERROR?')
      console.error(error);
    }
  };

  return (
    <main className="min-h-screen bg-[#faf9f6]">
      <div className="max-w-3xl mx-auto px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-6 text-gray-800">Welcome</h1>
          {/* <div>
            <button onClick={handleButtonClick}>Send Request</button>
            <Notes text={response} />
          </div> */}
        </div>
      </div>
    </main>
  );
}
