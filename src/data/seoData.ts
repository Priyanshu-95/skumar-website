export interface PageSEO {
  title: string;
  description: string;
  canonical: string;
  keywords: string;
  ogType: string;
  ogImage: string;
  robots?: string;
  schema: Record<string, unknown>[];
}

const DOMAIN = 'https://skumarinterior.com';
const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop';
const LOGO_URL = `${DOMAIN}/skumar-logo.png`;

// Verified Official Local Business NAP Schema
const LOCAL_BUSINESS_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': ['HomeAndConstructionBusiness', 'GeneralContractor'],
  '@id': `${DOMAIN}/#localbusiness`,
  name: 'S Kumar Construction & Interior',
  alternateName: 'SKumar Construction & Interior',
  legalName: 'S Kumar Construction & Interior',
  url: DOMAIN,
  logo: LOGO_URL,
  image: DEFAULT_IMAGE,
  telephone: '+91 98989 66648',
  email: 'info@skumarinterior.com',
  priceRange: '₹₹₹',
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
    { '@type': 'AdministrativeArea', name: 'Gujarat' },
    { '@type': 'Country', name: 'India' }
  ],
  knowsAbout: [
    'Turnkey Civil Construction',
    'Residential Interior Design',
    'Burmese Teak Joinery & Custom Furniture',
    '3 BHK and Villa Interior Design',
    'Commercial Office Fit-Outs',
    'PVC Wall and Ceiling Solutions'
  ],
  sameAs: [
    'https://www.google.com/maps/dir/?api=1&destination=Antilia+Business+Hub,+Nana+Chiloda+Circle,+Ahmedabad,+Gujarat+382330'
  ]
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

export const SEO_PAGES: Record<string, PageSEO> = {
  home: {
    title: 'S Kumar Construction & Interior | Interior Design & Construction Ahmedabad',
    description: 'S Kumar Construction & Interior provides comprehensive interior design, custom joinery, and turnkey civil construction across Ahmedabad, Gujarat, and Pan India.',
    canonical: `${DOMAIN}/`,
    keywords: 'S Kumar Construction, Interior Designer Ahmedabad, Turnkey Interior Contractor, Civil Construction Gujarat, Custom Furniture Ahmedabad, 3 BHK Interior Design, Villa Interiors Ahmedabad, Pan India Interior Design',
    ogType: 'website',
    ogImage: DEFAULT_IMAGE,
    schema: [
      WEBSITE_SCHEMA,
      LOCAL_BUSINESS_SCHEMA,
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': `${DOMAIN}/#webpage`,
        url: `${DOMAIN}/`,
        name: 'S Kumar Construction & Interior — Turnkey Interior Design & Construction',
        description: 'Comprehensive turnkey civil construction, bespoke residential interior design, custom joinery, and commercial fit-outs in Ahmedabad and across India.',
        isPartOf: { '@id': `${DOMAIN}/#website` },
        about: { '@id': `${DOMAIN}/#localbusiness` },
        inLanguage: 'en-IN'
      }
    ]
  },
  work: {
    title: 'Architectural Projects & Interiors Portfolio | S Kumar Ahmedabad',
    description: 'Explore completed 2 BHK, 3 BHK, luxury villa, corporate office, and healthcare interior architecture projects in Ahmedabad and Gandhinagar by S Kumar.',
    canonical: `${DOMAIN}/?tab=work`,
    keywords: 'interior projects Ahmedabad, 3 BHK interior photos, luxury villa interiors Shela, corporate office interior SG Highway, healthcare clinic interiors Ahmedabad',
    ogType: 'website',
    ogImage: `${DOMAIN}/projects/bodakdev-3bhk-residence/img_1_full.webp`,
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        '@id': `${DOMAIN}/?tab=work#collectionpage`,
        url: `${DOMAIN}/?tab=work`,
        name: 'Selected Projects & Architectural Spaces | S Kumar Portfolio',
        description: 'Portfolio of completed residential, villa, commercial, and healthcare interior projects in Ahmedabad and Gandhinagar.',
        isPartOf: { '@id': `${DOMAIN}/#website` },
        about: { '@id': `${DOMAIN}/#localbusiness` },
        inLanguage: 'en-IN'
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: `${DOMAIN}/`
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Projects Portfolio',
            item: `${DOMAIN}/?tab=work`
          }
        ]
      }
    ]
  },
  services: {
    title: 'Interior Design & Civil Construction Services Ahmedabad | S Kumar',
    description: 'End-to-end turnkey services: custom Burmese teak joinery, residential interior design, villa architecture, corporate offices, healthcare, and PVC panelling.',
    canonical: `${DOMAIN}/?tab=services`,
    keywords: 'interior design services Ahmedabad, civil construction contractor Gujarat, custom joinery Ahmedabad, Burmese teak furniture, office interior design, PVC panelling',
    ogType: 'website',
    ogImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop',
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'ItemPage',
        '@id': `${DOMAIN}/?tab=services#itempage`,
        url: `${DOMAIN}/?tab=services`,
        name: 'Architectural Services From Conception To Handover',
        description: 'Comprehensive interior design, modular joinery, turnkey civil execution, and PVC wall and ceiling solutions.',
        isPartOf: { '@id': `${DOMAIN}/#website` },
        about: { '@id': `${DOMAIN}/#localbusiness` },
        inLanguage: 'en-IN'
      },
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Turnkey Interior Design & Civil Construction',
        provider: { '@id': `${DOMAIN}/#localbusiness` },
        areaServed: [
          { '@type': 'City', name: 'Ahmedabad' },
          { '@type': 'City', name: 'Gandhinagar' },
          { '@type': 'AdministrativeArea', name: 'Gujarat' },
          { '@type': 'Country', name: 'India' }
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Interior & Construction Services',
          itemListElement: [
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Wooden Work & Custom Joinery' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Residential Interiors (2 BHK & 3 BHK)' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Bungalows & Luxury Villas' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Turnkey Execution & Civil Work' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Commercial & Executive Offices' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Hospitality Spaces' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Healthcare & Clinic Interiors' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'PVC Wall & Ceiling Solutions' } }
          ]
        }
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: `${DOMAIN}/`
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Services',
            item: `${DOMAIN}/?tab=services`
          }
        ]
      }
    ]
  },
  about: {
    title: 'About Us | S Kumar Construction & Interior Studio Ahmedabad',
    description: 'Learn about S Kumar Construction & Interior — our craftsmanship, design philosophy, single-point accountability, and pan-India interior design capabilities.',
    canonical: `${DOMAIN}/?tab=about`,
    keywords: 'about S Kumar Construction, interior architecture studio Ahmedabad, civil contractor profile Gujarat, turnkey interior company',
    ogType: 'website',
    ogImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1600&auto=format&fit=crop',
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        '@id': `${DOMAIN}/?tab=about#aboutpage`,
        url: `${DOMAIN}/?tab=about`,
        name: 'About S Kumar Construction & Interior',
        description: 'Architectural concept design, civil construction, and precision joinery under single studio management.',
        isPartOf: { '@id': `${DOMAIN}/#website` },
        about: { '@id': `${DOMAIN}/#localbusiness` },
        inLanguage: 'en-IN'
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: `${DOMAIN}/`
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'About Us',
            item: `${DOMAIN}/?tab=about`
          }
        ]
      }
    ]
  },
  contact: {
    title: 'Contact S Kumar Construction & Interior | Ahmedabad Office & Enquiry',
    description: 'Get in touch with S Kumar Construction & Interior at Antilia Business Hub, S.P. Ring Road, Ahmedabad. Phone: +91 98989 66648. Schedule a studio consultation.',
    canonical: `${DOMAIN}/?tab=contact`,
    keywords: 'contact interior designer Ahmedabad, S Kumar address, Antilia Business Hub Nana Chiloda, interior consultation Ahmedabad',
    ogType: 'website',
    ogImage: DEFAULT_IMAGE,
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        '@id': `${DOMAIN}/?tab=contact#contactpage`,
        url: `${DOMAIN}/?tab=contact`,
        name: 'Contact S Kumar Construction & Interior',
        description: 'Connect with our architectural design and civil construction studio in Ahmedabad for consultations and project quotes.',
        isPartOf: { '@id': `${DOMAIN}/#website` },
        about: { '@id': `${DOMAIN}/#localbusiness` },
        inLanguage: 'en-IN'
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: `${DOMAIN}/`
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Contact Studio',
            item: `${DOMAIN}/?tab=contact`
          }
        ]
      }
    ]
  },
  privacy: {
    title: 'Privacy Policy | S Kumar Construction & Interior',
    description: 'Read the privacy policy of S Kumar Construction & Interior regarding client data protection, cookie usage, and communication standards.',
    canonical: `${DOMAIN}/?tab=privacy`,
    keywords: 'privacy policy S Kumar, data protection',
    ogType: 'website',
    ogImage: DEFAULT_IMAGE,
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': `${DOMAIN}/?tab=privacy#webpage`,
        url: `${DOMAIN}/?tab=privacy`,
        name: 'Privacy Policy | S Kumar Construction & Interior',
        isPartOf: { '@id': `${DOMAIN}/#website` },
        inLanguage: 'en-IN'
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: `${DOMAIN}/`
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Privacy Policy',
            item: `${DOMAIN}/?tab=privacy`
          }
        ]
      }
    ]
  },
  terms: {
    title: 'Terms & Conditions | S Kumar Construction & Interior',
    description: 'Review the terms and conditions for design consultations, turnkey contracts, and website usage with S Kumar Construction & Interior.',
    canonical: `${DOMAIN}/?tab=terms`,
    keywords: 'terms and conditions S Kumar Construction & Interior',
    ogType: 'website',
    ogImage: DEFAULT_IMAGE,
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': `${DOMAIN}/?tab=terms#webpage`,
        url: `${DOMAIN}/?tab=terms`,
        name: 'Terms & Conditions | S Kumar Construction & Interior',
        isPartOf: { '@id': `${DOMAIN}/#website` },
        inLanguage: 'en-IN'
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: `${DOMAIN}/`
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Terms & Conditions',
            item: `${DOMAIN}/?tab=terms`
          }
        ]
      }
    ]
  },
  notFound: {
    title: 'Page Not Found (404) | S Kumar Construction & Interior',
    description: 'The blueprint or page you are looking for does not exist. Explore our architectural portfolio, turnkey services, or return to homepage.',
    canonical: `${DOMAIN}/`,
    keywords: '404 not found',
    ogType: 'website',
    ogImage: DEFAULT_IMAGE,
    robots: 'noindex, nofollow',
    schema: []
  }
};
