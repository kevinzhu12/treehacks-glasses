// import { MAX_CHUNKS } from "@/app/api/transcript/route";

import { sendMistralRequest } from "./requests";

/***
 * 
 * Handles creation of notes from the snippets
 */
const joinSnippets = (chunks: string[]): string => {
    return `[${chunks.join(' ')}]`;
}

/**
 * builds the prompt for the LLM
 */
const buildPrompt = (snippets: string[], existingNotes?: string): string => {
    return `${existingNotes ? `\n\nHere are the existing notes:\n${existingNotes}` : 'There are no initial notes'}\n\nHere are the snippets:\n${joinSnippets(snippets)}\n\n You will write the notes for the day:\n`
}

/**
 * Extracts JSON from a string that might contain markdown formatting
 */
const extractJSON = (str: string): string => {
    // Remove markdown code block syntax if present
    const jsonStr = str.replace(/^```json\n|\n```$/g, '')
        // Remove any leading/trailing whitespace
        .trim();
    return jsonStr;
}

export const buildNote = async (snippets: string[], existingNotes?: string): Promise<any> => {
    const prompt = buildPrompt(snippets, existingNotes);
    const result = await sendMistralRequest(prompt);
    
    // Clean up the result and parse it as JSON
    const cleanJSON = extractJSON(result);
    try {
        return JSON.parse(cleanJSON);
    } catch (error) {
        console.error('Failed to parse LLM response as JSON:', error);
        console.error('Raw response:', result);
        console.error('Cleaned response:', cleanJSON);
        throw new Error('Failed to parse note from LLM response');
    }
}
