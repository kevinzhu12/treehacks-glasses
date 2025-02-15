/**
 * HTTP POST endpoint to recieve snippets of a transcript and store them
 */

import { NextResponse } from 'next/server';
import { getTranscripts, saveTranscripts, clearTranscripts } from '@/lib/storage';
import { sendOpenAIRequest } from '../../../lib/requests'
import { useState } from 'react';

const MAX_CHUNKS = 25;

export async function GET() {
    const chunks = getTranscripts();
    return NextResponse.json(chunks);
}

export async function POST(request: Request) {
    const [response, setResponse] = useState<string>('');
    try {
        const text = await request.text();
        
        if (!text) {
            return NextResponse.json(
                { error: 'Text is required' },
                { status: 400 }
            );
        }

        const chunks = getTranscripts();
        chunks.push(text);

        // If we exceed the maximum chunks, process the complete transcript
        if (chunks.length >= MAX_CHUNKS) {
            const completeTranscript = chunks.join(' ');
            console.log('=== Complete Transcript ===');
            console.log(completeTranscript);
            console.log('=========================');

            // Here you can add more interesting logic, like:
            // - Send to a language model for processing
            // - Save to a permanent storage
            // - Trigger other actions based on content
            // try {
            //     console.log("Sending request...")
            //     const result = await sendOpenAIRequest('Hello!');
            //     setResponse(result.choices[0].message.content);
            //     console.log(response)
            // } catch (error) {
            //     console.error(error);
            // }

            clearTranscripts();
            return NextResponse.json({ 
                status: 'completed',
                processedTranscript: completeTranscript 
            });
        }

        // Save the updated chunks
        saveTranscripts(chunks);
        
        return NextResponse.json({ 
            status: 'accumulating',
            currentChunks: chunks.length
        }, { status: 201 });
    } catch (error) {
        console.error('Error processing transcript chunk:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}