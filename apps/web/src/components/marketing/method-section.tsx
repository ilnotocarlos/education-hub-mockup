"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { BookOpen, Users, Briefcase, ArrowRight } from "lucide-react"
import { Card } from "@/components/ui/card"

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
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

export function MethodSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-[hsl(var(--indigo))] to-[hsl(var(--amber))] rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <motion.h2 variants={fadeInUp} className="mb-4">
            Come Funziona
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Un metodo collaudato che combina apprendimento autonomo, pratica intensiva e supporto AI
          </motion.p>
        </motion.div>

        {/* Steps Grid */}
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
                  {/* Number Badge */}
                  <div className="absolute top-6 right-6 font-display text-6xl font-bold text-muted-foreground/10 group-hover:text-[hsl(var(--indigo)_/_0.1)] transition-colors">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="mb-6 relative">
                    <div className={`absolute inset-0 bg-gradient-to-br ${step.color} rounded-2xl opacity-20 blur-xl`} />
                    <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="font-display text-2xl font-semibold mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>

                  {/* Arrow for connection (hidden on last) */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 -translate-y-1/2 z-10">
                      <ArrowRight className="w-8 h-8 text-[hsl(var(--indigo)_/_0.3)]" />
                    </div>
                  )}
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Flipped Classroom Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <Card className="p-8 bg-gradient-to-br from-[hsl(var(--indigo)_/_0.05)] to-[hsl(var(--amber)_/_0.05)] border-[hsl(var(--indigo)_/_0.2)]">
            <div className="text-center">
              <h3 className="font-display text-2xl font-semibold mb-4">
                🔄 Flipped Classroom
              </h3>
              <p className="text-lg text-muted-foreground">
                Studia i contenuti teorici nel tuo tempo, poi applica in aula con esercizi pratici,
                progetti reali e mentorship diretta. <strong className="text-foreground">2x più efficace</strong> dell'apprendimento tradizionale.
              </p>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
