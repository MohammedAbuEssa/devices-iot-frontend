import { useTheme } from '../contexts/ThemeContext';

export function ThemeStatus() {
  const { theme, actualTheme } = useTheme();
  
  return (
    <div className="text-xs text-muted-foreground">
      Theme: {theme} ({actualTheme})
    </div>
  );
}

