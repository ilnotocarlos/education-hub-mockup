"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/shared/navigation"
import {
  ArrowRight,
  BookOpen,
  Brain,
  Award,
  Users,
  Zap,
  Sparkles,
  TrendingUp,
  Globe,
  Shield
} from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "AI Tutor Personalizzato",
    description: "Apprendimento adattivo 24/7 con Claude AI che risponde alle tue domande e personalizza il percorso in real-time",
    color: "from-indigo-500 to-purple-600",
    stats: "10k+ interazioni/giorno"
  },
  {
    icon: Award,
    title: "Certificati Blockchain",
    description: "Credenziali verificabili su Polygon con NFT permanenti. Portfolio immutabile che ti segue per tutta la carriera",
    color: "from-amber-500 to-orange-600",
    stats: "100% verificabili"
  },
  {
    icon: Globe,
    title: "Content Mashup",
    description: "Video, testo, audio sincronizzati. Modalità accessibilità per dislessia e ADHD. Apprendi come preferisci",
    color: "from-emerald-500 to-teal-600",
    stats: "4 modalità fruizione"
  }
]

const stats = [
  { value: "87%", label: "Placement Rate", sublabel: "entro 90 giorni" },
  { value: "250+", label: "Aziende Partner", sublabel: "in tutta Italia" },
  { value: "€45k", label: "Salary Medio", sublabel: "primo impiego" },
  { value: "4.8/5", label: "Student Rating", sublabel: "su 500+ reviews" }
]

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const
    }
  }
}

export default function HomePage() {
  return (
    <div className="min-h-screen grain-texture">
      <Navigation />

      {/* Hero Section - Editorial Style */}
      <section className="relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-[hsl(var(--indigo))] to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-[hsl(var(--amber))] to-transparent rounded-full blur-3xl" />
        </div>

        <div className="editorial-grid py-24 md:py-32 relative">
          <motion.div
            initial="hidden"
            animate="show"
            variants={staggerContainer}
            className="max-w-5xl mx-auto"
          >
            {/* Badge */}
            <motion.div variants={fadeInUp} className="flex justify-center mb-8">
              <Badge className="px-6 py-2 bg-[hsl(var(--indigo)_/_0.1)] border-[hsl(var(--indigo)_/_0.2)] text-[hsl(var(--indigo))] hover:bg-[hsl(var(--indigo)_/_0.15)]">
                <Sparkles className="w-3 h-3 mr-2" />
                Powered by AI & Blockchain
              </Badge>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeInUp}
              className="text-center text-balance mb-8"
            >
              L'Educazione
              <br />
              <span className="relative inline-block">
                Ripensata
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3 text-[hsl(var(--amber))]"
                  viewBox="0 0 300 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 10C50 3 100 2 150 6C200 10 250 9 298 6"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={fadeInUp}
              className="text-center text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-12"
            >
              Trasforma il tuo potenziale in carriera con percorsi formativi che uniscono
              <strong className="text-foreground font-semibold"> AI personalizzata</strong>,
              <strong className="text-foreground font-semibold"> progetti reali</strong> e
              <strong className="text-foreground font-semibold"> certificazioni blockchain</strong>
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button
                size="lg"
                asChild
                className="bg-gradient-to-r from-[hsl(var(--indigo))] to-[hsl(var(--indigo)_/_0.8)] hover:shadow-2xl hover:scale-105 transition-all text-lg px-8 py-6 group"
              >
                <Link href="/(marketing)/discover">
                  Scopri il Tuo Percorso
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-2 text-lg px-8 py-6 hover:bg-muted/50"
              >
                <Link href="/(platform)/dashboard">
                  Vedi Dashboard Demo
                </Link>
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap items-center justify-center gap-8 mt-16 text-sm text-muted-foreground"
            >
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>Certificato ISO 27001</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>5.000+ Alumni</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                <span>87% Placement</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section - Cards with Depth */}
      <section className="editorial-grid py-24 relative">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="mb-4">Innovazione in Ogni Dettaglio</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Tecnologie all'avanguardia al servizio del tuo apprendimento
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div key={index} variants={fadeInUp}>
                  <Card className="group relative overflow-hidden border-2 hover:border-[hsl(var(--indigo)_/_0.3)] transition-all duration-500 hover:shadow-2xl h-full">
                    {/* Gradient Background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                    <div className="relative p-8 h-full flex flex-col">
                      {/* Icon */}
                      <div className="mb-6 relative">
                        <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-2xl opacity-20 blur-xl`} />
                        <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center transform group-hover:scale-110 transition-transform duration-500`}>
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                      </div>

                      {/* Content */}
                      <h3 className="text-2xl font-display font-semibold mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed mb-4 flex-grow">
                        {feature.description}
                      </p>

                      {/* Stats */}
                      <div className="flex items-center gap-2 text-sm font-semibold text-[hsl(var(--indigo))]">
                        <Zap className="w-4 h-4" />
                        {feature.stats}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </section>

      {/* Stats Section - Editorial Layout */}
      <section className="bg-gradient-to-br from-[hsl(var(--indigo))] to-[hsl(var(--indigo)_/_0.9)] text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }} />
        </div>

        <div className="editorial-grid relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="text-center"
              >
                <div className="font-display text-5xl md:text-6xl font-bold mb-2">
                  {stat.value}
                </div>
                <div className="text-lg font-semibold mb-1 text-white/90">
                  {stat.label}
                </div>
                <div className="text-sm text-white/60">
                  {stat.sublabel}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="editorial-grid py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <Badge className="mb-8 px-6 py-2 bg-[hsl(var(--amber)_/_0.1)] border-[hsl(var(--amber)_/_0.2)] text-[hsl(var(--amber))] hover:bg-[hsl(var(--amber)_/_0.15)]">
            Inizia Gratis
          </Badge>

          <h2 className="mb-6">
            Pronto a Trasformare
            <br />
            il Tuo Futuro?
          </h2>

          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Unisciti a migliaia di professionisti che hanno già fatto il salto.
            Assessment gratuito in 5 minuti.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              asChild
              className="bg-gradient-to-r from-[hsl(var(--amber))] to-[hsl(var(--amber)_/_0.8)] text-white hover:shadow-2xl hover:scale-105 transition-all text-lg px-8 py-6 group"
            >
              <Link href="/(marketing)/discover">
                Inizia Assessment Gratuito
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-2 text-lg px-8 py-6"
            >
              <Link href="/(platform)/dashboard">
                Esplora la Piattaforma
              </Link>
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-12">
        <div className="editorial-grid">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-[hsl(var(--indigo))] to-[hsl(var(--amber))] p-2 rounded-xl">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-display text-xl font-bold">Education Hub</span>
                <p className="text-xs text-muted-foreground">Il Futuro dell'Apprendimento</p>
              </div>
            </div>

            <p className="text-sm text-muted-foreground text-center md:text-right">
              © 2026 Education Hub. Powered by AI & Blockchain
              <br className="md:hidden" />
              <span className="hidden md:inline"> · </span>
              Next.js 14 · React · TypeScript · Shadcn/ui
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
