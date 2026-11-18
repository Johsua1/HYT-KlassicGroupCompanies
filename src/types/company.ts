export interface Company {
  id: string;
  name: string;
  category: string;
  categorySlug: string;
  tagline: string;
  description: string;
  services: string[];
  image: string;
  contactImage?: string; // NEW: Different image for Contact Us page
  darkLogo?: boolean; // Light logo artwork (silver/white) that needs darkening on light surfaces
  wordmark?: boolean; // Logo is the company name itself, so the text heading would duplicate it
  website: string;
  facebook?: string;
  instagram?: string;
  youtube?: string;
  brandColor?: string;
}

export interface Category {
  label: string;
  slug: string;
}

export interface NewsItem {
  id: number;
  category: string;
  date: string;
  title: string;
  excerpt: string;
  image: string;
}
