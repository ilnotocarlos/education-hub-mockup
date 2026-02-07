import { describe, it, expect } from "vitest"
import { render, screen } from "@/test/utils"
import { DashboardStats } from "../DashboardStats"
import { Clock, TrendingUp, Zap } from "lucide-react"

const mockStats = [
  {
    label: "Ore Completate",
    value: "42",
    subtitle: "su 120 totali",
    icon: Clock,
    color: "indigo",
    progress: 35,
  },
  {
    label: "Progresso Corso",
    value: "68%",
    subtitle: "In linea con il programma",
    icon: TrendingUp,
    color: "amber",
    progress: 68,
  },
  {
    label: "Skill Points",
    value: 1250,
    subtitle: "+150 questa settimana",
    icon: Zap,
    color: "sage",
    progress: 85,
  },
]

describe("DashboardStats", () => {
  it("renders all stat cards", () => {
    render(<DashboardStats stats={mockStats} />)

    expect(screen.getByText("Ore Completate")).toBeInTheDocument()
    expect(screen.getByText("Progresso Corso")).toBeInTheDocument()
    expect(screen.getByText("Skill Points")).toBeInTheDocument()
  })

  it("renders stat values", () => {
    render(<DashboardStats stats={mockStats} />)

    expect(screen.getByText("42")).toBeInTheDocument()
    expect(screen.getByText("68%")).toBeInTheDocument()
    expect(screen.getByText("1250")).toBeInTheDocument()
  })

  it("renders subtitles", () => {
    render(<DashboardStats stats={mockStats} />)

    expect(screen.getByText("su 120 totali")).toBeInTheDocument()
    expect(screen.getByText("In linea con il programma")).toBeInTheDocument()
    expect(screen.getByText("+150 questa settimana")).toBeInTheDocument()
  })
})
