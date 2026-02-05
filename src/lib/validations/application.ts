import { z } from 'zod'
import { emailSchema, phoneSchema, nameSchema } from './common'

// Step 1: Basic Info
export const applicationStep1Schema = z.object({
  firstName: nameSchema,
  lastName: nameSchema,
  email: emailSchema,
  phone: phoneSchema
})

// Step 2: Background
export const applicationStep2Schema = z.object({
  degree: z.enum(["diploma", "triennale", "magistrale", "master"]),
  field: z
    .string()
    .min(2, "Inserisci il tuo indirizzo di studio (min 2 caratteri)")
    .max(100, "Troppo lungo (max 100 caratteri)")
})

// Step 3: Experience
export const applicationStep3Schema = z.object({
  experience: z.enum(["none", "internship", "junior", "mid"])
})

// Step 4: Motivation
export const applicationStep4Schema = z.object({
  motivation: z
    .string()
    .min(50, "La motivazione deve contenere almeno 50 caratteri")
    .max(500, "Troppo lungo (max 500 caratteri)"),
  portfolio: z
    .string()
    .url("Inserisci un URL valido (es: https://behance.net/tuoprofilo)")
    .optional()
    .or(z.literal(""))
})

// Step 5: Preferences
export const applicationStep5Schema = z.object({
  cohortDate: z.string().min(1, "Seleziona una data di inizio")
})

// Full application schema
export const applicationSchema = applicationStep1Schema
  .merge(applicationStep2Schema)
  .merge(applicationStep3Schema)
  .merge(applicationStep4Schema)
  .merge(applicationStep5Schema)

export type ApplicationFormData = z.infer<typeof applicationSchema>
