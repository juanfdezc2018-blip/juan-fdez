# Juan Fdez Research

**Data & Markets** — Personal portfolio and research lab. Next.js, TypeScript, Tailwind CSS, Framer Motion, bilingual EN/ES.

> Building data-driven research on markets, risk and fintech.

---

## Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| i18n | Custom dictionary system |
| Fonts | Inter + JetBrains Mono |
| Deployment | Vercel |

---

## Run locally

```bash
cd juan-fdez-research
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — it redirects to `/en` automatically.

Test Spanish: [http://localhost:3000/es](http://localhost:3000/es)

---

## Deploy to Vercel

**Option A — Vercel CLI**
```bash
npm i -g vercel
vercel
```

**Option B — GitHub + Vercel dashboard**
1. Push to GitHub
2. Import at [vercel.com/new](https://vercel.com/new)
3. Vercel auto-detects Next.js → Deploy

No environment variables required.

---

## Project structure

```
juan-fdez-research/
├── app/
│   ├── layout.tsx               # Root layout (minimal)
│   ├── page.tsx                 # Redirects to /en
│   ├── [locale]/
│   │   ├── layout.tsx           # Locale layout: Navbar + Footer + dict loading
│   │   ├── page.tsx             # Home page
│   │   ├── projects/page.tsx
│   │   ├── research/page.tsx
│   │   ├── lab/page.tsx
│   │   └── about/page.tsx
│
├── components/
│   ├── BackgroundGrid.tsx
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── LanguageSwitcher.tsx
│   ├── SectionHeader.tsx
│   ├── Hero.tsx
│   ├── ResearchDashboardMock.tsx
│   ├── CurrentFocus.tsx
│   ├── ResearchFramework.tsx
│   ├── Principles.tsx
│   ├── DataSources.tsx
│   ├── TechStack.tsx
│   ├── Roadmap.tsx
│   ├── EmptyState.tsx
│   ├── ProjectCard.tsx
│   ├── ResearchCard.tsx
│   └── ToolCard.tsx
│
├── data/
│   ├── projects.ts              # ← Add your projects here
│   ├── research.ts              # ← Add your research notes here
│   ├── tools.ts                 # ← Add your lab tools here
│   └── techStack.ts
│
├── i18n/
│   ├── config.ts                # Supported locales
│   └── dictionaries/
│       ├── en.json              # English strings
│       └── es.json              # Spanish strings
│
├── lib/
│   ├── i18n.ts                  # getDictionary() function
│   └── utils.ts                 # cn(), statusStyles, formatDate()
│
├── types/
│   └── index.ts                 # Project, ResearchNote, LabTool, Status, etc.
│
├── middleware.ts                # Locale detection + redirect
├── styles/globals.css
├── tailwind.config.ts
└── next.config.js
```

---

## How to add a project

Edit `data/projects.ts` and add an entry to the `projects` array:

```typescript
{
  title: 'Amper Valuation Analysis',
  slug: 'amper-valuation',
  description: 'Scenario-based analysis of Amper\'s transformation into defense and critical communications.',
  thesis: 'The market undervalues the defense pivot.',
  category: 'equity_research',        // equity_research | risk | dashboard | data_engineering | fintech | macro
  status: 'in_progress',              // published | in_progress | coming_soon | planned | draft
  progress: 35,                       // 0-100, optional
  tags: ['Python', 'EV/EBITDA', 'Risk'],
  output: 'Research note · Python notebook',
  githubUrl: undefined,               // add when ready
  liveUrl: undefined,
  featured: true,
  createdAt: '2026-06-01',
},
```

The project will automatically appear on the `/projects` page and, if `featured: true`, on the homepage.

---

## How to add a research note

Edit `data/research.ts`:

```typescript
{
  title: 'Amper: From small cap to defense-tech story?',
  slug: 'amper-defense-tech',
  description: 'First look at the transformation thesis and early valuation signals.',
  mainQuestion: 'Is the defense pivot priced in?',
  category: 'valuation',             // valuation | risk | macro | fintech | methodology | data
  status: 'coming_soon',
  readingTime: '~8 min',
  tags: ['Equity Research', 'Defense', 'Spain'],
  publishedAt: undefined,
  url: undefined,                    // add when you publish it
},
```

---

## How to add a lab tool

Edit `data/tools.ts`:

```typescript
{
  title: 'Portfolio Risk Dashboard',
  slug: 'portfolio-risk',
  description: 'Interactive portfolio risk: VaR, CVaR, drawdown, correlation.',
  category: 'dashboard',             // dashboard | tool | model | experiment
  status: 'in_progress',
  liveUrl: undefined,
  githubUrl: undefined,
  tags: ['Python', 'Streamlit', 'Risk'],
  featured: true,
},
```

---

## How to add a new translation

### Add a string to an existing language

1. Open `i18n/dictionaries/en.json` and add your key:
   ```json
   "hero": {
     "new_key": "New text here"
   }
   ```
2. Open `i18n/dictionaries/es.json` and add the Spanish equivalent.
3. In your component, access it via the `dict` prop.

### Add a new language (e.g. French)

1. Add `'fr'` to `locales` in `i18n/config.ts`:
   ```typescript
   export const locales = ['en', 'es', 'fr'] as const
   ```
2. Create `i18n/dictionaries/fr.json` (copy `en.json` and translate).
3. Done. The middleware and LanguageSwitcher handle it automatically.

---

## URL structure

| URL | Content |
|---|---|
| `/` | Redirects to `/en` |
| `/en` | Home (English) |
| `/es` | Home (Spanish) |
| `/en/projects` | Projects (English) |
| `/es/projects` | Projects (Spanish) |
| `/en/research` | Research notes (English) |
| `/en/lab` | Lab tools (English) |
| `/en/about` | About (English) |

---

## Color palette

| Role | Hex |
|---|---|
| Background | `#070B12` |
| Surface/Card | `#0E1624` |
| Border | `#1E2A3A` |
| Primary text | `#F5F7FA` |
| Secondary text | `#9AA7B8` |
| Accent (sky) | `#38BDF8` |
| Secondary accent | `#F59E0B` |
| Success | `#22C55E` |
| Danger | `#EF4444` |

---

## License

Personal portfolio — not for reuse without permission.
