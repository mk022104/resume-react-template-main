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
  expect(screen.getByText('Weather')).toBeInTheDocument();
});

test('exposes an accessible mobile menu toggle', () => {
  render(
    <MemoryRouter initialEntries={['/about']}>
      <Navbar />
    </MemoryRouter>
  );

  expect(screen.getByText('Navigation')).toHaveClass(
    'primary-nav-label',
    'text-white'
  );

  const menuButton = screen.getByRole('button', {
    name: 'Open navigation menu',
  });
  expect(menuButton).toHaveAttribute('aria-expanded', 'false');

  fireEvent.click(menuButton);
  expect(menuButton).toHaveAttribute('aria-expanded', 'true');
});

test('changes navigation color after scrolling', () => {
  render(
    <MemoryRouter initialEntries={['/about']}>
      <Navbar />
    </MemoryRouter>
  );

  Object.defineProperty(window, 'scrollY', { configurable: true, value: 80 });
  fireEvent.scroll(window);

  expect(
    screen.getByRole('navigation', { name: 'Primary navigation' })
  ).toHaveClass('primary-nav--scrolled');
});

test('returns navigation to its normal background when a link is clicked', () => {
  const scrollTo = jest.spyOn(window, 'scrollTo').mockImplementation(() => {});
  render(
    <MemoryRouter initialEntries={['/about']}>
      <Navbar />
    </MemoryRouter>
  );

  Object.defineProperty(window, 'scrollY', { configurable: true, value: 80 });
  fireEvent.scroll(window);
  fireEvent.click(screen.getByRole('link', { name: 'Services' }));

  expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  expect(
    screen.getByRole('navigation', { name: 'Primary navigation' })
  ).not.toHaveClass('primary-nav--scrolled');

  scrollTo.mockRestore();
  Object.defineProperty(window, 'scrollY', { configurable: true, value: 0 });
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

test('updates page title and description for the weather route', () => {
  render(
    <MemoryRouter initialEntries={['/weather']}>
      <Navbar />
    </MemoryRouter>
  );

  expect(document.title).toBe('Local Weather | Madhukar Ganga');
  expect(document.querySelector('meta[name="description"]')).toHaveAttribute(
    'content',
    'Live local conditions and a four-day forecast based on your browser location.'
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
