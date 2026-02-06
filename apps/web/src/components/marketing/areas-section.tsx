"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Palette, Code, TrendingUp, ArrowRight } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const }
  }
}

const areas = [
  {
    id: "design",
    title: "Design",
    icon: Palette,
    description: "UX/UI Design, Product Design, Design Systems e Visual Design per creare esperienze digitali memorabili.",
    courses: ["UX/UI Design", "Visual Design", "Product Design", "Design Systems"],
    color: "from-purple-500 to-pink-600",
    bgColor: "bg-purple-50",
    stats: "248 studenti attivi"
  },
  {
    id: "tech",
    title: "Tech",
    icon: Code,
    description: "Full-Stack Development, DevOps, Data Science e AI per costruire il futuro digitale.",
    courses: ["Full-Stack Dev", "DevOps", "Data Science", "AI/ML"],
    color: "from-blue-500 to-cyan-600",
    bgColor: "bg-blue-50",
    stats: "312 studenti attivi"
  },
  {
    id: "business",
    title: "Business",
    icon: TrendingUp,
    description: "Product Management, Growth Marketing e Business Strategy per guidare prodotti di successo.",
    courses: ["Product Mgmt", "Growth Marketing", "Business Strategy"],
    color: "from-amber-500 to-orange-600",
    bgColor: "bg-amber-50",
    stats: "156 studenti attivi"
  }
]

export function AreasSection() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <motion.div variants={fadeInUp}>
            <Badge className="mb-4 px-4 py-1.5 bg-[hsl(var(--amber)_/_0.1)] border-[hsl(var(--amber)_/_0.2)] text-[hsl(var(--amber))]">
              Aree Formative
            </Badge>
          </motion.div>
          <motion.h2 variants={fadeInUp} className="mb-4">
            Esplora le Aree
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Percorsi specializzati per ogni ambito professionale
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {areas.map((area, index) => {
            const Icon = area.icon
            return (
              <motion.div
                key={area.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <Card className="group relative overflow-hidden border-2 hover:border-[hsl(var(--indigo)_/_0.3)] transition-all hover:shadow-xl h-full flex flex-col">
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${area.color} opacity-0 group-hover:opacity-5 transition-opacity`} />

                  <div className="relative p-8 flex flex-col flex-grow">
                    {/* Icon */}
                    <div className="mb-6">
                      <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${area.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-display text-3xl font-bold mb-3 group-hover:text-[hsl(var(--indigo))] transition-colors">
                      {area.title}
                    </h3>

                    {/* Description */}
                    <p className="text-muted-foreground mb-6 flex-grow">
                      {area.description}
                    </p>

                    {/* Courses List */}
                    <div className="mb-6">
                      <div className="text-sm font-semibold text-muted-foreground mb-3">
                        Corsi disponibili:
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {area.courses.map((course) => (
                          <Badge
                            key={course}
                            variant="secondary"
                            className="text-xs"
                          >
                            {course}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="text-sm text-muted-foreground mb-4 pb-4 border-t pt-4">
                      {area.stats}
                    </div>

                    {/* CTA */}
                    <Button
                      variant="ghost"
                      className="w-full group-hover:bg-[hsl(var(--indigo))] group-hover:text-white transition-colors"
                      asChild
                    >
                      <Link href={`/courses?area=${area.id}`}>
                        Esplora {area.title}
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
