# Klassic Group of Companies Website

A modern, responsive website showcasing the portfolio of Klassic Group of Companies — a diversified organization operating across technology, business services, marketing, construction, and professional sectors in the Philippines.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server (already running on $PORT)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Format code
npm run format
```

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/       # Navbar, Footer
│   ├── sections/     # Hero, Stats, About, Companies, Careers, News, Contact
│   └── ui/           # Icons, CompanyCard, CompanyModal
├── constants/        # Color palette, theme
├── types/            # TypeScript interfaces
├── assets/images/    # Static images
├── data.ts          # Static data (companies, news)
└── App.tsx          # Main app composition
```

See [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) for detailed architecture documentation.

## 🎨 Tech Stack

- **React 19** - UI library
- **TypeScript 5.7** - Type safety
- **Vite 8** - Build tool & dev server
- **Tailwind CSS v4** - Styling framework
- **oxfmt** - Code formatting

## 🏗️ Architecture

This project follows a **component-based architecture** with clear separation of concerns:

### Component Organization
- **Layout Components**: Reusable page structure (Navbar, Footer)
- **Section Components**: Full-width page sections (Hero, About, etc.)
- **UI Components**: Reusable presentational components (Icons, Cards, Modals)

### Design System
- **Colors**: Brand colors extracted to `constants/colors.ts`
- **Typography**: Poppins (display), Inter (body)
- **Responsive**: Mobile-first with Tailwind breakpoints

### Path Aliases
Uses `@/` alias for clean imports:
```typescript
import { Navbar } from "@/components/layout";
import { GOLD, DARK } from "@/constants/colors";
import type { Company } from "@/types";
```

## 📚 Documentation

- [📖 PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) - Architecture & organization
- [🎨 COMPONENT_DIAGRAM.md](./COMPONENT_DIAGRAM.md) - Component hierarchy
- [📊 REFACTORING_SUMMARY.md](./REFACTORING_SUMMARY.md) - Refactoring details
- [🌳 FILE_TREE.md](./FILE_TREE.md) - Complete file listing

## 🎯 Features

- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Company portfolio with category filtering
- ✅ Interactive company detail modals
- ✅ Contact form with validation
- ✅ News & updates section
- ✅ Career opportunities showcase
- ✅ Smooth animations & hover effects
- ✅ Accessible (semantic HTML, ARIA labels)
- ✅ SEO-friendly structure
- ✅ Fast loading (Vite + lazy images)

## 🔧 Development

### Project Configuration

- **vite.config.ts** - Vite configuration with path aliases
- **tsconfig.json** - TypeScript configuration
- **.mise.toml** - Node.js & pnpm versions

### Code Style

- Double quotes for strings with apostrophes
- Named exports (except App.tsx)
- One component per file
- PascalCase for components
- SCREAMING_SNAKE_CASE for constants

### Adding New Components

1. Create component in appropriate directory:
   ```typescript
   // src/components/sections/NewSection.tsx
   export function NewSection() {
     return <section>...</section>;
   }
   ```

2. Export from index:
   ```typescript
   // src/components/sections/index.ts
   export * from './NewSection';
   ```

3. Use in App:
   ```typescript
   import { NewSection } from "@/components/sections";
   ```

## 🎨 Styling

This project uses **Tailwind CSS v4** through the Vite plugin:

```typescript
// vite.config.ts
import tailwindcss from '@tailwindcss/vite';

plugins: [tailwindcss()]
```

### Styling Approach
1. **Tailwind classes** for layout, spacing, typography
2. **Inline styles** for dynamic colors from constants
3. **CSS variables** for fonts (defined in `index.css`)

### Color Palette
```typescript
// Gold - Primary brand color
GOLD        = "#C9901A"
GOLD_DARK   = "#A67C15"
GOLD_LIGHT  = "#E0B030"
GOLD_TINT   = "#FDF3DC"

// Green - Secondary color
GREEN       = "#2D6A4F"
GREEN_LIGHT = "#3D8A65"
GREEN_TINT  = "#E8F4EE"

// Neutrals
DARK        = "#1C1C1E"
CHARCOAL    = "#374151"
SLATE       = "#6B7280"
MUTED       = "#9CA3AF"
```

## 📦 Build Output

```bash
npm run build

# Output
dist/
├── index.html                 # HTML entry
├── robots.txt                 # SEO
└── assets/
    ├── image-*.png           # Optimized images
    ├── index-*.css           # Minified CSS (~22KB, ~5KB gzipped)
    └── index-*.js            # Minified JS (~265KB, ~79KB gzipped)
```

## 🚀 Deployment

Built for **Figma Make** platform. The development server runs automatically on `$PORT` (default 8443).

### Production Build
```bash
npm run build
# Outputs to dist/ directory
```

### Preview Build
```bash
npm run preview
# Preview the production build locally
```

## 📝 Data Management

### Static Data (`src/data.ts`)
```typescript
export const companies: Company[] = [ /* 9 companies */ ];
export const categories: Category[] = [ /* 8 categories */ ];
export const newsItems: NewsItem[] = [ /* 3 news items */ ];
```

### TypeScript Types (`src/types/company.ts`)
```typescript
interface Company { /* ... */ }
interface Category { /* ... */ }
interface NewsItem { /* ... */ }
```

## 🤝 Contributing

1. Follow existing code structure
2. Use TypeScript types
3. Import colors from constants
4. One component per file
5. Add documentation comments for complex logic
6. Run `npm run format` before committing

## 📄 License

© 2026 Klassic Group of Companies. All Rights Reserved.

## 🔗 Links

- **Website Preview**: Available through Figma Make preview panel
- **Company Website**: [klassicgroup.com.ph](#)
- **Contact**: info@klassicgroup.com.ph

---

Built with ❤️ using React, TypeScript, and Tailwind CSS
