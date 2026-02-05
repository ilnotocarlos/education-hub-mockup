import { useState } from 'react'
import { z } from 'zod'

/**
 * Hook leggero per integrare Zod validation con useState
 * Usato per validazione form senza dover riscrivere completamente con react-hook-form
 */
export function useZodValidation<T extends z.ZodSchema>(schema: T) {
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = (data: z.infer<T>): boolean => {
    try {
      schema.parse(data)
      setErrors({})
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {}
        error.issues.forEach((issue) => {
          if (issue.path[0]) {
            fieldErrors[issue.path[0].toString()] = issue.message
          }
        })
        setErrors(fieldErrors)

        // Scroll to first error
        const firstErrorField = Object.keys(fieldErrors)[0]
        setTimeout(() => {
          const element = document.getElementById(firstErrorField)
          element?.scrollIntoView({ behavior: 'smooth', block: 'center' })
          element?.focus()
        }, 100)
      }
      return false
    }
  }

  const clearErrors = () => setErrors({})

  const getError = (field: string): string | undefined => errors[field]

  return {
    errors,
    validate,
    clearErrors,
    getError,
    hasErrors: Object.keys(errors).length > 0
  }
}
