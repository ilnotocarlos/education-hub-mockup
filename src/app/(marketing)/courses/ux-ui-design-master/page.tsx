"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Navigation } from "@/components/shared/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  CheckCircle2,
  Users,
  TrendingUp,
  Award,
  Calendar,
  Euro,
  BookOpen,
  Brain,
  Briefcase,
  Sparkles,
  Clock,
  Target,
  ChevronRight,
  Play,
  Download,
  Globe,
  Shield,
  Zap
} from "lucide-react"

const stats = [
  { icon: TrendingUp, label: "Placement Rate", value: "92%", subtitle: "entro 3 mesi" },
  { icon: Euro, label: "Salary Medio", value: "€28-35k", subtitle: "primo impiego" },
  { icon: Users, label: "Class Size", value: "Max 20", subtitle: "studenti" },
  { icon: Award, label: "Portfolio", value: "3 Progetti", subtitle: "reali" }
]

const curriculum = [
  {
    weeks: "1-3",
    title: "Design Foundations",
    topics: [
      "Design thinking & user research",
      "Figma fundamentals",
      "Visual design principles"
    ],
    color: "indigo"
  },
  {
    weeks: "4-6",
    title: "UX Core",
    topics: [
      "User research & interviews",
      "Information architecture",
      "Wireframing & prototyping"
    ],
    color: "amber"
  },
  {
    weeks: "7-9",
    title: "UI & Development Handoff",
    topics: [
      "Design systems",
      "Interaction design & animation",
      "Collaboration con developers"
    ],
    color: "sage"
  },
  {
    weeks: "10-12",
    title: "Capstone Project",
    topics: [
      "Progetto end-to-end con azienda partner"
    ],
    color: "gold"
  }
]

const methodology = [
  {
    icon: BookOpen,
    title: "Flipped Classroom",
    description: "Studia contenuti prima → Lavoro pratico in aula",
    color: "indigo"
  },
  {
    icon: Brain,
    title: "AI-Powered Learning",
    description: "Percorso personalizzato in base ai tuoi progressi",
    color: "amber"
  },
  {
    icon: Briefcase,
    title: "Real Projects",
    description: "Lavori su brief reali di aziende partner",
    color: "sage"
  }
]

const benefits = [
  "Portfolio con 3 case study professionali",
  "Certificato blockchain verificabile",
  "Badge LinkedIn per ogni modulo",
  "Placement support con 50+ aziende partner",
  "Accesso community alumni 2 anni",
  "Contenuti aggiornati continuous learning"
]

const upcomingDates = [
  { date: "10 Marzo 2026", available: 8, total: 20 },
  { date: "5 Maggio 2026", available: 18, total: 20 }
]

const testimonials = [
  {
    name: "Marco Bianchi",
    role: "Product Designer @ Spotify",
    avatar: "MB",
    quote: "In 12 settimane ho acquisito più competenze pratiche che in 3 anni di università. Il placement è stato velocissimo.",
    rating: 5
  },
  {
    name: "Sofia Romano",
    role: "UX Designer @ Bending Spoons",
    avatar: "SR",
    quote: "Il metodo flipped classroom e l'AI tutor hanno fatto la differenza. Nessun corso tradizionale offre questo livello.",
    rating: 5
  },
  {
    name: "Luca Ferrari",
    role: "Senior Designer @ Miro",
    avatar: "LF",
    quote: "Portfolio reale, feedback da professionisti, placement garantito. Best investment del 2025.",
    rating: 5
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

export default function ProductPage() {
  return (
    <div className="min-h-screen grain-texture">
      <Navigation />

      <div className="editorial-grid py-8 space-y-16">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div className="flex-1">
              <Badge className="mb-4 px-4 py-2 bg-[hsl(var(--indigo)_/_0.1)] border-[hsl(var(--indigo)_/_0.2)] text-[hsl(var(--indigo))]">
                <Sparkles className="w-3 h-3 mr-2" />
                Placement Garantito
              </Badge>
              <h1 className="mb-4">
                UX/UI Design Master
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mb-6">
                12 settimane intensive per trasformarti in Product Designer job-ready con portfolio reale e certificazioni blockchain
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  12 settimane
                </span>
                <span>•</span>
                <span className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Full-time
                </span>
                <span>•</span>
                <span className="flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Placement garantito
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                size="lg"
                className="bg-gradient-to-r from-[hsl(var(--indigo))] to-[hsl(var(--indigo)_/_0.8)] text-lg px-8"
                asChild
              >
                <Link href="/apply">
                  Candidati Ora
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8">
                Prenota Colloquio
              </Button>
            </div>
          </div>

          {/* Video Hero */}
          <Card className="overflow-hidden border-2">
            <div className="relative aspect-video bg-gradient-to-br from-[hsl(var(--indigo))] to-[hsl(var(--indigo)_/_0.8)]">
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    className="rounded-full w-24 h-24 bg-white/20 backdrop-blur-sm hover:bg-white/30"
                  >
                    <Play className="w-12 h-12 text-white ml-2" />
                  </Button>
                </motion.div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <p className="text-white font-semibold text-lg">
                  Alumni Success Stories - Guarda come hanno trovato lavoro
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <motion.div key={stat.label} variants={fadeInUp}>
                <Card className="border-2 hover:border-[hsl(var(--indigo)_/_0.3)] transition-all hover:shadow-lg text-center">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-[hsl(var(--indigo)_/_0.1)] to-transparent flex items-center justify-center">
                      <Icon className="w-6 h-6 text-[hsl(var(--indigo))]" />
                    </div>
                    <div className="font-display text-3xl font-bold mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm font-semibold text-muted-foreground mb-1">
                      {stat.label}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {stat.subtitle}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Curriculum */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <h2 className="mb-4">Programma del Master</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              12 settimane strutturate per portarti da zero a job-ready
            </p>
          </motion.div>

          <div className="space-y-6">
            {curriculum.map((module, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="border-2 hover:border-[hsl(var(--indigo)_/_0.3)] transition-all hover:shadow-xl">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-br from-[hsl(var(--${module.color})_/_0.1)] to-transparent`}>
                        <Badge variant="outline" className="text-lg font-mono">
                          Week {module.weeks}
                        </Badge>
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-2xl font-display mb-2">
                          {module.title}
                        </CardTitle>
                        <ul className="space-y-2 mt-4">
                          {module.topics.map((topic, i) => (
                            <li key={i} className="flex items-start gap-3 text-muted-foreground">
                              <CheckCircle2 className={`w-5 h-5 mt-0.5 text-[hsl(var(--${module.color}))] flex-shrink-0`} />
                              <span>{topic}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Methodology */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <h2 className="mb-4">Metodo Education Hub</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Non lezioni tradizionali. Apprendimento attivo, personalizzato e basato su progetti reali.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {methodology.map((item, index) => {
              const Icon = item.icon
              return (
                <motion.div key={index} variants={fadeInUp}>
                  <Card className="border-2 hover:border-[hsl(var(--indigo)_/_0.3)] transition-all hover:shadow-xl h-full">
                    <CardContent className="p-8 text-center">
                      <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[hsl(var(--${item.color}))] to-[hsl(var(--${item.color})_/_0.8)] flex items-center justify-center`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-display font-semibold mb-3">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Benefits */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <Card className="border-2 border-[hsl(var(--amber)_/_0.3)] bg-gradient-to-br from-[hsl(var(--amber)_/_0.05)] to-transparent">
            <CardHeader>
              <CardTitle className="text-3xl font-display text-center">
                Cosa Ottieni
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-6 h-6 text-[hsl(var(--amber))] flex-shrink-0 mt-0.5" />
                    <span className="text-lg">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <h2 className="mb-4">Alumni Success Stories</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Studenti che hanno trasformato la loro carriera in 12 settimane
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="border-2 h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Avatar className="h-12 w-12 border-2 border-[hsl(var(--indigo)_/_0.2)]">
                        <AvatarFallback className="bg-gradient-to-br from-[hsl(var(--indigo))] to-[hsl(var(--amber))] text-white font-semibold">
                          {testimonial.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      "{testimonial.quote}"
                    </p>
                    <div className="flex gap-1">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <span key={i} className="text-[hsl(var(--amber))]">⭐</span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Pricing & Dates */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid lg:grid-cols-2 gap-8"
        >
          {/* Pricing */}
          <motion.div variants={fadeInUp}>
            <Card className="border-2 h-full">
              <CardHeader>
                <CardTitle className="text-2xl font-display flex items-center gap-2">
                  <Euro className="w-6 h-6 text-[hsl(var(--indigo))]" />
                  Investimento
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="font-display text-5xl font-bold mb-2">
                    €6.500
                  </div>
                  <p className="text-muted-foreground">
                    Pagamento unico
                  </p>
                </div>

                <Separator />

                <div>
                  <div className="font-display text-3xl font-bold mb-2">
                    €750/mese
                  </div>
                  <p className="text-muted-foreground">
                    Rateizzazione × 10 mesi
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-[hsl(var(--sage)_/_0.1)] border-2 border-[hsl(var(--sage)_/_0.2)]">
                  <p className="flex items-center gap-2 text-sm font-semibold text-[hsl(var(--sage))]">
                    <Shield className="w-4 h-4" />
                    Finanziamento 0% disponibile
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Dates */}
          <motion.div variants={fadeInUp}>
            <Card className="border-2 h-full">
              <CardHeader>
                <CardTitle className="text-2xl font-display flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-[hsl(var(--amber))]" />
                  Prossime Date
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingDates.map((cohort, index) => (
                  <div
                    key={index}
                    className="p-5 rounded-xl border-2 hover:border-[hsl(var(--indigo)_/_0.3)] transition-all"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="font-semibold text-lg">{cohort.date}</div>
                      <Badge
                        variant={cohort.available < 10 ? "destructive" : "outline"}
                        className={cohort.available < 10 ? "bg-[hsl(var(--amber))]" : ""}
                      >
                        {cohort.available < 10 ? "Ultimi posti!" : "Disponibile"}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <Progress
                        value={((cohort.total - cohort.available) / cohort.total) * 100}
                        className="h-2"
                      />
                      <p className="text-sm text-muted-foreground">
                        {cohort.available}/{cohort.total} posti disponibili
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-2xl"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--indigo))] to-[hsl(var(--indigo)_/_0.8)]" />
          <div className="relative p-12 text-center text-white">
            <h2 className="text-white mb-4">
              Pronto a Trasformare la Tua Carriera?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Unisciti a centinaia di alumni che hanno trovato lavoro come designer in aziende top
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-[hsl(var(--indigo))] hover:bg-white/90 text-lg px-8"
                asChild
              >
                <Link href="/apply">
                  Candidati Ora
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10 text-lg px-8"
              >
                <Download className="w-5 h-5 mr-2" />
                Scarica Syllabus
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
