import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
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

  test('provides expandable project case studies', () => {
    render(<Portfolio />);

    expect(screen.getAllByText('Read case study')).toHaveLength(2);
  });

  test('filters projects by category', () => {
    render(<Portfolio />);

    fireEvent.click(screen.getByRole('button', { name: 'Accessibility' }));

    expect(
      screen.getByRole('heading', { name: 'Enterprise Authentication Platform' })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { name: 'Interactive React Portfolio' })
    ).not.toBeInTheDocument();
    expect(screen.getByText('Showing 1 project.')).toBeInTheDocument();
  });

  test('renders job titles', () => {
    render(<Portfolio />);
    expect(
      screen.getByText(
        /Senior UI Developer, Pearson, Hybrid, Durham, NC/
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Senior React Developer, Cox Automotive, Atlanta, GA/
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Senior React Developer, State Farm, Richardson, TX/
      )
    ).toBeInTheDocument();
  });
});
