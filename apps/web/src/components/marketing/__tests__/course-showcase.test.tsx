import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@/test/utils"
import { CourseShowcase } from "../course-showcase"

// Mock the courses data
vi.mock("@/lib/data/courses-mock", () => ({
  MOCK_COURSES: [
    {
      id: "test-course-1",
      slug: "test-course-1",
      title: "Test Course Uno",
      description: "Descrizione del primo corso",
      category: "Design",
      level: "Beginner",
      duration: "12 settimane",
      price: 4900,
      students: 248,
      rating: 4.9,
    },
    {
      id: "test-course-2",
      slug: "test-course-2",
      title: "Test Course Due",
      description: "Descrizione del secondo corso",
      category: "Tech",
      level: "Intermediate",
      duration: "16 settimane",
      price: 5900,
      students: 312,
      rating: 4.8,
    },
    {
      id: "test-course-3",
      slug: "test-course-3",
      title: "Test Course Tre",
      description: "Descrizione del terzo corso",
      category: "Business",
      level: "Advanced",
      duration: "10 settimane",
      price: 4500,
      students: 156,
      rating: 4.9,
    },
  ],
}))

describe("CourseShowcase", () => {
  it("renders section heading", () => {
    render(<CourseShowcase />)

    expect(screen.getByText("Trasforma la Tua Carriera")).toBeInTheDocument()
    expect(screen.getByText("I Nostri Corsi")).toBeInTheDocument()
  })

  it("renders course cards with titles", () => {
    render(<CourseShowcase />)

    expect(screen.getByText("Test Course Uno")).toBeInTheDocument()
    expect(screen.getByText("Test Course Due")).toBeInTheDocument()
    expect(screen.getByText("Test Course Tre")).toBeInTheDocument()
  })

  it("renders course category and level badges", () => {
    render(<CourseShowcase />)

    // "Design" appears both as overlay text and as badge — use getAllByText
    const designElements = screen.getAllByText("Design")
    expect(designElements.length).toBeGreaterThanOrEqual(2)
    expect(screen.getByText("Beginner")).toBeInTheDocument()
  })

  it("renders view all courses button", () => {
    render(<CourseShowcase />)

    expect(screen.getByText("Vedi Tutti i Corsi")).toBeInTheDocument()
  })

  it("renders course prices", () => {
    render(<CourseShowcase />)

    // toLocaleString() format depends on environment locale
    // In jsdom it may render as "4,900" or "4900" — check for the € prefix
    expect(screen.getByText(/€.*4.*900/)).toBeInTheDocument()
    expect(screen.getByText(/€.*5.*900/)).toBeInTheDocument()
  })
})
