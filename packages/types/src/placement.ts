export type ApplicationStatus = "applied" | "screening" | "interview" | "challenge" | "offer" | "rejected"

export interface PlacementStats {
  jobReadiness: number
  cvScore: number
  interviewsPrepared: number
  applicationsTotal: number
  nextInterview?: string
}

export interface JobListing {
  id: string
  company: string
  logo: string
  position: string
  location: string
  salary: string
  type: "Full-time" | "Part-time" | "Contract" | "Internship"
  match: number
  posted: string
  applicants: number
  skills: string[]
  description: string
  saved: boolean
}

export interface JobApplication {
  id: string
  company: string
  position: string
  appliedDate: string
  status: ApplicationStatus
  stage: string
  nextStep?: string
  nextStepDate?: string
}

export interface InterviewPrep {
  id: string
  title: string
  type: "workshop" | "mock-interview" | "resource" | "checklist"
  duration: string
  date: string
  completed: boolean
}
