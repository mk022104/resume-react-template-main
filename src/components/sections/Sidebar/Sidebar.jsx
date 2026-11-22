import React from 'react';
import {
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Tooltip from './Tooltip';
import { trackPortfolioEvent } from '../../Analytics/plausibleAnalyticsUtils';
import { usePortfolioData } from '../../../context/PortfolioContext';
import './Sidebar.css';

const Sidebar = () => {
  const { profile, social, sidebar } = usePortfolioData();
  const icons = {
    facebook: <FaFacebookF />,
    github: <FaGithub />,
    linkedin: <FaLinkedinIn />,
    instagram: <FaInstagram />,
  };
  return (
    <aside className="sidebar-card lg:sticky lg:top-6 lg:-mt-36">
      <div className="sidebar-card-header" aria-hidden="true" />
      <div className="sidebar-profile">
        <div className="sidebar-avatar">
          <img src={profile.avatar} alt={profile.name} />
        </div>
        <h1 className="sidebar-name">{profile.name}</h1>
        <p className="sidebar-role">
          {profile.role}
          <span className="sidebar-role-divider">at</span>
          <a href={profile.companyUrl} target="_blank" rel="noreferrer">{profile.company}</a>
        </p>
        <a
          href={profile.resumeUrl}
          onClick={() =>
            trackPortfolioEvent('resume_download', { format: 'docx' })
          }
          className="sidebar-resume-button"
          download={profile.resumeDownloadName}
          aria-label="Download resume as DOCX"
        >
          <svg
            className="sidebar-download-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
          </svg>
          {sidebar.resumeLabel}
        </a>
        <div className="sidebar-availability">
          <span className="sidebar-status">
            <span className="sidebar-status-dot" aria-hidden="true" />
            {sidebar.availability}
          </span>
          <Link to="/contact" className="sidebar-contact-link">
            {sidebar.contactLabel}
          </Link>
        </div>
        <ul className="sidebar-social-list" aria-label="Social profiles">
          {social.map((item) => {
            return <Tooltip key={item.id} text={item.name} link={item.url} icon={icons[item.icon]} />;
          })}
        </ul>
      </div>
      <details className="sidebar-about">
        <summary className="sidebar-about-title">{sidebar.aboutTitle}</summary>
        <div className="sidebar-about-copy">
          {sidebar.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </details>
    </aside>
  );
};

export default Sidebar;
