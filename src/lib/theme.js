import { useEffect, useState } from 'react';

const KEY = 'db-theme';
const META_COLOR = { light: '#ffffff', dark: '#181a1d' };
const darkQuery = () => window.matchMedia?.('(prefers-color-scheme: dark)');

function storedTheme() {
  try {
    const value = localStorage.getItem(KEY);
    return value === 'light' || value === 'dark' ? value : null;
  } catch {
    return null;
  }
}

/** Saved choice, else the device setting. The inline script in index.html applies this before first paint. */
export function initialTheme() {
  return storedTheme() || (darkQuery()?.matches ? 'dark' : 'light');
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', META_COLOR[theme]);
}

/** Current theme plus a toggle. A manual choice is remembered; otherwise it follows the device. */
export function useTheme() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || initialTheme());

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    const query = darkQuery();
    if (!query) return undefined;
    const onChange = (e) => {
      if (!storedTheme()) setTheme(e.matches ? 'dark' : 'light');
    };
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    try {
      localStorage.setItem(KEY, next);
    } catch {
      /* storage unavailable — choice lasts for this page view only */
    }
    setTheme(next);
  };

  return { theme, toggleTheme };
}
