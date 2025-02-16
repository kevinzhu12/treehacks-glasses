import { Mistral } from "@mistralai/mistralai";
import * as dotenv from "dotenv";
import { GRAPH_PROMPT } from "./config";

dotenv.config();

const MISTRAL_API_KEY = process.env.MISTRAL_API_KEY;

export { MISTRAL_API_KEY };

console.log("Mistral API Key loaded successfully:", MISTRAL_API_KEY);

export async function sendMistralGraphRequest(prompt: string): Promise<string> {
  const apiKey = MISTRAL_API_KEY;

  const client = new Mistral({ apiKey: apiKey });
  const output = await client.chat.complete({
    model: "mistral-large-latest",
    messages: [
      {
        role: "system",
        content: GRAPH_PROMPT,
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  if (!output.choices || output.choices.length === 0) {
    throw new Error("No choices returned from Mistral GRAPH API");
  }

  return output.choices[0].message.content as string;
}
