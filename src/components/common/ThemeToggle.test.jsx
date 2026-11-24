import { fireEvent, render, screen } from '@testing-library/react';
import ThemeToggle from './ThemeToggle';
import { getTimeBasedTheme } from './ThemeToggle';

describe('ThemeToggle', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
    document.documentElement.classList.remove('dark');
    window.matchMedia = jest.fn().mockReturnValue({
      matches: false,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    });
  });

  test('uses the time-based theme and allows switching manually', () => {
    render(<ThemeToggle />);

    const timeTheme = getTimeBasedTheme();
    expect(document.documentElement).toHaveAttribute('data-theme', timeTheme);

    const manualTheme = timeTheme === 'dark' ? 'light' : 'dark';
    fireEvent.click(
      screen.getByRole('button', {
        name: `Switch to ${manualTheme} theme`,
      })
    );

    expect(document.documentElement).toHaveAttribute('data-theme', manualTheme);
    expect(document.documentElement.classList.contains('dark')).toBe(
      manualTheme === 'dark'
    );
    expect(localStorage.getItem('portfolio_theme')).toBe(manualTheme);
  });

  test('uses light at daytime boundaries and dark at night boundaries', () => {
    expect(getTimeBasedTheme(new Date(2026, 0, 1, 7, 0))).toBe('light');
    expect(getTimeBasedTheme(new Date(2026, 0, 1, 18, 59))).toBe('light');
    expect(getTimeBasedTheme(new Date(2026, 0, 1, 19, 0))).toBe('dark');
    expect(getTimeBasedTheme(new Date(2026, 0, 1, 6, 59))).toBe('dark');
  });

  test('restores a saved theme', () => {
    const savedTheme = getTimeBasedTheme();
    localStorage.setItem('portfolio_theme', savedTheme);
    localStorage.setItem('portfolio_theme_override_at', String(Date.now()));

    render(<ThemeToggle />);

    expect(document.documentElement).toHaveAttribute('data-theme', savedTheme);
    expect(
      screen.getByRole('button', {
        name: `Switch to ${savedTheme === 'dark' ? 'light' : 'dark'} theme`,
      })
    ).toBeInTheDocument();
  });
});
