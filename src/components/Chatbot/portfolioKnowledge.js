/**
 * Knowledge about Madhukar Gangapuram — portfolio pages + MadhukarReddyUpdated Resume.docx
 */

import {
  RESUME,
  RESUME_TEXT,
  formatExperience,
  findExperienceByYear,
  findExperienceByKeyword,
  findExperienceByLocation,
  getPreviousProjects,
  isHomeLocationQuestion,
  listAllResumeLocations,
} from './resumeKnowledge';

function flattenSkills() {
  return Object.values(RESUME.technicalSkills).flat();
}

export const PROFILE = {
  name: RESUME.displayName,
  fullName: RESUME.fullName,
  title: RESUME.title,
  employer: 'Pearson',
  location: RESUME.location,
  email: RESUME.email,
  phone: RESUME.phone,
  experienceYears: '10+ years IT / 8+ years React',
  about: RESUME.summary,
  skills: flattenSkills(),
  experience: RESUME.experience.map((e) => ({
    role: e.role,
    company: e.company,
    location: e.location,
    dates: e.dates,
    summary: `${e.project}. ${e.highlights.slice(0, 4).join('; ')}.`,
  })),
  education: RESUME.education,
  services: [
    'Web Design',
    'Web Development',
    'Frontend Development',
    'Bootstrap Template',
    'Tailwind CSS Template',
    'React Template',
  ],
  contact: `Email: ${RESUME.email}. Phone: ${RESUME.phone}. Location: ${RESUME.location}. LinkedIn: ${RESUME.linkedIn}. GitHub: ${RESUME.github}. Portfolio: ${RESUME.portfolioUrl}. Or use the Contact page (/contact). Resume download is in the sidebar (MadhukarReddyUpdated Resume.docx).`,
  siteHelp:
    'This portfolio has pages for About, Services, Experience (Portfolio), Education Details (Qualification), Contact, and Info (Group). Use the navigation at the top to switch sections.',
  resumeText: RESUME_TEXT,
};

const FAQ = [
  {
    keys: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening'],
    answer: `Hi! I'm Madhukar's assistant. Ask about his resume — skills, experience, education, contact — or any general topic.`,
  },
  {
    keys: [
      'who are you',
      'your name',
      'who is madhukar',
      'about madhukar',
      'about you',
      'who is he',
      'introduce',
      'summary',
      'professional summary',
    ],
    answer: `${RESUME.fullName} — ${RESUME.title} in ${RESUME.location}.\n\n${RESUME.summary}`,
  },
  {
    keys: [
      'previous project',
      'previousproject',
      'previous projects',
      'past project',
      'past projects',
      'last project',
      'prior project',
      'earlier project',
      'old project',
    ],
    answer: (() => {
      const prev = getPreviousProjects();
      const last = prev[0];
      return (
        `Previous project (most recent before current):\n${formatExperience(last)}\n\n` +
        `Other past roles:\n` +
        prev
          .slice(1)
          .map((e) => `• ${e.project} — ${e.company} (${e.dates})`)
          .join('\n')
      );
    })(),
  },
  {
    keys: [
      'current project',
      'currentproject',
      'present project',
      'ongoing project',
      'latest project',
      'what project',
      'working on',
    ],
    answer: (() => {
      const cur = RESUME.experience[0];
      return `Current project (from resume):\n${formatExperience(cur)}`;
    })(),
  },
  {
    keys: [
      'what do you do',
      'current job',
      'current role',
      'currentrole',
      'current company',
      'currentcompany',
      'where do you work',
      'employer',
      'company now',
      'pearson',
    ],
    answer: (() => {
      const pearson = RESUME.experience[0];
      return `${RESUME.fullName} is a ${pearson.role} at ${pearson.company} (${pearson.dates}, ${pearson.location}). Project: ${pearson.project}.\n• ${pearson.highlights.slice(0, 6).join('\n• ')}`;
    })(),
  },
  {
    keys: ['skill', 'tech stack', 'technologies', 'tools', 'what can you', 'expertise', 'proficient'],
    answer: `Technical skills from Madhukar's resume:\n${Object.entries(RESUME.technicalSkills)
      .map(([group, list]) => `• ${group}: ${list.join(', ')}`)
      .join('\n')}`,
  },
  {
    keys: ['react', 'redux', 'javascript', 'typescript', 'frontend', 'next.js', 'nextjs'],
    answer: `Yes — Madhukar is a ${RESUME.title}. Core stack includes React.js, Next.js, TypeScript, Redux/Redux Toolkit/Saga, Zustand, Storybook, Vite/Webpack, Jest/RTL, Cypress, Playwright, AWS/Azure, and WCAG accessibility.`,
  },
  {
    keys: ['experience', 'work history', 'career', 'jobs', 'worked', 'previous', 'companies'],
    answer:
      'Work experience from resume:\n\n' +
      RESUME.experience
        .map(
          (e) =>
            `• ${e.role} at ${e.company} (${e.dates}, ${e.location})\n  Project: ${e.project}\n  ${e.highlights.slice(0, 3).join('; ')}`
        )
        .join('\n\n'),
  },
  {
    keys: ['cox', 'fleet', 'statefarm', 'state farm', 'fidelity', 'ford', 'ibm', 'sync', 'bench', 'quantum'],
    answer: (q) => {
      const lower = q.toLowerCase();
      const match = RESUME.experience.find((e) => {
        const c = e.company.toLowerCase();
        return (
          lower.includes(c.split(' ')[0]) ||
          (lower.includes('cox') && c.includes('cox')) ||
          (lower.includes('state') && c.includes('state')) ||
          (lower.includes('fidelity') && c.includes('fidelity')) ||
          (lower.includes('ford') && c.includes('ford')) ||
          (lower.includes('ibm') && c.includes('ibm')) ||
          (lower.includes('bench') && c.includes('bench')) ||
          (lower.includes('sync') && c.includes('ford')) ||
          (lower.includes('quantum') && c.includes('ibm')) ||
          (lower.includes('pearson') && c.includes('pearson'))
        );
      });
      if (match) {
        return `${match.role} at ${match.company} (${match.dates}, ${match.location})\nProject: ${match.project}\n• ${match.highlights.join('\n• ')}`;
      }
      return RESUME.experience.map((e) => `• ${e.role} — ${e.company} (${e.dates})`).join('\n');
    },
  },
  {
    keys: ['education', 'degree', 'university', 'college', 'masters', 'bachelor', 'studied', 'qualification'],
    answer: `Education from resume:\n• ${RESUME.education.join('\n• ')}`,
  },
  {
    keys: ['service', 'offer', 'hire', 'freelance', 'help with'],
    answer: `Services listed on this portfolio:\n• ${PROFILE.services.join('\n• ')}`,
  },
  {
    keys: ['phone number', 'phone no', 'mobile number', 'mobile no', 'cell phone', 'telephone', 'phone', 'mobile', 'call him', 'call me'],
    answer: RESUME.phone,
  },
  {
    keys: ['email address', 'email id', 'e-mail', 'mail id', 'gmail', 'email', 'mail'],
    answer: RESUME.email,
  },
  {
    keys: [
      'home address',
      'mailing address',
      'full address',
      'street address',
      'where does he live',
      'where is he located',
      'home city',
    ],
    answer: RESUME.location,
  },
  {
    keys: [
      'all locations',
      'work locations',
      'work location',
      'cities worked',
      'where has he worked',
    ],
    answer: listAllResumeLocations(),
  },
  {
    keys: [
      'cary',
      'durham',
      'atlanta',
      'richardson',
      'dearborn',
      'san jose',
      'sanjose',
      'bangalore',
      'bengaluru',
    ],
    answer: (q) => getLocationBasedReply(q) || RESUME.location,
  },
  {
    keys: ['address', 'location', 'city'],
    answer: RESUME.location,
  },
  {
    keys: ['linkedin profile', 'linkedin url', 'linkedin'],
    answer: RESUME.linkedIn,
  },
  {
    keys: ['github profile', 'github url', 'github'],
    answer: RESUME.github,
  },
  {
    keys: ['full name', 'fullname', 'complete name', 'his name', 'your name'],
    answer: RESUME.fullName,
  },
  {
    keys: ['first name', 'firstname', 'given name'],
    answer: RESUME.firstName,
  },
  {
    keys: ['last name', 'lastname', 'surname', 'family name'],
    answer: RESUME.lastName,
  },
  {
    keys: ['job title', 'designation', 'current title', 'his title'],
    answer: RESUME.title,
  },
  {
    keys: ['contact details', 'contact info', 'how to contact', 'reach him', 'reach out', 'contact', 'message'],
    answer: PROFILE.contact,
  },
  {
    keys: ['resume', 'cv', 'download'],
    answer:
      `Madhukar's resume (MadhukarReddyUpdated Resume.docx) is available via "Download Resume" in the sidebar.\n\nQuick resume facts:\n• ${RESUME.fullName}, ${RESUME.title}\n• ${RESUME.location} | ${RESUME.email} | ${RESUME.phone}\n• ${RESUME.experienceYears}\n• Current: ${RESUME.experience[0].role} at ${RESUME.experience[0].company} — ${RESUME.experience[0].project}\n\nAsk about any section (skills, a company, education) for details from the resume.`,
  },
  {
    keys: ['site', 'page', 'navigation', 'portfolio', 'website', 'how to use'],
    answer: PROFILE.siteHelp,
  },
  {
    keys: ['thank', 'thanks'],
    answer: "You're welcome! Ask anytime about Madhukar's resume or a general topic.",
  },
];

/** Exact field answers — phone → phone only, email → email only, etc. */
const SPECIFIC_FIELD_RULES = [
  {
    patterns: [
      /\bprevious\s*projects?\b/i,
      /\bpreviousproject\b/i,
      /\bpast\s*projects?\b/i,
      /\blast\s*projects?\b/i,
      /\bprior\s*projects?\b/i,
      /\bearlier\s*projects?\b/i,
      /\bold\s*projects?\b/i,
      /\bformer\s*projects?\b/i,
    ],
    answer: () => {
      const prev = getPreviousProjects();
      const last = prev[0];
      return (
        `Previous project (most recent before current, from resume):\n` +
        `${formatExperience(last)}\n\n` +
        `Other past projects:\n` +
        prev
          .slice(1)
          .map((e) => `• ${e.project} — ${e.company} (${e.dates})`)
          .join('\n')
      );
    },
  },
  {
    patterns: [
      /\bcurrent\s*projects?\b/i,
      /\bcurrentproject\b/i,
      /\bpresent\s+projects?\b/i,
      /\bongoing\s+projects?\b/i,
      /\blatest\s+projects?\b/i,
      /\bwhat\s+projects?\s+(is|are|he|you)\b/i,
      /\bwhich\s+projects?\b/i,
      /\bworking\s+on\b/i,
    ],
    answer: () => {
      const cur = RESUME.experience[0];
      return `Current project (from resume):\n${formatExperience(cur)}`;
    },
  },
  {
    patterns: [
      /\bcurrent\s*(job|role|company|employer|position)\b/i,
      /\bwhere\s+(do\s+you|does\s+he)\s+work\b/i,
    ],
    answer: () => {
      const cur = RESUME.experience[0];
      return `${cur.role} at ${cur.company} (${cur.dates}, ${cur.location})\nProject: ${cur.project}`;
    },
  },
  {
    patterns: [
      /\bphone\s*numbers?\b/i,
      /\bmobile\s*numbers?\b/i,
      /\bcell\s*phones?\b/i,
      /\btelephone\b/i,
      /\bphone\b/i,
      /\bmobile\b/i,
      /\bcall\s+(him|her|you|me)\b/i,
    ],
    answer: () => RESUME.phone,
  },
  {
    patterns: [
      /\bemail\s*address(es)?\b/i,
      /\be-?mails?\b/i,
      /\bmail\s*ids?\b/i,
      /\bgmail\b/i,
      /\bmail\b/i,
    ],
    answer: () => RESUME.email,
  },
  {
    patterns: [
      /\b(home|mailing|street|full)\s+address\b/i,
      /\bwhere\s+(does\s+he\s+live|is\s+he\s+based|is\s+he\s+located|do\s+you\s+live)\b/i,
      /\b(his|your|my)\s+location\b/i,
      /\bhome\s+(city|town|location)\b/i,
    ],
    answer: () => RESUME.location,
  },
  {
    patterns: [
      /\ball\s+locations?\b/i,
      /\bwork\s+locations?\b/i,
      /\blocations?\s+in\s+(resume|cv)\b/i,
      /\bwhere\s+has\s+he\s+worked\b/i,
      /\bworked\s+(in|at)\s+which\s+(cities|locations)\b/i,
    ],
    answer: () => listAllResumeLocations(),
  },
  {
    patterns: [/\blinkedin\b/i],
    answer: () => RESUME.linkedIn,
  },
  {
    patterns: [/\bgithub\b/i],
    answer: () => RESUME.github,
  },
  {
    patterns: [
      /\bfull\s*name\b/i,
      /\bfullname\b/i,
      /\bcomplete\s+name\b/i,
      /\bhis\s+name\b/i,
      /\byour\s+name\b/i,
    ],
    answer: () => RESUME.fullName,
  },
  {
    patterns: [/\bfirst\s*name\b/i, /\bfirstname\b/i, /\bgiven\s+name\b/i],
    answer: () => RESUME.firstName,
  },
  {
    patterns: [/\blast\s*name\b/i, /\blastname\b/i, /\bsurname\b/i, /\bfamily\s+name\b/i],
    answer: () => RESUME.lastName,
  },
  {
    patterns: [/\b(job\s+)?title\b/i, /\bdesignation\b/i],
    answer: () => RESUME.title,
  },
];

/**
 * Year-based resume lookup, e.g. "2021", "project in 2019", "what did he do in 2020".
 */
function getYearBasedProjectReply(question) {
  const years = [...question.matchAll(/\b(20\d{2}|201[3-9])\b/g)].map((m) => Number(m[1]));
  if (!years.length) return null;

  const uniqueYears = [...new Set(years)];
  const blocks = [];

  for (const year of uniqueYears) {
    const matches = findExperienceByYear(year);
    if (!matches.length) {
      blocks.push(`No resume project listed for ${year}.`);
      continue;
    }
    blocks.push(
      `Project(s) in ${year} (from resume):\n` +
        matches.map((e) => formatExperience(e, { highlightCount: 5 })).join('\n\n')
    );
  }

  return blocks.join('\n\n');
}

/**
 * Keyword / company / project-name lookup from the resume.
 */
function getKeywordProjectReply(question) {
  const match = findExperienceByKeyword(question);
  if (!match) return null;
  return `Matching project from resume:\n${formatExperience(match)}`;
}

/**
 * Location lookup: Cary/home, or any work city from the resume.
 */
function getLocationBasedReply(question) {
  const q = (question || '').trim();
  if (!q) return null;

  // Explicit home / live questions
  if (isHomeLocationQuestion(q) && !findExperienceByLocation(q).length) {
    return RESUME.location;
  }

  // Mentions Cary (home) — and not only a different work city
  const homeHit = (RESUME.locationKeywords || []).some((kw) =>
    q.toLowerCase().includes(kw)
  );
  const workMatches = findExperienceByLocation(q);

  // Filter out false positives: "nc" matching too many — prefer specific cities
  const specificWork = workMatches.filter((e) => {
    const keys = e.locationKeywords || [];
    return keys.some((kw) => {
      const k = kw.toLowerCase();
      // skip ultra-short or vague tokens unless exact phrase in question
      if (k === 'nc' || k === 'ga' || k === 'tx' || k === 'mi' || k === 'ca') {
        return new RegExp(`\\b${k}\\b`, 'i').test(q) && /,\s*(nc|ga|tx|mi|ca)\b/i.test(q);
      }
      return q.toLowerCase().includes(k);
    });
  });

  if (homeHit && !specificWork.length) {
    return (
      `Home / current city (from resume): ${RESUME.location}\n\n` +
      `He currently works Hybrid in Durham, NC at Pearson.`
    );
  }

  if (specificWork.length || workMatches.length) {
    const list = (specificWork.length ? specificWork : workMatches).map(
      (e) => formatExperience(e, { highlightCount: 4 })
    );
    const header = homeHit
      ? `Home city: ${RESUME.location}\n\nAlso related work location(s) from resume:\n`
      : `Location match from resume:\n`;
    return header + list.join('\n\n');
  }

  // Generic "location" / "address" / "city" without a named place → home city
  if (/\b(location|address|city)\b/i.test(q)) {
    return RESUME.location;
  }

  return null;
}

/**
 * If the user asks for one specific field, return only that value.
 * Also handles previous/current project, years, locations, and resume keywords.
 */
export function getSpecificFieldReply(question) {
  const q = (question || '').trim();
  if (!q) return null;

  for (const rule of SPECIFIC_FIELD_RULES) {
    if (rule.patterns.some((re) => re.test(q))) {
      return rule.answer();
    }
  }

  // Locations: Cary, Durham, Atlanta, Richardson, Dearborn, San Jose, Bangalore, etc.
  const locationReply = getLocationBasedReply(q);
  if (locationReply) return locationReply;

  // Year questions: "2021", "project in 2019", "what in 2020"
  const yearReply = getYearBasedProjectReply(q);
  if (yearReply) return yearReply;

  // Keyword / company / project name (cox, fleet, quantum, aqp, ford, ibm, ...)
  const looksLikeProjectAsk =
    /\b(project|company|role|job|work|worked|experience|at)\b/i.test(q) ||
    findExperienceByKeyword(q);

  if (looksLikeProjectAsk) {
    const keywordReply = getKeywordProjectReply(q);
    if (keywordReply) return keywordReply;
  }

  return null;
}
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
 * Full assistant — specific fields first (phone/email/location only),
 * then AI, then broader resume FAQ, then Wikipedia.
 */
export async function getAssistantReply(question) {
  const trimmed = (question || '').trim();
  if (!trimmed) {
    return 'Please type a question — about Madhukar or any general topic.';
  }

  // 0) Specific field only (phone → phone, email → email, location → location)
  const specific = getSpecificFieldReply(trimmed);
  if (specific) return specific;

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
    'AI is not connected yet.\n\n' +
    '1) Open https://aistudio.google.com/apikey and create a free API key\n' +
    '2) Paste it in .env.local as:\n' +
    '   REACT_APP_GEMINI_API_KEY=paste_key_here\n' +
    '3) Restart npm start\n\n' +
    'Until then I can still answer Madhukar resume questions (skills, jobs, education, contact).'
  );
}
