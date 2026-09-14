# Component Architecture Diagram

## App Component Hierarchy

```
App
├── Navbar (Layout)
│   ├── Logo
│   ├── Navigation Links
│   └── Mobile Menu Toggle
│
└── Main
    ├── Hero (Section)
    │   ├── Text Content
    │   ├── CTA Buttons
    │   └── Hero Image with Stats Badges
    │
    ├── Stats (Section)
    │   └── Stat Cards (4x)
    │
    ├── About (Section)
    │   ├── Image Block
    │   ├── Mission/Vision Cards
    │   └── Core Values Grid
    │       └── Value Cards (5x)
    │
    ├── Companies (Section)
    │   ├── Category Filters
    │   ├── Company Grid
    │   │   └── CompanyCard (UI) × N
    │   │       ├── Company Image
    │   │       ├── Category Badge
    │   │       ├── Company Info
    │   │       └── Social Links
    │   └── CompanyModal (UI) [Conditional]
    │       ├── Modal Header with Image
    │       ├── Company Details
    │       ├── Services Tags
    │       └── Action Buttons
    │
    ├── Careers (Section)
    │   ├── Text Content
    │   ├── CTA Buttons
    │   └── Perks Grid (4x)
    │
    ├── News (Section)
    │   └── News Cards Grid
    │       └── News Card × 3
    │           ├── Featured Image
    │           ├── Category Badge
    │           └── Article Content
    │
    ├── Contact (Section)
    │   ├── Info Panel
    │   │   ├── Contact Cards (4x)
    │   │   └── Social Media Links
    │   └── Contact Form
    │       ├── Form Inputs
    │       └── Submit Button
    │
    └── Footer (Layout)
        ├── Brand Section
        ├── Link Columns (3x)
        └── Copyright Bar
```

## Component Dependencies

### Icon Components (UI)
Used across multiple components:
- `FacebookIcon` → Navbar, Footer, CompanyCard, CompanyModal, Contact
- `InstagramIcon` → Navbar, Footer, CompanyCard, CompanyModal, Contact
- `YoutubeIcon` → Navbar, Footer, CompanyCard, CompanyModal, Contact
- `LinkedinIcon` → Footer, Contact
- `ArrowRightIcon` → Hero, Companies, Careers, News
- `MapPinIcon`, `MailIcon`, `PhoneIcon`, `ClockIcon` → Contact
- `MenuIcon`, `CloseIcon` → Navbar
- `ExternalLinkIcon` → CompanyModal

### Data Flow

```
data.ts
├── companies[] → Companies Section → CompanyCard → CompanyModal
├── categories[] → Companies Section (filters)
└── newsItems[] → News Section

types/company.ts
├── Company interface → data.ts, CompanyCard, CompanyModal
├── Category interface → data.ts, Companies Section
└── NewsItem interface → data.ts, News Section

constants/colors.ts
└── Color constants → All components (consistent theming)
```

## State Management

### Local State
Each component manages its own state:

**Navbar**:
- `open: boolean` - Mobile menu state
- `scrolled: boolean` - Scroll position tracking

**Companies**:
- `activeCategory: string` - Selected filter
- `selectedCompany: Company | null` - Modal state

**CompanyCard**:
- `hovered: boolean` - Hover effect state

**Contact**:
- `form: FormData` - Form field values
- `submitted: boolean` - Submission state

### No Global State
The application intentionally avoids global state management (Redux, Context, etc.) because:
- Data is static and imported directly
- UI state is component-scoped
- No complex cross-component communication needed
- Simpler architecture for a marketing/showcase site

## Styling Architecture

### Color System
```
constants/colors.ts
├── Brand Colors (Gold, Green)
├── Neutrals (Dark, Charcoal, Slate, etc.)
└── Gradients (Gold Grad, Dark Grad)
```

### Font System
```
index.css
├── @font-face declarations
├── CSS variables (--font-display, --font-body)
└── Tailwind v4 import
```

### Styling Approach
1. **Tailwind Utility Classes**: Layout, spacing, typography sizes
2. **Inline Styles**: Dynamic colors, gradients, hover states
3. **CSS Variables**: Fonts accessible via `var(--font-display)`

## Responsive Breakpoints

Using Tailwind's default breakpoints:
- `sm:` - 640px (small tablets)
- `lg:` - 1024px (desktops)
- `xl:` - 1280px (large desktops)

Mobile-first approach: base styles are mobile, then enhanced for larger screens.

## Accessibility Features

- Semantic HTML (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`)
- ARIA labels on icon-only buttons
- Keyboard navigation support (ESC to close modal)
- Focus states on interactive elements
- Alt text on all images
- Proper heading hierarchy (h1 → h2 → h3)

## Performance Optimizations

1. **Code Splitting**: Components split into logical groups
2. **Lazy Loading**: Images use `loading="lazy"` (except hero)
3. **Tree Shaking**: Named exports enable unused code elimination
4. **Asset Optimization**: Images compressed, fonts subset
5. **Build Output**: Vite bundles and minifies for production
