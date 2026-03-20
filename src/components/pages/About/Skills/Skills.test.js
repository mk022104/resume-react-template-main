import { render, screen } from '@testing-library/react';
import Skills from './Skills';

test('renders Skills component with skill items', () => {
  render(<Skills />);
  expect(screen.getByText('Skills')).toBeInTheDocument();
  expect(screen.getByText('Html, Css, Scss, Sass')).toBeInTheDocument();
  expect(screen.getByText('ReactJS')).toBeInTheDocument();
});
