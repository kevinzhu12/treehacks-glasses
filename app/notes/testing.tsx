"use client";

import React, { useState } from 'react';
import { sendOpenAIRequest } from '../../lib/requests';

export default function Testing() {
	const [response, setResponse] = useState<string>('');

    const handleButtonClick = async () => {
        try {
            const result = await sendOpenAIRequest('Hello!');
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
            <p>Response: {response}</p>
        </div>
        </div>
      </div>
    </main>
  );
}
