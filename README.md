# Juan Fdez Research

**Data & Markets** — Personal portfolio and research lab built with Next.js.

> Building data-driven research on markets, risk and fintech.

---

## Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Fonts**: Inter + JetBrains Mono (Google Fonts)
- **Deployment**: Vercel

---

## Run locally

```bash
# 1. Enter the project folder
cd juan-fdez-research

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Build for production

```bash
npm run build
npm start
```

---

## Deploy to Vercel

### Option A — Vercel CLI

```bash
npm install -g vercel
vercel
```

Follow the prompts. The project will be deployed automatically.

### Option B — GitHub + Vercel Dashboard

1. Push this folder to a GitHub repository
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import your GitHub repo
4. Vercel detects Next.js automatically — click **Deploy**

No environment variables required for the base version.

---

## Project structure

```
juan-fdez-research/
├── app/
│   ├── layout.tsx          # Root layout + metadata + SEO
│   ├── page.tsx            # Landing page (all sections)
│   ├── projects/page.tsx   # Projects listing
│   ├── research/page.tsx   # Research notes listing
│   └── about/page.tsx      # About + links
│
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── DashboardMockup.tsx
│   ├── BackgroundGrid.tsx
│   ├── SectionHeader.tsx
│   ├── ProjectCard.tsx
│   ├── ResearchCard.tsx
│   ├── HighlightsSection.tsx
│   ├── ProcessSection.tsx
│   ├── TechStack.tsx
│   └── Roadmap.tsx
│
├── data/
│   ├── projects.ts         # Add/edit projects here
│   ├── research.ts         # Add/edit research notes here
│   ├── techStack.ts        # Tech stack list
│   └── roadmap.ts          # Roadmap phases
│
├── lib/
│   └── utils.ts            # cn(), formatDate(), statusConfig
│
└── styles/
    └── globals.css
```

---

## Adding a new project

Edit `data/projects.ts` and add an entry:

```ts
{
  title: 'My New Project',
  slug: 'my-new-project',
  description: 'Short description.',
  status: 'in_progress', // published | in_progress | coming_soon | planned
  tags: ['Python', 'Risk'],
  githubUrl: 'https://github.com/juanfdez/repo',
  liveUrl: undefined,
  featured: true,
  metrics: [
    { label: 'Method', value: 'DCF' },
  ],
}
```

## Adding a research note

Edit `data/research.ts` and add an entry:

```ts
{
  title: 'My Research Note',
  slug: 'my-research-note',
  description: 'What this note covers.',
  status: 'coming_soon', // published | draft | coming_soon
  tags: ['Valuation', 'Markets'],
  readingTime: '~5 min',
  readUrl: '/research/my-research-note', // when published
}
```

---

## Roadmap

See `data/roadmap.ts` to update phases and milestones.

---

## License

Personal portfolio — not for reuse without permission.
