import React from "react";
import Skills from "./Skills/Skills";

const About = () => {
  return (
    <section className="py-8">
      <div className="flex flex-wrap md:px-4">
        <div className="w-full">
          <div className="md:mx-4">
            <h3 className="text-2xl text-gray-800 font-bold mb-4 hover:text-purple-400">Who am I?</h3>
            <p className="text-sm text-gray-400 leading-6 mb-3 aboutFontDecoration">
              Senior React JS / Frontend Developer with 10+ years of IT
              experience including 8+ years specializing in React.js, Next.js,
              TypeScript, and modern frontend architecture. Builds scalable,
              secure, high-performance enterprise web apps across insurance,
              finance, automotive, education, and cloud platforms.
            </p>
            <p className="text-sm text-gray-400 leading-6 mb-3 aboutFontDecoration">
              Currently Senior UI Developer at Pearson on the Access Management
              & Authentication Platform (SSO, MFA, passwordless, WCAG, Storybook,
              Micro Frontends, Vite, Cypress/Playwright). Strong in Redux,
              Redux Toolkit, Next.js, REST/GraphQL, CI/CD, Docker, AWS/Azure,
              and enterprise auth. Collaborates with teams, mentors developers,
              and delivers production-ready applications.
            </p>
          </div>
          <Skills />
        </div>
      </div>
    </section>
  );
};

export default About;
