import { z } from 'zod'

// Step 1: Photo (optional)
export const step1Schema = z.object({
  photo: z.string().url().optional().or(z.literal(""))
})

// Step 2: Learning Preferences
export const step2Schema = z.object({
  learningPrefs: z
    .array(z.string())
    .min(1, "Seleziona almeno una preferenza di apprendimento")
    .max(4, "Puoi selezionare massimo 4 preferenze"),
  accessibility: z.enum(["dyslexia", "adhd", "other", "none"]),
  otherAccessibility: z.string().max(200, "Troppo lungo (max 200 caratteri)").optional()
}).refine(
  (data) => {
    if (data.accessibility === "other") {
      return data.otherAccessibility && data.otherAccessibility.length >= 3
    }
    return true
  },
  {
    message: "Descrivi brevemente le tue esigenze (min 3 caratteri)",
    path: ["otherAccessibility"]
  }
)

// Step 3: Professional Goals
export const step3Schema = z.object({
  goal: z.string().min(1, "Seleziona un obiettivo professionale"),
  dreamCompanies: z
    .array(z.string())
    .min(1, "Aggiungi almeno un'azienda")
    .max(5, "Puoi aggiungere massimo 5 aziende")
    .refine(
      (companies) => companies.every(c => c.length >= 2 && c.length <= 50),
      "Ogni azienda deve avere 2-50 caratteri"
    )
})

// Step 4: Availability
export const step4Schema = z.object({
  availability: z.string().min(1, "Seleziona la tua disponibilità")
})

// Step 5: Connections (all optional)
export const step5Schema = z.object({
  linkedinConnected: z.boolean().optional(),
  githubConnected: z.boolean().optional(),
  figmaConnected: z.boolean().optional()
})

// Full onboarding schema (for final submission)
export const onboardingSchema = step1Schema
  .merge(step2Schema)
  .merge(step3Schema)
  .merge(step4Schema)
  .merge(step5Schema)

export type OnboardingFormData = z.infer<typeof onboardingSchema>
