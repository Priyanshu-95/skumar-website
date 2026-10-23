import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const dist = path.resolve(root, 'dist');
const serverEntry = path.resolve(dist, 'server', 'entry-server.js');

async function prerender() {
  console.log('🚀 Starting Static Site Generation (SSG) Prerender...');

  if (!fs.existsSync(serverEntry)) {
    console.error('❌ Server build not found at:', serverEntry);
    process.exit(1);
  }

  const template = fs.readFileSync(path.resolve(dist, 'index.html'), 'utf-8');
  const { render } = await import(pathToFileURL(serverEntry).href);

  const DOMAIN = 'https://skumarinterior.com';
  const LOCAL_OG_IMAGE = `${DOMAIN}/og-image.jpg`; // TODO: Replace /public/og-image.jpg with branded photo if desired
  const LOGO_URL = `${DOMAIN}/skumar-logo.png`;

  const LOCAL_BUSINESS_SCHEMA = {
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
    hasMap: 'https://www.google.com/maps/dir/?api=1&destination=Antilia+Business+Hub,+Nana+Chiloda+Circle,+Ahmedabad,+Gujarat+382330', // TODO: Add verified Google Maps CID link if available
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

  const routesConfig = [
    {
      route: '/',
      outFile: path.resolve(dist, 'index.html'),
      title: 'Interior Designer & Civil Contractor in Ahmedabad | S Kumar',
      description: 'Ahmedabad interior designer and civil contractor. S Kumar offers turnkey interiors, custom joinery and construction across Gujarat and Pan India. Get a free quote.',
      canonical: `${DOMAIN}/`,
      ogImageAlt: 'S Kumar Construction & Interior - Interior Design & Civil Contractor Ahmedabad',
      robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
      schema: [WEBSITE_SCHEMA, LOCAL_BUSINESS_SCHEMA]
    },
    {
      route: '/interior-design-ahmedabad',
      outFile: path.resolve(dist, 'interior-design-ahmedabad', 'index.html'),
      title: 'Interior Design Services in Ahmedabad | S Kumar',
      description: 'Turnkey home and office interior design in Ahmedabad and Gandhinagar. From concept to handover, with custom joinery and on-site execution. Request a quote.',
      canonical: `${DOMAIN}/interior-design-ahmedabad`,
      ogImageAlt: 'Interior Design Services in Ahmedabad by S Kumar',
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
    {
      route: '/custom-furniture-joinery',
      outFile: path.resolve(dist, 'custom-furniture-joinery', 'index.html'),
      title: 'Custom Furniture & Joinery in Ahmedabad | S Kumar',
      description: 'Made-to-measure wardrobes, kitchens, TV units and furniture crafted for your space in Ahmedabad and across Gujarat. See our work and get a quote.',
      canonical: `${DOMAIN}/custom-furniture-joinery`,
      ogImageAlt: 'Custom Furniture & Joinery in Ahmedabad by S Kumar',
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
    {
      route: '/civil-construction-gujarat',
      outFile: path.resolve(dist, 'civil-construction-gujarat', 'index.html'),
      title: 'Civil Construction Contractor in Gujarat | S Kumar',
      description: 'Turnkey civil construction for homes, offices and commercial spaces in Ahmedabad and Gujarat. Reliable planning, execution and delivery. Contact us today.',
      canonical: `${DOMAIN}/civil-construction-gujarat`,
      ogImageAlt: 'Civil Construction Contractor in Gujarat - S Kumar',
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
    {
      route: '/projects',
      outFile: path.resolve(dist, 'projects', 'index.html'),
      title: 'Interior Design & Construction Portfolio | S Kumar',
      description: 'Explore completed luxury residential, villa, and commercial interior design and construction projects executed by S Kumar across Ahmedabad and Gujarat.',
      canonical: `${DOMAIN}/projects`,
      ogImageAlt: 'Completed Portfolio - S Kumar Construction & Interior',
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
    {
      route: '/contact',
      outFile: path.resolve(dist, 'contact', 'index.html'),
      title: 'Contact S Kumar Studio & Office in Ahmedabad',
      description: 'Contact S Kumar Construction & Interior in Ahmedabad. Visit our studio at Nana Chiloda Circle, S.P. Ring Road, or call for turnkey interior consultations.',
      canonical: `${DOMAIN}/contact`,
      ogImageAlt: 'Contact S Kumar Construction & Interior Studio Ahmedabad',
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
    {
      route: '/about',
      outFile: path.resolve(dist, 'about', 'index.html'),
      title: 'About S Kumar Construction & Interior Ahmedabad',
      description: 'Learn about S Kumar Construction & Interior in Ahmedabad. Precision craftsmanship, architectural design, custom furniture, and reliable turnkey execution.',
      canonical: `${DOMAIN}/about`,
      ogImageAlt: 'About S Kumar Construction & Interior Studio',
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
    {
      route: '/privacy',
      outFile: path.resolve(dist, 'privacy', 'index.html'),
      title: 'Privacy Policy | S Kumar Construction & Interior',
      description: 'Privacy Policy for S Kumar Construction & Interior. Information on data handling, client confidentiality, and web practices.',
      canonical: `${DOMAIN}/privacy`,
      ogImageAlt: 'S Kumar Construction & Interior Privacy Policy',
      robots: 'index, follow',
      schema: [LOCAL_BUSINESS_SCHEMA]
    },
    {
      route: '/terms',
      outFile: path.resolve(dist, 'terms', 'index.html'),
      title: 'Terms & Conditions | S Kumar Construction & Interior',
      description: 'Terms and Conditions for architectural consulting, turnkey execution, and custom woodwork contracts with S Kumar.',
      canonical: `${DOMAIN}/terms`,
      ogImageAlt: 'S Kumar Construction & Interior Terms & Conditions',
      robots: 'index, follow',
      schema: [LOCAL_BUSINESS_SCHEMA]
    },
    {
      route: '/404',
      outFile: path.resolve(dist, '404.html'),
      title: '404 - Page Not Located | S Kumar Construction',
      description: 'The requested page could not be located. Explore our interior design services, custom joinery, and civil construction in Ahmedabad.',
      canonical: `${DOMAIN}/404`,
      ogImageAlt: '404 Page Not Found - S Kumar Construction',
      robots: 'noindex, follow',
      schema: [LOCAL_BUSINESS_SCHEMA]
    }
  ];

  for (const page of routesConfig) {
    const appHtml = render(page.route);

    let html = template;

    // 1. Replace Title
    html = html.replace(/<title>.*?<\/title>/, `<title>${page.title}</title>`);

    // 2. Replace Description
    html = html.replace(
      /<meta\s+name="description"\s+content=".*?"\s*\/?>/,
      `<meta name="description" content="${page.description}" />`
    );

    // 3. Replace Robots
    html = html.replace(
      /<meta\s+name="robots"\s+content=".*?"\s*\/?>/,
      `<meta name="robots" content="${page.robots}" />`
    );

    // 4. Replace Canonical URL
    html = html.replace(
      /<link\s+rel="canonical"\s+href=".*?"\s*\/?>/,
      `<link rel="canonical" href="${page.canonical}" />`
    );

    // 5. Replace Open Graph Tags
    html = html.replace(
      /<meta\s+property="og:title"\s+content=".*?"\s*\/?>/,
      `<meta property="og:title" content="${page.title}" />`
    );
    html = html.replace(
      /<meta\s+property="og:description"\s+content=".*?"\s*\/?>/,
      `<meta property="og:description" content="${page.description}" />`
    );
    html = html.replace(
      /<meta\s+property="og:url"\s+content=".*?"\s*\/?>/,
      `<meta property="og:url" content="${page.canonical}" />`
    );
    html = html.replace(
      /<meta\s+property="og:image:alt"\s+content=".*?"\s*\/?>/,
      `<meta property="og:image:alt" content="${page.ogImageAlt}" />`
    );

    // 6. Replace Twitter Tags
    html = html.replace(
      /<meta\s+name="twitter:title"\s+content=".*?"\s*\/?>/,
      `<meta name="twitter:title" content="${page.title}" />`
    );
    html = html.replace(
      /<meta\s+name="twitter:description"\s+content=".*?"\s*\/?>/,
      `<meta name="twitter:description" content="${page.description}" />`
    );
    html = html.replace(
      /<meta\s+name="twitter:image:alt"\s+content=".*?"\s*\/?>/,
      `<meta name="twitter:image:alt" content="${page.ogImageAlt}" />`
    );

    // 7. Replace Structured Data (JSON-LD)
    const jsonLdBlock = `<script type="application/ld+json">\n${JSON.stringify(
      page.schema.length === 1 ? page.schema[0] : { '@context': 'https://schema.org', '@graph': page.schema },
      null,
      2
    )}\n  </script>`;

    html = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, jsonLdBlock);

    // 8. Inject Server Rendered App HTML into <div id="root"></div>
    html = html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

    // Ensure output directory exists and write file
    fs.mkdirSync(path.dirname(page.outFile), { recursive: true });
    fs.writeFileSync(page.outFile, html, 'utf-8');

    const sizeKb = (fs.statSync(page.outFile).size / 1024).toFixed(1);
    const hasH1 = html.includes('<h1');
    console.log(`  ✓ Prerendered: ${page.route.padEnd(30)} -> ${path.relative(root, page.outFile)} (${sizeKb} kB, H1: ${hasH1 ? 'YES' : 'NO'})`);
  }

  // Clean up server build folder
  fs.rmSync(path.resolve(dist, 'server'), { recursive: true, force: true });
  console.log('✨ All 10 routes successfully prerendered into static HTML files with complete DOM content!');
}

prerender().catch((err) => {
  console.error('❌ Prerendering failed:', err);
  process.exit(1);
});
