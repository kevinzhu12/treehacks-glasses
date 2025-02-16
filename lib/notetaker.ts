// import { MAX_CHUNKS } from "@/app/api/transcript/route";

import { sendMistralRequest } from "./requests";
import { sendMistralGraphRequest } from "./graph_generator";
import { writeNodes } from "@/lib/storage";

/***
 *
 * Handles creation of notes from the snippets
 */
const joinSnippets = (chunks: string[]): string => {
  return JSON.stringify(chunks, null, 2);
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

/**
 * Converts a JSON string containing daily notes into a format suitable for
 * the graph library. The JSON should have the following structure:
 * {
 *   "date string": {
 *     title: string,
 *     body: string,
 *     snapshot: string,
 *     todos: string,
 *     reflection: string
 *   }
 * }
 *
 * The function returns an object with a single property, "nodes", which is
 * an array of objects in the format required by the graph library.
 */
const getNodes = (
  cleanJSON: string
): { id: string; group: number; content: string } => {
  console.log("raw json", cleanJSON);
  const jsonData = JSON.parse(cleanJSON);
  console.log("JSON DATA", jsonData);

  return { id: jsonData["title"], group: 1, content: jsonData["snapshot"] };
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
    const graph_result = await sendMistralGraphRequest(graph_prompt);
    console.log("Graph result", graph_result);
    const graph_nodes = getNodes(cleanJSON);
    writeNodes(graph_nodes);
    return [JSON.parse(cleanJSON), JSON.parse(extractJSON(graph_result))];
  } catch (error) {
    console.error("Failed to parse LLM response as JSON:", error);
    console.error("Raw response:", result);
    console.error("Cleaned response:", cleanJSON);
    throw new Error("Failed to parse note from LLM response");
  }
};
