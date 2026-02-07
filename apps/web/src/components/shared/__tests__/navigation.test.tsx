import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@/test/utils"
import { Navigation } from "../navigation"

// Override next-auth mock for specific tests
const mockUseSession = vi.fn()
vi.mock("next-auth/react", async () => {
  return {
    useSession: () => mockUseSession(),
    signIn: vi.fn(),
    signOut: vi.fn(),
    SessionProvider: ({ children }: { children: React.ReactNode }) => children,
  }
})

describe("Navigation", () => {
  beforeEach(() => {
    mockUseSession.mockReturnValue({
      data: null,
      status: "unauthenticated",
    })
  })

  it("renders logo", () => {
    render(<Navigation />)

    expect(screen.getByText("Education Hub")).toBeInTheDocument()
  })

  it("renders public links when unauthenticated", () => {
    render(<Navigation />)

    expect(screen.getByText("Home")).toBeInTheDocument()
    expect(screen.getByText("Scopri")).toBeInTheDocument()
  })

  it("shows login/signup buttons when unauthenticated", () => {
    render(<Navigation />)

    expect(screen.getByText("Accedi")).toBeInTheDocument()
    expect(screen.getByText("Registrati")).toBeInTheDocument()
  })

  it("shows protected links when authenticated", () => {
    mockUseSession.mockReturnValue({
      data: { user: { name: "Test User", email: "test@test.com" } },
      status: "authenticated",
    })

    render(<Navigation />)

    expect(screen.getByText("Dashboard")).toBeInTheDocument()
    expect(screen.getByText("Lezioni")).toBeInTheDocument()
  })
})
