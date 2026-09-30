# Klassic Group of Companies — Presentation Diagrams

Project: **Klassic Group of Companies — Corporate Website**
System type: Frontend-only, client-side React SPA (static data + EmailJS). No custom backend or database in the current build.

All diagrams below are written in **Mermaid**. Import them straight into **draw.io** (diagrams.net), then export to PNG/SVG and drop into Canva.

---

## How to import into draw.io

1. Open [app.diagrams.net](https://app.diagrams.net) (or the desktop app).
2. Menu: **Arrange → Insert → Advanced → Mermaid…**
   (or click the **+** toolbar button → **Advanced → Mermaid…**).
3. Paste one Mermaid block below → **Insert**.
4. The diagram is inserted as editable shapes — rearrange as needed.
5. Export: **File → Export as → PNG / SVG** → place into Canva.

> Note: draw.io renders Mermaid nodes as standard boxes. Cylinders (`[( ... )]`), subgraphs, and dashed "Planned" boxes may need a quick restyle after import — the shapes are all editable.

---

## 1. System Flow / Process Flow (Flowchart)

End-to-end user journey: from landing on the site to the inquiry reaching the correct subsidiary.

```mermaid
flowchart TD
    A([Visitor opens website]) --> B[View Hero & animated Stats]
    B --> C[Browse Companies portfolio<br/>10 subsidiaries · 8 category filters]
    C --> D{Filter by category?}
    D -->|Yes| E[Select a category]
    D -->|No| F[View all 10 companies]
    E --> G[Open company detail modal<br/>description · services · social links]
    F --> G
    G --> H{Contact this company?}
    H -->|No| C
    H -->|Yes| I[Go to Contact section]
    I --> J[Select target company<br/>from company selector]
    J --> K[Fill form<br/>name · email · subject · message]
    K --> L{Form valid?}
    L -->|No| M[Show validation error]
    M --> K
    L -->|Yes| N[EmailJS sends the email]
    N --> O[Success confirmation shown]
    O --> P([Subsidiary company receives inquiry<br/>with reply-to set to sender])

    B -.-> Q[News & Updates]
    B -.-> R[Careers / Internships]
    Q -.-> I
    R -.-> I
```

---

## 2. System Architecture

Frontend-only client-side SPA. The dashed box marks **Planned** components (not yet built).

```mermaid
flowchart TB
    subgraph HOST["Hosting - Vercel CDN"]
        BUILD["Vite production build<br/>static HTML / CSS / JS + SPA rewrites"]
    end

    subgraph CLIENT["Client Browser - React 19 SPA"]
        UI["Presentation Layer<br/>Navbar · Hero · Stats · About ·<br/>Companies · Careers · News · Contact · Footer"]
        UIK["Reusable UI<br/>Cards · Modals · Icons · Buttons"]
        DS["Design System<br/>Tailwind CSS v4 + brand color constants"]
        ST["Client State (React)<br/>company selection · form data · modals"]
        DATA["Static Data Layer<br/>src/data.ts - companies / categories / news"]
        UI --> UIK
        UI --> DS
        UI --> ST
        UI --> DATA
    end

    EXT["EmailJS API<br/>external email service"]
    CO["Subsidiary Company inbox"]

    BUILD -->|"loads app"| UI
    ST -->|"contact form submit"| EXT
    EXT -->|"routed email + reply-to"| CO

    P["PLANNED (not built):<br/>Backend API · Admin CMS · Database"]:::planned
    DATA -.->|"future"| P

    classDef planned stroke-dasharray: 5 5,fill:#f9fafb,stroke:#9ca3af,color:#6b7280;
```

**ASCII fallback:**

```
                 ┌──────────────────────────────────────────┐
                 │        Hosting — Vercel CDN               │
                 │  Vite build (HTML / CSS / JS + rewrites)  │
                 └───────────────────┬──────────────────────┘
                                     │ serves
                                     ▼
   ┌─────────────────────── Client Browser — React 19 SPA ───────────────────────┐
   │  Presentation Layer (Navbar, Hero, Stats, About, Companies, Careers,         │
   │                      News, Contact, Footer)                                  │
   │        │                                                                      │
   │        ├── Reusable UI (Cards, Modals, Icons, Buttons)                        │
   │        ├── Design System (Tailwind CSS v4 + brand color constants)           │
   │        ├── Client State (React: selection, form, modals)                     │
   │        └── Static Data Layer (src/data.ts: companies/categories/news)        │
   └───────────────────────────────┬─────────────────────────────────────────────┘
                                   │ contact form submit
                                   ▼
                       ┌──────────────────────┐      routed email + reply-to
                       │   EmailJS API        │ ─────────────────────────────►  Subsidiary
                       │ (external service)   │                                  Company inbox
                       └──────────────────────┘
```

---

## 3. DFD — Level 0 (Context Diagram)

```mermaid
flowchart LR
    V([Visitor / User])
    E([EmailJS Service])
    C([Subsidiary Company])

    P(("0<br/>KGC Corporate<br/>Website System"))

    V -->|"navigation · category filter ·<br/>company selection · contact form data"| P
    P -->|"company info · services · news ·<br/>form success / error feedback"| V
    P -->|"email request<br/>(recipient · subject · body · reply-to)"| E
    E -->|"delivery status"| P
    E -->|"routed inquiry email"| C
```

---

## 4. DFD — Level 1

```mermaid
flowchart TB
    V([Visitor])
    E([EmailJS Service])
    C([Subsidiary Company])

    P1(("1.0<br/>Browse<br/>Portfolio"))
    P2(("2.0<br/>View Company<br/>Details"))
    P3(("3.0<br/>Submit Contact<br/>Inquiry"))
    P4(("4.0<br/>Route & Send<br/>Inquiry"))

    D1[("D1 · Static Content Store<br/>companies · categories · news")]
    D2[("D2 · Client Form State<br/>selection · form fields")]

    V -->|"browse / scroll"| P1
    D1 -->|"company & category data"| P1
    P1 -->|"company list"| V

    V -->|"select company / open modal"| P2
    D1 -->|"company details"| P2
    P2 -->|"description · services · links"| V

    V -->|"name · email · subject · message · company"| P3
    P3 -->|"validated form data"| D2

    D2 -->|"form payload"| P4
    P4 -->|"email request"| E
    E -->|"routed inquiry"| C
    E -->|"delivery status"| P4
    P4 -->|"success / error feedback"| V
```

---

## 5. ERD — Entity Relationship Diagram

The system has **no database**. These entities are the TypeScript data models backed by static data (`src/data.ts`). The ERD documents the logical data model of the current build.

```mermaid
erDiagram
    CATEGORY ||--o{ COMPANY : "groups"

    CATEGORY {
        string slug PK
        string label
    }

    COMPANY {
        string id PK
        string name
        string category
        string categorySlug FK
        string tagline
        string description
        string services
        string image
        string contactImage
        string website
        string facebook
        string instagram
        string youtube
        string brandColor
    }

    NEWS_ITEM {
        int id PK
        string category
        string date
        string title
        string excerpt
        string image
    }
```

**Relational schema (text form):**

```
CATEGORY  ( slug PK, label )

COMPANY   ( id PK, name, category, categorySlug FK → CATEGORY.slug,
            tagline, description, services[], image, contactImage,
            website, facebook, instagram, youtube, brandColor )

NEWS_ITEM ( id PK, category, date, title, excerpt, image )
```

**Relationships & notes:**

| Relationship | Type | Via | Notes |
|---|---|---|---|
| CATEGORY → COMPANY | One-to-Many (1:N) | `CATEGORY.slug` = `COMPANY.categorySlug` | One category groups many companies. |
| COMPANY → services | Multi-valued attribute | `services[]` | Stored as an array (e.g. Software Development, IT Consulting). |
| NEWS_ITEM | Standalone entity | — | `category` is free text (e.g. "Company News", "Community", "Career Opportunities") — **not** linked to the CATEGORY entity. |
| Optional attributes | — | — | `contactImage`, `facebook`, `instagram`, `youtube`, `brandColor` may be null/empty. |

**Cardinality summary:**

```
CATEGORY (1) ────< COMPANY (N)        "a category groups many companies"
NEWS_ITEM  ·  standalone (no FK)
```

---

## Brand color reference (for styling the diagrams)

| Token | Hex |
|---|---|
| Gold (primary) | `#C9901A` |
| Gold dark | `#A67C15` |
| Gold light | `#E0B030` |
| Gold tint | `#FDF3DC` |
| Green (secondary) | `#2D6A4F` |
| Green light | `#3D8A65` |
| Dark | `#1C1C1E` |
| Charcoal | `#374151` |
| Slate | `#6B7280` |
| Muted | `#9CA3AF` |
| Border | `#E5E7EB` |
| Surface | `#F9FAFB` |

Suggested diagram styling: nodes = white fill + `#E5E7EB` border + `#1C1C1E` text; accents/arrows = `#C9901A`; "Planned" elements = dashed border + `#9CA3AF`.
