"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { BarChart3, Presentation, GraduationCap, BookOpen, ArrowRight } from "lucide-react"

const areas = [
  {
    title: "Business Plan",
    description: "Financial model, KPI, scenari e proiezioni quinquennali.",
    href: "/business-plan",
    icon: BarChart3,
    color: "indigo" as const,
  },
  {
    title: "Presentazione Investor",
    description: "Deck interattivo con la visione, il modello di business e la roadmap di crescita.",
    href: "/presentation",
    icon: Presentation,
    color: "amber" as const,
  },
  {
    title: "Il Business Plan Spiegato",
    description: "Guida visuale ai fondamentali finanziari: Revenue, EBITDA, Unit Economics, Cash Flow e scenari di exit.",
    href: "/business-plan-presentation",
    icon: BookOpen,
    color: "gold" as const,
  },
  {
    title: "Piattaforma",
    description: "Esplora la piattaforma: corsi, dashboard studente, community e strumenti digitali.",
    href: "/home",
    icon: GraduationCap,
    color: "sage" as const,
  },
]

const colorConfig = {
  indigo: {
    card: "bg-[hsl(var(--indigo)_/_0.04)] border-[hsl(var(--indigo)_/_0.12)] hover:border-[hsl(var(--indigo)_/_0.3)] hover:bg-[hsl(var(--indigo)_/_0.06)]",
    iconWrap: "bg-[hsl(var(--indigo)_/_0.1)]",
    icon: "text-[hsl(var(--indigo))]",
    stat: "text-[hsl(var(--indigo))]",
    button: "bg-[hsl(var(--indigo))] hover:bg-[hsl(var(--indigo)_/_0.85)] text-white",
  },
  amber: {
    card: "bg-[hsl(var(--amber)_/_0.04)] border-[hsl(var(--amber)_/_0.12)] hover:border-[hsl(var(--amber)_/_0.3)] hover:bg-[hsl(var(--amber)_/_0.06)]",
    iconWrap: "bg-[hsl(var(--amber)_/_0.1)]",
    icon: "text-[hsl(var(--amber))]",
    stat: "text-[hsl(var(--amber))]",
    button: "bg-[hsl(var(--amber))] hover:bg-[hsl(var(--amber)_/_0.85)] text-white",
  },
  sage: {
    card: "bg-[hsl(var(--sage)_/_0.04)] border-[hsl(var(--sage)_/_0.12)] hover:border-[hsl(var(--sage)_/_0.3)] hover:bg-[hsl(var(--sage)_/_0.06)]",
    iconWrap: "bg-[hsl(var(--sage)_/_0.1)]",
    icon: "text-[hsl(var(--sage))]",
    stat: "text-[hsl(var(--sage))]",
    button: "bg-[hsl(var(--sage))] hover:bg-[hsl(var(--sage)_/_0.85)] text-white",
  },
  gold: {
    card: "bg-[hsl(var(--gold)_/_0.04)] border-[hsl(var(--gold)_/_0.12)] hover:border-[hsl(var(--gold)_/_0.3)] hover:bg-[hsl(var(--gold)_/_0.06)]",
    iconWrap: "bg-[hsl(var(--gold)_/_0.1)]",
    icon: "text-[hsl(var(--gold))]",
    stat: "text-[hsl(var(--gold))]",
    button: "bg-[hsl(var(--gold))] hover:bg-[hsl(var(--gold)_/_0.85)] text-white",
  },
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
}

export default function HubPortalPage() {
  return (
    <div className="min-h-screen grain-texture pt-8">
      <div className="editorial-grid py-24 md:py-32">
        <motion.div
          initial="hidden"
          animate="show"
          variants={containerVariants}
          className="max-w-5xl mx-auto"
        >
          {/* Title */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h1 className="mb-4">
              Education
              <br />
              <span className="text-[hsl(var(--indigo))]">Innovation Hub</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Esplora le aree del progetto
            </p>
          </motion.div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {areas.map((area) => {
              const Icon = area.icon
              const colors = colorConfig[area.color]

              return (
                <motion.div key={area.title} variants={itemVariants}>
                  <Link
                    href={area.href}
                    className={`block rounded-2xl border p-8 transition-all duration-300 group ${colors.card}`}
                  >
                    {/* Icon */}
                    <div className={`inline-flex p-3 rounded-xl mb-6 ${colors.iconWrap}`}>
                      <Icon className={`w-7 h-7 ${colors.icon}`} />
                    </div>

                    {/* Content */}
                    <h3 className="text-2xl font-bold mb-3">{area.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                      {area.description}
                    </p>

                    {/* CTA */}
                    <div className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium ${colors.button}`}>
                      Esplora
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
