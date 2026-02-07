"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { usePageTransition } from "@/hooks/use-page-transition"
import {
  Briefcase,
  TrendingUp,
  CheckCircle2,
  Clock,
  MapPin,
  Euro,
  Users,
  Calendar,
  FileText,
  Video,
  Target,
  Award,
  ExternalLink,
  Heart,
  Send,
  BookOpen,
  MessageSquare,
  Sparkles,
  Building2,
  Zap
} from "lucide-react"

const placementStats = {
  jobReadiness: 68,
  cvScore: 85,
  interviewsPrepared: 3,
  applicationsTotal: 12,
  nextInterview: "Spotify - Giovedì 15 Maggio, 14:30"
}

const recommendedJobs = [
  {
    id: "1",
    company: "Spotify",
    logo: "SP",
    position: "Product Designer",
    location: "Milano (Hybrid)",
    salary: "€32.000 - €38.000",
    type: "Full-time",
    match: 95,
    posted: "2 giorni fa",
    applicants: 45,
    skills: ["User Research", "Figma", "Design Systems"],
    description: "Cerchiamo un Product Designer per il team Consumer Experience",
    saved: false
  },
  {
    id: "2",
    company: "Bending Spoons",
    logo: "BS",
    position: "UX Designer Junior",
    location: "Milano (On-site)",
    salary: "€28.000 - €35.000",
    type: "Full-time",
    match: 92,
    posted: "5 giorni fa",
    applicants: 78,
    skills: ["Prototyping", "User Testing", "UI Design"],
    description: "Junior UX Designer per prodotti mobile con milioni di utenti",
    saved: true
  },
  {
    id: "3",
    company: "Miro",
    logo: "MI",
    position: "Design Systems Designer",
    location: "Remote (EU)",
    salary: "€35.000 - €42.000",
    type: "Full-time",
    match: 88,
    posted: "1 settimana fa",
    applicants: 123,
    skills: ["Design Systems", "React", "Documentation"],
    description: "Costruisci e mantieni il design system usato da milioni",
    saved: false
  },
  {
    id: "4",
    company: "YOOX NET-A-PORTER",
    logo: "YN",
    position: "UX/UI Designer",
    location: "Bologna (Hybrid)",
    salary: "€30.000 - €36.000",
    type: "Full-time",
    match: 85,
    posted: "3 giorni fa",
    applicants: 56,
    skills: ["E-commerce", "Mobile Design", "Figma"],
    description: "Designer per piattaforma luxury fashion e-commerce",
    saved: false
  }
]

const applications = [
  {
    id: "1",
    company: "Spotify",
    position: "Product Designer",
    appliedDate: "2026-05-01",
    status: "interview",
    stage: "Final Round",
    nextStep: "Design Challenge",
    nextStepDate: "2026-05-15"
  },
  {
    id: "2",
    company: "Bending Spoons",
    position: "UX Designer Junior",
    appliedDate: "2026-04-28",
    status: "interview",
    stage: "HR Screen",
    nextStep: "Technical Interview",
    nextStepDate: "2026-05-12"
  },
  {
    id: "3",
    company: "Tannico",
    position: "UI Designer",
    appliedDate: "2026-04-25",
    status: "pending",
    stage: "Application Review",
    nextStep: "Waiting for response",
    nextStepDate: null
  },
  {
    id: "4",
    company: "Illimity Bank",
    position: "Product Designer",
    appliedDate: "2026-04-20",
    status: "rejected",
    stage: "Completed",
    nextStep: "Feedback ricevuto",
    nextStepDate: null
  }
]

const interviewPrep = [
  {
    id: "1",
    title: "Portfolio Presentation Workshop",
    type: "workshop",
    duration: "90 min",
    date: "Disponibile ora",
    completed: true
  },
  {
    id: "2",
    title: "Behavioral Interview Practice",
    type: "practice",
    duration: "60 min",
    date: "Disponibile ora",
    completed: true
  },
  {
    id: "3",
    title: "Design Challenge Walkthrough",
    type: "tutorial",
    duration: "45 min",
    date: "Disponibile ora",
    completed: false
  },
  {
    id: "4",
    title: "Mock Interview con Career Coach",
    type: "coaching",
    duration: "60 min",
    date: "Da prenotare",
    completed: false
  }
]

export default function PlacementPage() {
  const { variants, createStaggerContainer } = usePageTransition()
  const staggerContainer = createStaggerContainer(0.1)
  const [savedJobs, setSavedJobs] = useState<string[]>(["2"])

  const toggleSave = (jobId: string) => {
    setSavedJobs(prev =>
      prev.includes(jobId)
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    )
  }

  return (
    <div className="min-h-screen grain-texture">
      <div className="editorial-grid py-8 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-6"
        >
          <div>
            <h1 className="mb-2">
              Placement Portal
            </h1>
            <p className="text-xl text-muted-foreground">
              Il tuo job matching personalizzato con 250+ aziende partner
            </p>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" className="gap-2">
              <Video className="w-4 h-4" />
              Prenota Mock Interview
            </Button>
            <Button className="bg-gradient-to-r from-[hsl(var(--indigo))] to-[hsl(var(--indigo)_/_0.8)] gap-2">
              <FileText className="w-4 h-4" />
              CV Builder
            </Button>
          </div>
        </motion.div>

        {/* Job Readiness Dashboard */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Card className="border-2 border-[hsl(var(--indigo)_/_0.3)] bg-gradient-to-br from-[hsl(var(--indigo)_/_0.05)] to-transparent">
            <CardHeader>
              <CardTitle className="text-2xl font-display flex items-center gap-2">
                <Target className="w-6 h-6 text-[hsl(var(--indigo))]" />
                Job Readiness Score
              </CardTitle>
              <CardDescription>
                Il tuo livello di preparazione per il mercato del lavoro
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold">Readiness Complessivo</span>
                  <span className="font-display text-2xl font-bold text-[hsl(var(--indigo))]">
                    {placementStats.jobReadiness}%
                  </span>
                </div>
                <Progress value={placementStats.jobReadiness} className="h-3" />
                <p className="text-sm text-muted-foreground mt-2">
                  Ottimo progresso! Completa altri 2 moduli per raggiungere 80% e sbloccare più opportunità
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <FileText className="w-4 h-4" />
                    CV Score
                  </div>
                  <div className="font-display text-3xl font-bold">{placementStats.cvScore}%</div>
                </div>

                <div className="p-4 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Video className="w-4 h-4" />
                    Mock Interviews
                  </div>
                  <div className="font-display text-3xl font-bold">{placementStats.interviewsPrepared}</div>
                </div>

                <div className="p-4 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Send className="w-4 h-4" />
                    Candidature
                  </div>
                  <div className="font-display text-3xl font-bold">{placementStats.applicationsTotal}</div>
                </div>

                <div className="p-4 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Award className="w-4 h-4" />
                    Portfolio
                  </div>
                  <div className="font-display text-3xl font-bold">3/3</div>
                </div>
              </div>

              {placementStats.nextInterview && (
                <div className="p-4 rounded-xl bg-gradient-to-r from-[hsl(var(--amber))] to-[hsl(var(--amber)_/_0.8)] text-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5" />
                      <div>
                        <p className="text-sm font-medium opacity-90">Prossimo Colloquio</p>
                        <p className="font-semibold">{placementStats.nextInterview}</p>
                      </div>
                    </div>
                    <Button variant="secondary" className="bg-white text-[hsl(var(--amber))]">
                      Prepara
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content */}
        <Tabs defaultValue="jobs" className="space-y-6">
          <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-3">
            <TabsTrigger value="jobs" className="gap-2">
              <Briefcase className="w-4 h-4" />
              Job Match
            </TabsTrigger>
            <TabsTrigger value="applications" className="gap-2">
              <Send className="w-4 h-4" />
              Candidature
            </TabsTrigger>
            <TabsTrigger value="preparation" className="gap-2">
              <BookOpen className="w-4 h-4" />
              Preparazione
            </TabsTrigger>
          </TabsList>

          {/* Jobs Tab */}
          <TabsContent value="jobs">
            <motion.div
              initial="hidden"
              animate="show"
              variants={staggerContainer}
              className="space-y-4"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-display font-semibold">
                  Job Matching Personalizzato
                </h2>
                <Button variant="outline">
                  Filtra
                </Button>
              </div>

              {recommendedJobs.map((job) => (
                <motion.div key={job.id} variants={variants.fadeInUp}>
                  <Card className="border-2 hover:border-[hsl(var(--indigo)_/_0.3)] hover:shadow-lg transition-all">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-6">
                        {/* Company Logo */}
                        <Avatar className="h-16 w-16 flex-shrink-0 border-2 border-[hsl(var(--indigo)_/_0.2)]">
                          <AvatarFallback className="bg-gradient-to-br from-[hsl(var(--indigo))] to-[hsl(var(--amber))] text-white font-bold text-lg">
                            {job.logo}
                          </AvatarFallback>
                        </Avatar>

                        {/* Job Info */}
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="font-display text-xl font-semibold mb-1">
                                {job.position}
                              </h3>
                              <p className="text-lg text-muted-foreground">{job.company}</p>
                            </div>

                            <div className="flex gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => toggleSave(job.id)}
                                className={savedJobs.includes(job.id) ? "text-red-500" : ""}
                              >
                                <Heart className={`w-5 h-5 ${savedJobs.includes(job.id) ? "fill-current" : ""}`} />
                              </Button>
                              <Badge
                                className={`text-sm px-3 py-1 ${
                                  job.match >= 90
                                    ? "bg-[hsl(var(--sage)_/_0.1)] border-[hsl(var(--sage)_/_0.3)] text-[hsl(var(--sage))]"
                                    : "bg-[hsl(var(--amber)_/_0.1)] border-[hsl(var(--amber)_/_0.3)] text-[hsl(var(--amber))]"
                                }`}
                              >
                                <Sparkles className="w-3 h-3 mr-1" />
                                {job.match}% Match
                              </Badge>
                            </div>
                          </div>

                          <p className="text-muted-foreground mb-4">{job.description}</p>

                          <div className="flex flex-wrap gap-4 mb-4 text-sm">
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-muted-foreground" />
                              {job.location}
                            </div>
                            <div className="flex items-center gap-2">
                              <Euro className="w-4 h-4 text-muted-foreground" />
                              {job.salary}
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-muted-foreground" />
                              {job.posted}
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4 text-muted-foreground" />
                              {job.applicants} candidati
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2 mb-4">
                            {job.skills.map((skill, i) => (
                              <Badge key={i} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex gap-3">
                            <Button className="bg-gradient-to-r from-[hsl(var(--indigo))] to-[hsl(var(--indigo)_/_0.8)] gap-2">
                              <Send className="w-4 h-4" />
                              Candidati
                            </Button>
                            <Button variant="outline" className="gap-2">
                              <Building2 className="w-4 h-4" />
                              Azienda
                            </Button>
                            <Button variant="outline" className="gap-2">
                              <ExternalLink className="w-4 h-4" />
                              Dettagli
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          {/* Applications Tab */}
          <TabsContent value="applications">
            <motion.div
              initial="hidden"
              animate="show"
              variants={staggerContainer}
              className="space-y-4"
            >
              <h2 className="text-2xl font-display font-semibold mb-4">
                Le Tue Candidature
              </h2>

              {applications.map((app) => (
                <motion.div key={app.id} variants={variants.fadeInUp}>
                  <Card className="border-2">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-display text-xl font-semibold mb-1">
                            {app.position}
                          </h3>
                          <p className="text-muted-foreground">{app.company}</p>
                        </div>

                        <Badge
                          className={
                            app.status === "interview"
                              ? "bg-[hsl(var(--amber)_/_0.1)] border-[hsl(var(--amber)_/_0.3)] text-[hsl(var(--amber))]"
                              : app.status === "pending"
                              ? "bg-[hsl(var(--indigo)_/_0.1)] border-[hsl(var(--indigo)_/_0.3)] text-[hsl(var(--indigo))]"
                              : "bg-muted"
                          }
                        >
                          {app.status === "interview" ? "📞 Interview" : app.status === "pending" ? "⏳ Pending" : "❌ Rejected"}
                        </Badge>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Candidatura</p>
                          <p className="font-semibold">{app.appliedDate}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Fase Attuale</p>
                          <p className="font-semibold">{app.stage}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Prossimo Step</p>
                          <p className="font-semibold">{app.nextStep}</p>
                        </div>
                      </div>

                      {app.nextStepDate && (
                        <div className="p-3 rounded-lg bg-[hsl(var(--amber)_/_0.1)] border border-[hsl(var(--amber)_/_0.2)] mb-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-[hsl(var(--amber))]" />
                            <span className="text-sm font-semibold">
                              {app.nextStep} - {app.nextStepDate}
                            </span>
                          </div>
                        </div>
                      )}

                      <div className="flex gap-2">
                        {app.status === "interview" && (
                          <>
                            <Button variant="outline" size="sm" className="gap-2">
                              <Video className="w-3 h-3" />
                              Prepara Interview
                            </Button>
                            <Button variant="outline" size="sm" className="gap-2">
                              <MessageSquare className="w-3 h-3" />
                              Contatta Career Coach
                            </Button>
                          </>
                        )}
                        <Button variant="outline" size="sm" className="gap-2">
                          <ExternalLink className="w-3 h-3" />
                          Dettagli
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          {/* Preparation Tab */}
          <TabsContent value="preparation">
            <motion.div
              initial="hidden"
              animate="show"
              variants={staggerContainer}
              className="space-y-6"
            >
              <h2 className="text-2xl font-display font-semibold">
                Interview Preparation
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                {interviewPrep.map((item) => (
                  <motion.div key={item.id} variants={variants.fadeInUp}>
                    <Card className={`border-2 ${item.completed ? "opacity-75" : "hover:border-[hsl(var(--indigo)_/_0.3)]"}`}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                            <p className="text-sm text-muted-foreground">{item.duration} • {item.date}</p>
                          </div>
                          {item.completed && (
                            <CheckCircle2 className="w-6 h-6 text-[hsl(var(--sage))]" />
                          )}
                        </div>

                        <Button
                          variant={item.completed ? "outline" : "default"}
                          className={item.completed ? "" : "bg-gradient-to-r from-[hsl(var(--indigo))] to-[hsl(var(--indigo)_/_0.8)]"}
                          disabled={item.completed}
                        >
                          {item.completed ? "Completato" : item.type === "coaching" ? "Prenota" : "Inizia"}
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Career Coach CTA */}
              <Card className="border-2 border-[hsl(var(--indigo)_/_0.3)] bg-gradient-to-br from-[hsl(var(--indigo)_/_0.05)] to-transparent">
                <CardContent className="p-8 text-center">
                  <MessageSquare className="w-12 h-12 mx-auto mb-4 text-[hsl(var(--indigo))]" />
                  <h3 className="font-display text-2xl font-semibold mb-2">
                    Bisogno di Supporto?
                  </h3>
                  <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                    Il nostro Career Coach è disponibile per mock interview personalizzate, revisione CV e strategia di ricerca
                  </p>
                  <Button className="bg-gradient-to-r from-[hsl(var(--indigo))] to-[hsl(var(--indigo)_/_0.8)] gap-2">
                    <Calendar className="w-4 h-4" />
                    Prenota Sessione
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
