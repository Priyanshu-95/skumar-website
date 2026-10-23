import React, { useEffect } from 'react';
import { SEO_PAGES } from '../data/seoData';

interface SEOHeadProps {
  activeTab: string;
}

const updateMetaTag = (attrName: string, attrVal: string, content: string) => {
  let element = document.head.querySelector(`meta[${attrName}="${attrVal}"]`) as HTMLMetaElement | null;
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attrName, attrVal);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
};

const updateLinkTag = (rel: string, href: string) => {
  let element = document.head.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
};

export const SEOHead: React.FC<SEOHeadProps> = ({ activeTab }) => {
  useEffect(() => {
    const seo = SEO_PAGES[activeTab] || SEO_PAGES.notFound;

    // 1. Update Title
    document.title = seo.title;

    // 2. Update Standard Meta Tags
    updateMetaTag('name', 'description', seo.description);
    if (seo.keywords) {
      updateMetaTag('name', 'keywords', seo.keywords);
    }
    updateMetaTag('name', 'robots', seo.robots || 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');

    // 3. Update Canonical URL
    updateLinkTag('canonical', seo.canonical);

    // 4. Update Open Graph Meta
    updateMetaTag('property', 'og:title', seo.title);
    updateMetaTag('property', 'og:description', seo.description);
    updateMetaTag('property', 'og:url', seo.canonical);
    updateMetaTag('property', 'og:type', seo.ogType);
    updateMetaTag('property', 'og:image', seo.ogImage);
    updateMetaTag('property', 'og:site_name', 'S Kumar Construction & Interior');

    // 5. Update Twitter Card Meta
    updateMetaTag('name', 'twitter:card', 'summary_large_image');
    updateMetaTag('name', 'twitter:title', seo.title);
    updateMetaTag('name', 'twitter:description', seo.description);
    updateMetaTag('name', 'twitter:image', seo.ogImage);

    // 6. Update Dynamic Page-level Structured Data (JSON-LD)
    const existingScript = document.getElementById('page-seo-schema');
    if (existingScript) {
      existingScript.remove();
    }

    if (seo.schema && seo.schema.length > 0) {
      const script = document.createElement('script');
      script.id = 'page-seo-schema';
      script.type = 'application/ld+json';
      script.text = JSON.stringify(seo.schema.length === 1 ? seo.schema[0] : seo.schema);
      document.head.appendChild(script);
    }

    return () => {
      // Optional cleanup
    };
  }, [activeTab]);

  return null;
};

export default SEOHead;
