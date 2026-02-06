"use client"

import * as React from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  Clock,
  Users,
  Star,
  CheckCircle2,
  BookOpen,
  Award,
  TrendingUp,
  ArrowRight
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MOCK_COURSES } from "@/lib/data/courses-mock"

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const }
  }
}

// Mock curriculum data (in a real app, this would come from API)
const MOCK_CURRICULUM = {
  "ux-ui-design-master": [
    {
      module: "Fondamenti UX",
      lessons: ["Introduzione User Experience", "User Research Methods", "Personas & User Journey", "Information Architecture"]
    },
    {
      module: "UI Design",
      lessons: ["Visual Design Principles", "Typography & Color Theory", "Design Systems", "Figma Advanced"]
    },
    {
      module: "Prototyping",
      lessons: ["Wireframing Techniques", "High-Fidelity Prototypes", "Micro-interactions", "Usability Testing"]
    },
    {
      module: "Portfolio & Placement",
      lessons: ["Case Study Development", "Portfolio Website", "Interview Prep", "Job Search Strategy"]
    }
  ],
  "full-stack-development": [
    {
      module: "Frontend Fundamentals",
      lessons: ["HTML/CSS/JS Essentials", "React Basics", "State Management", "TypeScript"]
    },
    {
      module: "Backend Development",
      lessons: ["Node.js & Express", "RESTful APIs", "Authentication & Security", "Database Design"]
    },
    {
      module: "Full-Stack Integration",
      lessons: ["Next.js App Router", "tRPC", "Prisma ORM", "Real-time Features"]
    },
    {
      module: "DevOps & Deploy",
      lessons: ["Git Workflow", "CI/CD Pipelines", "Docker Basics", "Production Deploy"]
    }
  ],
  "product-management": [
    {
      module: "Product Strategy",
      lessons: ["Vision & Roadmap", "Market Analysis", "Competitive Research", "OKRs & Metrics"]
    },
    {
      module: "Product Development",
      lessons: ["Agile & Scrum", "User Stories", "Prioritization Frameworks", "MVP Definition"]
    },
    {
      module: "Stakeholder Management",
      lessons: ["Communication Skills", "Presenting to Executives", "Managing Engineering Teams", "Conflict Resolution"]
    },
    {
      module: "Analytics & Growth",
      lessons: ["Product Analytics", "A/B Testing", "Growth Strategies", "Data-Driven Decisions"]
    }
  ],
  "data-science-ai": [
    {
      module: "Python Fundamentals",
      lessons: ["Python Basics", "NumPy & Pandas", "Data Visualization", "Statistical Analysis"]
    },
    {
      module: "Machine Learning",
      lessons: ["Supervised Learning", "Unsupervised Learning", "Model Evaluation", "Feature Engineering"]
    },
    {
      module: "Deep Learning",
      lessons: ["Neural Networks", "TensorFlow/PyTorch", "CNN & RNN", "Transfer Learning"]
    },
    {
      module: "Real-World Projects",
      lessons: ["Customer Segmentation", "Predictive Analytics", "NLP Applications", "Portfolio Capstone"]
    }
  ]
}

export default function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = React.use(params)
  const course = MOCK_COURSES.find((c) => c.slug === slug)

  if (!course) {
    notFound()
  }

  const curriculum = MOCK_CURRICULUM[course.id as keyof typeof MOCK_CURRICULUM] || []

  return (
    <div className="min-h-screen">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-6">
        <Button variant="ghost" asChild>
          <Link href="/courses">
            <ArrowLeft className="mr-2 w-4 h-4" />
            Torna ai Corsi
          </Link>
        </Button>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[hsl(var(--indigo)_/_0.1)] to-[hsl(var(--amber)_/_0.05)] py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Info */}
            <motion.div
              initial="hidden"
              animate="show"
              variants={fadeInUp}
            >
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary">{course.category}</Badge>
                <Badge variant="outline">{course.level}</Badge>
              </div>

              <h1 className="mb-4">{course.title}</h1>

              <p className="text-xl text-muted-foreground mb-6">
                {course.description}
              </p>

              {/* Stats */}
              <div className="flex flex-wrap items-center gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[hsl(var(--indigo))]" />
                  <div>
                    <div className="text-sm text-muted-foreground">Durata</div>
                    <div className="font-semibold">{course.duration}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-[hsl(var(--indigo))]" />
                  <div>
                    <div className="text-sm text-muted-foreground">Studenti</div>
                    <div className="font-semibold">{course.students} attivi</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                  <div>
                    <div className="text-sm text-muted-foreground">Rating</div>
                    <div className="font-semibold">{course.rating}/5.0</div>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  asChild
                  className="bg-gradient-to-r from-[hsl(var(--indigo))] to-[hsl(var(--indigo)_/_0.8)] hover:shadow-xl"
                >
                  <Link href="/apply">
                    Candidati Ora
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/discover">Fai l'Assessment</Link>
                </Button>
              </div>
            </motion.div>

            {/* Right Column - Price Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <Card className="p-8 border-2 border-[hsl(var(--indigo)_/_0.2)] shadow-xl">
                <div className="text-center mb-6">
                  <div className="text-sm text-muted-foreground mb-2">Investimento</div>
                  <div className="font-display text-5xl font-bold mb-2">
                    €{course.price.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Pagamento rateizzabile
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  {course.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-[hsl(var(--indigo))] shrink-0 mt-0.5" />
                      <span className="text-sm">{highlight}</span>
                    </div>
                  ))}
                </div>

                <Button size="lg" className="w-full bg-[hsl(var(--amber))]" asChild>
                  <Link href="/apply">
                    Candidati Ora
                  </Link>
                </Button>

                <p className="text-xs text-center text-muted-foreground mt-4">
                  Posti limitati - Prossima Cohort: Marzo 2026
                </p>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Curriculum Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <Badge className="mb-4 px-4 py-1.5 bg-[hsl(var(--indigo)_/_0.1)] border-[hsl(var(--indigo)_/_0.2)] text-[hsl(var(--indigo))]">
              Curriculum
            </Badge>
            <h2 className="mb-4">Cosa Imparerai</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Un percorso strutturato che ti porta da zero a professionista
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-6">
            {curriculum.map((module, moduleIndex) => (
              <motion.div
                key={moduleIndex}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: moduleIndex * 0.1 }}
              >
                <Card className="p-6 hover:border-[hsl(var(--indigo)_/_0.3)] transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="bg-gradient-to-br from-[hsl(var(--indigo))] to-[hsl(var(--indigo)_/_0.8)] text-white w-12 h-12 rounded-xl flex items-center justify-center font-display text-xl font-bold shrink-0">
                      {moduleIndex + 1}
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-display text-xl font-semibold mb-3">
                        {module.module}
                      </h3>
                      <div className="grid sm:grid-cols-2 gap-2">
                        {module.lessons.map((lesson, lessonIndex) => (
                          <div key={lessonIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <BookOpen className="w-4 h-4 text-[hsl(var(--amber))]" />
                            <span>{lesson}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Instructor Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <Card className="p-8 border-2">
                <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                  {/* Instructor Avatar */}
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[hsl(var(--indigo))] to-[hsl(var(--amber))] flex items-center justify-center text-white font-display text-3xl font-bold shrink-0">
                    {course.instructor.split(" ").map(n => n[0]).join("")}
                  </div>

                  <div className="flex-grow text-center md:text-left">
                    <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
                      <h3 className="font-display text-2xl font-semibold">
                        {course.instructor}
                      </h3>
                      <Award className="w-5 h-5 text-[hsl(var(--amber))]" />
                    </div>
                    <p className="text-muted-foreground mb-4">
                      Lead Instructor - {course.category}
                    </p>
                    <p className="text-sm leading-relaxed">
                      Con oltre 15 anni di esperienza nel settore e 1000+ studenti formati,
                      {" "}{course.instructor.split(" ")[0]} è riconosciuto/a come uno dei migliori
                      esperti di {course.category} in Italia. Ha lavorato con aziende come Google,
                      Amazon e startup unicorns.
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Outcomes Section */}
      <section className="py-16 bg-gradient-to-br from-[hsl(var(--indigo))] to-[hsl(var(--indigo)_/_0.9)] text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <h2 className="mb-4">I Tuoi Risultati</h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Cosa otterrai al termine del corso
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: Award,
                title: "Certificato Riconosciuto",
                description: "Certificazione blockchain verificabile da qualsiasi azienda"
              },
              {
                icon: BookOpen,
                title: "Portfolio Completo",
                description: "3-5 progetti reali pronti per il colloquio"
              },
              {
                icon: TrendingUp,
                title: "Placement Garantito",
                description: "87% dei nostri studenti trova lavoro entro 90 giorni"
              }
            ].map((outcome, index) => {
              const Icon = outcome.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="bg-white/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-2">
                    {outcome.title}
                  </h3>
                  <p className="text-white/70">
                    {outcome.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="mb-6">Pronto a Iniziare?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Posti limitati per garantire qualità e attenzione personalizzata
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                asChild
                className="bg-gradient-to-r from-[hsl(var(--amber))] to-[hsl(var(--amber)_/_0.8)] text-white hover:shadow-xl text-lg px-8 py-6"
              >
                <Link href="/(marketing)/apply">
                  Candidati Ora
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="text-lg px-8 py-6"
              >
                <Link href="/discover">
                  Fai l'Assessment Gratuito
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
