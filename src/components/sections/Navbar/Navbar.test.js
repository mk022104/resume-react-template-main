import { fireEvent, render, screen } from '@testing-library/react';
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
  expect(screen.getByText('Portfolio')).toBeInTheDocument();
  expect(screen.getByText('Education')).toBeInTheDocument();
  expect(screen.getByText('Contact')).toBeInTheDocument();
  expect(screen.getByText('Info')).toBeInTheDocument();
});

test('exposes an accessible mobile menu toggle', () => {
  render(
    <MemoryRouter initialEntries={['/about']}>
      <Navbar />
    </MemoryRouter>
  );

  const menuButton = screen.getByRole('button', {
    name: 'Open navigation menu',
  });
  expect(menuButton).toHaveAttribute('aria-expanded', 'false');

  fireEvent.click(menuButton);
  expect(menuButton).toHaveAttribute('aria-expanded', 'true');
});

test('updates page title and description for the current route', () => {
  render(
    <MemoryRouter initialEntries={['/services']}>
      <Navbar />
    </MemoryRouter>
  );

  expect(document.title).toBe('Services | Madhukar Ganga');
  expect(document.querySelector('meta[name="description"]')).toHaveAttribute(
    'content',
    'Frontend development services including React architecture, accessibility, performance, and testing.'
  );
});

test('shows a not-found page for unknown routes', () => {
  render(
    <MemoryRouter initialEntries={['/missing-page']}>
      <Navbar />
    </MemoryRouter>
  );

  expect(screen.getByRole('heading', { name: 'Page not found' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Return to About' })).toHaveAttribute(
    'href',
    '/about'
  );
});
