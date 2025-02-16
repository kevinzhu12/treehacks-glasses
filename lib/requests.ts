import OpenAI from "openai";
import { Mistral } from "@mistralai/mistralai";
import fetch from "node-fetch";
import * as dotenv from "dotenv";

dotenv.config();
// import { config } from "dotenv";
// config();

// const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const MISTRAL_API_KEY = process.env.MISTRAL_API_KEY;
export { MISTRAL_API_KEY };

// console.log("OpenAI API Key loaded successfully:", OPENAI_API_KEY);
console.log("Mistral API Key loaded successfully:", MISTRAL_API_KEY);

// const fetch = require("node-fetch");

// export async function sendOpenAIRequest(prompt: string) {
export async function sendMistralRequest(prompt: string): Promise<string> {
  //   const apiKey = OPENAI_API_KEY;
  const apiKey = MISTRAL_API_KEY;
  // const url = "https://api.openai.com/v1/chat/completions"; // which model
  // const url = "https://api.mistral.ai/v1/agents/completions"; // which model

  const client = new Mistral({ apiKey: apiKey });
  const output = await client.chat.complete({
    model: "mistral-large-latest",
    stream: false,
    messages: [
        {
          role: "system",
          content: "Reformat this conversation into a clear notes document.",
        },
        {
          role: "user",
          content: prompt,
        },
      ]
   });
   
   return output.choices?.[0]?.message?.content as string;
  // return output 
  // console.log('Chat:', output.choices[0].message.content);

  // const response = await fetch(url, { 
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${MISTRAL_API_KEY}`,
  //   },
  //   body: JSON.stringify({
  //   // const response = await client.chat.complete({
  //     // model: "mistral-large-latest",
  //     "response_format": {"type": "text"},
  //     messages: [
  //         {
  //           role: "system",
  //           content: "Reformat this conversation into a clear notes document.",
  //         },
  //         {
  //           role: "user",
  //           content: prompt,
  //         },

  //       ],
  //       max_tokens: 100,
  //     }),
  //   });

  // console.log("Response directly: ", response);

  // // if (response.error) {
  // //   throw new Error(`Error: ${response.error.message}`);
  // // }

  // const data = await response.json();
  // console.log("Data: ", data);
  //return data;
}
