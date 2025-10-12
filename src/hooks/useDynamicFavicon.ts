import { useTheme } from '../contexts/ThemeContext';
import { useEffect } from 'react';

export function useDynamicFavicon() {
  const { actualTheme } = useTheme();

  useEffect(() => {
    const logoSrc = actualTheme === 'dark' ? '/darkLogo.svg' : '/lightLogo.svg';
    
    const favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
    if (favicon) {
      favicon.href = logoSrc;
    }
    
    const favicon32 = document.querySelector('link[rel="icon"][sizes="32x32"]') as HTMLLinkElement;
    if (favicon32) {
      favicon32.href = logoSrc;
    }
    
    const favicon16 = document.querySelector('link[rel="icon"][sizes="16x16"]') as HTMLLinkElement;
    if (favicon16) {
      favicon16.href = logoSrc;
    }
    
    const appleTouchIcon = document.querySelector('link[rel="apple-touch-icon"]') as HTMLLinkElement;
    if (appleTouchIcon) {
      appleTouchIcon.href = logoSrc;
    }
    
    const ogImage = document.querySelector('meta[property="og:image"]') as HTMLMetaElement;
    if (ogImage) {
      ogImage.content = logoSrc;
    }
    
    const twitterImage = document.querySelector('meta[property="twitter:image"]') as HTMLMetaElement;
    if (twitterImage) {
      twitterImage.content = logoSrc;
    }
    
    const themeColor = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement;
    if (themeColor) {
      themeColor.content = actualTheme === 'dark' ? '#1f2937' : '#3b82f6';
    }
    
    const msTileColor = document.querySelector('meta[name="msapplication-TileColor"]') as HTMLMetaElement;
    if (msTileColor) {
      msTileColor.content = actualTheme === 'dark' ? '#1f2937' : '#3b82f6';
    }
  }, [actualTheme]);
}
