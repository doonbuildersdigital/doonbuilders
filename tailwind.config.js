/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  // Theme is set on <html data-theme="light|dark"> (see src/lib/theme.js).
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#C8102E',
          deep: '#A50E27',
          // Lighter tint used only for small red text on dark backgrounds (contrast).
          bright: '#E8475B',
        },
        // Warm gold for the blessing card (readable on brand red).
        gold: '#F7D774',
        // Fixed dark tones — stay dark in both themes (image overlays, dark cards).
        charcoal: '#181A1D',
        night: '#111214',
        // Theme-aware tokens — values live in src/styles/globals.css and flip in dark mode.
        ink: 'rgb(var(--ink) / <alpha-value>)',
        paper: 'rgb(var(--paper) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        mist: 'rgb(var(--mist) / <alpha-value>)',
        steel: {
          DEFAULT: 'rgb(var(--steel) / <alpha-value>)',
          dark: 'rgb(var(--steel-dark) / <alpha-value>)',
        },
        line: {
          DEFAULT: 'var(--line)',
          dark: 'rgba(255, 255, 255, 0.15)',
        },
      },
      textColor: {
        // Red text is brightened in dark mode for contrast; red fills stay the same.
        brand: {
          DEFAULT: 'rgb(var(--brand-text) / <alpha-value>)',
          deep: '#A50E27',
          bright: '#E8475B',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif'],
        devanagari: ['"Noto Serif Devanagari"', '"Nirmala UI"', 'Mangal', 'serif'],
      },
      maxWidth: {
        container: '1440px',
        prose: '38rem',
      },
      boxShadow: {
        // Soft, layered elevation for light-theme cards.
        card: '0 1px 2px rgba(17, 18, 20, 0.04), 0 4px 16px -4px rgba(17, 18, 20, 0.08)',
        'card-hover': '0 2px 4px rgba(17, 18, 20, 0.04), 0 24px 48px -12px rgba(17, 18, 20, 0.22)',
        'card-press': '0 4px 8px rgba(17, 18, 20, 0.06), 0 32px 64px -16px rgba(17, 18, 20, 0.30)',
        nav: '0 1px 0 rgba(17, 18, 20, 0.06), 0 8px 24px -12px rgba(17, 18, 20, 0.14)',
        brand: '0 10px 24px -10px rgba(200, 16, 46, 0.55)',
      },
      transitionTimingFunction: {
        arch: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      letterSpacing: {
        label: '0.18em',
      },
    },
  },
  plugins: [],
};
