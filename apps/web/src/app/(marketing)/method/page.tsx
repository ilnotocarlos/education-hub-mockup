"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  BookOpen,
  Users,
  Briefcase,
  Brain,
  Video,
  MessageSquare,
  CheckCircle2,
  Clock,
  Target,
  Zap,
  ArrowRight,
  Play
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const }
  }
}

const steps = [
  {
    icon: BookOpen,
    title: "Assessment",
    description: "Valutiamo il tuo livello e disegniamo un percorso personalizzato con AI",
    color: "from-purple-500 to-pink-600",
    number: "01"
  },
  {
    icon: Users,
    title: "Learning",
    description: "Flipped Classroom: studio autonomo + pratica intensiva in aula con progetti reali",
    color: "from-blue-500 to-cyan-600",
    number: "02"
  },
  {
    icon: Briefcase,
    title: "Placement",
    description: "Job placement garantito con il nostro network di 250+ aziende partner",
    color: "from-amber-500 to-orange-600",
    number: "03"
  }
]

const flippedClassroomPhases = [
  {
    phase: "Pre-Lezione",
    icon: Video,
    title: "Studio Autonomo",
    description: "Contenuti video interattivi, readings e quiz preparatori da completare nel tuo tempo",
    benefits: [
      "Impari al tuo ritmo",
      "Puoi rivedere i concetti difficili",
      "Quiz di verifica immediata",
      "Materiali sempre disponibili"
    ],
    color: "from-[hsl(var(--indigo))] to-purple-600"
  },
  {
    phase: "In Aula",
    icon: Users,
    title: "Pratica Intensiva",
    description: "Workshop hands-on con progetti reali, pair programming e mentorship diretta",
    benefits: [
      "Applichi subito ciò che hai studiato",
      "Feedback immediato dal mentor",
      "Collabori con altri studenti",
      "Progetti portfolio-ready"
    ],
    color: "from-blue-500 to-cyan-600"
  },
  {
    phase: "Post-Lezione",
    icon: MessageSquare,
    title: "AI Tutoring",
    description: "Assistente AI personalizzato 24/7 per domande, code review e practice problems",
    benefits: [
      "Supporto sempre disponibile",
      "Risponde in pochi secondi",
      "Code review personalizzato",
      "Learning path adattivo"
    ],
    color: "from-[hsl(var(--amber))] to-orange-600"
  }
]

const comparison = {
  traditional: {
    label: "Metodo Tradizionale",
    items: [
      "Lezioni frontali passive",
      "Teoria in aula, pratica a casa",
      "Un ritmo per tutti",
      "Feedback differito",
      "Pochi progetti reali"
    ]
  },
  ours: {
    label: "Nostro Metodo",
    items: [
      "Learning by doing attivo",
      "Studio a casa, pratica in aula",
      "Percorso personalizzato",
      "Feedback immediato",
      "Portfolio di progetti reali"
    ]
  }
}

const aiFeatures = [
  {
    icon: Brain,
    title: "Personalizzazione",
    description: "L'AI analizza il tuo stile di apprendimento e adatta il percorso"
  },
  {
    icon: Clock,
    title: "24/7 Disponibile",
    description: "Ottieni aiuto in qualsiasi momento, senza aspettare"
  },
  {
    icon: Target,
    title: "Focus su Lacune",
    description: "Identifica automaticamente i concetti da rafforzare"
  },
  {
    icon: Zap,
    title: "Feedback Istantaneo",
    description: "Code review e correzioni in tempo reale"
  }
]

const results = [
  { metric: "2x", description: "Più efficace del metodo tradizionale" },
  { metric: "40%", description: "Tempo risparmiato su teoria" },
  { metric: "3-5", description: "Progetti reali nel portfolio" },
  { metric: "87%", description: "Placement rate entro 90 giorni" }
]

export default function MethodPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[hsl(var(--indigo)_/_0.1)] to-[hsl(var(--amber)_/_0.05)] py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeInUp}
            className="max-w-4xl mx-auto text-center"
          >
            <Badge className="mb-6 px-4 py-1.5 bg-[hsl(var(--indigo)_/_0.1)] border-[hsl(var(--indigo)_/_0.2)] text-[hsl(var(--indigo))]">
              Il Nostro Metodo
            </Badge>
            <h1 className="mb-6">
              Flipped Classroom <span className="text-[hsl(var(--indigo))]">+</span> AI Tutoring
              <br />
              <span className="text-[hsl(var(--amber))]">+</span> Real Projects
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Un approccio collaudato che combina l'efficacia del flipped classroom con
              il potere dell'AI e l'esperienza pratica su progetti reali.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="mb-4">Come Funziona</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Tre fasi interconnesse per massimizzare il tuo apprendimento
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.6 }}
                >
                  <Card className="relative p-8 h-full border-2 hover:border-[hsl(var(--indigo)_/_0.3)] transition-all hover:shadow-lg group">
                    <div className="absolute top-6 right-6 font-display text-6xl font-bold text-muted-foreground/10 group-hover:text-[hsl(var(--indigo)_/_0.1)] transition-colors">
                      {step.number}
                    </div>

                    <div className="mb-6 relative">
                      <div className={`absolute inset-0 bg-gradient-to-br ${step.color} rounded-2xl opacity-20 blur-xl`} />
                      <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                    </div>

                    <h3 className="font-display text-2xl font-semibold mb-3">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Flipped Classroom Detailed */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="mb-4">Il Flipped Classroom nel Dettaglio</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Tre momenti di apprendimento ottimizzati per la massima efficacia
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto space-y-8">
            {flippedClassroomPhases.map((phase, index) => {
              const Icon = phase.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <Card className="p-8 border-2 hover:border-[hsl(var(--indigo)_/_0.3)] transition-colors">
                    <div className="flex flex-col lg:flex-row gap-8 items-start">
                      <div className="shrink-0">
                        <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${phase.color} flex items-center justify-center mb-4`}>
                          <Icon className="w-10 h-10 text-white" />
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {phase.phase}
                        </Badge>
                      </div>

                      <div className="flex-grow">
                        <h3 className="font-display text-2xl font-semibold mb-3">
                          {phase.title}
                        </h3>
                        <p className="text-lg text-muted-foreground mb-6">
                          {phase.description}
                        </p>

                        <div className="grid sm:grid-cols-2 gap-3">
                          {phase.benefits.map((benefit, i) => (
                            <div key={i} className="flex items-start gap-2">
                              <CheckCircle2 className="w-5 h-5 text-[hsl(var(--indigo))] shrink-0 mt-0.5" />
                              <span className="text-sm">{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* AI Tutoring Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <Badge className="mb-4 px-4 py-1.5 bg-[hsl(var(--amber)_/_0.1)] border-[hsl(var(--amber)_/_0.2)] text-[hsl(var(--amber))]">
              AI-Powered
            </Badge>
            <h2 className="mb-4">Tutoring Intelligente 24/7</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Un assistente AI personale che ti segue in ogni momento del percorso
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
            {aiFeatures.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 text-center h-full hover:border-[hsl(var(--amber)_/_0.3)] transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[hsl(var(--amber)_/_0.2)] to-[hsl(var(--amber)_/_0.1)] flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-[hsl(var(--amber))]" />
                    </div>
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </Card>
                </motion.div>
              )
            })}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <Card className="p-8 bg-gradient-to-br from-[hsl(var(--amber)_/_0.05)] to-[hsl(var(--indigo)_/_0.05)] border-[hsl(var(--amber)_/_0.2)]">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[hsl(var(--amber))] to-orange-600 flex items-center justify-center shrink-0">
                  <Play className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Prova l'AI Tutor</h3>
                  <p className="text-muted-foreground mb-4">
                    Fai una domanda, chiedi una code review, o richiedi esercizi personalizzati
                  </p>
                  <Button variant="outline" asChild>
                    <Link href="/discover">
                      Inizia Assessment Gratuito
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="mb-4">Perché Funziona Meglio</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Il confronto tra metodo tradizionale e il nostro approccio
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="grid md:grid-cols-2 gap-8">
              {/* Traditional */}
              <Card className="p-6">
                <h3 className="font-display text-xl font-semibold mb-6 text-muted-foreground">
                  {comparison.traditional.label}
                </h3>
                <ul className="space-y-3">
                  {comparison.traditional.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-muted-foreground">
                      <div className="w-5 h-5 rounded-full border border-muted-foreground/30 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              {/* Ours */}
              <Card className="p-6 border-2 border-[hsl(var(--indigo)_/_0.3)] bg-gradient-to-br from-[hsl(var(--indigo)_/_0.05)] to-[hsl(var(--amber)_/_0.05)]">
                <h3 className="font-display text-xl font-semibold mb-6 text-[hsl(var(--indigo))]">
                  {comparison.ours.label}
                </h3>
                <ul className="space-y-3">
                  {comparison.ours.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-[hsl(var(--indigo))] shrink-0 mt-0.5" />
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-24 bg-gradient-to-br from-[hsl(var(--indigo))] to-[hsl(var(--indigo)_/_0.9)] text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="mb-4">I Risultati Parlano Chiaro</h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Metriche concrete che dimostrano l'efficacia del metodo
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {results.map((result, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="font-display text-6xl font-bold mb-2">
                  {result.metric}
                </div>
                <div className="text-white/80">
                  {result.description}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="mb-6">Pronto a Sperimentare il Metodo?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Fai l'assessment gratuito e scopri il percorso personalizzato per te
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                asChild
                className="bg-gradient-to-r from-[hsl(var(--indigo))] to-[hsl(var(--indigo)_/_0.8)] hover:shadow-xl text-lg px-8 py-6"
              >
                <Link href="/discover">
                  Inizia Assessment Gratuito
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="text-lg px-8 py-6"
              >
                <Link href="/courses">
                  Esplora i Corsi
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
