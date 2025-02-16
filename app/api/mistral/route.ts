// import { OPENAI_API_KEY } from "@/lib/requests"; // Your file that loads the key
import { MISTRAL_API_KEY } from "@/lib/requests";
// import { sendOpenAIRequest } from "@/lib/requests";
import { sendMistralRequest } from "@/lib/requests";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  console.log("Received POST /api/mistral");
  const { prompt } = await request.json();
  const result = await sendMistralRequest(prompt);
  console.log("POST Request: ", result);
  return NextResponse.json({
    result
  });
}

export async function GET(request: Request) {
  console.log("Received GET /api/mistral");
  return NextResponse.json(
    {
      message: "Hello from GET /api/mistral",
    }
  )
}