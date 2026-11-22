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
import './Sidebar.css';
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
    <aside className="sidebar-card lg:sticky lg:top-6 lg:-mt-36">
      <div className="sidebar-card-header" aria-hidden="true" />
      <div className="sidebar-profile">
        <div className="sidebar-avatar">
          <img src={Madhukar} alt="Madhukar Ganga" />
        </div>
        <h1 className="sidebar-name">Madhukar Ganga</h1>
        <p className="sidebar-role">
          Senior UI Developer
          <span className="sidebar-role-divider">at</span>
          <a href={coxurl}>Pearson Educational</a>
        </p>
        <a
          href="/MadhukarReddyUpdated Resume.docx"
          onClick={() =>
            trackPortfolioEvent('resume_download', { format: 'docx' })
          }
          className="sidebar-resume-button"
          download="Madhukar Resume"
        >
          <svg
            className="sidebar-download-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
          </svg>
          Download Resume
        </a>
        <div className="sidebar-availability">
          <span className="sidebar-status">
            <span className="sidebar-status-dot" aria-hidden="true" />
            Open to senior frontend opportunities
          </span>
          <a href="/contact" className="sidebar-contact-link">
            Contact Madhukar
          </a>
        </div>
        <ul className="sidebar-social-list" aria-label="Social profiles">
          {socials.map((social) => {
            const { id, icon, link, text } = social;
            return <Tooltip key={id} text={text} link={link} icon={icon} />;
          })}
        </ul>
      </div>
      <section className="sidebar-about">
        <h2 className="sidebar-about-title">
          About Me
        </h2>
        <div className="sidebar-about-copy">
          <p>
            I specialize in React and modern frontend architecture — Redux,
            Next.js, TypeScript, Storybook, Micro Frontends, and WCAG
            accessibility.
          </p>
          <p>
            As a Senior UI Developer at Pearson, I build secure authentication
            platforms (SSO, MFA, passwordless) and scalable enterprise UIs.
          </p>
          <p>
            I can help with architecture, performance, accessibility, testing,
            and delivery best practices.
          </p>
          <p>
            Ask me anything related to React or frontend development—I'm here
            to help!
          </p>
        </div>
      </section>
    </aside>
  );
};

export default Sidebar;
