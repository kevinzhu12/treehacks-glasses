// import { MAX_CHUNKS } from "@/app/api/transcript/route";
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

export const buildNote = async (snippets: string[], existingNotes?: string): Promise<string> => {
    const prompt = buildPrompt(snippets, existingNotes);
    const response = await fetch('/api/mistral', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            prompt
        })
    });

    if (!response.ok) {
        throw new Error('Failed to generate notes');
    }

    const data = await response.json();
    return data.response;
}