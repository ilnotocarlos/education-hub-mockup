import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@/test/utils"
import { Button } from "../button"

describe("Button", () => {
  it("renders with children", () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument()
  })

  it("applies default variant data attribute", () => {
    render(<Button>Default</Button>)
    const btn = screen.getByRole("button")
    expect(btn).toHaveAttribute("data-variant", "default")
    expect(btn).toHaveAttribute("data-size", "default")
  })

  it("applies variant and size data attributes", () => {
    render(
      <Button variant="outline" size="lg">
        Outline Large
      </Button>
    )
    const btn = screen.getByRole("button")
    expect(btn).toHaveAttribute("data-variant", "outline")
    expect(btn).toHaveAttribute("data-size", "lg")
  })

  it("handles click events", async () => {
    const onClick = vi.fn()
    const { user } = render(<Button onClick={onClick}>Click</Button>)

    await user.click(screen.getByRole("button"))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it("is disabled when disabled prop is set", () => {
    render(<Button disabled>Disabled</Button>)
    expect(screen.getByRole("button")).toBeDisabled()
  })

  it("renders as child element when asChild is true", () => {
    render(
      <Button asChild>
        <a href="/test">Link Button</a>
      </Button>
    )
    const link = screen.getByRole("link", { name: "Link Button" })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute("href", "/test")
  })
})
