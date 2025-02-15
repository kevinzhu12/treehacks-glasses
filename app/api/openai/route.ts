import { OPENAI_API_KEY } from "@/lib/requests"; // Your file that loads the key
import { sendOpenAIRequest } from "@/lib/requests";
import { NextResponse } from "next/server";

// export async function POST(request: Request) {
//   const { prompt } = await request.json();

//   // Use your API key here to make a request to OpenAI
//   const response = await fetch("https://api.openai.com/v1/chat/completions", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${OPENAI_API_KEY}`,
//     },
//     body: JSON.stringify({
//       model: "gpt-4o-mini",
//       messages: [
//         {
//           role: "system",
//           content: "Reformat this conversation into a clear notes document.",
//         },
//         { role: "user", content: prompt },
//       ],
//       max_tokens: 100,
//     }),
//   });

//   const data = await response.json();
//   return NextResponse.json(data);
// }

export async function POST(request: Request) {
  const { prompt } = await request.json();
  const result = await sendOpenAIRequest(prompt);
  return NextResponse.json(result);
}
