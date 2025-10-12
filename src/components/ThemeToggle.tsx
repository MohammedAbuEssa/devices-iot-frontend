import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { THEME_TYPES } from '../types/enums';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === THEME_TYPES.LIGHT ? THEME_TYPES.DARK : THEME_TYPES.LIGHT);
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-gray-700"
      role="switch"
      aria-checked={theme === THEME_TYPES.DARK}
      aria-label="Toggle theme"
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
          theme === THEME_TYPES.DARK ? 'translate-x-6' : 'translate-x-1'
        }`}
      >
        {theme === THEME_TYPES.DARK ? (
          <Moon className="h-3 w-3 text-gray-600 m-0.5" />
        ) : (
          <Sun className="h-3 w-3 text-yellow-500 m-0.5" />
        )}
      </span>
    </button>
  );
}

