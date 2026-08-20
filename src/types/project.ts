export type ProjectStatus =
  | "available"
  | "selling-fast"
  | "sold-out"
  | "coming-soon";

export type ProjectType =
  | "residential"
  | "commercial"
  | "mixed-use"
  | "agricultural";

export type FacilityCategory =
  | "road"
  | "hospital"
  | "school"
  | "airport"
  | "commercial"
  | "transport"
  | "landmark";

export interface LocationPoint {
  id: string;
  label: string;
  category: FacilityCategory;
  distance: string;
  /** Position on the abstract map, percentage from 0-100. */
  x: number;
  y: number;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  /** Grid span hint for the asymmetric gallery layout. */
  size?: "sm" | "md" | "lg";
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface InvestmentStep {
  step: number;
  title: string;
  description: string;
}

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  location: string;
  region: string;
  description: string;
  story: string[];
  pricePerShare: number;
  totalShares: number;
  soldShares: number;
  minSharesPerInvestor: number;
  maxSharesPerInvestor: number;
  landAreaTotal: string;
  landAreaPerShare: string;
  projectType: ProjectType;
  status: ProjectStatus;
  /** Position on the abstract project map, percentage from 0-100 — illustrative, not to geographic scale. Used as a fallback when no Google Maps API key is configured. */
  mapPosition: { x: number; y: number };
  /** Approximate real-world coordinates for the Google Maps view. */
  coordinates: { lat: number; lng: number };
  heroImage: string;
  cardImage: string;
  gallery: GalleryImage[];
  facilities: LocationPoint[];
  highlights: string[];
  launchDate: string;
  expectedCompletion: string;
  featured: boolean;
  faqs: FaqItem[];
}
