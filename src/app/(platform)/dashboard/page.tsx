"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Navigation } from "@/components/shared/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  Target,
  TrendingUp,
  Users,
  Play,
  Lock,
  Award,
  MessageSquare,
  Briefcase,
  Brain,
  FileText,
  ChevronRight,
  Sparkles,
  Video,
  Headphones,
  Download,
  ExternalLink,
  Zap
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

const preworkMaterials = [
  {
    id: 1,
    title: "Design Thinking Framework",
    type: "article",
    duration: "15 min",
    status: "completed",
    icon: FileText,
    description: "Fondamenti metodologici"
  },
  {
    id: 2,
    title: "User Research Best Practices",
    type: "video",
    duration: "20 min",
    status: "in-progress",
    icon: Video,
    description: "Interviste e osservazione"
  },
  {
    id: 3,
    title: "Figma Basics Podcast",
    type: "audio",
    duration: "30 min",
    status: "pending",
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
    type: "live",
    status: "available",
    dueDate: "Oggi, 14:30",
    instructor: "Dr. Maria Conte",
    preworkCompleted: true
  },
  {
    id: 2,
    title: "Personas & Journey Maps",
    module: "Modulo 1",
    duration: "45 min",
    type: "async",
    status: "available",
    dueDate: "Domani",
    instructor: "AI Tutor",
    preworkCompleted: false
  },
  {
    id: 3,
    title: "Wireframing Masterclass",
    module: "Modulo 2",
    duration: "120 min",
    type: "project",
    status: "locked",
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

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const }
  }
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen grain-texture">
      <Navigation />

      <div className="editorial-grid py-8 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-6"
        >
          <div>
            <h1 className="mb-2">
              Ciao, Filippo! 👋
            </h1>
            <p className="text-xl text-muted-foreground">
              Settimana {courseProgress.currentWeek} · {courseProgress.modulesCompleted}/{courseProgress.totalModules} moduli completati
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              className="gap-2"
            >
              <Brain className="w-4 h-4" />
              AI Tutor
            </Button>
            <Avatar className="h-14 w-14 border-2 border-[hsl(var(--indigo)_/_0.3)]">
              <AvatarImage src="/avatars/filippo.jpg" alt="Filippo" />
              <AvatarFallback className="bg-gradient-to-br from-[hsl(var(--indigo))] to-[hsl(var(--amber))] text-white font-semibold text-lg">
                FR
              </AvatarFallback>
            </Avatar>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={staggerContainer}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
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
          ].map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div key={stat.label} variants={fadeInUp}>
                <Card className="relative overflow-hidden border-2 hover:border-[hsl(var(--indigo)_/_0.3)] transition-all duration-300 hover:shadow-xl group">
                  <div className={`absolute inset-0 bg-gradient-to-br from-[hsl(var(--${stat.color}))] to-transparent opacity-0 group-hover:opacity-5 transition-opacity`} />

                  <CardContent className="p-6 relative">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-2 rounded-lg bg-gradient-to-br from-[hsl(var(--${stat.color})_/_0.1)] to-transparent`}>
                        <Icon className={`w-5 h-5 text-[hsl(var(--${stat.color}))]`} />
                      </div>
                    </div>

                    <div className="font-display text-4xl font-bold mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm font-medium text-muted-foreground mb-3">
                      {stat.label}
                    </div>

                    <div className="space-y-2">
                      <Progress value={stat.progress} className="h-1.5" />
                      <p className="text-xs text-muted-foreground">
                        {stat.subtitle}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Lessons & Prework */}
          <div className="lg:col-span-2 space-y-8">
            {/* Next Live Session Alert */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="relative overflow-hidden border-2 border-[hsl(var(--indigo)_/_0.3)]">
                <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--indigo))] to-[hsl(var(--indigo)_/_0.8)] opacity-100" />
                <CardContent className="relative p-6 text-white">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-xl bg-white/20 backdrop-blur-sm">
                        <Calendar className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-sm font-medium opacity-90">Prossima Sessione Live</p>
                        <p className="font-display text-xl font-semibold">
                          {courseProgress.nextLiveSession}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="secondary"
                      className="bg-white text-[hsl(var(--indigo))] hover:bg-white/90"
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Aggiungi a Calendario
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Pre-work Materials - Flipped Classroom */}
            <motion.div variants={fadeInUp}>
              <Card className="border-2">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl font-display flex items-center gap-2">
                        <Sparkles className="w-6 h-6 text-[hsl(var(--amber))]" />
                        Pre-work Materiali
                      </CardTitle>
                      <CardDescription className="text-base mt-2">
                        Preparati per la prossima lezione live
                      </CardDescription>
                    </div>
                    <Badge variant="outline" className="text-sm">
                      2/3 completati
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {preworkMaterials.map((material) => {
                    const Icon = material.icon
                    return (
                      <div
                        key={material.id}
                        className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                          material.status === "completed"
                            ? "bg-[hsl(var(--sage)_/_0.05)] border-[hsl(var(--sage)_/_0.2)]"
                            : material.status === "in-progress"
                            ? "bg-[hsl(var(--amber)_/_0.05)] border-[hsl(var(--amber)_/_0.2)]"
                            : "bg-muted/30 border-border hover:border-[hsl(var(--indigo)_/_0.2)]"
                        }`}
                      >
                        <div className={`p-3 rounded-lg ${
                          material.status === "completed"
                            ? "bg-[hsl(var(--sage)_/_0.1)]"
                            : material.status === "in-progress"
                            ? "bg-[hsl(var(--amber)_/_0.1)]"
                            : "bg-muted"
                        }`}>
                          <Icon className="w-5 h-5" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold mb-1">{material.title}</h4>
                          <p className="text-sm text-muted-foreground">{material.description}</p>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-sm text-muted-foreground whitespace-nowrap">
                            {material.duration}
                          </span>
                          {material.status === "completed" ? (
                            <CheckCircle2 className="w-5 h-5 text-[hsl(var(--sage))]" />
                          ) : material.status === "in-progress" ? (
                            <Button size="sm" variant="outline">
                              Continua
                            </Button>
                          ) : (
                            <Button size="sm" variant="ghost">
                              <Play className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </CardContent>
              </Card>
            </motion.div>

            {/* Upcoming Lessons */}
            <motion.div variants={fadeInUp}>
              <Card className="border-2">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl font-display">
                      Prossime Lezioni
                    </CardTitle>
                    <Button variant="outline" size="sm">
                      Vedi Tutte
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingLessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className={`p-6 rounded-xl border-2 transition-all ${
                        lesson.status === "locked"
                          ? "opacity-50 bg-muted/20"
                          : "hover:border-[hsl(var(--indigo)_/_0.3)] hover:shadow-lg bg-card"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className="text-xs">
                              {lesson.module}
                            </Badge>
                            <Badge
                              variant="secondary"
                              className={
                                lesson.type === "live"
                                  ? "bg-[hsl(var(--indigo)_/_0.1)] text-[hsl(var(--indigo))]"
                                  : ""
                              }
                            >
                              {lesson.type}
                            </Badge>
                            {!lesson.preworkCompleted && lesson.status === "available" && (
                              <Badge variant="outline" className="text-xs bg-[hsl(var(--amber)_/_0.1)] border-[hsl(var(--amber)_/_0.3)] text-[hsl(var(--amber))]">
                                Pre-work richiesto
                              </Badge>
                            )}
                          </div>
                          <h3 className="font-display text-xl font-semibold mb-2">
                            {lesson.title}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {lesson.duration}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {lesson.dueDate}
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {lesson.instructor}
                            </span>
                          </div>
                        </div>

                        <div>
                          {lesson.status === "available" ? (
                            <Button className="bg-gradient-to-r from-[hsl(var(--indigo))] to-[hsl(var(--indigo)_/_0.8)]">
                              <Play className="w-4 h-4 mr-2" />
                              {lesson.type === "live" ? "Entra" : "Inizia"}
                            </Button>
                          ) : (
                            <Button disabled variant="outline">
                              <Lock className="w-4 h-4 mr-2" />
                              Bloccato
                            </Button>
                          )}
                        </div>
                      </div>

                      {lesson.status === "available" && lesson.type === "live" && (
                        <div className="pt-4 border-t">
                          <p className="text-sm text-muted-foreground">
                            💡 Completa i materiali pre-work per massimizzare l'apprendimento durante la sessione live
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Skills Progress Visualization */}
            <motion.div variants={fadeInUp}>
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-2xl font-display flex items-center gap-2">
                    <Target className="w-6 h-6 text-[hsl(var(--indigo))]" />
                    Competenze in Sviluppo
                  </CardTitle>
                  <CardDescription className="text-base mt-2">
                    Il tuo progress verso il job-readiness
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {skillsProgress.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold">{skill.name}</span>
                        <span className="text-sm text-muted-foreground">{skill.level}%</span>
                      </div>
                      <div className="relative h-3 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: 0.2, ease: "easeOut" as const }}
                          className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right Column - Community & Quick Actions */}
          <div className="space-y-8">
            {/* Community Feed */}
            <motion.div variants={fadeInUp}>
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-xl font-display flex items-center gap-2">
                    <Users className="w-5 h-5 text-[hsl(var(--indigo))]" />
                    Community
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {communityActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3 pb-4 border-b last:border-0 last:pb-0">
                      <Avatar className="h-10 w-10 border-2 border-[hsl(var(--indigo)_/_0.1)]">
                        <AvatarFallback className="bg-gradient-to-br from-[hsl(var(--indigo)_/_0.1)] to-[hsl(var(--amber)_/_0.1)] text-sm font-semibold">
                          {activity.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm leading-relaxed">
                          <span className="font-semibold">{activity.user}</span>{" "}
                          <span className="text-muted-foreground">{activity.action}</span>{" "}
                          <span className="font-medium text-[hsl(var(--indigo))]">{activity.target}</span>
                        </p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-xs text-muted-foreground">{activity.time}</span>
                          <span className="text-xs text-muted-foreground">❤️ {activity.reactions}</span>
                        </div>
                      </div>
                    </div>
                  ))}

                  <Button variant="outline" className="w-full mt-4">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Vai al Forum
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Actions */}
            <motion.div variants={fadeInUp}>
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-xl font-display">
                    Azioni Rapide
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-3 h-auto py-4"
                  >
                    <div className="p-2 rounded-lg bg-[hsl(var(--indigo)_/_0.1)]">
                      <Brain className="w-5 h-5 text-[hsl(var(--indigo))]" />
                    </div>
                    <div className="text-left flex-1">
                      <div className="font-semibold">AI Tutor 24/7</div>
                      <div className="text-xs text-muted-foreground">Fai domande, ricevi aiuto</div>
                    </div>
                    <ChevronRight className="w-4 h-4" />
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full justify-start gap-3 h-auto py-4"
                  >
                    <div className="p-2 rounded-lg bg-[hsl(var(--amber)_/_0.1)]">
                      <Briefcase className="w-5 h-5 text-[hsl(var(--amber))]" />
                    </div>
                    <div className="text-left flex-1">
                      <div className="font-semibold">Placement Portal</div>
                      <div className="text-xs text-muted-foreground">Job match e colloqui</div>
                    </div>
                    <ChevronRight className="w-4 h-4" />
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full justify-start gap-3 h-auto py-4"
                  >
                    <div className="p-2 rounded-lg bg-[hsl(var(--sage)_/_0.1)]">
                      <Award className="w-5 h-5 text-[hsl(var(--sage))]" />
                    </div>
                    <div className="text-left flex-1">
                      <div className="font-semibold">Blockchain Wallet</div>
                      <div className="text-xs text-muted-foreground">I tuoi certificati NFT</div>
                    </div>
                    <ChevronRight className="w-4 h-4" />
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full justify-start gap-3 h-auto py-4"
                  >
                    <div className="p-2 rounded-lg bg-[hsl(var(--gold)_/_0.1)]">
                      <Download className="w-5 h-5 text-[hsl(var(--gold))]" />
                    </div>
                    <div className="text-left flex-1">
                      <div className="font-semibold">Learning Path</div>
                      <div className="text-xs text-muted-foreground">Roadmap completa</div>
                    </div>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Placement Progress */}
            <motion.div variants={fadeInUp}>
              <Card className="border-2 border-[hsl(var(--amber)_/_0.3)] bg-gradient-to-br from-[hsl(var(--amber)_/_0.05)] to-transparent">
                <CardHeader>
                  <CardTitle className="text-xl font-display flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-[hsl(var(--amber))]" />
                    Job Readiness
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Progresso placement</span>
                      <span className="text-sm font-semibold text-[hsl(var(--amber))]">25%</span>
                    </div>
                    <Progress value={25} className="h-2" />
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[hsl(var(--sage))]" />
                      <span>Portfolio setup completato</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[hsl(var(--sage))]" />
                      <span>CV ottimizzato</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <div className="w-4 h-4 rounded-full border-2 border-muted-foreground" />
                      <span>3 progetti portfolio</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <div className="w-4 h-4 rounded-full border-2 border-muted-foreground" />
                      <span>Mock interview</span>
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-[hsl(var(--amber))] to-[hsl(var(--amber)_/_0.8)] text-white">
                    Continua Placement
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
