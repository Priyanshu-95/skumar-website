import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ROUTES_SEO } from '../data/seoData';

interface SEOHeadProps {
  currentPath?: string;
}

const updateMetaTag = (attrName: string, attrVal: string, content: string) => {
  if (typeof document === 'undefined') return;
  let element = document.head.querySelector(`meta[${attrName}="${attrVal}"]`) as HTMLMetaElement | null;
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attrName, attrVal);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
};

const updateLinkTag = (rel: string, href: string) => {
  if (typeof document === 'undefined') return;
  let element = document.head.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
};

export const SEOHead: React.FC<SEOHeadProps> = ({ currentPath: propPath }) => {
  let locationPath = '/';
  try {
    const loc = useLocation();
    locationPath = loc.pathname;
  } catch {
    // In SSR without router context or fallback
  }

  const activePath = propPath || locationPath;

  useEffect(() => {
    if (typeof document === 'undefined') return;

    const seo = ROUTES_SEO[activePath] || ROUTES_SEO['/404'] || ROUTES_SEO['/'];

    // 1. Update Title
    document.title = seo.title;

    // 2. Update Standard Meta Tags
    updateMetaTag('name', 'description', seo.description);
    updateMetaTag('name', 'robots', seo.robots || 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');

    // 3. Update Canonical URL
    updateLinkTag('canonical', seo.canonical);

    // 4. Update Open Graph Meta
    updateMetaTag('property', 'og:title', seo.title);
    updateMetaTag('property', 'og:description', seo.description);
    updateMetaTag('property', 'og:url', seo.canonical);
    updateMetaTag('property', 'og:type', seo.ogType);
    updateMetaTag('property', 'og:image', seo.ogImage);
    updateMetaTag('property', 'og:image:alt', seo.ogImageAlt || seo.title);
    updateMetaTag('property', 'og:site_name', 'S Kumar Construction & Interior');
    updateMetaTag('property', 'og:locale', 'en_IN');

    // 5. Update Twitter Card Meta
    updateMetaTag('name', 'twitter:card', seo.twitterCard || 'summary_large_image');
    updateMetaTag('name', 'twitter:title', seo.title);
    updateMetaTag('name', 'twitter:description', seo.description);
    updateMetaTag('name', 'twitter:image', seo.ogImage);
    updateMetaTag('name', 'twitter:image:alt', seo.ogImageAlt || seo.title);

    // 6. Update Dynamic Page-level Structured Data (JSON-LD)
    const existingScript = document.getElementById('page-seo-schema');
    if (existingScript) {
      existingScript.remove();
    }

    if (seo.schema && seo.schema.length > 0) {
      const script = document.createElement('script');
      script.id = 'page-seo-schema';
      script.type = 'application/ld+json';
      script.text = JSON.stringify(seo.schema.length === 1 ? seo.schema[0] : { '@context': 'https://schema.org', '@graph': seo.schema });
      document.head.appendChild(script);
    }
  }, [activePath]);

  return null;
};
