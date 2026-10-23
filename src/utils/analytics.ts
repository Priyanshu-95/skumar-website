// Privacy-respecting Analytics Utility for S Kumar Construction & Interior
// Integrates with GA4 / GTM while respecting user consent preferences

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || '';

export const isAnalyticsConsented = (): boolean => {
  try {
    const consent = localStorage.getItem('skumar_cookie_consent');
    if (!consent) return false;
    const parsed = JSON.parse(consent);
    return parsed.analytics === true;
  } catch {
    return false;
  }
};

export const initAnalytics = (): void => {
  if (!isAnalyticsConsented() || !GA_MEASUREMENT_ID) return;

  // Prevent duplicate script injection
  if (document.getElementById('ga-script')) return;

  const script = document.createElement('script');
  script.id = 'ga-script';
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag(...args: unknown[]) {
    (window.dataLayer as unknown[]).push(args);
  }
  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID, {
    anonymize_ip: true,
    send_page_view: false
  });
};

export const trackPageView = (path: string, title?: string): void => {
  if (!isAnalyticsConsented()) return;

  if (typeof window !== 'undefined' && 'gtag' in window && typeof window.gtag === 'function') {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: title || document.title,
    });
  }
};

export const trackFormSubmission = (formName: string, serviceType: string): void => {
  if (!isAnalyticsConsented()) return;

  if (typeof window !== 'undefined' && 'gtag' in window && typeof window.gtag === 'function') {
    // Only track aggregate non-sensitive metadata (form name and general category)
    window.gtag('event', 'generate_lead', {
      event_category: 'Enquiry',
      event_label: `${formName} - ${serviceType}`,
      value: 1,
    });
  }
};

export const trackEvent = (eventName: string, params?: Record<string, unknown>): void => {
  if (!isAnalyticsConsented()) return;

  if (typeof window !== 'undefined' && 'gtag' in window && typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }
};

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}
