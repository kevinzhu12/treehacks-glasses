// import { MAX_CHUNKS } from "@/app/api/transcript/route";

import { sendMistralRequest } from "./requests";
import { sendMistralGraphRequest } from "./graph_generator";
import { writeNodes } from "@/lib/storage";

/***
 *
 * Handles creation of notes from the snippets
 */
const joinSnippets = (chunks: string[]): string => {
  return `[${chunks.join(" ")}]`;
};

/**
 * builds the prompt for the LLM
 */
const buildPrompt = (snippets: string[], existingNotes?: string): string => {
  return `${
    existingNotes
      ? `\n\nHere are the existing notes:\n${existingNotes}`
      : "There are no initial notes"
  }\n\nHere are the snippets:\n${joinSnippets(
    snippets
  )}\n\n You will write the notes for the day:\n`;
};

const buildGraphPrompt = (
  snippets: any,
  existingGraph?: Record<string, string[]>
): string => {
  return `${
    existingGraph
      ? `\n\nHere is the existing graph:\n${existingGraph}`
      : "There is no initial graph"
  }\n\nHere are the JSON chunks:\n${joinSnippets(
    snippets
  )}\n\n You will write the graph links:\n`;
};

/**
 * Extracts JSON from a string that might contain markdown formatting
 */
const extractJSON = (str: string): string => {
  // Remove markdown code block syntax if present
  const jsonStr = str
    .replace(/^```json\n|\n```$/g, "")
    // Remove any leading/trailing whitespace
    .trim();
  return jsonStr;
};

const getNodes = (cleanJSON: string) => {
  const jsonData = JSON.parse(cleanJSON);

  // Convert the entries into nodes array
  const nodes = Object.values(jsonData).map((entry: any, index) => ({
    id: entry.title,
    group: index + 1, // Using index+1 as group number
    content: entry.snapshot,
  }));

  return { nodes };
};

export const buildNote = async (
  snippets: string[],
  existingNotes?: string,
  existingGraph?: Record<string, string[]>
): Promise<any> => {
  const prompt = buildPrompt(snippets, existingNotes);
  const result = await sendMistralRequest(prompt);

  // Clean up the result and parse it as JSON
  const cleanJSON = extractJSON(result);

  console.log("this is clean json", cleanJSON);

  try {
    const graph_prompt = buildGraphPrompt(cleanJSON, existingGraph);
    const graph_result = await sendMistralGraphRequest(prompt);
    console.log(graph_result)
    const graph_nodes = getNodes(cleanJSON);
    writeNodes(graph_nodes);
    return [JSON.parse(cleanJSON), JSON.parse(graph_result)];
  } catch (error) {
    console.error("Failed to parse LLM response as JSON:", error);
    console.error("Raw response:", result);
    console.error("Cleaned response:", cleanJSON);
    throw new Error("Failed to parse note from LLM response");
  }
};
