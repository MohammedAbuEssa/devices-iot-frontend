import { useTheme } from '../contexts/ThemeContext';

export function ThemeLogoDemo() {
  const { actualTheme } = useTheme();
  
  return (
    <div className="p-4 border rounded-lg bg-card">
      <h3 className="text-sm font-medium text-foreground mb-2">Current Theme Logo</h3>
      <div className="flex items-center space-x-4">
        <div className="text-xs text-muted-foreground">
          Theme: {actualTheme}
        </div>
        <div className="text-xs text-muted-foreground">
          Logo: {actualTheme === 'dark' ? 'darkLogo.svg' : 'lightLogo.svg'}
        </div>
      </div>
    </div>
  );
}
