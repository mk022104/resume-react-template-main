import React from 'react';
import { render, screen } from '@testing-library/react';
import Portfolio from './Portfolio';

// Portfolio.test.jsx

// Mock react-collapsible-component to simplify tests
jest.mock('react-collapsible-component', () => ({
  CollapsibleComponent: ({ children, ...props }) => <div {...props}>{children}</div>,
  CollapsibleHead: ({ children, ...props }) => <div {...props}>{children}</div>,
  CollapsibleContent: ({ children, ...props }) => <div {...props}>{children}</div>,
}));

// Mock useRef if Portfolio uses it internally
jest.spyOn(React, 'useRef').mockReturnValue({ current: {} });
describe('Portfolio Component', () => {
  test('renders without crashing', () => {
    render(<Portfolio />);
    // If no error, test passes
  });

  test('renders main heading "Experience"', () => {
    render(<Portfolio />);
    expect(screen.getByText(/Experience/i)).toBeInTheDocument();
  });

  test('renders all job titles', () => {
    render(<Portfolio />);
    const jobTitles = [
      "Senior UI developer,Pearson, Hybrid, NC",
      "Senior Frontend developer, Cox Auto Inc. (Mobility and Fleet operations),Remote Altanta, GA",
      "Senior React developer, StateFarm, Remote",
      "Senior UI developer, Fidelity Investments, Durham, Nc",
      "UI/React DEVELOPER, Ford- Dearborn, MI",
      "SR. UI/ React Developer, IBM, San Jose, CA",
      "UI DEVELOPER, Bench Tech Software Pvt Ltd, Bengaluru, India"
    ];
    jobTitles.forEach(title => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });

  test('renders all experience descriptions', () => {
    render(<Portfolio />);
    // Check for a phrase from each CollapsibleContent
    const phrases = [
      "Centralized login: Customizable application developed using React",
      "Cox Automotive Mobility specialized in comprehensive fleet services",
      "AQP (Auto Quote purchase) is automatic quotation management platform",
      "Working on react js based web applications providing user interface",
      "SYNC is an integrated in-vehicle communications and entertainment system",
      "The IBM Quantum Experience launched in May, giving researchers",
      "Ben Tech offers full-service technology support from the switch to wire"
    ];
    phrases.forEach(phrase => {
      expect(screen.getByText(new RegExp(phrase, 'i'))).toBeInTheDocument();
    });
  });

  test('renders correct number of CollapsibleHead and CollapsibleContent', () => {
    render(<Portfolio />);
    // There are 7 job titles and 7 descriptions
    expect(screen.getAllByText(/developer|DEVELOPER|SR\. UI\/ React Developer|UI DEVELOPER/)).toHaveLength(7);
    expect(screen.getAllByRole('paragraph')).toHaveLength(7); // This may not work if <p> tags don't have role="paragraph"
    // Alternative: count all <p> elements
    expect(document.querySelectorAll('p.m-4').length).toBe(7);
  });
});