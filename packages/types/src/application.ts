export interface CourseApplication {
  firstName: string
  lastName: string
  email: string
  phone: string
  degree: string
  field: string
  experience: ExperienceLevel
  motivation: string
  portfolio?: string
  cohortDate: string
}

export type ExperienceLevel = "none" | "internship" | "junior" | "mid"

export interface OnboardingFormData {
  photo: string
  learningPrefs: string[]
  accessibility: string
  otherAccessibility: string
  goal: string
  dreamCompanies: string[]
  availability: string
  linkedinConnected: boolean
  githubConnected: boolean
  figmaConnected: boolean
}
