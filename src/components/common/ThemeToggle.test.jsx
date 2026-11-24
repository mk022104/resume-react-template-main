import { fireEvent, render, screen } from '@testing-library/react';
import ThemeToggle from './ThemeToggle';
import {
  getSolarTheme,
  getSunTimes,
  getTimeBasedTheme,
} from './ThemeToggle';

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
    expect(localStorage.getItem('portfolio_theme')).toBe(timeTheme);

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

  test('calculates sunrise and sunset for cached coordinates', () => {
    const date = new Date(2026, 5, 15, 12, 0);
    const sunTimes = getSunTimes(date, 35.7796, -78.6382);

    expect(sunTimes.sunrise).toBeInstanceOf(Date);
    expect(sunTimes.sunset).toBeInstanceOf(Date);
  });

  test('uses solar theme outside fallback office hours', () => {
    const location = { latitude: 35.7796, longitude: -78.6382 };
    const morning = new Date(2026, 5, 15, 12, 0);
    const night = new Date(2026, 5, 15, 22, 0);

    expect(getSolarTheme(morning, location)).toBe('light');
    expect(getSolarTheme(night, location)).toBe('dark');
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
