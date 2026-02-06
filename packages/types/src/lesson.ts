export type LessonType = "live" | "video" | "reading" | "exercise" | "quiz" | "workshop"
export type LessonStatus = "available" | "completed" | "locked" | "in-progress"

export interface Lesson {
  id: number
  title: string
  module: string
  duration: string
  type: LessonType
  status: LessonStatus
  dueDate?: string
  instructor?: string
  preworkCompleted?: boolean
}

export interface PreworkMaterial {
  id: number
  title: string
  type: "article" | "video" | "exercise" | "quiz"
  duration: string
  status: "completed" | "pending" | "in-progress"
  description: string
}

export interface AssessmentQuestion {
  id: number
  category: string
  question: string
  options: string[]
  correctAnswer: number
}
