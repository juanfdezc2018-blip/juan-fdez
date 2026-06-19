// ─── Status ──────────────────────────────────────────────────────────────────
export type Status =
  | 'published'
  | 'in_progress'
  | 'coming_soon'
  | 'planned'
  | 'draft'

// ─── Categories ──────────────────────────────────────────────────────────────
export type ProjectCategory =
  | 'equity_research'
  | 'risk'
  | 'dashboard'
  | 'data_engineering'
  | 'fintech'
  | 'macro'

export type ResearchCategory =
  | 'valuation'
  | 'risk'
  | 'macro'
  | 'fintech'
  | 'methodology'
  | 'data'

export type LabCategory =
  | 'dashboard'
  | 'tool'
  | 'model'
  | 'experiment'

// ─── Project ─────────────────────────────────────────────────────────────────
export interface Project {
  title: string
  slug: string
  description: string
  thesis?: string
  category: ProjectCategory
  status: Status
  progress?: number          // 0-100
  tags: string[]
  output?: string            // e.g. "Dashboard · GitHub repo"
  learningFocus?: string
  githubUrl?: string
  liveUrl?: string
  featured: boolean
  createdAt: string          // ISO date string
  updatedAt?: string
}

// ─── Research Note ───────────────────────────────────────────────────────────
export interface ResearchNote {
  title: string
  slug: string
  description: string
  mainQuestion?: string
  category: ResearchCategory
  status: Status
  readingTime?: string       // e.g. "~6 min"
  tags: string[]
  publishedAt?: string       // ISO date string
  updatedAt?: string
  url?: string
}

// ─── Lab Tool ────────────────────────────────────────────────────────────────
export interface LabTool {
  title: string
  slug: string
  description: string
  category: LabCategory
  status: Status
  liveUrl?: string
  githubUrl?: string
  tags: string[]
  featured: boolean
}

// ─── Tech Item ───────────────────────────────────────────────────────────────
export type TechCategory = 'language' | 'data' | 'cloud' | 'viz' | 'web' | 'tools'

export interface TechItem {
  name: string
  category: TechCategory
}

// ─── Roadmap ─────────────────────────────────────────────────────────────────
export type RoadmapStatus = 'completed' | 'active' | 'upcoming'

export interface RoadmapPhase {
  phase: number
  title: string
  description: string
  items: string[]
  status: RoadmapStatus
}
