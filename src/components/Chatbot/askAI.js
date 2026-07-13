import { PROFILE } from './portfolioKnowledge';

const SYSTEM_PROMPT = `You are a helpful ChatGPT-style assistant embedded in Madhukar Ganga's portfolio website.

You can answer ANY general question (science, tech, history, how-to, definitions, advice, current knowledge, coding help, etc.) clearly and helpfully — just like ChatGPT.

When the user asks about Madhukar Ganga, his career, skills, education, services, resume, or this website, use these facts:
- Name: ${PROFILE.name}
- Role: ${PROFILE.title} at ${PROFILE.employer}
- About: ${PROFILE.about}
- Skills: ${PROFILE.skills.join('; ')}
- Experience: ${PROFILE.experience
  .map((e) => `${e.role} at ${e.company} (${e.location}): ${e.summary}`)
  .join(' | ')}
- Education: ${PROFILE.education.join('; ')}
- Services: ${PROFILE.services.join(', ')}
- Contact: ${PROFILE.contact}

Rules:
- For general questions, answer normally like ChatGPT. Do NOT force Madhukar portfolio info into unrelated answers.
- For Madhukar/portfolio questions, use the facts above.
- Keep answers clear and concise unless the user asks for detail.`;

/**
 * Call Netlify Function /api/chat (Gemini via Netlify AI Gateway when deployed).
 */
async function askNetlifyChat(message) {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data?.reply || null;
}

/**
 * Call Google Gemini directly (works with npm start when REACT_APP_GEMINI_API_KEY is set).
 * Get a free key: https://aistudio.google.com/apikey
 */
async function askGeminiDirect(message) {
  const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
  if (!apiKey) return null;

  const url =
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' +
    encodeURIComponent(apiKey);

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      system_instruction: {
        parts: [{ text: SYSTEM_PROMPT }],
      },
      contents: [
        {
          role: 'user',
          parts: [{ text: message }],
        },
      ],
    }),
  });

  if (!res.ok) {
    console.warn('Gemini direct call failed', res.status);
    return null;
  }

  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts
    ?.map((p) => p.text)
    .filter(Boolean)
    .join('\n');

  return text || null;
}

/**
 * ChatGPT-style answer for any question (Madhukar + general).
 * Tries Netlify AI first, then optional Gemini API key for local npm start.
 */
export async function askChatGPTStyle(message) {
  try {
    const fromNetlify = await askNetlifyChat(message);
    if (fromNetlify) return fromNetlify;
  } catch (err) {
    // npm start without Netlify functions
  }

  try {
    const fromGemini = await askGeminiDirect(message);
    if (fromGemini) return fromGemini;
  } catch (err) {
    console.warn('Gemini fallback error', err);
  }

  return null;
}
