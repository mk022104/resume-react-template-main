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

/**
 * Return a reply for a user question based on portfolio knowledge.
 */
export function getChatReply(question) {
  const trimmed = (question || '').trim();
  if (!trimmed) {
    return 'Please type a question about Madhukar — for example skills, experience, education, or contact.';
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

  if (best && bestScore > 0) {
    return typeof best.answer === 'function' ? best.answer(trimmed) : best.answer;
  }

  return (
    `I can answer questions about ${PROFILE.name} based on this portfolio — ` +
    `his background, skills, work experience (Pearson, Cox, StateFarm, Fidelity, Ford, IBM), ` +
    `education, services, resume, or how to contact him. Try asking something like ` +
    `"What are his skills?" or "Where does he work?"`
  );
}
