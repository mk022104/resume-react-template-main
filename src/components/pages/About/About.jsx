import React from 'react';
import Skills from './Skills/Skills';
import { usePortfolioData } from '../../../context/PortfolioContext';

const About = () => {
  const { about } = usePortfolioData();
  return (
    <section className="px-5 py-8 md:px-8">
      <div className="flex flex-wrap md:px-4">
        <div className="w-full">
          <div className="md:mx-4">
            <h3 className="mb-4 text-2xl font-bold tracking-tight text-slate-900">
              {about.heading}
            </h3>
            {about.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="mb-4 text-base leading-7 text-slate-600 aboutFontDecoration"
              >
                {paragraph}
              </p>
            ))}
          </div>
          <Skills />
        </div>
      </div>
    </section>
  );
};

export default About;
