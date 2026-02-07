"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { usePageTransition } from "@/hooks/use-page-transition"
import {
  Settings,
  Award,
  Briefcase,
  Calendar,
  MapPin,
  Mail,
  Globe,
  Github,
  Linkedin,
  ExternalLink,
  Download,
  Share2,
  TrendingUp,
  Clock,
  CheckCircle2,
  Target,
  BookOpen,
  Code,
  Palette,
  Users,
  Sparkles,
  Trophy
} from "lucide-react"

// Mock data
const userProfile = {
  name: "Filippo Rossi",
  email: "filippo.rossi@example.com",
  avatar: "/avatars/filippo.svg",
  role: "UX/UI Designer in Training",
  location: "Milano, Italia",
  joinedDate: "Gennaio 2026",
  bio: "Appassionato di design centrato sull'utente e innovazione digitale. Sto imparando a creare esperienze digitali che fanno la differenza. Il mio obiettivo è lavorare per un'azienda tech innovativa dove posso contribuire con creatività e problem-solving.",
  website: "filippor.design",
  github: "filipporossi",
  linkedin: "filippo-rossi-ux",
  stats: {
    coursesCompleted: 0,
    coursesInProgress: 1,
    totalHours: 47.5,
    certificatesEarned: 0,
    projectsCompleted: 2,
    skillsAcquired: 8
  }
}

const portfolioProjects = [
  {
    id: 1,
    title: "E-commerce Redesign: Sustainable Fashion",
    description: "Redesign completo dell'esperienza di acquisto per un brand di moda sostenibile, con focus su storytelling e trasparenza della supply chain.",
    thumbnail: "/projects/ecommerce.jpg",
    category: "UX/UI Design",
    status: "completed",
    date: "Marzo 2026",
    tags: ["Figma", "User Research", "Prototyping", "Visual Design"],
    metrics: {
      duration: "3 settimane",
      team: "Individuale",
      impact: "+35% conversion rate (simulato)"
    }
  },
  {
    id: 2,
    title: "Health App: Habit Tracker",
    description: "App mobile per tracking di abitudini salutari con gamification e insights basati su AI per motivare comportamenti positivi.",
    thumbnail: "/projects/health-app.jpg",
    category: "Mobile Design",
    status: "completed",
    date: "Aprile 2026",
    tags: ["Mobile First", "Gamification", "Data Visualization"],
    metrics: {
      duration: "2 settimane",
      team: "Pair Programming",
      impact: "User testing: 4.8/5"
    }
  },
  {
    id: 3,
    title: "SaaS Dashboard: Analytics Platform",
    description: "Dashboard per piattaforma analytics B2B con focus su data visualization chiara e actionable insights per decision makers.",
    thumbnail: "/projects/dashboard.jpg",
    category: "Web Design",
    status: "in-progress",
    date: "In corso",
    tags: ["Dashboard", "Data Viz", "B2B", "Complex UI"],
    metrics: {
      duration: "In corso",
      team: "Squad da 4",
      impact: "TBD"
    }
  }
]

const progressTimeline = [
  {
    date: "Maggio 2026",
    title: "Modulo 2 Completato: Wireframing & Prototyping",
    description: "Completato modulo avanzato su wireframing low-fi e high-fi, con project deliverable approvato.",
    type: "milestone",
    icon: CheckCircle2
  },
  {
    date: "Aprile 2026",
    title: "Progetto Portfolio: Health Habit Tracker",
    description: "Secondo progetto portfolio completato con user testing reale su 12 utenti.",
    type: "project",
    icon: Award
  },
  {
    date: "Marzo 2026",
    title: "Modulo 1 Completato: User Research",
    description: "Fondamenti di user research, personas, journey mapping e interviste qualitative.",
    type: "milestone",
    icon: CheckCircle2
  },
  {
    date: "Febbraio 2026",
    title: "Primo Progetto Portfolio Pubblicato",
    description: "E-commerce redesign completato e pubblicato su Behance con ottime recensioni dalla community.",
    type: "project",
    icon: Award
  },
  {
    date: "Gennaio 2026",
    title: "Iscrizione al Master UX/UI Design",
    description: "Inizio del percorso formativo dopo aver completato assessment e pre-onboarding.",
    type: "start",
    icon: Sparkles
  }
]

const skills = [
  { name: "User Research", level: 75, category: "Research" },
  { name: "Wireframing", level: 80, category: "Design" },
  { name: "Prototyping", level: 70, category: "Design" },
  { name: "Visual Design", level: 65, category: "Design" },
  { name: "Figma", level: 85, category: "Tools" },
  { name: "User Testing", level: 70, category: "Research" },
  { name: "Information Architecture", level: 60, category: "Research" },
  { name: "Interaction Design", level: 65, category: "Design" }
]

const certificates = [
  {
    id: 1,
    title: "User Research Fundamentals",
    issuer: "Education Hub",
    date: "Marzo 2026",
    credentialId: "UXR-2026-001234",
    blockchain: true,
    verified: true
  },
  {
    id: 2,
    title: "Wireframing & Prototyping",
    issuer: "Education Hub",
    date: "Maggio 2026",
    credentialId: "WFP-2026-001235",
    blockchain: true,
    verified: true
  }
]

export default function ProfilePage() {
  const { variants, createStaggerContainer } = usePageTransition()
  const staggerContainer = createStaggerContainer(0.1)
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen grain-texture">
      <div className="editorial-grid py-8 space-y-8">
        {/* Profile Header Card */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="border-2 overflow-hidden">
            <div className="relative h-32 bg-gradient-to-r from-[hsl(var(--indigo))] via-[hsl(var(--amber))] to-[hsl(var(--sage))]">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                  backgroundSize: '24px 24px'
                }} />
              </div>
            </div>

            <CardContent className="pt-0 pb-8">
              <div className="flex flex-col md:flex-row gap-6 items-start md:items-end -mt-16 relative">
                {/* Avatar */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--indigo))] to-[hsl(var(--amber))] rounded-full blur-xl opacity-50" />
                  <Avatar className="relative h-32 w-32 border-4 border-background">
                    <AvatarImage src={userProfile.avatar} />
                    <AvatarFallback className="bg-gradient-to-br from-[hsl(var(--indigo))] to-[hsl(var(--amber))] text-white text-3xl font-bold">
                      FR
                    </AvatarFallback>
                  </Avatar>
                </div>

                {/* Info */}
                <div className="flex-1 space-y-4">
                  <div>
                    <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">
                      {userProfile.name}
                    </h1>
                    <p className="text-xl text-muted-foreground mb-3">
                      {userProfile.role}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {userProfile.location}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Iscritto da {userProfile.joinedDate}
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        {userProfile.email}
                      </div>
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="flex flex-wrap items-center gap-3">
                    <Button variant="outline" size="sm" asChild>
                      <a href={`https://${userProfile.website}`} target="_blank" rel="noopener noreferrer">
                        <Globe className="w-4 h-4 mr-2" />
                        Portfolio
                        <ExternalLink className="w-3 h-3 ml-1" />
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <a href={`https://github.com/${userProfile.github}`} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" />
                        GitHub
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <a href={`https://linkedin.com/in/${userProfile.linkedin}`} target="_blank" rel="noopener noreferrer">
                        <Linkedin className="w-4 h-4 mr-2" />
                        LinkedIn
                      </a>
                    </Button>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <Share2 className="w-4 h-4" />
                  </Button>
                  <Button asChild>
                    <Link href="/settings">
                      <Settings className="w-4 h-4 mr-2" />
                      Modifica Profilo
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Bio */}
              <div className="mt-6 max-w-3xl">
                <p className="text-muted-foreground leading-relaxed">
                  {userProfile.bio}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={staggerContainer}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          {[
            { label: "Corsi in Corso", value: userProfile.stats.coursesInProgress, icon: BookOpen, color: "indigo" },
            { label: "Ore Studio", value: Math.round(userProfile.stats.totalHours), icon: Clock, color: "amber" },
            { label: "Progetti", value: userProfile.stats.projectsCompleted, icon: Award, color: "sage" },
            { label: "Certificati", value: userProfile.stats.certificatesEarned, icon: Trophy, color: "gold" },
            { label: "Skills", value: userProfile.stats.skillsAcquired, icon: Target, color: "indigo" },
            { label: "Corsi Completi", value: userProfile.stats.coursesCompleted, icon: CheckCircle2, color: "sage" }
          ].map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div key={stat.label} variants={variants.fadeInUp}>
                <Card className="border-2 hover:border-[hsl(var(--indigo)_/_0.3)] transition-all">
                  <CardContent className="p-4 text-center">
                    <div className={`inline-flex p-2 rounded-lg bg-[hsl(var(--${stat.color})_/_0.1)] mb-2`}>
                      <Icon className={`w-5 h-5 text-[hsl(var(--${stat.color}))]`} />
                    </div>
                    <div className="font-display text-3xl font-bold mb-1">
                      {stat.value}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="portfolio" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
            <TabsTrigger value="portfolio" className="gap-2">
              <Briefcase className="w-4 h-4" />
              Portfolio
            </TabsTrigger>
            <TabsTrigger value="skills" className="gap-2">
              <Target className="w-4 h-4" />
              Skills
            </TabsTrigger>
            <TabsTrigger value="certificates" className="gap-2">
              <Award className="w-4 h-4" />
              Certificati
            </TabsTrigger>
            <TabsTrigger value="timeline" className="gap-2">
              <TrendingUp className="w-4 h-4" />
              Progress
            </TabsTrigger>
          </TabsList>

          {/* Portfolio Tab */}
          <TabsContent value="portfolio" className="space-y-6">
            <motion.div
              initial="hidden"
              animate="show"
              variants={staggerContainer}
              className="grid md:grid-cols-2 gap-6"
            >
              {portfolioProjects.map((project) => (
                <motion.div key={project.id} variants={variants.fadeInUp}>
                  <Card className="border-2 hover:border-[hsl(var(--indigo)_/_0.3)] hover:shadow-xl transition-all group h-full">
                    {/* Project Thumbnail */}
                    <div className="relative h-48 bg-gradient-to-br from-[hsl(var(--indigo)_/_0.1)] to-[hsl(var(--amber)_/_0.1)] overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Palette className="w-16 h-16 text-[hsl(var(--indigo)_/_0.2)]" />
                      </div>
                      <div className="absolute top-4 right-4">
                        <Badge variant={project.status === "completed" ? "default" : "secondary"}>
                          {project.status === "completed" ? "Completato" : "In Corso"}
                        </Badge>
                      </div>
                    </div>

                    <CardHeader>
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <CardTitle className="text-xl font-display group-hover:text-[hsl(var(--indigo))] transition-colors">
                          {project.title}
                        </CardTitle>
                      </div>
                      <CardDescription className="text-sm leading-relaxed">
                        {project.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {/* Metrics */}
                      <div className="grid grid-cols-3 gap-4 pt-4 border-t text-sm">
                        <div>
                          <p className="text-muted-foreground text-xs mb-1">Durata</p>
                          <p className="font-semibold">{project.metrics.duration}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs mb-1">Team</p>
                          <p className="font-semibold">{project.metrics.team}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs mb-1">Impact</p>
                          <p className="font-semibold text-xs">{project.metrics.impact}</p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 pt-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <ExternalLink className="w-3 h-3 mr-2" />
                          View Project
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Share2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          {/* Skills Tab */}
          <TabsContent value="skills" className="space-y-6">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-2xl font-display">Competenze Acquisite</CardTitle>
                <CardDescription>
                  Skills sviluppate durante il percorso formativo
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {["Research", "Design", "Tools"].map((category) => (
                  <div key={category}>
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      {category === "Research" && <Users className="w-4 h-4" />}
                      {category === "Design" && <Palette className="w-4 h-4" />}
                      {category === "Tools" && <Code className="w-4 h-4" />}
                      {category}
                    </h3>
                    <div className="space-y-4">
                      {skills.filter(s => s.category === category).map((skill) => (
                        <div key={skill.name}>
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">{skill.name}</span>
                            <span className="text-sm text-muted-foreground">{skill.level}%</span>
                          </div>
                          <Progress value={skill.level} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Certificates Tab */}
          <TabsContent value="certificates" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {certificates.map((cert) => (
                <Card key={cert.id} className="border-2 hover:border-[hsl(var(--sage)_/_0.3)] hover:shadow-xl transition-all">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div className="p-3 rounded-xl bg-[hsl(var(--sage)_/_0.1)]">
                        <Award className="w-6 h-6 text-[hsl(var(--sage))]" />
                      </div>
                      {cert.verified && (
                        <Badge className="bg-[hsl(var(--sage)_/_0.1)] text-[hsl(var(--sage))] border-[hsl(var(--sage)_/_0.3)]">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Verificato
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-xl font-display">{cert.title}</CardTitle>
                    <CardDescription>
                      {cert.issuer} · {cert.date}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Credential ID</p>
                      <p className="font-mono text-sm font-semibold">{cert.credentialId}</p>
                    </div>
                    {cert.blockchain && (
                      <div className="flex items-center gap-2 text-sm text-[hsl(var(--sage))]">
                        <Sparkles className="w-4 h-4" />
                        <span>Certificato blockchain-verified</span>
                      </div>
                    )}
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Download className="w-3 h-3 mr-2" />
                        Download
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1" asChild>
                        <Link href="/certificates">
                          <ExternalLink className="w-3 h-3 mr-2" />
                          View NFT
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Timeline Tab */}
          <TabsContent value="timeline" className="space-y-6">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-2xl font-display">Progress Timeline</CardTitle>
                <CardDescription>
                  Il tuo percorso di crescita nel tempo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {progressTimeline.map((item, index) => {
                    const Icon = item.icon
                    return (
                      <div key={index} className="flex gap-4">
                        <div className="relative">
                          <div className={`p-3 rounded-full ${
                            item.type === "milestone" ? "bg-[hsl(var(--sage)_/_0.1)]" :
                            item.type === "project" ? "bg-[hsl(var(--amber)_/_0.1)]" :
                            "bg-[hsl(var(--indigo)_/_0.1)]"
                          }`}>
                            <Icon className={`w-5 h-5 ${
                              item.type === "milestone" ? "text-[hsl(var(--sage))]" :
                              item.type === "project" ? "text-[hsl(var(--amber))]" :
                              "text-[hsl(var(--indigo))]"
                            }`} />
                          </div>
                          {index < progressTimeline.length - 1 && (
                            <div className="absolute top-14 left-1/2 -translate-x-1/2 w-0.5 h-16 bg-border" />
                          )}
                        </div>
                        <div className="flex-1 pb-8">
                          <p className="text-sm text-muted-foreground mb-1">{item.date}</p>
                          <h3 className="font-display text-lg font-semibold mb-2">{item.title}</h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
