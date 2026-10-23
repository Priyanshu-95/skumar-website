export interface BrandItem {
  id: string;
  name: string;
  category: string;
  categorySlug: string;
  categoryIndex: string;
  description: string;
  website?: string;
  officialColor: string; // HEX or CSS color for hover highlight
  accentBg?: string; // Light background accent on hover
  needsConfirmation?: boolean; // Flagged if spelling/brand standard needs client confirmation
  confirmationNote?: string;
  tagline: string;
}

export interface BrandCategory {
  id: string;
  slug: string;
  index: string;
  title: string;
  shortName: string;
  subText: string;
  direction: 'left' | 'right'; // Alternating marquee direction
  brands: BrandItem[];
}

export const BRAND_CATEGORIES: BrandCategory[] = [
  {
    id: 'cat-hardware',
    slug: 'hardware',
    index: '01',
    title: 'FURNITURE HARDWARE & FITTINGS',
    shortName: 'Hardware',
    subText: 'Premium hardware, fittings and architectural accessories.',
    direction: 'left',
    brands: [
      {
        id: 'hettich',
        name: 'Hettich',
        category: 'FURNITURE HARDWARE & FITTINGS',
        categorySlug: 'hardware',
        categoryIndex: '01',
        description: 'German precision drawer runners, soft-close hinges, and architectural sliding door systems.',
        website: 'https://www.hettich.com/',
        officialColor: '#D32F2F',
        accentBg: '#FFF5F5',
        tagline: 'German Architectural Hardware'
      },
      {
        id: 'godrej',
        name: 'Godrej',
        category: 'FURNITURE HARDWARE & FITTINGS',
        categorySlug: 'hardware',
        categoryIndex: '01',
        description: 'High-security architectural locking solutions, wardrobe fittings, and heavy-duty hinges.',
        website: 'https://www.godrej.com/',
        officialColor: '#00529B',
        accentBg: '#F0F7FF',
        tagline: 'Security & Joinery Hardware'
      },
      {
        id: 'korel',
        name: 'Korel',
        category: 'FURNITURE HARDWARE & FITTINGS',
        categorySlug: 'hardware',
        categoryIndex: '01',
        description: 'Architectural aluminum profile handles, sleek edge pulls, and modular kitchen hardware.',
        website: 'https://www.corehardware.in/',
        officialColor: '#2B3A42',
        accentBg: '#F4F6F7',
        tagline: 'Profile Handles & Fittings'
      },
      {
        id: 'royal-touch-hw',
        name: 'Royale Touche',
        category: 'FURNITURE HARDWARE & FITTINGS',
        categorySlug: 'hardware',
        categoryIndex: '01',
        description: 'Luxury cabinet handles, designer pulls, and polished brass architectural accessories.',
        website: 'https://royaletouche.com/',
        officialColor: '#B8860B',
        accentBg: '#FDFBF7',
        tagline: 'Luxury Designer Handles & Surfaces'
      },
      {
        id: 'halflay',
        name: 'Halflay / Häfele',
        category: 'FURNITURE HARDWARE & FITTINGS',
        categorySlug: 'hardware',
        categoryIndex: '01',
        description: 'Concealed kitchen drawer slides, soft-action hinges, and functional joinery hardware.',
        website: 'https://www.hafeleindia.com/',
        officialColor: '#1A365D',
        accentBg: '#EDF2F7',
        tagline: 'Concealed Slide & Hinge Systems'
      },
      {
        id: 'tendom',
        name: 'Tendom / Blum',
        category: 'FURNITURE HARDWARE & FITTINGS',
        categorySlug: 'hardware',
        categoryIndex: '01',
        description: 'Heavy-capacity tandem box drawers, inner dividers, and pull-out pantry mechanisms.',
        website: 'https://www.blum.com/in/en/',
        officialColor: '#2C3E50',
        accentBg: '#F2F4F4',
        tagline: 'Tandem Box Drawer Systems'
      },
      {
        id: 'hardwyn',
        name: 'Hardwyn',
        category: 'FURNITURE HARDWARE & FITTINGS',
        categorySlug: 'hardware',
        categoryIndex: '01',
        description: 'Architectural door closers, floor springs, patch fittings, and glass hardware.',
        website: 'https://www.hardwyn.com/',
        officialColor: '#C0392B',
        accentBg: '#FDEDEC',
        tagline: 'Door Controls & Glass Hardware'
      },
      {
        id: 'roto-hw',
        name: 'Roto',
        category: 'FURNITURE HARDWARE & FITTINGS',
        categorySlug: 'hardware',
        categoryIndex: '01',
        description: 'German window turn-tilt technology, sliding door hardware, and roof window fittings.',
        website: 'https://ftt.roto-frank.com/en/',
        officialColor: '#0066B3',
        accentBg: '#EBF5FB',
        tagline: 'Window & Door Technology'
      }
    ]
  },
  {
    id: 'cat-surfaces',
    slug: 'surfaces',
    index: '02',
    title: 'SURFACES & MATERIALS',
    shortName: 'Surfaces',
    subText: 'Premium laminates, plywood and decorative surfaces.',
    direction: 'right',
    brands: [
      {
        id: 'greenply',
        name: 'Greenply',
        category: 'SURFACES & MATERIALS',
        categorySlug: 'surfaces',
        categoryIndex: '02',
        description: 'E-Zero emission structural plywood, boiling water resistant boards, and decorative veneers.',
        website: 'https://www.greenply.com',
        officialColor: '#2E7D32',
        accentBg: '#F1F8E9',
        tagline: 'Zero-Emission Structural Plywood'
      },
      {
        id: 'advance-laminate',
        name: 'Advance Laminate',
        category: 'SURFACES & MATERIALS',
        categorySlug: 'surfaces',
        categoryIndex: '02',
        description: 'Ultra-matte anti-fingerprint laminates, synchronized woodgrain textures, and compact sheets.',
        website: 'https://advancelam.com',
        officialColor: '#C62828',
        accentBg: '#FFEBEE',
        tagline: 'Tactile Architectural Laminates'
      },
      {
        id: 'welmaica',
        name: 'Welmica / Welmaica',
        category: 'SURFACES & MATERIALS',
        categorySlug: 'surfaces',
        categoryIndex: '02',
        description: 'High-pressure decorative mica sheets, acrylic laminates, and textured panel coatings.',
        website: 'http://www.welmicalaminates.com/',
        officialColor: '#1565C0',
        accentBg: '#E3F2FD',
        tagline: 'High-Pressure Decorative Mica & Laminates'
      },
      {
        id: 'royal-touch-surf',
        name: 'Royale Touche',
        category: 'SURFACES & MATERIALS',
        categorySlug: 'surfaces',
        categoryIndex: '02',
        description: 'Hand-picked natural wood veneers, reconstituted timber sheets, and luxury laminate surfaces.',
        website: 'https://royaletouche.com/',
        officialColor: '#B8860B',
        accentBg: '#FDFBF7',
        tagline: 'Natural & Reconstituted Veneers & Surfaces'
      }
    ]
  },
  {
    id: 'cat-finishes',
    slug: 'finishes',
    index: '03',
    title: 'PAINTS & FINISHES',
    shortName: 'Finishes',
    subText: 'Interior finishes, wall treatments and decorative surfaces.',
    direction: 'left',
    brands: [
      {
        id: 'asian-paints',
        name: 'Asian Paints',
        category: 'PAINTS & FINISHES',
        categorySlug: 'finishes',
        categoryIndex: '03',
        description: 'Royale Aspira washable interior emulsions, Stucco metallic textures, and PU wood coats.',
        website: 'https://www.asianpaints.com/',
        officialColor: '#E65100',
        accentBg: '#FFF3E0',
        tagline: 'Luxury Emulsions & Textures'
      },
      {
        id: 'gprox-pop',
        name: 'Gyproc / Gprox POP',
        category: 'PAINTS & FINISHES',
        categorySlug: 'finishes',
        categoryIndex: '03',
        description: 'Ultra-white high-strength Saint-Gobain Gyproc plaster for seamless false ceilings, molding, and wall levelling.',
        website: 'https://www.gyproc.in/',
        officialColor: '#00838F',
        accentBg: '#E0F7FA',
        tagline: 'Ceiling Gypsum & POP Compound'
      }
    ]
  },
  {
    id: 'cat-glass',
    slug: 'glass',
    index: '04',
    title: 'GLASS & ARCHITECTURAL FITTINGS',
    shortName: 'Glass',
    subText: 'Architectural glass, glazing and premium glass fittings.',
    direction: 'right',
    brands: [
      {
        id: 'saint-gobain',
        name: 'Saint-Gobain Glass',
        category: 'GLASS & ARCHITECTURAL FITTINGS',
        categorySlug: 'glass',
        categoryIndex: '04',
        description: 'Extra-clear SGG Planilaque tinted back-painted glass, acoustic double glazing, and SGG Diamant float glass.',
        website: 'https://www.saint-gobain.co.in/',
        officialColor: '#005596',
        accentBg: '#EBF3FA',
        tagline: 'High-Performance Float & Tinted Glass'
      },
      {
        id: 'modiguard',
        name: 'ModiGuard',
        category: 'GLASS & ARCHITECTURAL FITTINGS',
        categorySlug: 'glass',
        categoryIndex: '04',
        description: 'Ultra-clear high-definition mirrors, distortion-free float glass, and acoustic interior glazing.',
        website: 'https://www.modiguard.com/',
        officialColor: '#0D47A1',
        accentBg: '#E8EAF6',
        tagline: 'HD Architectural Mirrors & Glazing'
      },
      {
        id: 'ozone',
        name: 'Ozone Glass Fittings',
        category: 'GLASS & ARCHITECTURAL FITTINGS',
        categorySlug: 'glass',
        categoryIndex: '04',
        description: 'Frameless glass partition fittings, hydraulic shower door hinges, and architectural spider clamps.',
        website: 'https://www.ozone-india.com/',
        officialColor: '#D84315',
        accentBg: '#FBE9E7',
        tagline: 'Frameless Glass Hardware & Partitioning'
      }
    ]
  },
  {
    id: 'cat-construction',
    slug: 'construction',
    index: '05',
    title: 'CONSTRUCTION & BUILDING MATERIALS',
    shortName: 'Construction',
    subText: 'Professional construction materials and building solutions.',
    direction: 'left',
    brands: [
      {
        id: 'pidilite',
        name: 'Pidilite',
        category: 'CONSTRUCTION & BUILDING MATERIALS',
        categorySlug: 'construction',
        categoryIndex: '05',
        description: 'Fevicol synthetic resin adhesives, Dr. Fixit structural waterproofing systems, and Araldite epoxies.',
        website: 'https://www.pidilite.com/',
        officialColor: '#F57F17',
        accentBg: '#FFFDE7',
        tagline: 'Structural Adhesives & Waterproofing'
      },
      {
        id: 'euro',
        name: 'Euro',
        category: 'CONSTRUCTION & BUILDING MATERIALS',
        categorySlug: 'construction',
        categoryIndex: '05',
        description: 'Architectural hardware fasteners, structural anchors, and precision building accessories.',
        website: 'https://euroindia.in/',
        officialColor: '#37474F',
        accentBg: '#ECEFF1',
        tagline: 'Building Fasteners & Hardware'
      },
      {
        id: 'grundfos',
        name: 'Grundfos',
        category: 'CONSTRUCTION & BUILDING MATERIALS',
        categorySlug: 'construction',
        categoryIndex: '05',
        description: 'Silent variable-speed hydro-pneumatic pressure boosting pumps for luxury residences.',
        website: 'https://www.grundfos.com/in',
        officialColor: '#002B49',
        accentBg: '#E6ECF0',
        tagline: 'Hydro-Pneumatic Water Booster Systems'
      },
      {
        id: 'lubi',
        name: 'Lubi',
        category: 'CONSTRUCTION & BUILDING MATERIALS',
        categorySlug: 'construction',
        categoryIndex: '05',
        description: 'Domestic and commercial water circulation pumps, submersible motors, and plumbing pressure units.',
        website: 'https://www.lubipumps.com',
        officialColor: '#C62828',
        accentBg: '#FFEBEE',
        tagline: 'Pumping & Water Circulation Units'
      },
      {
        id: 'ddecor',
        name: 'D\'Decor',
        category: 'CONSTRUCTION & BUILDING MATERIALS',
        categorySlug: 'construction',
        categoryIndex: '05',
        description: 'Fire-retardant sheer curtains, stain-resistant blackout upholstery, and custom jacquard textiles.',
        website: 'https://www.ddecor.com',
        officialColor: '#6A1B9A',
        accentBg: '#F3E5F5',
        tagline: 'Performance Drapery & Upholstery Fabrics'
      },
      {
        id: 'myk-laticrete',
        name: 'MYK LATICRETE',
        category: 'CONSTRUCTION & BUILDING MATERIALS',
        categorySlug: 'construction',
        categoryIndex: '05',
        description: 'Polymer fortified tile adhesives, stain-proof epoxy grouts, and uncoupling stone membranes.',
        website: 'https://www.myklaticrete.com',
        officialColor: '#00695C',
        accentBg: '#E0F2F1',
        tagline: 'Polymer Tile Adhesives & Epoxy Grouts'
      },
      {
        id: 'roff',
        name: 'Roff',
        category: 'CONSTRUCTION & BUILDING MATERIALS',
        categorySlug: 'construction',
        categoryIndex: '05',
        description: 'High-bond tile joint fillers, marble sealing compounds, and stone care maintenance solutions.',
        website: 'https://www.roff.in',
        officialColor: '#AD1457',
        accentBg: '#FCE4EC',
        tagline: 'Tile Joint Fillers & Stone Sealants'
      }
    ]
  },
  {
    id: 'cat-tiles',
    slug: 'tiles',
    index: '06',
    title: 'TILES & FLOORING',
    shortName: 'Tiles',
    subText: 'Premium flooring and surface solutions.',
    direction: 'right',
    brands: [
      {
        id: 'tile-brand',
        name: 'Tile',
        category: 'TILES & FLOORING',
        categorySlug: 'tiles',
        categoryIndex: '06',
        description: 'Large format vitrified porcelain slabs, natural marble-look tiles, and anti-skid terrace pavers.',
        officialColor: '#4E342E',
        accentBg: '#EFEBE9',
        needsConfirmation: true,
        confirmationNote: 'Official client-provided material specification. Brand logo pending client confirmation for Kajaria / Somany / Simpolo.',
        tagline: 'Vitrified Porcelain & Large Slabs'
      }
    ]
  },
  {
    id: 'cat-lighting',
    slug: 'lighting',
    index: '07',
    title: 'LIGHTING & ILLUMINATION',
    shortName: 'Lighting',
    subText: 'Architectural lighting and lighting solutions.',
    direction: 'left',
    brands: [
      {
        id: 'lights-brand',
        name: 'Lights',
        category: 'LIGHTING & ILLUMINATION',
        categorySlug: 'lighting',
        categoryIndex: '07',
        description: 'High CRI 95+ indirect cove strip LEDs, deep anti-glare architectural downlights, and magnetic track systems.',
        officialColor: '#F57C00',
        accentBg: '#FFF3E0',
        needsConfirmation: true,
        confirmationNote: 'Official client-provided lighting specification category. Brand logo pending client confirmation for Philips / Tisva / Havells.',
        tagline: 'Architectural Ambient & Spot Illumination'
      },
      {
        id: 'roto-lighting',
        name: 'Roto',
        category: 'LIGHTING & ILLUMINATION',
        categorySlug: 'lighting',
        categoryIndex: '07',
        description: 'Linear cove channels, recessed profile housings, and window reveal illumination accessories.',
        officialColor: '#0066B3',
        accentBg: '#EBF5FB',
        tagline: 'Linear Profile & Reveal Lighting'
      }
    ]
  },
  {
    id: 'cat-comfort',
    slug: 'comfort',
    index: '08',
    title: 'SLEEP & COMFORT',
    shortName: 'Comfort',
    subText: 'Premium sleep and comfort solutions.',
    direction: 'right',
    brands: [
      {
        id: 'duroflex',
        name: 'Duroflex',
        category: 'SLEEP & COMFORT',
        categorySlug: 'comfort',
        categoryIndex: '08',
        description: 'Doctor-recommended 5-zone orthopedic latex mattresses, pocket spring systems, and posture support.',
        website: 'https://www.duroflexworld.com',
        officialColor: '#D32F2F',
        accentBg: '#FFEBEE',
        tagline: 'Orthopedic 5-Zone Mattress Technology'
      },
      {
        id: 'sleepwell',
        name: 'Sleepwell',
        category: 'SLEEP & COMFORT',
        categorySlug: 'comfort',
        categoryIndex: '08',
        description: 'Resitec premium high-resilience comfort foam, anti-microbial quilting, and luxury mattress toppers.',
        website: 'https://www.mysleepwell.com',
        officialColor: '#1A237E',
        accentBg: '#E8EAF6',
        tagline: 'Ergonomic Comfort & Quilting'
      },
      {
        id: 'wakefit',
        name: 'Wakefit',
        category: 'SLEEP & COMFORT',
        categorySlug: 'comfort',
        categoryIndex: '08',
        description: 'High-density pressure-relieving memory foam mattresses, neck-support pillows, and ergonomic sleep gear.',
        website: 'https://www.wakefit.co',
        officialColor: '#2E7D32',
        accentBg: '#E8F5E9',
        tagline: 'Memory Foam Pressure Relief'
      }
    ]
  }
];

// Helper to get total brand count across all categories
export const TOTAL_BRAND_COUNT = BRAND_CATEGORIES.reduce((acc, cat) => acc + cat.brands.length, 0);
