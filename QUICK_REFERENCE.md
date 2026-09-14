# Quick Reference Guide

Quick commands and file locations for common development tasks.

## 🚀 Commands

```bash
# Development
npm run dev          # Start dev server (already running on $PORT)
npm run build        # Build for production
npm run preview      # Preview production build
npm run format       # Format code with oxfmt

# Type checking
npx tsc --noEmit     # Check TypeScript types
```

## 📁 Where to Find Things

### Need to add a new company?
→ `src/data.ts` (companies array)

### Need to change colors?
→ `src/constants/colors.ts`

### Need to edit the navigation menu?
→ `src/components/layout/Navbar.tsx`

### Need to modify the hero section?
→ `src/components/sections/Hero.tsx`

### Need to add a new icon?
→ `src/components/ui/Icons.tsx`

### Need to update company card design?
→ `src/components/ui/CompanyCard.tsx`

### Need to add a new section?
→ Create `src/components/sections/NewSection.tsx`
→ Export from `src/components/sections/index.ts`
→ Import in `src/App.tsx`

## 🎨 Color Palette (Quick Copy)

```typescript
// Import
import { GOLD, GREEN, DARK } from "@/constants/colors";

// Available colors
GOLD          #C9901A
GOLD_DARK     #A67C15
GOLD_LIGHT    #E0B030
GOLD_TINT     #FDF3DC

GREEN         #2D6A4F
GREEN_LIGHT   #3D8A65
GREEN_TINT    #E8F4EE

DARK          #1C1C1E
CHARCOAL      #374151
SLATE         #6B7280
MUTED         #9CA3AF
BORDER        #E5E7EB
SURFACE       #F9FAFB

// Gradients
GOLD_GRAD     linear-gradient(135deg, #C9901A, #E0B030)
DARK_GRAD     linear-gradient(135deg, #1C1C1E, #2A2A2A)
```

## 📦 Import Paths

```typescript
// Layout
import { Navbar, Footer } from "@/components/layout";

// Sections
import { Hero, Stats, About, Companies, Careers, News, Contact } from "@/components/sections";

// UI Components
import { CompanyCard, CompanyModal } from "@/components/ui";
import { FacebookIcon, InstagramIcon, ArrowRightIcon } from "@/components/ui/Icons";

// Constants
import { GOLD, DARK, BORDER } from "@/constants/colors";

// Types
import type { Company, Category, NewsItem } from "@/types";

// Data
import { companies, categories, newsItems } from "@/data";

// Assets
import logoImg from "@/assets/images/image.png";
```

## 🧩 Component Template

### New Section Component
```typescript
// src/components/sections/NewSection.tsx
import { GOLD, DARK } from "@/constants/colors";

export function NewSection() {
  return (
    <section id="new-section" className="py-24" style={{ background: "#fff" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className="text-3xl font-bold" style={{ color: DARK }}>
          Section Title
        </h2>
        {/* Content */}
      </div>
    </section>
  );
}
```

### New UI Component
```typescript
// src/components/ui/NewComponent.tsx
import type { Company } from "@/types";
import { GOLD, BORDER } from "@/constants/colors";

interface NewComponentProps {
  data: Company;
  onAction: () => void;
}

export function NewComponent({ data, onAction }: NewComponentProps) {
  return (
    <div className="p-4 border rounded-lg" style={{ borderColor: BORDER }}>
      {/* Content */}
    </div>
  );
}
```

## 📘 TypeScript Interface Template

```typescript
// src/types/newType.ts
export interface NewType {
  id: string;
  name: string;
  description: string;
  // ... other fields
}

// Don't forget to export from index.ts
// src/types/index.ts
export * from './newType';
```

## 🎯 Common Tasks

### Add a New Company
1. Open `src/data.ts`
2. Add to `companies` array:
```typescript
{
  id: "unique-id",
  name: "Company Name",
  category: "Category Name",
  categorySlug: "category-slug",
  tagline: "Short tagline",
  description: "Full description...",
  services: ["Service 1", "Service 2"],
  image: "https://...",
  website: "#",
  facebook: "#",
  instagram: "#",
  youtube: "#",
}
```

### Add a New Category
1. Open `src/data.ts`
2. Add to `categories` array:
```typescript
{ label: "New Category", slug: "new-category" }
```

### Add a News Item
1. Open `src/data.ts`
2. Add to `newsItems` array:
```typescript
{
  id: 4,
  category: "Category",
  date: "Month DD, YYYY",
  title: "News Title",
  excerpt: "Brief description...",
  image: "https://...",
}
```

### Change Logo
1. Replace `src/assets/images/image.png`
2. Or update imports in:
   - `src/components/layout/Navbar.tsx`
   - `src/components/layout/Footer.tsx`

### Update Contact Info
1. Open `src/components/sections/Contact.tsx`
2. Find `info` array
3. Update values

### Change Brand Colors
1. Open `src/constants/colors.ts`
2. Update color hex values
3. Changes apply globally

## 🔗 Navigation

### Section IDs (for anchor links)
```html
#home      → Hero section
#about     → About section
#companies → Companies section
#careers   → Careers section
#news      → News section
#contact   → Contact section
```

### Responsive Breakpoints
```css
Mobile:   < 640px   (base styles)
sm:       ≥ 640px   (tablets)
lg:       ≥ 1024px  (desktops)
xl:       ≥ 1280px  (large desktops)
```

## 🐛 Troubleshooting

### "Module not found"
- Check path alias starts with `@/`
- Verify file exists in `src/`
- Run `npm install` if needed

### "Type error"
- Check import uses `import type` for types
- Verify interface is exported
- Run `npx tsc --noEmit` to see all errors

### Build fails
```bash
# Clean and rebuild
rm -rf dist node_modules
npm install
npm run build
```

### Styles not applying
- Check Tailwind classes are correct
- Verify color imports from constants
- Check inline styles syntax

## 📚 Documentation Files

- **README.md** - Project overview and setup
- **PROJECT_STRUCTURE.md** - Architecture details
- **COMPONENT_DIAGRAM.md** - Component hierarchy
- **REFACTORING_SUMMARY.md** - What changed and why
- **FILE_TREE.md** - Complete file listing
- **BEFORE_AFTER.md** - Visual comparison
- **QUICK_REFERENCE.md** - This file

## 💡 Best Practices

1. **One component per file**
2. **Use path aliases** (`@/...`)
3. **Import colors from constants**
4. **Use TypeScript types**
5. **Export from index.ts files**
6. **Keep components under 200 lines**
7. **Add ARIA labels for accessibility**
8. **Use semantic HTML**
9. **Mobile-first responsive design**
10. **Format code before committing**

## 🎓 Learning Resources

### React Patterns Used
- Functional components
- Hooks (useState, useEffect, useRef)
- Props and TypeScript interfaces
- Event handlers
- Conditional rendering

### File Naming
- **PascalCase**: Components (`Hero.tsx`)
- **camelCase**: Utilities (`colors.ts`)
- **lowercase**: Config files (`vite.config.ts`)

### Import/Export
- Named exports (components)
- Default export (App only)
- Barrel exports (index.ts)
- Type-only imports

---

**Pro Tip**: Use Cmd/Ctrl + P in VS Code to quickly navigate to any file by name!
