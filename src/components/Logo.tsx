import { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showText?: boolean;
}

export function Logo({ size = 'md', className = '', showText = false }: LogoProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const { actualTheme } = useTheme();
  
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
    xl: 'h-20 w-20'
  };

  // Choose logo based on current theme
  const logoSrc = actualTheme === 'dark' ? '/darkLogo.svg' : '/lightLogo.svg';

  // Reset states when theme changes
  useEffect(() => {
    setIsLoaded(false);
    setHasError(false);
  }, [actualTheme]);

  // Reset loading state when theme changes
  const handleImageLoad = () => {
    setIsLoaded(true);
    setHasError(false);
  };

  const handleImageError = () => {
    setHasError(true);
    setIsLoaded(true); // Hide logo completely if image fails
  };

  return (
    <div className={`flex items-center ${className}`}>
      <div className="relative">
        {!hasError && (
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
        )}
        {!isLoaded && !hasError && (
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
