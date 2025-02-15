// import { OPENAI_API_KEY } from "@/lib/requests"; // Your file that loads the key
import { MISTRAL_API_KEY } from "@/lib/requests";
// import { sendOpenAIRequest } from "@/lib/requests";
import { sendMistralRequest } from "@/lib/requests";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { prompt } = await request.json();
  const result = await sendMistralRequest(prompt);
  return NextResponse.json(result);
}
