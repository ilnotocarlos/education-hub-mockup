import { describe, it, expect } from "vitest"
import { render, screen } from "@/test/utils"
import { Badge } from "../badge"

describe("Badge", () => {
  it("renders with text content", () => {
    render(<Badge>New</Badge>)
    expect(screen.getByText("New")).toBeInTheDocument()
  })

  it("applies default variant data attribute", () => {
    render(<Badge>Default</Badge>)
    const badge = screen.getByText("Default")
    expect(badge).toHaveAttribute("data-variant", "default")
    expect(badge).toHaveAttribute("data-slot", "badge")
  })

  it("applies custom variant", () => {
    render(<Badge variant="secondary">Secondary</Badge>)
    expect(screen.getByText("Secondary")).toHaveAttribute(
      "data-variant",
      "secondary"
    )
  })

  it("forwards custom className", () => {
    render(<Badge className="custom-class">Styled</Badge>)
    expect(screen.getByText("Styled")).toHaveClass("custom-class")
  })
})
