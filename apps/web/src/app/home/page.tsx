"use client"

import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/shared/navigation"
import { Footer } from "@/components/shared/footer"
import { CourseShowcase } from "@/components/marketing/course-showcase"
import { MethodSection } from "@/components/marketing/method-section"
import { AreasSection } from "@/components/marketing/areas-section"
import { usePageTransition } from "@/hooks/use-page-transition"
import { ArrowRight, BookOpen, Users, Monitor } from "lucide-react"

export default function HomePage() {
  const { variants, createStaggerContainer } = usePageTransition()
  const staggerContainer = createStaggerContainer(0.1)
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 500], [0, 150])
  const y2 = useTransform(scrollY, [0, 500], [0, -100])

  return (
    <div className="min-h-screen grain-texture">
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
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
            {/* Headline */}
            <motion.h1
              variants={variants.fadeInUp}
              className="text-center text-balance mb-8"
            >
              Education
              <br />
              <span className="relative inline-block">
                Innovation Hub
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
              Percorsi formativi che uniscono
              <strong className="text-foreground font-semibold"> competenze tecniche</strong>,
              <strong className="text-foreground font-semibold"> progetti reali</strong> e
              <strong className="text-foreground font-semibold"> tecnologia</strong>
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
                  Scopri i Percorsi
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
                  Esplora la Piattaforma
                </Link>
              </Button>
            </motion.div>

            {/* Highlights */}
            <motion.div
              variants={variants.fadeInUp}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-20 max-w-3xl mx-auto"
            >
              {[
                { icon: BookOpen, title: "Formazione", desc: "Corsi progettati con aziende e professionisti del settore" },
                { icon: Monitor, title: "Piattaforma", desc: "Strumenti digitali per un apprendimento personalizzato" },
                { icon: Users, title: "Community", desc: "Network di studenti, alumni e aziende partner" },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div className="inline-flex p-3 rounded-xl bg-[hsl(var(--indigo)_/_0.08)] mb-3">
                    <item.icon className="w-5 h-5 text-[hsl(var(--indigo))]" />
                  </div>
                  <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Course Showcase Section */}
      <CourseShowcase />

      {/* Method Section */}
      <MethodSection />

      {/* Areas Section */}
      <AreasSection />

      <Footer />
    </div>
  )
}
