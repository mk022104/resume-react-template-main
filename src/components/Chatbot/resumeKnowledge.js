/**
 * Knowledge extracted from public/MadhukarReddyUpdated Resume.docx
 * (sidebar "Download Resume" file). Keep in sync when the resume changes.
 */

export const RESUME = {
  fullName: 'Madhukar Reddy Gangapuram',
  firstName: 'Madhukar Reddy',
  lastName: 'Gangapuram',
  displayName: 'Madhukar Ganga',
  title: 'Senior React JS / Frontend Developer',
  location: 'Cary, NC',
  locationKeywords: ['cary', 'cary nc', 'cary, nc', 'north carolina', 'nc'],
  email: 'Madhu.ganga2018@gmail.com',
  phone: '984-377-1236',
  portfolioUrl: 'https://madhuresume.netlify.app/',
  linkedIn: 'https://www.linkedin.com/in/ganga1935/',
  github: 'https://github.com/mk022104/resume-react-template-main',
  summary:
    'Senior React JS Developer with 10+ years of IT experience including 8+ years specializing in React.js, Next.js, TypeScript, and modern frontend architecture. Builds scalable, secure, high-performance enterprise web apps across insurance, finance, automotive, education, and cloud platforms. Strong in Redux, Redux Toolkit, Redux-Saga, Zustand, React Hooks, Context API, Next.js, Storybook, Micro Frontends, WCAG/ARIA accessibility, REST/GraphQL, CI/CD, Docker, Jenkins, GitHub Actions, AWS, Azure, and enterprise auth (MFA, SSO, OAuth, passwordless). Collaborates with teams, mentors developers, and delivers production-ready applications.',
  technicalSkills: {
    frontend: [
      'React.js',
      'JavaScript (ES6+)',
      'TypeScript',
      'HTML5',
      'CSS3',
      'SCSS',
      'LESS',
      'Tailwind CSS',
      'Bootstrap',
      'Material UI',
      'Styled Components',
      'Responsive Design',
      'WCAG',
      'ARIA',
    ],
    stateAndLibs: [
      'Redux',
      'Redux Toolkit',
      'Redux-Saga',
      'Thunk',
      'Zustand',
      'React Hooks',
      'Context API',
      'React Router',
      'Storybook',
      'React Hook Form',
    ],
    api: ['REST APIs', 'GraphQL', 'Axios', 'Fetch API', 'Node.js', 'Express.js'],
    testing: [
      'Jest',
      'React Testing Library',
      'Cypress',
      'Playwright',
    ],
    buildTools: [
      'Webpack',
      'Vite',
      'Babel',
      'NPM',
      'Gulp',
      'Grunt',
      'Docker',
      'Jenkins',
      'GitHub Actions',
    ],
    cloud: ['AWS', 'Azure', 'CI/CD Pipelines'],
    collaboration: [
      'GitHub',
      'GitLab',
      'Bitbucket',
      'JIRA',
      'Slack',
      'Agile/Scrum',
    ],
    design: ['Figma', 'InVision'],
  },
  experience: [
    {
      company: 'Pearson',
      role: 'Senior UI Developer',
      dates: 'Oct 2024 – Present',
      yearStart: 2024,
      yearEnd: 2026,
      location: 'Hybrid | Durham, NC',
      locationKeywords: ['durham', 'durham nc', 'durham, nc', 'hybrid'],
      project: 'Access Management & Authentication Platform',
      keywords: [
        'pearson',
        'senior ui',
        'access management',
        'authentication',
        'sso',
        'mfa',
        'otp',
        'passwordless',
        'certiport',
        'forgerock',
        'storybook',
        'gemini',
        'openai',
        'claude',
        'playwright',
        'cypress',
        'vite',
        'module federation',
        'micro frontend',
      ],
      highlights: [
        'Secure auth flows with React.js, TypeScript, and modern frontend architecture',
        'Enterprise SSO, MFA, OTP validation, and passwordless login',
        'Progressive profile / mobile number registration and verification',
        'WCAG accessibility, keyboard navigation (Tab/Enter/Arrow), Lighthouse and NVDA testing',
        'Accessible components with UX/UI (contrast, focus management, semantic HTML, ARIA)',
        'Storybook shared component libraries',
        'REST APIs for authentication, profile management, and partner onboarding',
        'Performance: React.memo, useMemo, useCallback, and virtualization',
        'Generative AI conversational UI (OpenAI GPT, Claude AI, Google Gemini)',
        'Micro Frontends with shared libraries and Module Federation',
        'React 18 migration with backward compatibility',
        'React.js apps with Vite as primary build tool',
        'Cypress and Playwright automation in CI/CD (GitHub Actions, Jenkins, Docker)',
      ],
    },
    {
      company: 'Cox Automotive',
      role: 'Senior React Developer',
      dates: 'Aug 2021 – Oct 2024',
      yearStart: 2021,
      yearEnd: 2024,
      location: 'Atlanta, GA',
      locationKeywords: ['atlanta', 'atlanta ga', 'atlanta, ga', 'georgia'],
      project: 'Fleet Management & Vehicle Maintenance Platform',
      keywords: [
        'cox',
        'cox automotive',
        'fleet',
        'vehicle',
        'maintenance',
        'mobility',
        'atlanta',
        'next.js',
        'nextjs',
      ],
      highlights: [
        'Enterprise apps with React.js, Next.js, Redux, TypeScript, and Node.js',
        'Reusable responsive UI; Redux, Redux-Thunk, and Context API',
        'Dynamic dashboards, reporting, and analytics for fleet management',
        'Jest and React Testing Library for components, hooks, and accessibility',
        'API testing for frontend-backend integration and data sync',
        'Playwright and Cypress E2E automation across Chromium, Firefox, and WebKit',
        'Performance: lazy loading, memoization, Webpack optimization',
      ],
    },
    {
      company: 'State Farm',
      role: 'Senior React Developer',
      dates: 'Mar 2020 – Aug 2021',
      yearStart: 2020,
      yearEnd: 2021,
      location: 'Richardson, TX',
      locationKeywords: ['richardson', 'richardson tx', 'richardson, tx', 'texas'],
      project: 'Auto Quote Purchase (AQP) Platform',
      keywords: [
        'state farm',
        'statefarm',
        'aqp',
        'auto quote',
        'quote purchase',
        'insurance',
        'richardson',
        'spring boot',
      ],
      highlights: [
        'Responsive SPA with React.js, TypeScript, Redux, and React Router',
        'Secure REST APIs with Spring Boot backends',
        'HTTPS and token-based authentication',
        'Jest and React Testing Library unit/integration tests',
        'WCAG 2.1 AA accessibility and responsive UI improvements',
      ],
    },
    {
      company: 'Fidelity Investments',
      role: 'Senior UI Developer',
      dates: 'Jun 2019 – Mar 2020',
      yearStart: 2019,
      yearEnd: 2020,
      location: 'Durham, NC',
      locationKeywords: ['durham', 'durham nc', 'durham, nc'],
      project: 'Security & Authentication Applications',
      keywords: [
        'fidelity',
        'security center',
        '2fa',
        'pattern lab',
        'aws migration',
        'durham',
      ],
      highlights: [
        'Responsive React apps with reusable component architecture',
        'Migrated class components to React Hooks; Redux state management',
        'Storybook and Pattern Lab component documentation',
        'Cypress E2E tests; TypeScript, LESS, and SASS',
        'On-prem to AWS migration; Micro Frontends with Docker/CI/CD',
      ],
    },
    {
      company: 'Ford',
      role: 'UI Developer',
      dates: 'Dec 2018 – May 2019',
      yearStart: 2018,
      yearEnd: 2019,
      location: 'Dearborn, MI',
      locationKeywords: ['dearborn', 'dearborn mi', 'dearborn, mi', 'michigan'],
      project: 'SYNC In-Vehicle Communication Platform',
      keywords: [
        'ford',
        'sync',
        'app link',
        'applink',
        'in-vehicle',
        'dearborn',
        'lincoln',
      ],
      highlights: [
        'Responsive frontend with React.js, Redux, JavaScript, HTML5, and CSS3',
        'Token-based auth; Node.js modules; LESS/SASS',
        'API integrations with backend and mobile teams',
        'Micro Frontend performance: lazy loading, code splitting, memoization',
      ],
    },
    {
      company: 'IBM',
      role: 'Sr. UI / React Developer',
      dates: 'Apr 2016 – Dec 2018',
      yearStart: 2016,
      yearEnd: 2018,
      location: 'San Jose, CA',
      locationKeywords: [
        'san jose',
        'sanjose',
        'san jose ca',
        'san jose, ca',
        'california',
      ],
      project: 'IBM Quantum Experience Platform',
      keywords: [
        'ibm',
        'quantum',
        'quantum experience',
        'san jose',
        'sanjose',
      ],
      highlights: [
        'Web apps with React.js, JavaScript, HTML5, CSS3, and Node.js',
        'Reusable UI and responsive layouts for enterprise portals',
        'Full SDLC; REST APIs; SCSS/LESS; Webpack',
        'Unit and snapshot tests to improve quality',
      ],
    },
    {
      company: 'Bench Tech Software Pvt Ltd',
      role: 'UI Developer',
      dates: 'Jan 2013 – Dec 2015',
      yearStart: 2013,
      yearEnd: 2015,
      location: 'Bangalore, India',
      locationKeywords: [
        'bangalore',
        'bengaluru',
        'india',
        'bangalore india',
      ],
      project: 'Web applications',
      keywords: [
        'bench tech',
        'benchtech',
        'bangalore',
        'bengaluru',
        'jquery',
        'karma',
        'jasmine',
      ],
      highlights: [
        'Responsive apps with HTML5, CSS3, JavaScript, jQuery, and Bootstrap',
        'Form validation, reusable UI, and interactive frontend features',
        'Jasmine/Karma unit testing; stakeholder requirement analysis',
      ],
    },
  ],
  education: [
    'Master of Science in Computer Science Engineering (MS CSE) — Chicago State University — 2017',
    'Bachelor of Technology in Information Technology (BTech IT) — Scient Institute of Technology — 2012',
  ],
};

/** Flat text block for AI system prompts and offline FAQ. */
export function buildResumeText() {
  const skills = Object.entries(RESUME.technicalSkills)
    .map(([k, list]) => `${k}: ${list.join(', ')}`)
    .join('\n');

  const jobs = RESUME.experience
    .map(
      (e) =>
        `${e.role} at ${e.company} (${e.dates}, ${e.location})\nProject: ${e.project}\n• ${e.highlights.join('\n• ')}`
    )
    .join('\n\n');

  return `
RESUME OF ${RESUME.fullName}
First name: ${RESUME.firstName}
Last name: ${RESUME.lastName}
Title: ${RESUME.title}
Location: ${RESUME.location}
Email: ${RESUME.email}
Phone: ${RESUME.phone}
Portfolio: ${RESUME.portfolioUrl}
LinkedIn: ${RESUME.linkedIn}
GitHub: ${RESUME.github}

PROFESSIONAL SUMMARY
${RESUME.summary}

TECHNICAL SKILLS
${skills}

PROFESSIONAL EXPERIENCE
${jobs}

EDUCATION
• ${RESUME.education.join('\n• ')}
`.trim();
}

export const RESUME_TEXT = buildResumeText();

/** Format one experience entry for chat replies. */
export function formatExperience(e, { highlightCount = 8 } = {}) {
  return (
    `${e.project}\n` +
    `Company: ${e.company}\n` +
    `Role: ${e.role}\n` +
    `Dates: ${e.dates} | ${e.location}\n` +
    `Highlights:\n• ${e.highlights.slice(0, highlightCount).join('\n• ')}`
  );
}

/** Jobs that overlap a calendar year. */
export function findExperienceByYear(year) {
  const y = Number(year);
  if (!y) return [];
  return RESUME.experience.filter((e) => y >= e.yearStart && y <= e.yearEnd);
}

/**
 * Match resume jobs by company / project / keyword phrases in the question.
 * Longer keyword matches score higher.
 */
export function findExperienceByKeyword(question) {
  const q = (question || '').toLowerCase();
  let best = null;
  let bestScore = 0;

  for (const e of RESUME.experience) {
    let score = 0;
    const company = e.company.toLowerCase();
    const project = e.project.toLowerCase();
    if (q.includes(company) || company.split(/\s+/).some((w) => w.length > 3 && q.includes(w))) {
      score += company.length;
    }
    if (q.includes(project) || project.split(/\s+/).some((w) => w.length > 4 && q.includes(w))) {
      score += 5;
    }
    for (const kw of e.keywords || []) {
      if (q.includes(kw.toLowerCase())) {
        score += kw.length;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      best = e;
    }
  }

  return bestScore > 0 ? best : null;
}

/** All previous roles (everything after current). */
export function getPreviousProjects() {
  return RESUME.experience.slice(1);
}

/** Jobs tied to a work location mentioned in the question. */
export function findExperienceByLocation(question) {
  const q = (question || '').toLowerCase().replace(/\s+/g, ' ').trim();
  const matches = [];

  for (const e of RESUME.experience) {
    const loc = (e.location || '').toLowerCase();
    const keys = e.locationKeywords || [];
    const hit =
      q.includes(loc) ||
      keys.some((kw) => q.includes(kw.toLowerCase())) ||
      loc.split(/[|,]/).some((part) => {
        const p = part.trim();
        return p.length > 2 && q.includes(p);
      });
    if (hit) matches.push(e);
  }

  return matches;
}

/** True when the question refers to home / residence location (Cary, NC). */
export function isHomeLocationQuestion(question) {
  const q = (question || '').toLowerCase();
  const homeKeys = RESUME.locationKeywords || [];
  const asksHome =
    /\b(live|lives|living|home|reside|resident|based\s+in|from)\b/i.test(q) ||
    /\b(his|your|my)\s+location\b/i.test(q) ||
    /\bwhere\s+(do\s+you|does\s+he)\s+live\b/i.test(q);
  const mentionsHome = homeKeys.some((kw) => q.includes(kw));
  return asksHome || mentionsHome;
}

/** List every location from the resume (home + work). */
export function listAllResumeLocations() {
  const lines = [
    `Home / current city: ${RESUME.location}`,
    '',
    'Work locations from resume:',
    ...RESUME.experience.map(
      (e) => `• ${e.location} — ${e.company} (${e.dates}) — ${e.project}`
    ),
  ];
  return lines.join('\n');
}
