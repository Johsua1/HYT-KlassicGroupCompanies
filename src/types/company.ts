export interface Company {
  id: string;
  name: string;
  category: string;
  categorySlug: string;
  tagline: string;
  description: string;
  services: string[];
  image: string;
  website: string;
  facebook?: string;
  instagram?: string;
  youtube?: string;
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
