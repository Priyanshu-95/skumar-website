export type CategoryFilter = 
  | 'All' 
  | 'Wooden Work'
  | 'Residential' 
  | 'Bungalow / Villa' 
  | 'Construction'
  | 'Interior Design'
  | 'Wooden & PVC Work'
  | 'PVC Work'
  | 'Hospitality' 
  | 'Healthcare' 
  | 'Commercial' 
  | '3D Visualization'
  | 'Turnkey';

export interface Project {
  id: string;
  title: string;
  category: string;
  filterCategory: CategoryFilter;
  typeLabel?: 'Completed Project' | '3D Visualization';
  location: string;
  year: string;
  areaSqFt: string;
  heroImage: string;
  gallery: string[];
  beforeImage?: string;
  afterImage?: string;
  scope: string[];
  designApproach: string;
  materialPalette?: { name: string; description: string; image: string }[];
  clientBrief: string;
  featured?: boolean;
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  deliverables: string[];
  image: string;
  tag: string;
}

export interface OfficeLocation {
  city: 'Ahmedabad' | 'Gandhinagar';
  title: string;
  address: string;
  landmark: string;
  phone: string;
  email: string;
  whatsapp: string;
  hours: string;
  mapIframeUrl: string;
  directionsUrl?: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  clientName: string;
  projectType: string;
  location: string;
  year: string;
}

export interface MaterialItem {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  textureDetails: string;
}
