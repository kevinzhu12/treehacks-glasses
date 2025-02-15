
import * as dotenv from 'dotenv';
dotenv.config()
const { OPENAI_API_KEY } = process.env;
export { OPENAI_API_KEY}
import OpenAI from "openai" 

const openai = new OpenAI({
    organization: "org-b1Gmk5icrcBWrlROUnXXHJBE",
    project: "$PROJECT_ID",
});

const fetch = require('node-fetch');

async function sendOpenAIRequest(prompt: string) {
	const apiKey = OPENAI_API_KEY;
	const url = 'https://api.openai.com/v1/chat/completions';// which model 

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            prompt: prompt,
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