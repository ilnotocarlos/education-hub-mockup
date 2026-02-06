export interface UserProfile {
  id: string
  name: string
  email: string
  avatar: string
  role: string
  location: string
  joinedDate: string
  bio: string
  website?: string
  github?: string
  linkedin?: string
  stats: UserStats
}

export interface UserStats {
  coursesCompleted: number
  coursesInProgress: number
  totalHours: number
  certificatesEarned: number
  projectsCompleted: number
  skillsAcquired: number
}

export interface UserSkill {
  name: string
  level: number
  category: "Research" | "Design" | "Tools" | "Development"
}

export interface LearningPreference {
  id: string
  label: string
}

export interface AccessibilityPreference {
  dyslexiaMode: boolean
  focusMode: boolean
  highContrast: boolean
  reducedMotion: boolean
}

export interface NotificationPreference {
  email: boolean
  push: boolean
  lessonReminders: boolean
  communityActivity: boolean
  placementUpdates: boolean
  newsletter: boolean
}

export interface PrivacyPreference {
  profilePublic: boolean
  showProgress: boolean
  showCertificates: boolean
  allowMessages: boolean
}
