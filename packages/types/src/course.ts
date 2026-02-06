export interface Course {
  id: string
  slug: string
  title: string
  description: string
  duration: string
  price: number
  currency: string
  maxStudents: number
  level: "beginner" | "intermediate" | "advanced"
  category: string
  skills: string[]
  modules: CourseModule[]
  instructors: Instructor[]
  testimonials: Testimonial[]
  upcomingDates: CourseDateSlot[]
}

export interface CourseModule {
  id: string
  weeks: string
  title: string
  topics: string[]
  color: string
}

export interface CourseProgress {
  overall: number
  modulesCompleted: number
  totalModules: number
  currentWeek: number
  totalWeeks: number
  nextLiveSession: string
  hoursSpent: number
  targetHours: number
  skillsGained: number
  projectsCompleted: number
}

export interface SkillProgress {
  name: string
  level: number
  color: string
}

export interface Instructor {
  name: string
  role: string
  avatar: string
}

export interface Testimonial {
  name: string
  role: string
  avatar: string
  quote: string
  rating: number
}

export interface CourseDateSlot {
  date: string
  available: number
  total: number
}
