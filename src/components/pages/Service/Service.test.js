import { render, screen } from '@testing-library/react';
import Service from './Service';

test('renders Service component with service items', () => {
  render(<Service />);
  expect(screen.getByText('Web Design')).toBeInTheDocument();
  expect(screen.getByText('Web Development')).toBeInTheDocument();
  expect(screen.getByText('Frontend Development')).toBeInTheDocument();
  expect(screen.getByText('Bootstrap Template')).toBeInTheDocument();
  expect(screen.getByText('Tailwindcss Template')).toBeInTheDocument();
  expect(screen.getByText('React Template')).toBeInTheDocument();
});
