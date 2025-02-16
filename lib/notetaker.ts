import { MAX_CHUNKS } from "@/app/api/transcript/route";

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
}

PLEASE PLEASE PLEASE!!!! 
It is important that you follow this format exactly, as it will be parsed by a computer. If you do not output the JSON in the correct format, the computer will not be able to parse it and the client will not be able to use your notes.
PLEASE PLEASE PLEASE FOLLOW THIS!!!! IF YOU DON'T FOLLOW THIS I WILL LOSE MY JOB :(((
`;


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
    return `${BEGINNING_PROMPT}${existingNotes ? `\n\nHere are the existing notes:\n${existingNotes}` : 'There are no initial notes'}\n\nHere are the snippets:\n${joinSnippets(snippets)}\n\n You will write the notes for the day:\n`
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