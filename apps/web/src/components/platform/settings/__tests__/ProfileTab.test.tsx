import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@/test/utils"
import { ProfileTab } from "../ProfileTab"

const defaultProfileData = {
  firstName: "Mario",
  lastName: "Rossi",
  email: "mario@test.com",
  bio: "Una bio di test",
}

const defaultPasswordData = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
}

function renderProfileTab(overrides = {}) {
  const props = {
    profileData: defaultProfileData,
    setProfileData: vi.fn(),
    passwordData: defaultPasswordData,
    setPasswordData: vi.fn(),
    onProfileSave: vi.fn(),
    onPasswordSave: vi.fn(),
    ...overrides,
  }
  return { ...render(<ProfileTab {...props} />), props }
}

describe("ProfileTab", () => {
  it("renders profile form fields with values", () => {
    renderProfileTab()

    expect(screen.getByLabelText("Nome")).toHaveValue("Mario")
    expect(screen.getByLabelText("Cognome")).toHaveValue("Rossi")
    expect(screen.getByLabelText("Email")).toHaveValue("mario@test.com")
  })

  it("renders password section", () => {
    renderProfileTab()

    expect(screen.getByLabelText("Password Attuale")).toBeInTheDocument()
    expect(screen.getByLabelText("Nuova Password")).toBeInTheDocument()
    expect(screen.getByLabelText("Conferma Password")).toBeInTheDocument()
  })

  it("calls onProfileSave when save button is clicked", async () => {
    const { user, props } = renderProfileTab()

    await user.click(screen.getByRole("button", { name: /salva modifiche/i }))
    expect(props.onProfileSave).toHaveBeenCalledOnce()
  })

  it("renders avatar and upload button", () => {
    renderProfileTab()

    expect(screen.getByText("FR")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /carica nuova foto/i })).toBeInTheDocument()
  })

  it("has annulla button that resets data", async () => {
    const setProfileData = vi.fn()
    const { user } = renderProfileTab({ setProfileData })

    await user.click(screen.getByRole("button", { name: /annulla/i }))
    expect(setProfileData).toHaveBeenCalled()
  })
})
