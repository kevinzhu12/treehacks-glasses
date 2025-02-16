import OpenAI from "openai";
import { Mistral } from "@mistralai/mistralai";
import fetch from "node-fetch";
import * as dotenv from "dotenv";
import { BEGINNING_PROMPT } from "./config";

dotenv.config();

const MISTRAL_API_KEY = process.env.MISTRAL_API_KEY;
export { MISTRAL_API_KEY };

console.log("Mistral API Key loaded successfully:", MISTRAL_API_KEY);

export async function sendMistralRequest(prompt: string): Promise<string> {
  const apiKey = MISTRAL_API_KEY;

  const client = new Mistral({ apiKey: apiKey });
  const output = await client.chat.complete({
    model: "mistral-large-latest",
    messages: [
      {
        role: "system",
        content: BEGINNING_PROMPT,
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  return output.choices[0].message.content;
}
