
import OpenAI from "openai" 
import * as dotenv from 'dotenv';
dotenv.config()
// const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

console.log('OpenAI API Key loaded successfully:', OPENAI_API_KEY);

export { OPENAI_API_KEY }

const fetch = require('node-fetch');
export async function sendOpenAIRequest(prompt: string) {
	const apiKey = OPENAI_API_KEY;
	const url = 'https://api.openai.com/v1/chat/completions';// which model 

    const openai = new OpenAI({
        apiKey: OPENAI_API_KEY,
        organization: "org-b1Gmk5icrcBWrlROUnXXHJBE",
        project: "$PROJECT_ID",
        dangerouslyAllowBrowser: true
    });


    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
                {
                    role: 'system',
                    content: 'You are a helpful assistant.'
                },
                {
                    role: 'user',
                    content: prompt
                }
            ],
            max_tokens: 100
        })
    });

    if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
}

// Example usage
sendOpenAIRequest('Hello, OpenAI!').then(response => {
    console.log(response);
}).catch(error => {
    console.error(error);
});