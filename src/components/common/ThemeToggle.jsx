import { useEffect, useState } from 'react';
import {
  DAY_START_HOUR,
  NIGHT_START_HOUR,
  THEME_STORAGE_KEY,
  THEME_OVERRIDE_TIMESTAMP_KEY,
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

const clearStoredTheme = () => {
  try {
    localStorage.removeItem(THEME_STORAGE_KEY);
    localStorage.removeItem(THEME_OVERRIDE_TIMESTAMP_KEY);
  } catch {
    // Theme can continue to follow time for the current visit.
  }
};

export const getActiveTheme = () => {
  const timeTheme = getTimeBasedTheme();
  const storedTheme = getStoredTheme();

  if (!storedTheme) return timeTheme;

  try {
    const overrideTimestamp = Number(
      localStorage.getItem(THEME_OVERRIDE_TIMESTAMP_KEY)
    );

    if (
      Number.isFinite(overrideTimestamp) &&
      overrideTimestamp > 0 &&
      getTimeBasedTheme(new Date(overrideTimestamp)) === timeTheme
    ) {
      return storedTheme;
    }

    clearStoredTheme();
  } catch {
    clearStoredTheme();
  }

  return timeTheme;
};

export default function ThemeToggle() {
  const [theme, setTheme] = useState(getActiveTheme);

  useEffect(() => {
    const applyTheme = (nextTheme) => {
      document.documentElement.dataset.theme = nextTheme;
      document.documentElement.classList.toggle('dark', nextTheme === 'dark');
      document.documentElement.style.colorScheme = nextTheme;
    };

    applyTheme(theme);

    const updateByTime = () => {
      const activeTheme = getActiveTheme();
      setTheme(activeTheme);
      applyTheme(activeTheme);
    };

    const timer = window.setInterval(updateByTime, 60 * 1000);
    return () => window.clearInterval(timer);
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
      localStorage.setItem(THEME_OVERRIDE_TIMESTAMP_KEY, String(Date.now()));
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
