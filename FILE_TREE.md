# Complete File Tree

## Project Root
```
c:\Users\Angel\Desktop\KGC\
│
├── .figma/                      # Figma Make configuration
├── .gitattributes
├── .gitignore
├── .mise.toml                   # Toolchain versions
│
├── AGENTS.md                    # Development guidelines
├── CLAUDE.md                    # AI assistant notes
├── COMPONENT_DIAGRAM.md         # 📄 Component architecture visual
├── FILE_TREE.md                 # 📄 This file
├── PROJECT_STRUCTURE.md         # 📄 Architecture documentation  
├── REFACTORING_SUMMARY.md       # 📄 Refactoring details
│
├── dist/                        # Build output
├── node_modules/                # Dependencies
│
├── index.html                   # Vite HTML shell
├── package.json                 # Dependencies & scripts
├── package-lock.json
├── pnpm-lock.yaml
├── tsconfig.json                # TypeScript config
├── vite.config.ts               # Vite config with @ alias
│
└── src/                         # 👇 Source code (organized)
    │
    ├── App.tsx                  # ⭐ Main app (15 lines)
    ├── main.tsx                 # React entry point
    ├── index.css                # Global styles + Tailwind
    ├── data.ts                  # Static data
    ├── vite-env.d.ts            # Vite types
    │
    ├── assets/
    │   └── images/              # 🖼️ Image assets
    │       ├── image.png        # Main logo
    │       ├── image-1.png
    │       ├── image-2.png
    │       ├── image-3.png
    │       └── image-4.png
    │
    ├── components/
    │   │
    │   ├── layout/              # 🏗️ Layout components
    │   │   ├── Navbar.tsx       # Navigation header
    │   │   ├── Footer.tsx       # Site footer
    │   │   └── index.ts         # Barrel export
    │   │
    │   ├── sections/            # 📄 Page sections
    │   │   ├── Hero.tsx         # Landing hero
    │   │   ├── Stats.tsx        # Statistics
    │   │   ├── About.tsx        # About us
    │   │   ├── Companies.tsx    # Company portfolio
    │   │   ├── Careers.tsx      # Careers section
    │   │   ├── News.tsx         # News & updates
    │   │   ├── Contact.tsx      # Contact form
    │   │   └── index.ts         # Barrel export
    │   │
    │   └── ui/                  # 🎨 UI components
    │       ├── Icons.tsx        # SVG icons (14 icons)
    │       ├── CompanyCard.tsx  # Company preview card
    │       ├── CompanyModal.tsx # Company detail modal
    │       └── index.ts         # Barrel export
    │
    ├── constants/               # 🎨 Theme constants
    │   ├── colors.ts            # Brand color palette
    │   └── index.ts             # Barrel export
    │
    └── types/                   # 📘 TypeScript definitions
        ├── company.ts           # Interfaces (Company, Category, NewsItem)
        └── index.ts             # Barrel export
```

## File Count Summary

| Category | Count | Description |
|----------|-------|-------------|
| **Components** | 18 | React components (layout, sections, ui) |
| **Types** | 3 | TypeScript interfaces |
| **Constants** | 1 | Color palette & theme |
| **Data** | 1 | Static data (companies, news) |
| **Assets** | 5 | Logo and images |
| **Config** | 5 | Vite, TypeScript, package configs |
| **Documentation** | 4 | Architecture & refactoring docs |
| **Total Source** | 30 | Files in src/ directory |

## Component Breakdown

### Layout (2 components)
```
Navbar.tsx    - Fixed navigation header with mobile menu
Footer.tsx    - Site footer with links and social media
```

### Sections (7 components)
```
Hero.tsx      - Landing hero section with CTA
Stats.tsx     - Statistics showcase (4 stats)
About.tsx     - Mission, vision, core values
Companies.tsx - Filterable company portfolio
Careers.tsx   - Career opportunities showcase
News.tsx      - Latest news and updates
Contact.tsx   - Contact form with information
```

### UI Components (3 components)
```
Icons.tsx        - 14 SVG icon components
CompanyCard.tsx  - Company preview card
CompanyModal.tsx - Company detail modal dialog
```

## Lines of Code by Component

| File | Lines | Purpose |
|------|-------|---------|
| `Icons.tsx` | 145 | SVG icon library |
| `CompanyModal.tsx` | 94 | Company detail modal |
| `CompanyCard.tsx` | 88 | Company preview card |
| `Navbar.tsx` | 87 | Navigation header |
| `Footer.tsx` | 81 | Site footer |
| `Contact.tsx` | 156 | Contact form section |
| `About.tsx` | 89 | About section |
| `Hero.tsx` | 100 | Hero section |
| `Companies.tsx` | 67 | Companies section |
| `News.tsx` | 56 | News section |
| `Careers.tsx` | 61 | Careers section |
| `Stats.tsx` | 36 | Stats section |
| `App.tsx` | **15** | Main composition |
| `colors.ts` | 22 | Color constants |
| `types/company.ts` | 28 | TypeScript interfaces |
| `data.ts` | 146 | Static data |

**Total: ~1,271 lines** (organized across 30 files)

## Import Graph

```
App.tsx
├── @/components/layout
│   ├── Navbar
│   │   ├── @/components/ui/Icons (MenuIcon, CloseIcon)
│   │   ├── @/constants/colors
│   │   └── @/assets/images/image.png
│   └── Footer
│       ├── @/components/ui/Icons (social icons)
│       ├── @/constants/colors
│       └── @/assets/images/image.png
│
└── @/components/sections
    ├── Hero
    │   ├── @/components/ui/Icons (ArrowRightIcon)
    │   └── @/constants/colors
    ├── Stats
    │   └── @/constants/colors
    ├── About
    │   └── @/constants/colors
    ├── Companies
    │   ├── @/components/ui (CompanyCard, CompanyModal)
    │   ├── @/data (companies, categories)
    │   ├── @/types
    │   └── @/constants/colors
    ├── Careers
    │   ├── @/components/ui/Icons (ArrowRightIcon)
    │   └── @/constants/colors
    ├── News
    │   ├── @/components/ui/Icons (ArrowRightIcon)
    │   ├── @/data (newsItems)
    │   └── @/constants/colors
    └── Contact
        ├── @/components/ui/Icons (8 icons)
        └── @/constants/colors
```

## Naming Conventions

### Components
- **PascalCase**: `CompanyCard.tsx`, `Hero.tsx`
- **Named exports**: `export function Hero() { ... }`
- **Default export**: Only in `App.tsx`

### Constants
- **SCREAMING_SNAKE_CASE**: `GOLD`, `DARK`, `GOLD_GRAD`
- **Grouped by purpose**: All colors in one file

### Types
- **PascalCase**: `Company`, `Category`, `NewsItem`
- **Type-only imports**: `import type { Company } from "@/types"`

### Files
- **index.ts**: Barrel exports for clean imports
- **One component per file**: Single responsibility

## Path Aliases

```typescript
@/              → src/
@/components    → src/components
@/constants     → src/constants
@/types         → src/types
@/data          → src/data.ts
@/assets        → src/assets
```

Configured in:
- `vite.config.ts`: `resolve.alias`
- `tsconfig.json`: `paths`
