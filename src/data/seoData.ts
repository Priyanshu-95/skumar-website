export interface PageSEO {
  path: string;
  title: string;
  description: string;
  canonical: string;
  ogType: string;
  ogImage: string;
  ogImageAlt: string;
  twitterCard: string;
  robots?: string;
  schema: Record<string, unknown>[];
}

const DOMAIN = 'https://skumarinterior.com';
const LOCAL_OG_IMAGE = `${DOMAIN}/og-image.jpg`; // TODO: Replace /public/og-image.jpg with branded photo if desired
const LOGO_URL = `${DOMAIN}/skumar-logo.png`;

// Verified Official Local Business NAP Schema (RFC-compliant phone format, typed areaServed, local images)
export const LOCAL_BUSINESS_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': ['HomeAndConstructionBusiness', 'GeneralContractor'],
  '@id': `${DOMAIN}/#localbusiness`,
  name: 'S Kumar Construction & Interior',
  alternateName: 'SKumar Construction & Interior',
  legalName: 'S Kumar Construction & Interior',
  url: DOMAIN,
  logo: LOGO_URL,
  image: LOCAL_OG_IMAGE,
  telephone: '+91-98989-66648',
  email: 'info@skumarinterior.com',
  priceRange: '₹₹₹',
  hasMap: 'https://www.google.com/maps/dir/?api=1&destination=Antilia+Business+Hub,+Nana+Chiloda+Circle,+Ahmedabad,+Gujarat+382330', // TODO: Verify specific Google Maps CID link if available
  sameAs: [
    // TODO: Verify exact live social URLs
    'https://maps.google.com/?cid=skumar-interior-ahmedabad',
    'https://instagram.com/skumar_interior',
    'https://facebook.com/skumarinterior',
    'https://linkedin.com/company/skumar-interior',
    'https://www.indiamart.com/skumar-interior-ahmedabad'
  ],
  address: {
    '@type': 'PostalAddress',
    streetAddress: '414, Antilia Business Hub, S.P. Ring Road, Nana Chiloda Circle',
    addressLocality: 'Ahmedabad',
    addressRegion: 'Gujarat',
    postalCode: '382330',
    addressCountry: 'IN'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 23.0975,
    longitude: 72.6598
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '10:00',
      closes: '19:30'
    }
  ],
  areaServed: [
    { '@type': 'City', name: 'Ahmedabad' },
    { '@type': 'City', name: 'Gandhinagar' },
    { '@type': 'State', name: 'Gujarat' },
    { '@type': 'Country', name: 'India' }
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Construction & Interior Design Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Interior Design Services',
          description: 'Turnkey residential and commercial interior design in Ahmedabad and Gandhinagar.',
          url: `${DOMAIN}/interior-design-ahmedabad`
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Custom Furniture & Joinery',
          description: 'Made-to-measure wardrobes, kitchens, TV units and artisan woodwork crafted for your space in Ahmedabad and across Gujarat.',
          url: `${DOMAIN}/custom-furniture-joinery`
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Civil Construction Contracting',
          description: 'Turnkey civil construction for homes, offices and commercial spaces in Ahmedabad and Gujarat.',
          url: `${DOMAIN}/civil-construction-gujarat`
        }
      }
    ]
  }
};

const WEBSITE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${DOMAIN}/#website`,
  url: DOMAIN,
  name: 'S Kumar Construction & Interior',
  description: 'Turnkey interior design, custom joinery, and reliable civil construction solutions in Ahmedabad, Gujarat, and Pan India.',
  publisher: {
    '@id': `${DOMAIN}/#localbusiness`
  },
  inLanguage: 'en-IN'
};

export const ROUTES_SEO: Record<string, PageSEO> = {
  '/': {
    path: '/',
    title: 'Interior Designer & Civil Contractor in Ahmedabad | S Kumar',
    description: 'Ahmedabad interior designer and civil contractor. S Kumar offers turnkey interiors, custom joinery and construction across Gujarat and Pan India. Get a free quote.',
    canonical: `${DOMAIN}/`,
    ogType: 'website',
    ogImage: LOCAL_OG_IMAGE,
    ogImageAlt: 'S Kumar Construction & Interior - Interior Design & Civil Contractor Ahmedabad',
    twitterCard: 'summary_large_image',
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    schema: [
      WEBSITE_SCHEMA,
      LOCAL_BUSINESS_SCHEMA,
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': `${DOMAIN}/#webpage`,
        url: `${DOMAIN}/`,
        name: 'S Kumar Construction & Interior — Interior Designer & Civil Contractor in Ahmedabad',
        description: 'Comprehensive turnkey civil construction, bespoke residential interior design, custom joinery, and commercial fit-outs in Ahmedabad and across India.',
        isPartOf: { '@id': `${DOMAIN}/#website` }
      }
    ]
  },

  '/interior-design-ahmedabad': {
    path: '/interior-design-ahmedabad',
    title: 'Interior Design Services in Ahmedabad | S Kumar',
    description: 'Turnkey home and office interior design in Ahmedabad and Gandhinagar. From concept to handover, with custom joinery and on-site execution. Request a quote.',
    canonical: `${DOMAIN}/interior-design-ahmedabad`,
    ogType: 'website',
    ogImage: LOCAL_OG_IMAGE,
    ogImageAlt: 'Interior Design Services in Ahmedabad by S Kumar Construction & Interior',
    twitterCard: 'summary_large_image',
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    schema: [
      LOCAL_BUSINESS_SCHEMA,
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${DOMAIN}/` },
          { '@type': 'ListItem', position: 2, name: 'Interior Design Ahmedabad', item: `${DOMAIN}/interior-design-ahmedabad` }
        ]
      },
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Interior Design Services in Ahmedabad',
        serviceType: 'Turnkey Interior Design',
        provider: { '@id': `${DOMAIN}/#localbusiness` },
        areaServed: [
          { '@type': 'City', name: 'Ahmedabad' },
          { '@type': 'City', name: 'Gandhinagar' },
          { '@type': 'State', name: 'Gujarat' },
          { '@type': 'Country', name: 'India' }
        ],
        description: 'Turnkey home and office interior design in Ahmedabad and Gandhinagar. From concept to handover, with custom joinery and on-site execution.'
      }
    ]
  },

  '/custom-furniture-joinery': {
    path: '/custom-furniture-joinery',
    title: 'Custom Furniture & Joinery in Ahmedabad | S Kumar',
    description: 'Made-to-measure wardrobes, kitchens, TV units and furniture crafted for your space in Ahmedabad and across Gujarat. See our work and get a quote.',
    canonical: `${DOMAIN}/custom-furniture-joinery`,
    ogType: 'website',
    ogImage: LOCAL_OG_IMAGE,
    ogImageAlt: 'Custom Furniture & Joinery in Ahmedabad by S Kumar',
    twitterCard: 'summary_large_image',
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    schema: [
      LOCAL_BUSINESS_SCHEMA,
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${DOMAIN}/` },
          { '@type': 'ListItem', position: 2, name: 'Custom Furniture & Joinery', item: `${DOMAIN}/custom-furniture-joinery` }
        ]
      },
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Custom Furniture & Artisan Joinery',
        serviceType: 'Custom Woodwork & Modular Joinery',
        provider: { '@id': `${DOMAIN}/#localbusiness` },
        areaServed: [
          { '@type': 'City', name: 'Ahmedabad' },
          { '@type': 'City', name: 'Gandhinagar' },
          { '@type': 'State', name: 'Gujarat' }
        ],
        description: 'Made-to-measure wardrobes, modular kitchens, TV consoles, Burmese teak woodwork, and architectural panelling in Ahmedabad.'
      }
    ]
  },

  '/civil-construction-gujarat': {
    path: '/civil-construction-gujarat',
    title: 'Civil Construction Contractor in Gujarat | S Kumar',
    description: 'Turnkey civil construction for homes, offices and commercial spaces in Ahmedabad and Gujarat. Reliable planning, execution and delivery. Contact us today.',
    canonical: `${DOMAIN}/civil-construction-gujarat`,
    ogType: 'website',
    ogImage: LOCAL_OG_IMAGE,
    ogImageAlt: 'Civil Construction Contractor in Gujarat - S Kumar',
    twitterCard: 'summary_large_image',
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    schema: [
      LOCAL_BUSINESS_SCHEMA,
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${DOMAIN}/` },
          { '@type': 'ListItem', position: 2, name: 'Civil Construction Gujarat', item: `${DOMAIN}/civil-construction-gujarat` }
        ]
      },
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Civil Construction Contracting',
        serviceType: 'Turnkey Civil Contracting',
        provider: { '@id': `${DOMAIN}/#localbusiness` },
        areaServed: [
          { '@type': 'City', name: 'Ahmedabad' },
          { '@type': 'City', name: 'Gandhinagar' },
          { '@type': 'State', name: 'Gujarat' }
        ],
        description: 'Turnkey civil construction, structural alterations, masonry, plumbing, electrical, and finishing across Gujarat.'
      }
    ]
  },

  '/projects': {
    path: '/projects',
    title: 'Interior Design & Construction Portfolio | S Kumar',
    description: 'Explore completed luxury residential, villa, and commercial interior design and construction projects executed by S Kumar across Ahmedabad and Gujarat.',
    canonical: `${DOMAIN}/projects`,
    ogType: 'website',
    ogImage: LOCAL_OG_IMAGE,
    ogImageAlt: 'Completed Portfolio - S Kumar Construction & Interior',
    twitterCard: 'summary_large_image',
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    schema: [
      LOCAL_BUSINESS_SCHEMA,
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${DOMAIN}/` },
          { '@type': 'ListItem', position: 2, name: 'Portfolio', item: `${DOMAIN}/projects` }
        ]
      },
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Interior Design & Construction Portfolio Ahmedabad',
        description: 'Curated architectural portfolio of villas, 3 BHK apartments, corporate offices, and clinics in Ahmedabad.'
      }
    ]
  },

  '/contact': {
    path: '/contact',
    title: 'Contact S Kumar Studio & Office in Ahmedabad',
    description: 'Contact S Kumar Construction & Interior in Ahmedabad. Visit our studio at Nana Chiloda Circle, S.P. Ring Road, or call for turnkey interior consultations.',
    canonical: `${DOMAIN}/contact`,
    ogType: 'website',
    ogImage: LOCAL_OG_IMAGE,
    ogImageAlt: 'Contact S Kumar Construction & Interior Studio Ahmedabad',
    twitterCard: 'summary_large_image',
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    schema: [
      LOCAL_BUSINESS_SCHEMA,
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${DOMAIN}/` },
          { '@type': 'ListItem', position: 2, name: 'Contact', item: `${DOMAIN}/contact` }
        ]
      },
      {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: 'Contact S Kumar Construction & Interior',
        description: 'Schedule spatial consultations, request civil estimates, or visit our design studio in Ahmedabad.'
      }
    ]
  },

  '/about': {
    path: '/about',
    title: 'About S Kumar Construction & Interior Ahmedabad',
    description: 'Learn about S Kumar Construction & Interior in Ahmedabad. Precision craftsmanship, architectural design, custom furniture, and reliable turnkey execution.',
    canonical: `${DOMAIN}/about`,
    ogType: 'website',
    ogImage: LOCAL_OG_IMAGE,
    ogImageAlt: 'About S Kumar Construction & Interior Studio',
    twitterCard: 'summary_large_image',
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    schema: [
      LOCAL_BUSINESS_SCHEMA,
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${DOMAIN}/` },
          { '@type': 'ListItem', position: 2, name: 'About', item: `${DOMAIN}/about` }
        ]
      },
      {
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name: 'About S Kumar Construction & Interior',
        description: 'Our design philosophy, workshop standards, civil contracting history, and leadership in Ahmedabad.'
      }
    ]
  },

  '/privacy': {
    path: '/privacy',
    title: 'Privacy Policy | S Kumar Construction & Interior',
    description: 'Privacy Policy for S Kumar Construction & Interior. Information on data handling, client confidentiality, and web practices.',
    canonical: `${DOMAIN}/privacy`,
    ogType: 'website',
    ogImage: LOCAL_OG_IMAGE,
    ogImageAlt: 'S Kumar Construction & Interior Privacy Policy',
    twitterCard: 'summary',
    robots: 'index, follow',
    schema: [LOCAL_BUSINESS_SCHEMA]
  },

  '/terms': {
    path: '/terms',
    title: 'Terms & Conditions | S Kumar Construction & Interior',
    description: 'Terms and Conditions for architectural consulting, turnkey execution, and custom woodwork contracts with S Kumar.',
    canonical: `${DOMAIN}/terms`,
    ogType: 'website',
    ogImage: LOCAL_OG_IMAGE,
    ogImageAlt: 'S Kumar Construction & Interior Terms & Conditions',
    twitterCard: 'summary',
    robots: 'index, follow',
    schema: [LOCAL_BUSINESS_SCHEMA]
  },

  '/404': {
    path: '/404',
    title: '404 - Page Not Located | S Kumar Construction',
    description: 'The requested page could not be located. Explore our interior design services, custom joinery, and civil construction in Ahmedabad.',
    canonical: `${DOMAIN}/404`,
    ogType: 'website',
    ogImage: LOCAL_OG_IMAGE,
    ogImageAlt: '404 Page Not Found - S Kumar Construction',
    twitterCard: 'summary',
    robots: 'noindex, follow',
    schema: [LOCAL_BUSINESS_SCHEMA]
  }
};
