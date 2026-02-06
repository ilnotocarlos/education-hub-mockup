export interface PortfolioProject {
  id: number
  title: string
  description: string
  thumbnail: string
  category: string
  status: "completed" | "in-progress"
  date: string
  tags: string[]
  metrics: ProjectMetrics
}

export interface ProjectMetrics {
  duration: string
  team: string
  impact: string
}

export interface ProgressTimelineItem {
  date: string
  title: string
  description: string
  type: "milestone" | "achievement" | "enrollment"
}
