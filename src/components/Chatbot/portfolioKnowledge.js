/**
 * Knowledge about Madhukar Ganga, sourced from this portfolio app.
 * Used by the basic chatbot to answer questions related to him.
 */

export const PROFILE = {
  name: 'Madhukar Ganga',
  title: 'Frontend React Developer',
  employer: 'Pearson Educational',
  experienceYears: '8+',
  about:
    'Madhukar Ganga is a highly skilled React JS developer with 8+ years of experience building robust, user-friendly web applications. He specializes in React and Redux, component-based architecture, and modern frontend tooling. He currently works as a Frontend React Developer at Pearson Educational.',
  skills: [
    'HTML, CSS, SCSS, Sass (90%)',
    'Bootstrap (80%)',
    'Material UI, TailwindCSS (80%)',
    'JavaScript (70%)',
    'TypeScript (70%)',
    'ReactJS (80%)',
    'Redux, Thunk, Redux-Saga (80%)',
    'JIRA, Slack, Agile (70%)',
    'Git, GitHub (80%)',
    'Jest, Mocha, Chai, Testing Library (80%)',
    'REST, GraphQL, AWS (70%)',
  ],
  experience: [
    {
      role: 'Senior UI developer',
      company: 'Pearson',
      location: 'Hybrid, NC',
      summary:
        'Built centralized login and partner apps (Certiport, Compass, cloud Scheduler/Candidate). Worked on ForgeRock AMXUI, SSO, MFA, passwordless auth, progressive profiling, and OTP flows.',
    },
    {
      role: 'Senior Frontend developer',
      company: 'Cox Auto Inc. (Mobility and Fleet operations)',
      location: 'Remote, Atlanta, GA',
      summary:
        'Built SaaS fleet management UIs for vehicle info, preventative maintenance scheduling, automated service schedules, reports, and analytics.',
    },
    {
      role: 'Senior React developer',
      company: 'StateFarm',
      location: 'Remote',
      summary:
        'Worked on AQP (Auto Quote Purchase) for insurance quotes and purchases (auto, home, medical). Frontend in React JS with Spring-based backend APIs.',
    },
    {
      role: 'Senior UI developer',
      company: 'Fidelity Investments',
      location: 'Durham, NC',
      summary:
        'React apps for PI-Login, 2FA, Security Center, DAE, NUR, inactivity timeout, and DBS. Helped migrate applications from on-premises to AWS.',
    },
    {
      role: 'UI/React Developer',
      company: 'Ford',
      location: 'Dearborn, MI',
      summary:
        'Worked on SYNC in-vehicle communications/entertainment system and App Link UI commands, display requests, and vehicle data authorization.',
    },
    {
      role: 'SR. UI/React Developer',
      company: 'IBM',
      location: 'San Jose, CA',
      summary:
        'Contributed to IBM Quantum Experience UI for researchers and developers exploring quantum computing.',
    },
  ],
  education: [
    'Master of Science in Computer Science Engineering — Chicago State University, USA',
    'Bachelor of Technology in IT — Scient Institute of Technology (JNTUH), Telangana, India',
  ],
  services: [
    'Web Design',
    'Web Development',
    'Frontend Development',
    'Bootstrap Template',
    'Tailwind CSS Template',
    'React Template',
  ],
  contact:
    'You can reach Madhukar via the Contact page on this site (/contact), or connect on LinkedIn (https://www.linkedin.com/in/ganga1935/) and GitHub (https://github.com/mk022104/resume-react-template-main). Download his resume from the sidebar.',
  siteHelp:
    'This portfolio has pages for About, Services, Experience (Portfolio), Education Details (Qualification), Contact, and Info (Group). Use the navigation at the top to switch sections.',
};

const FAQ = [
  {
    keys: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening'],
    answer:
      `Hi! I'm Madhukar's portfolio assistant. Ask me about his skills, experience, education, services, or how to contact him.`,
  },
  {
    keys: ['who are you', 'your name', 'who is madhukar', 'about madhukar', 'about you', 'who is he', 'introduce'],
    answer: PROFILE.about,
  },
  {
    keys: ['what do you do', 'current job', 'current role', 'where do you work', 'employer', 'company now', 'pearson'],
    answer: `${PROFILE.name} works as a ${PROFILE.title} at ${PROFILE.employer}. He focuses on React-based UIs, SSO/login experiences, and partner-facing applications.`,
  },
  {
    keys: ['skill', 'tech stack', 'technologies', 'tools', 'what can you', 'expertise', 'proficient'],
    answer: `Madhukar's key skills:\n• ${PROFILE.skills.join('\n• ')}`,
  },
  {
    keys: ['react', 'redux', 'javascript', 'typescript', 'frontend'],
    answer: `Yes — Madhukar specializes in React and Redux. He also works with JavaScript, TypeScript, HTML/CSS/SCSS, Material UI, Tailwind, and testing tools like Jest and Testing Library.`,
  },
  {
    keys: ['experience', 'work history', 'career', 'jobs', 'worked', 'previous', 'companies'],
    answer:
      'Madhukar has 8+ years of frontend experience. Roles include:\n' +
      PROFILE.experience
        .map((e) => `• ${e.role} at ${e.company} (${e.location})\n  ${e.summary}`)
        .join('\n\n'),
  },
  {
    keys: ['cox', 'fleet', 'statefarm', 'fidelity', 'ford', 'ibm', 'sync'],
    answer: (q) => {
      const lower = q.toLowerCase();
      const match = PROFILE.experience.find((e) =>
        lower.includes(e.company.toLowerCase().split(' ')[0]) ||
        (lower.includes('cox') && e.company.includes('Cox')) ||
        (lower.includes('ford') && e.company.includes('Ford')) ||
        (lower.includes('ibm') && e.company.includes('IBM')) ||
        (lower.includes('statefarm') && e.company.includes('StateFarm')) ||
        (lower.includes('fidelity') && e.company.includes('Fidelity')) ||
        (lower.includes('sync') && e.company.includes('Ford'))
      );
      if (match) {
        return `${match.role} at ${match.company} (${match.location}): ${match.summary}`;
      }
      return PROFILE.experience.map((e) => `• ${e.role} — ${e.company}`).join('\n');
    },
  },
  {
    keys: ['education', 'degree', 'university', 'college', 'masters', 'bachelor', 'studied', 'qualification'],
    answer: `Education:\n• ${PROFILE.education.join('\n• ')}`,
  },
  {
    keys: ['service', 'offer', 'hire', 'freelance', 'help with'],
    answer: `Services Madhukar offers through this portfolio:\n• ${PROFILE.services.join('\n• ')}`,
  },
  {
    keys: ['contact', 'email', 'reach', 'linkedin', 'github', 'phone', 'message'],
    answer: PROFILE.contact,
  },
  {
    keys: ['resume', 'cv', 'download'],
    answer:
      'You can download Madhukar\'s resume from the sidebar using the "Download Resume" button (file: MadhuKUpdated Resume.docx).',
  },
  {
    keys: ['site', 'page', 'navigation', 'portfolio', 'website', 'how to use'],
    answer: PROFILE.siteHelp,
  },
  {
    keys: ['thank', 'thanks'],
    answer: "You're welcome! Ask anytime about Madhukar's background, skills, or experience.",
  },
];

function scoreEntry(question, entry) {
  const q = question.toLowerCase();
  let score = 0;
  for (const key of entry.keys) {
    if (q.includes(key)) {
      score += key.split(' ').length;
    }
  }
  return score;
}

const PERSONAL_HINTS = [
  'madhukar',
  'ganga',
  'your',
  'you ',
  ' you',
  'his ',
  'him',
  'he ',
  'resume',
  'cv',
  'portfolio',
  'contact you',
  'hire you',
  'about you',
  'about him',
  'who are you',
  'who is he',
  'who is madhukar',
];

const GENERAL_PATTERNS = [
  /^what is\b/,
  /^what's\b/,
  /^who (is|was|invented|discovered)\b/,
  /^how (do|does|did|can|to)\b/,
  /^explain\b/,
  /^define\b/,
  /^when (was|did|is)\b/,
  /^where (is|was|are)\b/,
  /^why (is|are|do|does)\b/,
  /^tell me about (?!madhukar|you|him|his)/,
];

function looksPersonal(question) {
  const q = question.toLowerCase();
  return PERSONAL_HINTS.some((h) => q.includes(h));
}

function looksGeneral(question) {
  const q = question.toLowerCase().trim();
  if (looksPersonal(q)) return false;
  return GENERAL_PATTERNS.some((re) => re.test(q));
}

/**
 * Match a personal/portfolio question. Returns { matched, answer }.
 */
export function getPersonalReply(question) {
  const trimmed = (question || '').trim();
  if (!trimmed) {
    return {
      matched: true,
      answer:
        'Please type a question — about Madhukar (skills, experience, education) or any general topic.',
    };
  }

  // Definition-style / general questions skip portfolio FAQ (e.g. "What is React?")
  if (looksGeneral(trimmed)) {
    return { matched: false, answer: null };
  }

  let best = null;
  let bestScore = 0;
  for (const entry of FAQ) {
    const score = scoreEntry(trimmed, entry);
    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }

  // Bare tech keywords (react, javascript) only count as personal if the
  // question clearly refers to Madhukar / this portfolio.
  const techOnlyKeys = ['react', 'redux', 'javascript', 'typescript', 'frontend'];
  if (best && bestScore > 0) {
    if (
      best.keys.every((k) => techOnlyKeys.includes(k)) &&
      !looksPersonal(trimmed)
    ) {
      return { matched: false, answer: null };
    }

    return {
      matched: true,
      answer: typeof best.answer === 'function' ? best.answer(trimmed) : best.answer,
    };
  }

  return { matched: false, answer: null };
}

/** @deprecated use getPersonalReply / getAssistantReply */
export function getChatReply(question) {
  const personal = getPersonalReply(question);
  if (personal.matched) return personal.answer;
  return (
    `I can answer questions about ${PROFILE.name} and general topics. ` +
    `Try asking about his skills, or something like "What is React?"`
  );
}

/**
 * Look up a general topic on Wikipedia (no API key). Used when the question
 * is not about Madhukar / this portfolio.
 */
export async function getWikipediaReply(question) {
  const q = (question || '').trim();
  if (!q) return null;

  try {
    const searchUrl =
      'https://en.wikipedia.org/w/api.php?' +
      new URLSearchParams({
        action: 'opensearch',
        search: q,
        limit: '1',
        namespace: '0',
        format: 'json',
        origin: '*',
      });

    const searchRes = await fetch(searchUrl);
    if (!searchRes.ok) return null;
    const searchData = await searchRes.json();
    const title = searchData?.[1]?.[0];
    if (!title) return null;

    const summaryUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
      title
    )}`;
    const summaryRes = await fetch(summaryUrl);
    if (!summaryRes.ok) return null;
    const summary = await summaryRes.json();

    const extract = summary.extract || summary.description;
    if (!extract) return null;

    const pageUrl = summary.content_urls?.desktop?.page;
    return pageUrl
      ? `${extract}\n\nSource: ${pageUrl}`
      : extract;
  } catch (err) {
    return null;
  }
}

/**
 * Prefer AI (ChatGPT-style). Fallbacks: personal FAQ, then Wikipedia.
 */
export async function getGeneralReply(question) {
  const { askChatGPTStyle } = await import('./askAI');
  const aiReply = await askChatGPTStyle(question);
  if (aiReply) return aiReply;

  const wiki = await getWikipediaReply(question);
  if (wiki) return wiki;

  return null;
}

/**
 * Full assistant — AI first for every question (like ChatGPT).
 * Offline fallbacks: portfolio FAQ for personal topics, then Wikipedia.
 */
export async function getAssistantReply(question) {
  const trimmed = (question || '').trim();
  if (!trimmed) {
    return 'Please type a question — about Madhukar or any general topic.';
  }

  // 1) Real AI (Netlify Gateway or REACT_APP_GEMINI_API_KEY)
  try {
    const { askChatGPTStyle } = await import('./askAI');
    const aiReply = await askChatGPTStyle(trimmed);
    if (aiReply) return aiReply;
  } catch (err) {
    // continue to fallbacks
  }

  // 2) Personal FAQ only if AI is unavailable
  const personal = getPersonalReply(trimmed);
  if (personal.matched) return personal.answer;

  // 3) Wikipedia for general topics
  const wiki = await getWikipediaReply(trimmed);
  if (wiki) return wiki;

  return (
    'I need an AI connection to answer that like ChatGPT.\n\n' +
    'Option A (recommended for local): create a free Gemini key at https://aistudio.google.com/apikey\n' +
    'then add to .env.local:\n' +
    'REACT_APP_GEMINI_API_KEY=your_key_here\n' +
    'and restart npm start.\n\n' +
    'Option B (Netlify): enable AI on your site, deploy once, then run: npx netlify dev\n\n' +
    'Meanwhile I can still answer Madhukar questions like "What are his skills?" without AI.'
  );
}
