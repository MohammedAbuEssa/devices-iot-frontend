import { useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface MetaTagsProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  keywords?: string;
}

export function useMetaTags({
  title = 'IoT Dashboard - Smart Device Management',
  description = 'Comprehensive IoT device management dashboard for monitoring sensors, analytics, and device status in real-time.',
  image,
  url = window.location.href,
  keywords = 'IoT, dashboard, device management, sensors, monitoring, analytics, smart devices'
}: MetaTagsProps = {}) {
  const { actualTheme } = useTheme();

  useEffect(() => {
    const logoSrc = actualTheme === 'dark' ? '/darkLogo.svg' : '/lightLogo.svg';
    const finalImage = image || logoSrc;

    // Update document title
    document.title = title;

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]') as HTMLMetaElement;
    if (metaDescription) {
      metaDescription.content = description;
    }

    // Update meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]') as HTMLMetaElement;
    if (metaKeywords) {
      metaKeywords.content = keywords;
    }

    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]') as HTMLMetaElement;
    if (ogTitle) {
      ogTitle.content = title;
    }

    const ogDescription = document.querySelector('meta[property="og:description"]') as HTMLMetaElement;
    if (ogDescription) {
      ogDescription.content = description;
    }

    const ogImage = document.querySelector('meta[property="og:image"]') as HTMLMetaElement;
    if (ogImage) {
      ogImage.content = finalImage;
    }

    const ogUrl = document.querySelector('meta[property="og:url"]') as HTMLMetaElement;
    if (ogUrl) {
      ogUrl.content = url;
    }

    // Update Twitter tags
    const twitterTitle = document.querySelector('meta[property="twitter:title"]') as HTMLMetaElement;
    if (twitterTitle) {
      twitterTitle.content = title;
    }

    const twitterDescription = document.querySelector('meta[property="twitter:description"]') as HTMLMetaElement;
    if (twitterDescription) {
      twitterDescription.content = description;
    }

    const twitterImage = document.querySelector('meta[property="twitter:image"]') as HTMLMetaElement;
    if (twitterImage) {
      twitterImage.content = finalImage;
    }

    const twitterUrl = document.querySelector('meta[property="twitter:url"]') as HTMLMetaElement;
    if (twitterUrl) {
      twitterUrl.content = url;
    }
  }, [title, description, image, url, keywords, actualTheme]);
}
