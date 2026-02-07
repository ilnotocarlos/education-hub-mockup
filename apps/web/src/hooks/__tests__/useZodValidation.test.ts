import { describe, it, expect } from "vitest"
import { renderHook, act } from "@testing-library/react"
import { useZodValidation } from "../useZodValidation"
import { z } from "zod"

const testSchema = z.object({
  name: z.string().min(2, "Nome troppo corto"),
  email: z.string().email("Email non valida"),
})

describe("useZodValidation", () => {
  it("returns no errors initially", () => {
    const { result } = renderHook(() => useZodValidation(testSchema))

    expect(result.current.errors).toEqual({})
    expect(result.current.hasErrors).toBe(false)
  })

  it("returns true for valid data", () => {
    const { result } = renderHook(() => useZodValidation(testSchema))

    let isValid: boolean
    act(() => {
      isValid = result.current.validate({ name: "Mario", email: "mario@test.com" })
    })

    expect(isValid!).toBe(true)
    expect(result.current.errors).toEqual({})
    expect(result.current.hasErrors).toBe(false)
  })

  it("returns false and sets errors for invalid data", () => {
    const { result } = renderHook(() => useZodValidation(testSchema))

    let isValid: boolean
    act(() => {
      isValid = result.current.validate({ name: "", email: "not-email" })
    })

    expect(isValid!).toBe(false)
    expect(result.current.hasErrors).toBe(true)
    expect(result.current.getError("name")).toBe("Nome troppo corto")
    expect(result.current.getError("email")).toBe("Email non valida")
  })

  it("clears errors with clearErrors", () => {
    const { result } = renderHook(() => useZodValidation(testSchema))

    act(() => {
      result.current.validate({ name: "", email: "" })
    })
    expect(result.current.hasErrors).toBe(true)

    act(() => {
      result.current.clearErrors()
    })
    expect(result.current.hasErrors).toBe(false)
    expect(result.current.errors).toEqual({})
  })

  it("getError returns undefined for fields without errors", () => {
    const { result } = renderHook(() => useZodValidation(testSchema))

    expect(result.current.getError("name")).toBeUndefined()
    expect(result.current.getError("nonexistent")).toBeUndefined()
  })
})
