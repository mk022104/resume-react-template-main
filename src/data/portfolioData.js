import Madhukar from '../images/portfolio/Madhukar.jpg';
import LondonBuilding from '../images/londonbuilding.jpg';
import ScientInstituteOfEngineering from '../images/blog/ScientInstituteOfTechnology.jpg';
import CSU from '../images/blog/ChicagoStateUniversity.jpg';

export const portfolioData = {
  profile: {
    name: 'Madhukar Ganga',
    fullName: 'Madhukar Reddy Gangapuram',
    role: 'Senior UI Developer',
    company: 'Pearson Educational',
    companyUrl: 'https://www.pearson.com/',
    location: 'Cary, NC',
    email: 'Madhu.ganga2018@gmail.com',
    phone: '984-377-1236',
    avatar: Madhukar,
    coverImage: LondonBuilding,
    resumeUrl: '/MadhukarReddyUpdated%20Resume.docx',
    resumeDownloadName: 'Madhukar-Ganga-Resume.docx',
  },
  social: [
    {
      id: 1,
      name: 'Facebook',
      icon: 'facebook',
      url: 'https://www.facebook.com/',
    },
    {
      id: 2,
      name: 'Github',
      icon: 'github',
      url: 'https://github.com/mk022104/resume-react-template-main',
    },
    {
      id: 3,
      name: 'LinkedIn',
      icon: 'linkedin',
      url: 'https://www.linkedin.com/in/ganga1935/',
    },
    {
      id: 4,
      name: 'Instagram',
      icon: 'instagram',
      url: 'https://www.instagram.com/',
    },
  ],
  navigation: [
    { title: 'About', to: '/about' },
    { title: 'Services', to: '/services' },
    { title: 'Portfolio', to: '/portfolio' },
    { title: 'Education', to: '/qualification' },
    { title: 'Contact', to: '/contact' },
    { title: 'Info', to: '/group' },
    { title: 'Weather', to: '/weather' },
  ],
  routeMetadata: {
    '/about': {
      title: 'About | Madhukar Ganga',
      description:
        'Learn about Madhukar Ganga, a senior UI developer specializing in accessible, scalable React applications.',
    },
    '/services': {
      title: 'Services | Madhukar Ganga',
      description:
        'Frontend development services including React architecture, accessibility, performance, and testing.',
    },
    '/portfolio': {
      title: 'Portfolio | Madhukar Ganga',
      description:
        'Selected frontend projects and career experience from Madhukar Ganga.',
    },
    '/qualification': {
      title: 'Education | Madhukar Ganga',
      description:
        'Education and professional qualifications for Madhukar Ganga.',
    },
    '/contact': {
      title: 'Contact | Madhukar Ganga',
      description:
        'Contact Madhukar Ganga about frontend development opportunities and projects.',
    },
    '/group': {
      title: 'Info | Madhukar Ganga',
      description: 'Additional information about Madhukar Ganga.',
    },
    '/weather': {
      title: 'Local Weather | Madhukar Ganga',
      description:
        'Live local conditions and a four-day forecast based on your browser location.',
    },
  },
  about: {
    heading: 'Who am I?',
    paragraphs: [
      'Senior React JS / Frontend Developer with 11+ years of IT experience including 10+ years specializing in React.js, TypeScript, Javascript and modern frontend architecture. Builds scalable, secure, high-performance enterprise web apps across insurance, finance, automotive, education, and cloud platforms.',
      'Currently Senior UI Developer at Pearson on the Access Management & Authentication Platform (SSO, MFA, passwordless, WCAG, Storybook, Micro Frontends, Vite, Cypress/Playwright). Strong in Redux, Redux Toolkit, Next.js, REST/GraphQL, CI/CD, Docker, AWS/Azure, and enterprise auth. Collaborates with teams, mentors developers, and delivers production-ready applications.',
    ],
  },
  sidebar: {
    availability: 'Open to senior frontend opportunities',
    contactLabel: 'Contact Madhukar',
    aboutTitle: 'About Me',
    resumeLabel: 'Download Resume (DOCX)',
    paragraphs: [
      'I specialize in React and modern frontend architecture — Redux, Next.js, TypeScript, Storybook, Micro Frontends, and WCAG accessibility.',
      'As a Senior UI Developer at Pearson, I build secure authentication platforms (SSO, MFA, passwordless) and scalable enterprise UIs.',
      'I can help with architecture, performance, accessibility, testing, and delivery best practices.',
      "Ask me anything related to React or frontend development—I'm here to help!",
    ],
  },
  skills: [
    { id: 1, title: 'Html, Css, Scss, Sass', percentage: '90%' },
    { id: 2, title: 'Bootstrap', percentage: '80%' },
    { id: 3, title: 'Material UI, TailwindCSS', percentage: '80%' },
    { id: 4, title: 'Javascript', percentage: '70%' },
    { id: 5, title: 'Typescript, Next Js', percentage: '70%' },
    { id: 6, title: 'ReactJS', percentage: '80%' },
    { id: 7, title: 'Redux, Thunk, Redux-Saga', percentage: '80%' },
    { id: 8, title: 'JIRA, Slack, Agile Methodologies', percentage: '70%' },
    { id: 9, title: 'Git, Github', percentage: '80%' },
    { id: 10, title: 'Jest, Mocha, Chai, testing-library', percentage: '80%' },
    { id: 11, title: 'Rest, Graph Ql,Aws', percentage: '70%' },
  ],
  services: {
    heading: 'Services',
    eyebrow: 'What I can help with',
    summary:
      'Thoughtful design and reliable frontend development, tailored to your project.',
    filters: ['All', 'Design', 'Development', 'React', 'Templates'],
    items: [
      {
        id: 1,
        icon: 'code',
        title: 'Web Design',
        categories: ['Design'],
        description:
          'Web design refers to the process of creating and designing websites. It involves planning and arranging various elements such as layout, colors, graphics, fonts, and interactive features to create an aesthetically appealing and user-friendly website.',
      },
      {
        id: 2,
        icon: 'html',
        title: 'Web Development',
        categories: ['Development'],
        description:
          'Web development refers to the process of building and maintaining websites and web applications. It involves the creation of both the front-end (client-side) and back-end (server-side) components of a website or web application.',
      },
      {
        id: 3,
        icon: 'react',
        title: 'Frontend Development',
        categories: ['Development', 'React'],
        description:
          'Front-end development focuses on the visual and interactive aspects of a website. It involves writing code in languages such as HTML, CSS, and JavaScript to create the user interface and implement interactive features.',
      },
      {
        id: 4,
        icon: 'bootstrap',
        title: 'Bootstrap Template',
        categories: ['Templates'],
        description:
          "Bootstrap offers a wide range of pre-built components and styles. Customize the framework to match your project's requirements and create a unique, professional website.",
      },
      {
        id: 5,
        icon: 'tailwind',
        title: 'Tailwindcss Template',
        categories: ['Templates'],
        description:
          'Tailwind CSS can generate extensive CSS files, so optimize the build by purging unused classes. This removes unused styles from production builds, resulting in smaller files and improved performance.',
      },
      {
        id: 6,
        icon: 'react',
        title: 'React Template',
        categories: ['React', 'Templates'],
        description:
          'React efficiently builds complex, interactive, and high-performance user interfaces with a declarative, component-based approach that makes code easier to reason about and maintain.',
      },
    ],
  },
  portfolio: {
    heading: 'Featured work',
    eyebrow: 'Selected projects',
    summary:
      'A selection of products and experiences built for real-world users.',
    filters: ['All', 'React', 'Accessibility', 'Authentication'],
    projects: [
      {
        id: 1,
        title: 'Interactive React Portfolio',
        description:
          'A responsive career portfolio with experience, education, contact, and an AI resume assistant.',
        technologies: ['React', 'Tailwind CSS', 'Jest', 'Playwright'],
        categories: ['React'],
        repository: 'https://github.com/mk022104/resume-react-template-main',
        highlights: [
          'Reusable UI cards',
          'Responsive navigation',
          'Automated component tests',
        ],
      },
      {
        id: 2,
        title: 'Enterprise Authentication Platform',
        description:
          'Enterprise access-management experience covering secure sign-in, MFA, passwordless flows, and accessible onboarding.',
        technologies: ['React', 'TypeScript', 'Micro Frontends', 'WCAG'],
        categories: ['React', 'Accessibility', 'Authentication'],
        role: 'Senior UI Developer at Pearson',
        highlights: [
          'SSO and MFA journeys',
          'Accessible component library',
          'CI/CD automation',
        ],
      },
    ],
    experienceHeading: 'Experience',
    experienceEyebrow: 'Career journey',
    experienceSummary:
      'Roles and projects across enterprise products and platforms.',
    experience: [
      {
        id: 1,
        title:
          'Senior UI Developer, Pearson, Hybrid, Durham, NC (Oct 2024 – Present)',
        project: 'Access Management & Authentication Platform',
        description:
          'Built secure auth flows with React.js and TypeScript — SSO, MFA, OTP, and passwordless login. Progressive profile / mobile verification, WCAG accessibility, Storybook component libraries, REST APIs, Generative AI assistance, Micro Frontends, React 18 / Vite, and Cypress/Playwright in CI/CD.',
      },
      {
        id: 2,
        title:
          'Senior React Developer, Cox Automotive, Atlanta, GA (Aug 2021 – Oct 2024)',
        project: 'Fleet Management & Vehicle Maintenance Platform',
        description:
          'Developed enterprise apps with React.js, Next.js, Redux, TypeScript, and Node.js — reusable UI, dashboards, reporting, and analytics. Used Redux / Thunk / Context API and Jest, React Testing Library, Playwright, and Cypress automation.',
      },
      {
        id: 3,
        title:
          'Senior React Developer, State Farm, Richardson, TX (Mar 2020 – Aug 2021)',
        project: 'Auto Quote Purchase (AQP) Platform',
        description:
          'Built SPA quote/purchase flows with React.js, TypeScript, Redux, and React Router. Integrated Spring Boot REST APIs, HTTPS/token auth, Jest/RTL testing, and WCAG 2.1 AA accessibility.',
      },
      {
        id: 4,
        title:
          'Senior UI Developer, Fidelity Investments, Durham, NC (Jun 2019 – Mar 2020)',
        project: 'Security & Authentication Applications',
        description:
          'Built React apps for login, 2FA, and security workflows — Hooks migration, Redux, Storybook/Pattern Lab, Cypress E2E, TypeScript / LESS / SASS, AWS migration, and Micro Frontends.',
      },
      {
        id: 5,
        title: 'UI Developer, Ford, Dearborn, MI (Dec 2018 – May 2019)',
        project: 'SYNC In-Vehicle Communication Platform',
        description:
          'Built frontend experiences for Ford/Lincoln SYNC and App Link with React.js, Redux, HTML5/CSS3, token auth, Node.js, LESS/SASS, and Micro Frontend performance techniques.',
      },
      {
        id: 6,
        title:
          'Sr. UI / React Developer, IBM, San Jose, CA (Apr 2016 – Dec 2018)',
        project: 'IBM Quantum Experience Platform',
        description:
          'Built cloud-based quantum computing UI with React.js, JavaScript, HTML5/CSS3, and Node.js — reusable enterprise components, REST APIs, Webpack builds, and automated tests.',
      },
      {
        id: 7,
        title:
          'UI Developer, Bench Tech Software Pvt Ltd, Bangalore, India (Jan 2013 – Dec 2015)',
        project: 'Web applications',
        description:
          'Built responsive sites with HTML5, CSS3, JavaScript, jQuery, and Bootstrap — form validation, reusable UI, Jasmine/Karma testing, and stakeholder analysis.',
      },
    ],
  },
  education: [
    {
      id: 1,
      title: 'Bachelors.',
      image: ScientInstituteOfEngineering,
      description:
        'Bachelor of Technology in IT from Scient Institute of Technology Affiliated to JNTUH TELANGANA INDIA.',
      link: 'https://www.scient.ac.in/',
    },
    {
      id: 2,
      title: 'Masters.',
      image: CSU,
      description:
        'Master of Science in Computer Science Engineering from Chicago State University, United States of America.',
      link: 'https://www.csu.edu/',
    },
  ],
  contact: {
    eyebrow: "Let's connect",
    title: 'Get in Touch',
    intro:
      'Have a project in mind or want to discuss an opportunity? Send me a message.',
    submitLabel: 'Send message',
  },
  footer: {
    credit: 'Designed and Developed by Madhukar Reddy.:::',
  },
};
