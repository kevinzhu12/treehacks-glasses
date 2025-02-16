import OpenAI from "openai";
import { Mistral } from "@mistralai/mistralai";
import fetch from "node-fetch";
import * as dotenv from "dotenv";
import { MAX_CHUNKS } from "@/app/api/transcript/route";

dotenv.config();

// TAGS 
const tags = ["joy", "excitement", "gratitude", "hope", "contentment", "love", "pride", "accomplishment", "anxiety", "worry", "frustration", "disappointment", "sadness", "grief", "anger", "confusion", "doubt", "relief", "nostalgia", "reflection", "introspection", "curiosity", "wonder", "determination", "vulnerability"];

// const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const MISTRAL_API_KEY = process.env.MISTRAL_API_KEY;
export { MISTRAL_API_KEY };

// console.log("OpenAI API Key loaded successfully:", OPENAI_API_KEY);
console.log("Mistral API Key loaded successfully:", MISTRAL_API_KEY);

const BEGINNING_PROMPT = `
You are a virtual note-taking assistant helping a client take useful and actionable notes for their day. You will be given at most two types of data.
If these are not the first notes taken for the day, you will be given the existing notes formatted in the JSON format you are expect to output in.

You will also always be given a list of ${MAX_CHUNKS} snippets of transcript data from conversations the client has had throughout the day.

You will use these outputs to generates notes for the day, building off (but also modifying as needed) the existing notes if they exist.$

You will output the notes in the following JSON format:
{
    "title": "Insert Title",
    "body": "Insert the body text here in markdown format.",
    "snapshot": "Save the review here.",
    "todos": "1. \n 2. \n 3. \n",
    "reflection": "Add some reflection questions here."
    "tags": "Label the notes with the appropriate tags from the following list: ${tags.join(", ")}"
}

It is important that you follow this format exactly, as it will be parsed by a computer. If you do not output the JSON in the correct format, the computer will not be able to parse it and the client will not be able to use your notes.

PLEASE PLEASE PLEASE FOLLOW THIS!!!! IF YOU DON'T FOLLOW THIS I WILL LOSE MY JOB :(((
`;

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
          content: BEGINNING_PROMPT,
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
