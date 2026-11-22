import React from 'react';
import {
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
} from 'react-icons/fa';
import Madhukar from '../../../images/portfolio/Madhukar.jpg';
import Tooltip from './Tooltip';
import { trackPortfolioEvent } from '../../Analytics/plausibleAnalyticsUtils';
const coxurl =
  'https://www.pearson.com/en-us.html?srsltid=AfmBOopwZSntt62el17ePQOX0dYCH0X6o1B4osXkYcHYZkYq9qO8LJau';
const socials = [
  {
    id: 1,
    icon: <FaFacebookF />,
    link: 'https://www.facebook.com/?react=AQAZDm4XIn_VKrxMR10',
    text: 'Facebook',
  },
  {
    id: 2,
    icon: <FaGithub />,
    link: 'https://github.com/mk022104/resume-react-template-main',
    text: 'Github',
  },
  {
    id: 3,
    icon: <FaLinkedinIn />,
    link: 'https://www.linkedin.com/in/ganga1935/',
    text: 'LinkedIn',
  },
  {
    id: 4,
    icon: <FaInstagram />,
    link: 'https://www.instagram.com/',
    text: 'Instagram',
  },
];

const Sidebar = () => {
  return (
    <aside className="relative z-20 mb-8 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xl shadow-slate-900/10 lg:sticky lg:top-6 lg:-mt-36">
      <div className="mx-auto mb-5 h-28 w-28 overflow-hidden rounded-2xl border-4 border-white shadow-lg ring-1 ring-slate-200">
        <img
          src={Madhukar}
          alt="Madhukar Ganga"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="text-center">
        <h1 className="mb-1 text-2xl font-bold tracking-tight text-slate-900">
          Madhukar Ganga
        </h1>
        <p className="mb-4 text-sm text-slate-600">
          Senior UI Developer at
          <a
            href={coxurl}
            className="pl-1 font-semibold text-indigo-700 hover:text-indigo-900"
          >
            Pearson Educational.
          </a>
        </p>
        <a
          href="/MadhukarReddyUpdated Resume.docx"
          onClick={() =>
            trackPortfolioEvent('resume_download', { format: 'docx' })
          }
          className="inline-flex items-center justify-center rounded-lg bg-indigo-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-indigo-800"
          download="Madhukar Resume"
        >
          <svg
            className="mr-2 h-4 w-4 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
          </svg>
          Download Resume
        </a>
        <div className="mb-5 mt-4">
          <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 ring-1 ring-emerald-600/20">
            <span
              className="mr-2 h-2 w-2 rounded-full bg-emerald-500"
              aria-hidden="true"
            />
            Open to senior frontend opportunities
          </span>
          <a
            href="/contact"
            className="mt-3 block text-sm font-semibold text-indigo-700 hover:text-indigo-900"
          >
            Contact Madhukar
          </a>
        </div>
        <ul className="flex flex-wrap justify-center">
          {socials.map((social) => {
            const { id, icon, link, text } = social;
            return <Tooltip key={id} text={text} link={link} icon={icon} />;
          })}
        </ul>
      </div>
      <div className="border-slate-100 pt-5 text-start">
        <h3 className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-slate-800">
          About Me
        </h3>
        <p className="text-gray-900 leading-relaxed fontDecoration">
          I specialize in React and modern frontend architecture — Redux,
          Next.js, TypeScript, Storybook, Micro Frontends, and WCAG
          accessibility. As a Senior UI Developer at Pearson, I build secure
          authentication platforms (SSO, MFA, passwordless) and scalable
          enterprise UIs. I can help with architecture, performance,
          accessibility, testing, and delivery best practices. Ask me anything
          related to React or frontend development—I'm here to help!
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
