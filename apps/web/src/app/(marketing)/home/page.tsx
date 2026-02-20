"use client"

import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AnimatedCounter } from "@/components/ui/animated-counter"
import { CTASection } from "@/components/shared/cta-section"
import { CourseShowcase } from "@/components/marketing/course-showcase"
import { MethodSection } from "@/components/marketing/method-section"
import { AreasSection } from "@/components/marketing/areas-section"
import { usePageTransition } from "@/hooks/use-page-transition"
import {
  ArrowRight,
  Users,
  Sparkles,
  TrendingUp,
  Shield
} from "lucide-react"

const stats = [
  { value: "87%", label: "Placement Rate", sublabel: "entro 90 giorni" },
  { value: "250+", label: "Aziende Partner", sublabel: "in tutta Italia" },
  { value: "€45k", label: "Salary Medio", sublabel: "primo impiego" },
  { value: "4.8/5", label: "Student Rating", sublabel: "su 500+ reviews" }
]

export default function HomePage() {
  const { variants, createStaggerContainer } = usePageTransition()
  const staggerContainer = createStaggerContainer(0.1)
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 500], [0, 150])
  const y2 = useTransform(scrollY, [0, 500], [0, -100])

  return (
    <div className="min-h-screen grain-texture">
      {/* Hero Section - Editorial Style */}
      <section className="relative overflow-hidden">
        {/* Decorative Elements with Parallax */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <motion.div
            style={{ y: y1 }}
            className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-[hsl(var(--indigo))] to-transparent rounded-full blur-3xl"
          />
          <motion.div
            style={{ y: y2 }}
            className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-[hsl(var(--amber))] to-transparent rounded-full blur-3xl"
          />
        </div>

        <div className="editorial-grid py-24 md:py-32 relative">
          <motion.div
            initial="hidden"
            animate="show"
            variants={staggerContainer}
            className="max-w-5xl mx-auto"
          >
            {/* Badge */}
            <motion.div variants={variants.fadeInUp} className="flex justify-center mb-8">
              <Badge className="px-6 py-2 bg-[hsl(var(--indigo)_/_0.1)] border-[hsl(var(--indigo)_/_0.2)] text-[hsl(var(--indigo))] hover:bg-[hsl(var(--indigo)_/_0.15)]">
                <Sparkles className="w-3 h-3 mr-2" />
                Powered by AI & Blockchain
              </Badge>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={variants.fadeInUp}
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
              variants={variants.fadeInUp}
              className="text-center text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-12"
            >
              Trasforma il tuo potenziale in carriera con percorsi formativi che uniscono
              <strong className="text-foreground font-semibold"> AI personalizzata</strong>,
              <strong className="text-foreground font-semibold"> progetti reali</strong> e
              <strong className="text-foreground font-semibold"> certificazioni blockchain</strong>
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={variants.fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button
                size="lg"
                asChild
                className="bg-gradient-to-r from-[hsl(var(--indigo))] to-[hsl(var(--indigo)_/_0.8)] hover:shadow-2xl hover:scale-105 transition-all text-lg px-8 py-6 group"
              >
                <Link href="/discover">
                  Scopri il Tuo Percorso
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-2 text-lg px-8 py-6 hover:bg-muted/50 hover:border-[hsl(var(--indigo))] hover:scale-105 transition-all"
              >
                <Link href="/dashboard">
                  Vedi Dashboard Demo
                </Link>
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              variants={variants.fadeInUp}
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

      {/* Course Showcase Section */}
      <CourseShowcase />

      {/* Method Section - Flipped Classroom */}
      <MethodSection />

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
                whileHover={{ scale: 1.05 }}
                className="text-center cursor-default"
              >
                <div className="font-display text-5xl md:text-6xl font-bold mb-2">
                  <AnimatedCounter value={stat.value} />
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

      {/* Areas Section - Design, Tech, Business */}
      <AreasSection />

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-32 text-center"
      >
        <Badge className="mb-8 px-6 py-2 bg-[hsl(var(--amber)_/_0.1)] border-[hsl(var(--amber)_/_0.2)] text-[hsl(var(--amber))] hover:bg-[hsl(var(--amber)_/_0.15)]">
          Inizia Gratis
        </Badge>
        <CTASection
          title={
            <>
              Pronto a Trasformare
              <br />
              il Tuo Futuro?
            </>
          }
          description="Unisciti a migliaia di professionisti che hanno già fatto il salto. Assessment gratuito in 5 minuti."
          variant="transparent"
          buttonLayout="horizontal"
          actions={
            <>
              <Button
                size="lg"
                asChild
                className="bg-gradient-to-r from-[hsl(var(--amber))] to-[hsl(var(--amber)_/_0.8)] text-white hover:shadow-2xl hover:scale-105 transition-all text-lg px-8 py-6 group"
              >
                <Link href="/discover">
                  Inizia Assessment Gratuito
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 text-lg px-8 py-6"
                asChild
              >
                <Link href="/dashboard">
                  Esplora la Piattaforma
                </Link>
              </Button>
            </>
          }
        />
      </motion.div>
    </div>
  )
}
