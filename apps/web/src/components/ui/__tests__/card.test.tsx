import { describe, it, expect } from "vitest"
import { render, screen } from "@/test/utils"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../card"

describe("Card", () => {
  it("renders Card with data-slot attribute", () => {
    render(<Card data-testid="card">Content</Card>)
    const card = screen.getByTestId("card")
    expect(card).toHaveAttribute("data-slot", "card")
    expect(card).toHaveTextContent("Content")
  })

  it("composes all card sub-components", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Title</CardTitle>
          <CardDescription>Description</CardDescription>
        </CardHeader>
        <CardContent>Body content</CardContent>
        <CardFooter>Footer content</CardFooter>
      </Card>
    )

    expect(screen.getByText("Title")).toBeInTheDocument()
    expect(screen.getByText("Description")).toBeInTheDocument()
    expect(screen.getByText("Body content")).toBeInTheDocument()
    expect(screen.getByText("Footer content")).toBeInTheDocument()
  })

  it("forwards className to Card", () => {
    render(
      <Card className="my-custom" data-testid="card">
        Test
      </Card>
    )
    expect(screen.getByTestId("card")).toHaveClass("my-custom")
  })

  it("applies correct data-slot to sub-components", () => {
    render(
      <Card>
        <CardHeader data-testid="header">
          <CardTitle data-testid="title">T</CardTitle>
        </CardHeader>
        <CardContent data-testid="content">C</CardContent>
        <CardFooter data-testid="footer">F</CardFooter>
      </Card>
    )

    expect(screen.getByTestId("header")).toHaveAttribute("data-slot", "card-header")
    expect(screen.getByTestId("title")).toHaveAttribute("data-slot", "card-title")
    expect(screen.getByTestId("content")).toHaveAttribute("data-slot", "card-content")
    expect(screen.getByTestId("footer")).toHaveAttribute("data-slot", "card-footer")
  })
})
