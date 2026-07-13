import React from 'react';
import {
  CollapsibleComponent,
  CollapsibleHead,
  CollapsibleContent,
} from 'react-collapsible-component';
import './style.module.css';

function Portfolio() {
  return (
    <div className="expBorder">
      <h3 className="text-md mb-4 truncate md:ml-9 lg:ml-9 ml-1	uppercase font-medium text-gray-800 hover:text-indigo-400">
        Experience
      </h3>
      <CollapsibleComponent className="additionalClassForCollapsible ">
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
    </div>
  );
}
export default Portfolio;
