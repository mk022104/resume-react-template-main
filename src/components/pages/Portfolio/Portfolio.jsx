import React, { useState } from 'react';
import {
  CollapsibleComponent,
  CollapsibleHead,
  CollapsibleContent,
} from 'react-collapsible-component';
import './Portfolio.css';
import { trackPortfolioEvent } from '../../Analytics/plausibleAnalyticsUtils';

const featuredProjects = [
  {
    id: 1,
    title: 'Interactive React Portfolio',
    description: 'A responsive career portfolio with experience, education, contact, and an AI resume assistant.',
    technologies: ['React', 'Tailwind CSS', 'Jest', 'Playwright'],
    categories: ['React'],
    repository: 'https://github.com/mk022104/resume-react-template-main',
    highlights: ['Reusable UI cards', 'Responsive navigation', 'Automated component tests'],
  },
  {
    id: 2,
    title: 'Enterprise Authentication Platform',
    description: 'Enterprise access-management experience covering secure sign-in, MFA, passwordless flows, and accessible onboarding.',
    technologies: ['React', 'TypeScript', 'Micro Frontends', 'WCAG'],
    categories: ['React', 'Accessibility', 'Authentication'],
    highlights: ['SSO and MFA journeys', 'Accessible component library', 'CI/CD automation'],
  },
];

function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('All');
  const filters = ['All', 'React', 'Accessibility', 'Authentication'];
  const visibleProjects =
    activeFilter === 'All'
      ? featuredProjects
      : featuredProjects.filter((project) =>
          project.categories.includes(activeFilter)
        );

  return (
    <main className="portfolio-page">
      <section className="portfolio-section" aria-labelledby="featured-work-heading">
        <div className="portfolio-section-heading">
          <div>
            <p className="portfolio-eyebrow">Selected projects</p>
            <h2 id="featured-work-heading" className="portfolio-heading">
              Featured work
            </h2>
          </div>
          <p className="portfolio-section-summary">
            A selection of products and experiences built for real-world users.
          </p>
        </div>
        <div className="portfolio-filters" role="group" aria-label="Filter projects">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              className={`portfolio-filter-button ${
                activeFilter === filter ? 'portfolio-filter-button--active' : ''
              }`}
              aria-pressed={activeFilter === filter}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
        <p className="sr-only" aria-live="polite">
          Showing {visibleProjects.length}{' '}
          {visibleProjects.length === 1 ? 'project' : 'projects'}.
        </p>
        <div className="portfolio-project-grid">
          {visibleProjects.map((project) => (
            <article key={project.id} className="portfolio-project-card">
              <span className="portfolio-project-number" aria-hidden="true">
                {String(project.id).padStart(2, '0')}
              </span>
              <h3 className="portfolio-project-title">{project.title}</h3>
              <p className="portfolio-project-description">{project.description}</p>
              <ul className="portfolio-technologies">
                {project.technologies.map((technology) => (
                  <li key={technology} className="portfolio-technology">{technology}</li>
                ))}
              </ul>
              <ul className="portfolio-highlights">
                {project.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
              <details className="portfolio-case-study">
                <summary>Read case study</summary>
                <div className="portfolio-case-study-content">
                  <h4>Project context</h4>
                  <p>{project.description}</p>
                  <h4>Key contributions</h4>
                  <ul>
                    {project.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                </div>
              </details>
              {project.repository && (
                <a
                  href={project.repository}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() =>
                    trackPortfolioEvent('project_repository_click', {
                      project_title: project.title,
                    })
                  }
                  className="portfolio-repository-link"
                >
                  View repository <span aria-hidden="true">↗</span>
                </a>
              )}
            </article>
          ))}
        </div>
      </section>
      <section className="portfolio-section portfolio-experience" aria-labelledby="experience-heading">
        <div className="portfolio-section-heading">
          <div>
            <p className="portfolio-eyebrow">Career journey</p>
            <h2 id="experience-heading" className="portfolio-heading">
              Experience
            </h2>
          </div>
          <p className="portfolio-section-summary">
            Roles and projects across enterprise products and platforms.
          </p>
        </div>
      <CollapsibleComponent name="portfolio-experience">
        <CollapsibleHead className="additionalClassForHead ">
          Senior UI Developer, Pearson, Hybrid, Durham, NC (Oct 2024 –
          Present)
        </CollapsibleHead>
        <CollapsibleContent className="additionalClassForContent ">
          <p className="m-4">
            <strong>Project:</strong> Access Management & Authentication
            Platform. Built secure auth flows with React.js and TypeScript —
            SSO, MFA, OTP, and passwordless login. Progressive profile /
            mobile verification, WCAG accessibility (keyboard navigation,
            Lighthouse, NVDA), Storybook component libraries, REST APIs for
            auth and partner onboarding, Generative AI assistance (OpenAI,
            Claude, Gemini), Micro Frontends with Module Federation, React 18
            / Vite, and Cypress/Playwright in CI/CD.
          </p>
        </CollapsibleContent>

        <CollapsibleHead className="additionalClassForHead ">
          Senior React Developer, Cox Automotive, Atlanta, GA (Aug 2021 – Oct
          2024)
        </CollapsibleHead>
        <CollapsibleContent className="additionalClassForContent ">
          <p className="m-4">
            <strong>Project:</strong> Fleet Management & Vehicle Maintenance
            Platform. Developed enterprise apps with React.js, Next.js, Redux,
            TypeScript, and Node.js — reusable UI, dashboards, reporting, and
            analytics for fleet operations. State management with Redux /
            Thunk / Context API; Jest, React Testing Library, Playwright, and
            Cypress automation; performance via lazy loading and memoization.
          </p>
        </CollapsibleContent>

        <CollapsibleHead className="additionalClassForHead ">
          Senior React Developer, State Farm, Richardson, TX (Mar 2020 – Aug
          2021)
        </CollapsibleHead>
        <CollapsibleContent className="additionalClassForContent ">
          <p className="m-4">
            <strong>Project:</strong> Auto Quote Purchase (AQP) Platform.
            Built SPA quote/purchase flows for insurance products with
            React.js, TypeScript, Redux, and React Router. Integrated Spring
            Boot REST APIs, HTTPS/token auth, Jest/RTL testing, and WCAG 2.1
            AA accessibility.
          </p>
        </CollapsibleContent>

        <CollapsibleHead className="additionalClassForHead ">
          Senior UI Developer, Fidelity Investments, Durham, NC (Jun 2019 –
          Mar 2020)
        </CollapsibleHead>
        <CollapsibleContent className="additionalClassForContent ">
          <p className="m-4">
            <strong>Project:</strong> Security & Authentication Applications.
            React apps for login, 2FA, and security workflows — Hooks
            migration, Redux, Storybook/Pattern Lab, Cypress E2E, TypeScript /
            LESS / SASS, on-prem to AWS migration, and Micro Frontends with
            Docker/CI/CD.
          </p>
        </CollapsibleContent>

        <CollapsibleHead className="additionalClassForHead ">
          UI Developer, Ford, Dearborn, MI (Dec 2018 – May 2019)
        </CollapsibleHead>
        <CollapsibleContent className="additionalClassForContent ">
          <p className="m-4">
            <strong>Project:</strong> SYNC In-Vehicle Communication Platform.
            Frontend for Ford/Lincoln SYNC and App Link — React.js, Redux,
            HTML5/CSS3, token-based auth, Node.js modules, LESS/SASS, and
            Micro Frontend performance (lazy loading, code splitting,
            memoization).
          </p>
        </CollapsibleContent>

        <CollapsibleHead className="additionalClassForHead ">
          Sr. UI / React Developer, IBM, San Jose, CA (Apr 2016 – Dec 2018)
        </CollapsibleHead>
        <CollapsibleContent className="additionalClassForContent ">
          <p className="m-4">
            <strong>Project:</strong> IBM Quantum Experience Platform.
            Cloud-based quantum computing UI with React.js, JavaScript,
            HTML5/CSS3, and Node.js — reusable enterprise portal components,
            REST APIs, Webpack builds, and unit/snapshot tests across the full
            SDLC.
          </p>
        </CollapsibleContent>

        <CollapsibleHead className="additionalClassForHead ">
          UI Developer, Bench Tech Software Pvt Ltd, Bangalore, India (Jan
          2013 – Dec 2015)
        </CollapsibleHead>
        <CollapsibleContent className="additionalClassForContent ">
          <p className="m-4">
            <strong>Project:</strong> Web applications. Built responsive sites
            with HTML5, CSS3, JavaScript, jQuery, and Bootstrap — form
            validation, reusable UI, Jasmine/Karma testing, and stakeholder
            requirement analysis.
          </p>
        </CollapsibleContent>
      </CollapsibleComponent>
      </section>
    </main>
  );
}
export default Portfolio;
