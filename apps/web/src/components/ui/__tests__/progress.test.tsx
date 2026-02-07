import { describe, it, expect } from "vitest"
import { render, screen } from "@/test/utils"
import { Progress } from "../progress"

describe("Progress", () => {
  it("renders with data-slot attribute", () => {
    render(<Progress value={50} data-testid="progress" />)
    expect(screen.getByTestId("progress")).toHaveAttribute("data-slot", "progress")
  })

  it("renders progress indicator", () => {
    render(<Progress value={50} data-testid="progress" />)
    const indicator = screen.getByTestId("progress").querySelector('[data-slot="progress-indicator"]')
    expect(indicator).toBeInTheDocument()
  })

  it("applies transform based on value", () => {
    render(<Progress value={75} data-testid="progress" />)
    const indicator = screen.getByTestId("progress").querySelector('[data-slot="progress-indicator"]')
    expect(indicator).toHaveStyle({ transform: "translateX(-25%)" })
  })

  it("handles zero value", () => {
    render(<Progress value={0} data-testid="progress" />)
    const indicator = screen.getByTestId("progress").querySelector('[data-slot="progress-indicator"]')
    expect(indicator).toHaveStyle({ transform: "translateX(-100%)" })
  })

  it("forwards custom className", () => {
    render(<Progress value={50} className="h-4" data-testid="progress" />)
    expect(screen.getByTestId("progress")).toHaveClass("h-4")
  })
})
