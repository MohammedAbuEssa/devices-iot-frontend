import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showText?: boolean;
}

export function Logo({ size = 'md', className = '', showText = false }: LogoProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const { actualTheme } = useTheme();
  
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
    xl: 'h-20 w-20'
  };

  // Choose logo based on current theme
  const logoSrc = actualTheme === 'dark' ? '/darkLogo.svg' : '/lightLogo.svg';
  
  // Fallback logo if main logos fail
  const fallbackLogoSrc = '/vite.svg';

  // Reset loading state when theme changes
  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    if (target.src !== fallbackLogoSrc) {
      target.src = fallbackLogoSrc;
    } else {
      setIsLoaded(true); // Show placeholder if even fallback fails
    }
  };

  return (
    <div className={`flex items-center ${className}`}>
      <div className="relative">
        <img 
          src={logoSrc}
          alt="IoT Dashboard Logo" 
          className={`${sizeClasses[size]} object-contain transition-all duration-200 hover:scale-105 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={handleImageLoad}
          onError={handleImageError}
          key={actualTheme} // Force re-render when theme changes
          loading="eager"
        />
        {!isLoaded && (
          <div className={`${sizeClasses[size]} bg-muted animate-pulse rounded`} />
        )}
      </div>
      {showText && (
        <span className="ml-2 font-bold text-foreground">
          IoT Dashboard
        </span>
      )}
    </div>
  );
}
