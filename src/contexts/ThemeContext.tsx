import { createContext, useContext, useEffect, useState } from 'react';
import { THEME_TYPES, type ThemeType } from '../types/enums';

interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  actualTheme: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Initialize theme from localStorage immediately to prevent flash
  const getInitialTheme = (): ThemeType => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') as ThemeType;
      console.log('Loaded theme from localStorage:', savedTheme);
      if (savedTheme && Object.values(THEME_TYPES).includes(savedTheme)) {
        return savedTheme;
      }
    }
    return THEME_TYPES.LIGHT;
  };

  const getInitialActualTheme = (theme: ThemeType): 'light' | 'dark' => {
    return theme === THEME_TYPES.AUTO ? 'light' : theme;
  };

  const [theme, setTheme] = useState<ThemeType>(getInitialTheme);
  const [actualTheme, setActualTheme] = useState<'light' | 'dark'>(() => getInitialActualTheme(getInitialTheme()));

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(actualTheme);
    console.log('Theme applied:', actualTheme, 'Classes:', root.className);
  }, [actualTheme]); // Run when actualTheme changes

  useEffect(() => {
    // Save theme to localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    if (theme === THEME_TYPES.AUTO) {
      // Auto theme logic - could be enhanced to detect system preference
      setActualTheme('light');
    } else {
      setActualTheme(theme);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, actualTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

