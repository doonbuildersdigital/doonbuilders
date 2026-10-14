import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/lib/theme';

/** Light / dark switch for the header. */
export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const label = isDark ? 'Switch to light theme' : 'Switch to dark theme';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className={`relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-line bg-surface text-ink shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-ink/30 ${className}`}
    >
      <Sun
        className={`absolute h-[18px] w-[18px] transition-all duration-500 ease-arch ${
          isDark ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-50 opacity-0'
        }`}
        strokeWidth={2}
        aria-hidden="true"
      />
      <Moon
        className={`absolute h-[17px] w-[17px] transition-all duration-500 ease-arch ${
          isDark ? 'rotate-90 scale-50 opacity-0' : 'rotate-0 scale-100 opacity-100'
        }`}
        strokeWidth={2}
        aria-hidden="true"
      />
    </button>
  );
}
