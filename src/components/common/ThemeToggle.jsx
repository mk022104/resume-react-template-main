import { useEffect, useState } from 'react';
import {
  DAY_START_HOUR,
  NIGHT_START_HOUR,
  THEME_STORAGE_KEY,
} from '../../constants';

export const getTimeBasedTheme = (date = new Date()) => {
  const hour = date.getHours();
  return hour >= DAY_START_HOUR && hour < NIGHT_START_HOUR ? 'light' : 'dark';
};

const getStoredTheme = () => {
  try {
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    return storedTheme === 'light' || storedTheme === 'dark'
      ? storedTheme
      : null;
  } catch {
    return null;
  }
};

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => getStoredTheme() || getTimeBasedTheme());

  useEffect(() => {
    const applyTheme = (nextTheme) => {
      document.documentElement.dataset.theme = nextTheme;
      document.documentElement.classList.toggle('dark', nextTheme === 'dark');
      document.documentElement.style.colorScheme = nextTheme;
    };

    applyTheme(theme);

    const updateByTime = () => {
      if (!getStoredTheme()) {
        const timeTheme = getTimeBasedTheme();
        setTheme(timeTheme);
        applyTheme(timeTheme);
      }
    };

    const timer = window.setInterval(updateByTime, 60 * 1000);
    return () => window.clearInterval(timer);
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    } catch {
      // Theme still works for the current visit if storage is unavailable.
    }
  };

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
    >
      <span aria-hidden="true">{theme === 'dark' ? '☀' : '☾'}</span>
    </button>
  );
}
