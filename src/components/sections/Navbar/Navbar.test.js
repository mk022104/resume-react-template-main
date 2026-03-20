import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from './Navbar';

test('renders Navbar component with navigation links', () => {
  render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  );
  expect(screen.getByText('About')).toBeInTheDocument();
  expect(screen.getByText('Services')).toBeInTheDocument();
  expect(screen.getByText('Experience')).toBeInTheDocument();
  expect(screen.getByText('Education Details')).toBeInTheDocument();
  expect(screen.getByText('Contact')).toBeInTheDocument();
  expect(screen.getByText('Info')).toBeInTheDocument();
});
