"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { usePageTransition } from "@/hooks/use-page-transition"
import {
  BookOpen,
  Clock,
  TrendingUp,
  Award,
  PlayCircle,
  Calendar,
  Target,
  CheckCircle2,
  ArrowRight,
  Download,
  ExternalLink,
  Sparkles
} from "lucide-react"

const courses = [
  {
    id: "ux-ui-master",
    slug: "ux-ui-design-master",
    title: "UX/UI Design Master",
    status: "active" as const,
    progress: 15,
    lessonsCompleted: 2,
    totalLessons: 16,
    modulesCompleted: 1,
    totalModules: 4,
    hoursSpent: 12.5,
    estimatedHours: 120,
    nextLesson: {
      id: "3",
      title: "Wireframing e Prototyping",
      module: "Modulo 2: Design Foundations"
    },
    skills: ["User Research", "Wireframing", "Design Systems"],
    startDate: "2026-01-15",
    deadline: "2026-05-15",
    instructor: "Dr. Maria Conte",
    color: "from-purple-500 to-pink-600"
  },
  {
    id: "frontend-dev",
    slug: "frontend-development-bootcamp",
    title: "Frontend Development Bootcamp",
    status: "upcoming" as const,
    progress: 0,
    lessonsCompleted: 0,
    totalLessons: 20,
    modulesCompleted: 0,
    totalModules: 5,
    hoursSpent: 0,
    estimatedHours: 150,
    startDate: "2026-06-01",
    instructor: "Luca Verdi",
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
    color: "from-blue-500 to-cyan-600"
  },
  {
    id: "user-research",
    slug: "user-research-fundamentals",
    title: "User Research Fundamentals",
    status: "completed" as const,
    progress: 100,
    lessonsCompleted: 8,
    totalLessons: 8,
    modulesCompleted: 2,
    totalModules: 2,
    hoursSpent: 24,
    estimatedHours: 24,
    completedDate: "2026-01-10",
    grade: "Eccellente",
    certificateId: "cert-001",
    instructor: "Anna Bianchi",
    skills: ["User Interviews", "Surveys", "Data Analysis"],
    color: "from-green-500 to-emerald-600"
  }
]

const stats = [
  {
    label: "Corsi Attivi",
    value: courses.filter(c => c.status === "active").length,
    icon: BookOpen,
    color: "indigo"
  },
  {
    label: "Ore Totali",
    value: courses.reduce((sum, c) => sum + c.hoursSpent, 0),
    icon: Clock,
    color: "amber"
  },
  {
    label: "Corsi Completati",
    value: courses.filter(c => c.status === "completed").length,
    icon: CheckCircle2,
    color: "green"
  },
  {
    label: "Skills Acquisite",
    value: courses.reduce((sum, c) => sum + c.skills.length, 0),
    icon: Target,
    color: "purple"
  }
]

function CourseCard({ course, fadeInUp }: { course: typeof courses[0]; fadeInUp: any }) {
  const statusConfig = {
    active: {
      label: "In Corso",
      variant: "default" as const,
      bgClass: "bg-[hsl(var(--indigo)_/_0.1)]",
      borderClass: "border-[hsl(var(--indigo)_/_0.2)]",
      textClass: "text-[hsl(var(--indigo))]"
    },
    completed: {
      label: "Completato",
      variant: "secondary" as const,
      bgClass: "bg-green-100",
      borderClass: "border-green-200",
      textClass: "text-green-700"
    },
    upcoming: {
      label: "Prossimamente",
      variant: "outline" as const,
      bgClass: "bg-[hsl(var(--amber)_/_0.1)]",
      borderClass: "border-[hsl(var(--amber)_/_0.2)]",
      textClass: "text-[hsl(var(--amber))]"
    }
  }

  const status = statusConfig[course.status]

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={fadeInUp}
      whileHover={{ y: -4 }}
      className="h-full"
    >
      <Card className="h-full flex flex-col hover:shadow-lg transition-shadow border-2">
        {/* Header con gradient */}
        <div className={`h-2 bg-gradient-to-r ${course.color} rounded-t-lg`} />

        <CardHeader>
          <div className="flex items-start justify-between mb-2">
            <Badge
              className={`${status.bgClass} ${status.borderClass} ${status.textClass}`}
            >
              {status.label}
            </Badge>
            {course.status === "completed" && course.grade && (
              <Badge variant="secondary" className="flex items-center gap-1">
                <Award className="w-3 h-3" />
                {course.grade}
              </Badge>
            )}
          </div>

          <CardTitle className="text-2xl mb-2">{course.title}</CardTitle>

          <CardDescription className="flex flex-wrap gap-2 text-sm">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {course.status === "completed" && course.completedDate
                ? `Completato il ${new Date(course.completedDate).toLocaleDateString("it-IT")}`
                : course.status === "upcoming"
                ? `Inizio: ${new Date(course.startDate).toLocaleDateString("it-IT")}`
                : course.deadline
                ? `Scadenza: ${new Date(course.deadline).toLocaleDateString("it-IT")}`
                : `In corso`}
            </span>
          </CardDescription>
        </CardHeader>

        <CardContent className="flex-grow space-y-4">
          {/* Progress */}
          {course.status !== "upcoming" && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">
                  {course.lessonsCompleted}/{course.totalLessons} Lezioni
                </span>
                <span className="text-muted-foreground">{course.progress}%</span>
              </div>
              <Progress value={course.progress} className="h-2" />
            </div>
          )}

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <div className="text-xs text-muted-foreground">Moduli</div>
              <div className="font-semibold">
                {course.modulesCompleted}/{course.totalModules}
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-xs text-muted-foreground">Ore</div>
              <div className="font-semibold">
                {course.hoursSpent}h / {course.estimatedHours}h
              </div>
            </div>
          </div>

          {/* Next Lesson (active only) */}
          {course.status === "active" && course.nextLesson && (
            <div className="p-3 rounded-lg bg-muted/50 border">
              <div className="text-xs text-muted-foreground mb-1">Prossima Lezione</div>
              <div className="font-medium text-sm">{course.nextLesson.title}</div>
              <div className="text-xs text-muted-foreground mt-1">
                {course.nextLesson.module}
              </div>
            </div>
          )}

          {/* Skills */}
          <div className="space-y-2">
            <div className="text-xs text-muted-foreground">Skills</div>
            <div className="flex flex-wrap gap-1.5">
              {course.skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* Instructor */}
          <div className="text-sm text-muted-foreground flex items-center gap-2">
            <Target className="w-4 h-4" />
            <span>Instructor: {course.instructor}</span>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-4">
            {course.status === "active" && (
              <>
                <Button asChild className="flex-1">
                  <Link href={`/lessons/${course.nextLesson?.id || 1}`}>
                    <PlayCircle className="w-4 h-4 mr-2" />
                    Continua
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/dashboard">
                    <TrendingUp className="w-4 h-4" />
                  </Link>
                </Button>
              </>
            )}
            {course.status === "completed" && (
              <>
                <Button asChild className="flex-1">
                  <Link href={`/certificates`}>
                    <Award className="w-4 h-4 mr-2" />
                    Vedi Certificato
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href={`/courses/${course.slug}`}>
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </Button>
              </>
            )}
            {course.status === "upcoming" && (
              <Button variant="outline" className="flex-1" asChild>
                <Link href={`/courses/${course.slug}`}>
                  Dettagli Corso
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default function MyCoursesPage() {
  const { variants } = usePageTransition()
  const [activeTab, setActiveTab] = useState("all")

  const filteredCourses = courses.filter((course) => {
    if (activeTab === "all") return true
    if (activeTab === "active") return course.status === "active"
    if (activeTab === "completed") return course.status === "completed"
    if (activeTab === "upcoming") return course.status === "upcoming"
    return true
  })

  return (
    <div className="min-h-screen grain-texture">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-3 flex items-center gap-3">
              <BookOpen className="w-10 h-10 text-[hsl(var(--indigo))]" />
              I Miei Corsi
            </h1>
            <p className="text-lg text-muted-foreground">
              Gestisci i tuoi percorsi formativi e monitora i progressi
            </p>
          </motion.div>

          {/* Stats Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`p-2 rounded-lg bg-${stat.color}-100`}>
                        <Icon className={`w-5 h-5 text-${stat.color}-600`} />
                      </div>
                    </div>
                    <div className="font-display text-3xl font-bold mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </motion.div>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="mb-8">
                <TabsTrigger value="all">
                  Tutti ({courses.length})
                </TabsTrigger>
                <TabsTrigger value="active">
                  In Corso ({courses.filter(c => c.status === "active").length})
                </TabsTrigger>
                <TabsTrigger value="completed">
                  Completati ({courses.filter(c => c.status === "completed").length})
                </TabsTrigger>
                <TabsTrigger value="upcoming">
                  Prossimi ({courses.filter(c => c.status === "upcoming").length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="space-y-6">
                {filteredCourses.length === 0 ? (
                  <Card className="p-12 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                        <BookOpen className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">
                          Nessun corso in questa categoria
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          Esplora il catalogo per trovare il corso perfetto per te
                        </p>
                        <Button asChild>
                          <Link href="/courses">
                            <Sparkles className="w-4 h-4 mr-2" />
                            Scopri i Corsi
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </Card>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCourses.map((course) => (
                      <CourseCard key={course.id} course={course} fadeInUp={variants.fadeInUp} />
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-12"
          >
            <Card className="bg-gradient-to-br from-[hsl(var(--indigo)_/_0.1)] to-[hsl(var(--amber)_/_0.05)] border-2">
              <CardContent className="p-8 text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[hsl(var(--indigo))] to-[hsl(var(--amber))] flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="font-display text-2xl font-bold mb-2">
                  Pronto per il prossimo step?
                </h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Esplora oltre 50 corsi nelle aree Design, Tech e Business
                </p>
                <div className="flex gap-4 justify-center">
                  <Button size="lg" asChild>
                    <Link href="/courses">
                      Esplora Corsi
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/discover">
                      Assessment Gratuito
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
