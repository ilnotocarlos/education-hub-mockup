import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@/test/utils"
import { PlatformNav } from "../platform-nav"

// Mock UserMenu to isolate PlatformNav tests
vi.mock("../user-menu", () => ({
  UserMenu: ({ isMobile }: { isMobile?: boolean }) => (
    <div data-testid={isMobile ? "user-menu-mobile" : "user-menu"}>
      UserMenu
    </div>
  ),
}))

describe("PlatformNav", () => {
  it("renders logo link", () => {
    render(<PlatformNav />)

    expect(screen.getByText("Education Hub")).toBeInTheDocument()
  })

  it("renders all navigation items", () => {
    render(<PlatformNav />)

    expect(screen.getByText("Dashboard")).toBeInTheDocument()
    expect(screen.getByText("I miei corsi")).toBeInTheDocument()
    expect(screen.getByText("Community")).toBeInTheDocument()
    expect(screen.getByText("Placement")).toBeInTheDocument()
  })

  it("renders mobile menu toggle button", () => {
    render(<PlatformNav />)

    expect(screen.getByLabelText("Toggle menu")).toBeInTheDocument()
  })

  it("opens mobile menu on toggle click", async () => {
    const { user } = render(<PlatformNav />)

    await user.click(screen.getByLabelText("Toggle menu"))

    // Mobile menu should show nav items again (duplicated in mobile overlay)
    const dashboardLinks = screen.getAllByText("Dashboard")
    expect(dashboardLinks.length).toBeGreaterThan(1)
  })

  it("renders UserMenu component", () => {
    render(<PlatformNav />)

    expect(screen.getByTestId("user-menu")).toBeInTheDocument()
  })
})
