import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@/test/utils"
import { FormWizard, WizardStep } from "../form-wizard"

const makeSteps = (overrides?: Partial<WizardStep>[]): WizardStep[] => [
  {
    id: "step-1",
    title: "Step Uno",
    subtitle: "Sottotitolo primo step",
    content: <div>Contenuto step 1</div>,
    ...overrides?.[0],
  },
  {
    id: "step-2",
    title: "Step Due",
    content: <div>Contenuto step 2</div>,
    ...overrides?.[1],
  },
  {
    id: "step-3",
    title: "Step Tre",
    content: <div>Contenuto step 3</div>,
    ...overrides?.[2],
  },
]

describe("FormWizard", () => {
  it("renders the first step by default", () => {
    const onComplete = vi.fn()
    render(<FormWizard steps={makeSteps()} onComplete={onComplete} />)

    expect(screen.getByText("Step Uno")).toBeInTheDocument()
    expect(screen.getByText("Contenuto step 1")).toBeInTheDocument()
    expect(screen.getByText("Sottotitolo primo step")).toBeInTheDocument()
  })

  it("shows progress bar and step counter", () => {
    render(<FormWizard steps={makeSteps()} onComplete={vi.fn()} />)

    expect(screen.getByText("1 di 3")).toBeInTheDocument()
    expect(screen.getByText("33%")).toBeInTheDocument()
  })

  it("navigates to next step on continue click", async () => {
    const onStepChange = vi.fn()
    const { user } = render(
      <FormWizard
        steps={makeSteps()}
        onComplete={vi.fn()}
        onStepChange={onStepChange}
      />
    )

    await user.click(screen.getByRole("button", { name: /continua/i }))

    expect(screen.getByText("Step Due")).toBeInTheDocument()
    expect(screen.getByText("Contenuto step 2")).toBeInTheDocument()
    expect(onStepChange).toHaveBeenCalledWith(1)
  })

  it("navigates back on Indietro click", async () => {
    const { user } = render(
      <FormWizard steps={makeSteps()} onComplete={vi.fn()} initialStep={1} />
    )

    expect(screen.getByText("Step Due")).toBeInTheDocument()
    await user.click(screen.getByRole("button", { name: /indietro/i }))
    expect(screen.getByText("Step Uno")).toBeInTheDocument()
  })

  it("calls onComplete when clicking continue on last step", async () => {
    const onComplete = vi.fn()
    const { user } = render(
      <FormWizard steps={makeSteps()} onComplete={onComplete} initialStep={2} />
    )

    expect(screen.getByText("Step Tre")).toBeInTheDocument()
    await user.click(screen.getByRole("button", { name: /completa/i }))
    expect(onComplete).toHaveBeenCalledOnce()
  })

  it("blocks navigation when validate returns false", async () => {
    const steps = makeSteps([{ validate: () => false }])
    const { user } = render(
      <FormWizard steps={steps} onComplete={vi.fn()} />
    )

    const continueBtn = screen.getByRole("button", { name: /continua/i })
    expect(continueBtn).toBeDisabled()
    await user.click(continueBtn)
    // Should still be on step 1
    expect(screen.getByText("Step Uno")).toBeInTheDocument()
  })

  it("hides progress bar when showProgress is false", () => {
    render(
      <FormWizard
        steps={makeSteps()}
        onComplete={vi.fn()}
        showProgress={false}
      />
    )

    expect(screen.queryByText("1 di 3")).not.toBeInTheDocument()
  })

  it("renders badge when step has badge config", () => {
    const steps = makeSteps([
      { badge: { label: "Fase 1" } },
    ])
    render(<FormWizard steps={steps} onComplete={vi.fn()} />)

    expect(screen.getByText("Fase 1")).toBeInTheDocument()
  })

  it("uses custom submitLabel on last step", () => {
    render(
      <FormWizard
        steps={makeSteps()}
        onComplete={vi.fn()}
        initialStep={2}
        submitLabel="Invia"
      />
    )

    expect(screen.getByRole("button", { name: /invia/i })).toBeInTheDocument()
  })
})
