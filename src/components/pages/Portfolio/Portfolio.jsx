import React, { useState } from 'react';
import {
  CollapsibleComponent,
  CollapsibleHead,
  CollapsibleContent,
} from 'react-collapsible-component';
import './Portfolio.css';
import { trackPortfolioEvent } from '../../Analytics/plausibleAnalyticsUtils';
import { usePortfolioData } from '../../../context/PortfolioContext';

function Portfolio() {
  const { portfolio } = usePortfolioData();
  const [activeFilter, setActiveFilter] = useState('All');
  const featuredProjects = portfolio.projects;
  const filters = portfolio.filters;
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
            <p className="portfolio-eyebrow">{portfolio.eyebrow}</p>
            <h2 id="featured-work-heading" className="portfolio-heading">
              {portfolio.heading}
            </h2>
          </div>
          <p className="portfolio-section-summary">
            {portfolio.summary}
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
                  {project.role && (
                    <p>
                      <strong>Role:</strong> {project.role}
                    </p>
                  )}
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
            <p className="portfolio-eyebrow">{portfolio.experienceEyebrow}</p>
            <h2 id="experience-heading" className="portfolio-heading">
              {portfolio.experienceHeading}
            </h2>
          </div>
          <p className="portfolio-section-summary">
            {portfolio.experienceSummary}
          </p>
        </div>
      <CollapsibleComponent name="portfolio-experience">
        {portfolio.experience.map((job) => (
          <React.Fragment key={job.id}>
            <CollapsibleHead className="additionalClassForHead ">
              {job.title}
            </CollapsibleHead>
            <CollapsibleContent className="additionalClassForContent ">
              <p className="m-4">
                <strong>Project:</strong> {job.project}. {job.description}
              </p>
            </CollapsibleContent>
          </React.Fragment>
        ))}
      </CollapsibleComponent>
      </section>
    </main>
  );
}
export default Portfolio;
