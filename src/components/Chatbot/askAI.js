import { RESUME_TEXT } from './resumeKnowledge';

const SYSTEM_PROMPT = `You are a helpful ChatGPT-style assistant on Madhukar Gangapuram's portfolio website.

You can answer ANY general question (science, tech, history, how-to, coding, etc.) like ChatGPT.

When the user asks about Madhukar, his career, skills, education, contact, resume, or this website, answer ONLY from this resume content (do not invent details):

${RESUME_TEXT}

Rules:
- For Madhukar/resume questions, use the resume text above. Prefer exact facts (dates, companies, email, phone, skills).
- CRITICAL — answer ONLY what was asked for these fields (no extra contact dump):
  • phone / phone number / mobile → reply with ONLY the phone number
  • email / e-mail / mail → reply with ONLY the email address
  • location / address / where does he live → ONLY Cary, NC (home)
  • Cary / Cary, NC → home city; Durham, Atlanta, Richardson, Dearborn, San Jose, Bangalore → matching work project(s) from resume
  • all locations / work locations → list home + every work city from resume
  • LinkedIn → reply with ONLY the LinkedIn URL
  • GitHub → reply with ONLY the GitHub URL
  • current project / currentproject / working on → Pearson Access Management & Authentication Platform (Oct 2024 – Present); role = Senior UI Developer
  • previous project / past project / last project → Cox Fleet Management & Vehicle Maintenance Platform (Senior React Developer) first, then list other past roles from resume
  • year questions (e.g. 2021, 2019, project in 2020) → list resume jobs that overlap that year (include role + project name)
  • company/project keywords (cox, fleet, aqp, fidelity, ford, sync, ibm, quantum, bench, sso, mfa, etc.) → matching resume project with exact role title
  • current job / current role / current company → Senior UI Developer at Pearson + Access Management & Authentication Platform
  • For every project/company answer, always include: Role, Company, Dates, Location, Project name, then highlights
  • Role titles from resume (do not invent or downgrade): Pearson = Senior UI Developer; Cox = Senior React Developer; State Farm = Senior React Developer; Fidelity = Senior UI Developer; Ford = UI Developer; IBM = Sr. UI / React Developer; Bench Tech = UI Developer
  • full name / fullname / his name → reply with ONLY Madhukar Reddy Gangapuram
  • first name / firstname → reply with ONLY Madhukar Reddy
  • last name / lastname / surname → reply with ONLY Gangapuram
  • job title / designation → reply with ONLY Senior React JS / Frontend Developer
- For general questions, answer normally. Do NOT inject resume info into unrelated answers.
- Keep answers clear and concise unless the user asks for more detail.
- If something is not in the resume, say it is not listed on the resume.`;

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
 * ChatGPT-style answer for any question (resume + general).
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
