"use client"

import { Navigation } from "@/components/shared/navigation"
import { DashboardHeader } from "@/components/platform/dashboard/DashboardHeader"
import { DashboardStats } from "@/components/platform/dashboard/DashboardStats"
import { PreworkSection } from "@/components/platform/dashboard/PreworkSection"
import { LessonsSection } from "@/components/platform/dashboard/LessonsSection"
import { SkillsProgress } from "@/components/platform/dashboard/SkillsProgress"
import { CommunitySidebar } from "@/components/platform/dashboard/CommunitySidebar"
import {
  Clock,
  TrendingUp,
  Zap,
  Award,
  FileText,
  Video,
  Headphones,
  Brain,
  Briefcase,
  Download
} from "lucide-react"

// Mock data
const courseProgress = {
  overall: 15,
  modulesCompleted: 2,
  totalModules: 12,
  currentWeek: 1,
  totalWeeks: 12,
  nextLiveSession: "Giovedì 7 Maggio, 14:30",
  hoursSpent: 12.5,
  targetHours: 15,
  skillsGained: 8,
  projectsCompleted: 1
}

const statsData = [
  {
    label: "Ore Studio",
    value: courseProgress.hoursSpent,
    subtitle: `di ${courseProgress.targetHours} questa settimana`,
    icon: Clock,
    color: "indigo",
    progress: (courseProgress.hoursSpent / courseProgress.targetHours) * 100
  },
  {
    label: "Progresso",
    value: `${courseProgress.overall}%`,
    subtitle: "completamento corso",
    icon: TrendingUp,
    color: "amber",
    progress: courseProgress.overall
  },
  {
    label: "Skills",
    value: courseProgress.skillsGained,
    subtitle: "competenze acquisite",
    icon: Zap,
    color: "sage",
    progress: 40
  },
  {
    label: "Progetti",
    value: courseProgress.projectsCompleted,
    subtitle: "portfolio projects",
    icon: Award,
    color: "gold",
    progress: 8
  }
]

const preworkMaterials = [
  {
    id: 1,
    title: "Design Thinking Framework",
    type: "article",
    duration: "15 min",
    status: "completed" as const,
    icon: FileText,
    description: "Fondamenti metodologici"
  },
  {
    id: 2,
    title: "User Research Best Practices",
    type: "video",
    duration: "20 min",
    status: "in-progress" as const,
    icon: Video,
    description: "Interviste e osservazione"
  },
  {
    id: 3,
    title: "Figma Basics Podcast",
    type: "audio",
    duration: "30 min",
    status: "pending" as const,
    icon: Headphones,
    description: "Strumenti e workflow"
  }
]

const upcomingLessons = [
  {
    id: 1,
    title: "User Research Workshop",
    module: "Modulo 1",
    duration: "90 min",
    type: "live" as const,
    status: "available" as const,
    dueDate: "Oggi, 14:30",
    instructor: "Dr. Maria Conte",
    preworkCompleted: true
  },
  {
    id: 2,
    title: "Personas & Journey Maps",
    module: "Modulo 1",
    duration: "45 min",
    type: "async" as const,
    status: "available" as const,
    dueDate: "Domani",
    instructor: "AI Tutor",
    preworkCompleted: false
  },
  {
    id: 3,
    title: "Wireframing Masterclass",
    module: "Modulo 2",
    duration: "120 min",
    type: "project" as const,
    status: "locked" as const,
    dueDate: "Prossima settimana",
    instructor: "Luca Rossi",
    preworkCompleted: false
  }
]

const skillsProgress = [
  { name: "User Research", level: 45, color: "from-indigo-500 to-purple-600" },
  { name: "Wireframing", level: 30, color: "from-amber-500 to-orange-600" },
  { name: "Prototyping", level: 15, color: "from-emerald-500 to-teal-600" },
  { name: "Visual Design", level: 10, color: "from-rose-500 to-pink-600" }
]

const communityActivity = [
  {
    id: 1,
    user: "Marco R.",
    avatar: "MR",
    action: "ha completato il progetto",
    target: "User Research Case Study",
    time: "2 ore fa",
    reactions: 12
  },
  {
    id: 2,
    user: "Sofia L.",
    avatar: "SL",
    action: "ha condiviso",
    target: "Portfolio Redesign",
    time: "5 ore fa",
    reactions: 8
  },
  {
    id: 3,
    user: "Elena P.",
    avatar: "EP",
    action: "cerca aiuto su",
    target: "Figma Auto Layout",
    time: "1 giorno fa",
    reactions: 5
  }
]

const quickActions = [
  {
    id: "ai-tutor",
    icon: Brain,
    title: "AI Tutor 24/7",
    description: "Fai domande, ricevi aiuto",
    color: "indigo"
  },
  {
    id: "placement",
    icon: Briefcase,
    title: "Placement Portal",
    description: "Job match e colloqui",
    color: "amber"
  },
  {
    id: "wallet",
    icon: Award,
    title: "Blockchain Wallet",
    description: "I tuoi certificati NFT",
    color: "sage"
  },
  {
    id: "path",
    icon: Download,
    title: "Learning Path",
    description: "Roadmap completa",
    color: "gold"
  }
]

export default function DashboardPage() {
  return (
    <div className="min-h-screen grain-texture">
      <Navigation />

      <div className="editorial-grid py-8 space-y-8">
        <DashboardHeader
          userName="Filippo"
          userInitials="FR"
          currentWeek={courseProgress.currentWeek}
          modulesCompleted={courseProgress.modulesCompleted}
          totalModules={courseProgress.totalModules}
        />

        <DashboardStats stats={statsData} />

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <PreworkSection
              nextLiveSession={courseProgress.nextLiveSession}
              materials={preworkMaterials}
              completedCount={2}
              totalCount={3}
            />

            <LessonsSection lessons={upcomingLessons} />

            <SkillsProgress skills={skillsProgress} />
          </div>

          <CommunitySidebar
            activities={communityActivity}
            quickActions={quickActions}
            jobReadinessProgress={25}
          />
        </div>
      </div>
    </div>
  )
}
