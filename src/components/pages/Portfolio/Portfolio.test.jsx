import React from 'react';
import { render, screen } from '@testing-library/react';
import Portfolio from './Portfolio';

// Portfolio.test.jsx

// Mock react-collapsible-component to simplify tests
jest.mock('react-collapsible-component', () => ({
  CollapsibleComponent: ({ children, ...props }) => (
    <div {...props}>{children}</div>
  ),
  CollapsibleHead: ({ children, ...props }) => <div {...props}>{children}</div>,
  CollapsibleContent: ({ children, ...props }) => (
    <div {...props}>{children}</div>
  ),
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
    expect(screen.getByText('Experience')).toBeInTheDocument();
  });

  test('renders job titles', () => {
    render(<Portfolio />);
    expect(
      screen.getByText('Senior UI developer,Pearson, Hybrid, NC')
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'Senior Frontend developer, Cox Auto Inc. (Mobility and Fleet operations),Remote Altanta, GA'
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText('Senior React developer, StateFarm, Remote')
    ).toBeInTheDocument();
  });
});
