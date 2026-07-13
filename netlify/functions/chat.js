import { GoogleGenAI } from '@google/genai';
import { PORTFOLIO_SYSTEM_PROMPT } from './_shared/portfolioContext.js';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

export default async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('', { status: 204, headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return Response.json(
      { error: 'Method not allowed' },
      { status: 405, headers: corsHeaders }
    );
  }

  try {
    const body = await req.json();
    const message = (body?.message || '').trim();

    if (!message) {
      return Response.json(
        { error: 'Message is required' },
        { status: 400, headers: corsHeaders }
      );
    }

    if (message.length > 1000) {
      return Response.json(
        { error: 'Message is too long' },
        { status: 400, headers: corsHeaders }
      );
    }

    // Netlify AI Gateway injects GEMINI_API_KEY + GOOGLE_GEMINI_BASE_URL — do not set your own keys.
    const ai = new GoogleGenAI({});

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: message,
      config: {
        systemInstruction: PORTFOLIO_SYSTEM_PROMPT,
        tools: [{ googleSearch: {} }],
      },
    });

    const reply =
      response.text ||
      'I could not generate a reply. Please try again.';

    return Response.json({ reply }, { headers: corsHeaders });
  } catch (err) {
    console.error('chat function error:', err);
    return Response.json(
      {
        error:
          'Chat service unavailable. Enable AI on your Netlify site and deploy once, or ask again later.',
      },
      { status: 502, headers: corsHeaders }
    );
  }
};

export const config = {
  path: '/api/chat',
  method: ['POST', 'OPTIONS'],
};
