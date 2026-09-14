# Project Structure

This document describes the organized component-based architecture of the Klassic Group Companies website.

## Directory Structure

```
src/
├── assets/
│   └── images/              # Static images (logos, icons)
│       └── image.png        # Main logo
│
├── components/
│   ├── layout/              # Layout components
│   │   ├── Navbar.tsx       # Navigation header with responsive menu
│   │   ├── Footer.tsx       # Site footer with links and social media
│   │   └── index.ts         # Barrel export
│   │
│   ├── sections/            # Page section components
│   │   ├── Hero.tsx         # Landing hero section
│   │   ├── Stats.tsx        # Statistics showcase
│   │   ├── About.tsx        # About us and core values
│   │   ├── Companies.tsx    # Companies grid with filtering
│   │   ├── Careers.tsx      # Careers and opportunities
│   │   ├── News.tsx         # News and updates
│   │   ├── Contact.tsx      # Contact form and information
│   │   └── index.ts         # Barrel export
│   │
│   └── ui/                  # Reusable UI components
│       ├── Icons.tsx        # SVG icon components
│       ├── CompanyCard.tsx  # Company preview card
│       ├── CompanyModal.tsx # Company detail modal
│       └── index.ts         # Barrel export
│
├── constants/
│   ├── colors.ts            # Brand color palette and gradients
│   └── index.ts             # Barrel export
│
├── types/
│   ├── company.ts           # TypeScript interfaces (Company, Category, NewsItem)
│   └── index.ts             # Barrel export
│
├── data.ts                  # Static data (companies, categories, news)
├── App.tsx                  # Main app component (composition)
├── main.tsx                 # React entrypoint
├── index.css                # Global styles and Tailwind import
└── vite-env.d.ts            # Vite type definitions
```

## Component Organization

### Layout Components (`components/layout/`)
Core layout components that wrap the application:
- **Navbar**: Fixed header with navigation links and mobile menu
- **Footer**: Site footer with branding, links, and social media

### Section Components (`components/sections/`)
Full-width sections that make up the main page:
- **Hero**: Landing section with hero image and CTA
- **Stats**: Statistics showcase
- **About**: Mission, vision, and core values
- **Companies**: Filterable company portfolio
- **Careers**: Career opportunities showcase
- **News**: Latest news and updates
- **Contact**: Contact form and information

### UI Components (`components/ui/`)
Reusable, presentational components:
- **Icons**: SVG icon components (Facebook, Instagram, etc.)
- **CompanyCard**: Company preview card with hover effects
- **CompanyModal**: Modal for detailed company information

## Design System

### Colors (`constants/colors.ts`)
The color palette is extracted from the KLASSIC brand:
- **Gold**: Primary brand color (`#C9901A` and variants)
- **Green**: Secondary color from logo laurels (`#2D6A4F`)
- **Neutrals**: Dark, charcoal, slate, borders, surfaces
- **Gradients**: Pre-defined gold and dark gradients

### Typography
- **Display Font**: 'Poppins' (headings, buttons)
- **Body Font**: 'Inter' (body text, forms)

## Path Aliases

The project uses `@` as an alias for the `src/` directory:

```typescript
import { Navbar } from "@/components/layout";
import { GOLD, DARK } from "@/constants/colors";
import type { Company } from "@/types";
```

This is configured in `vite.config.ts` and `tsconfig.json`.

## Data Flow

1. **Static Data** (`data.ts`):
   - Contains companies, categories, and news items
   - Uses TypeScript interfaces for type safety

2. **Type Definitions** (`types/`):
   - `Company`: Company information structure
   - `Category`: Category filter structure  
   - `NewsItem`: News article structure

3. **Components**:
   - Consume data via props or imports
   - Use color constants for consistent styling
   - Export as named exports for tree-shaking

## Adding New Components

### Example: Adding a new section

1. Create the component file:
```typescript
// src/components/sections/NewSection.tsx
import { GOLD, DARK } from "@/constants/colors";

export function NewSection() {
  return (
    <section id="new-section" className="py-24">
      {/* Content */}
    </section>
  );
}
```

2. Export from index:
```typescript
// src/components/sections/index.ts
export * from './NewSection';
```

3. Add to App.tsx:
```typescript
import { NewSection } from "@/components/sections";

export default function App() {
  return (
    <main>
      {/* ... */}
      <NewSection />
    </main>
  );
}
```

## Best Practices

1. **Component Naming**: Use PascalCase for components
2. **File Organization**: One component per file
3. **Imports**: Use barrel exports (`index.ts`) for cleaner imports
4. **Types**: Define and use TypeScript interfaces
5. **Colors**: Use constants instead of hardcoded values
6. **Accessibility**: Include ARIA labels and semantic HTML
7. **Images**: Store in `assets/images/`, use descriptive alt text
8. **Responsive**: Mobile-first approach with Tailwind breakpoints

## Styling Approach

- **Tailwind CSS v4** for utility classes
- **Inline styles** for dynamic values (colors, gradients)
- **CSS variables** for fonts defined in `index.css`
- **Hover effects** using inline style manipulation for precise control

## Performance Considerations

- Images use `loading="lazy"` except hero images
- Components are split for better code organization
- Tree-shaking enabled through named exports
- Minimal external dependencies
