"use client"

import * as React from "react"
import { motion } from "framer-motion"
import {
  Sparkles,
  Users,
  Target,
  Heart,
  Lightbulb,
  Shield,
  TrendingUp,
  Award,
  Globe,
  Zap
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const }
  }
}

const stats = [
  { value: "2020", label: "Anno di Fondazione" },
  { value: "5.000+", label: "Alumni" },
  { value: "250+", label: "Aziende Partner" },
  { value: "87%", label: "Placement Rate" }
]

const values = [
  {
    icon: Target,
    title: "Eccellenza",
    description: "Standard altissimi in ogni aspetto della formazione, dal curriculum alla mentorship.",
    color: "from-[hsl(var(--indigo))] to-[hsl(var(--indigo)_/_0.8)]"
  },
  {
    icon: Lightbulb,
    title: "Innovazione",
    description: "Pionieri nell'uso di AI, blockchain e metodologie didattiche all'avanguardia.",
    color: "from-[hsl(var(--amber))] to-[hsl(var(--amber)_/_0.8)]"
  },
  {
    icon: Heart,
    title: "Inclusività",
    description: "Accessibilità per tutti i talenti, indipendentemente dal background socio-economico.",
    color: "from-purple-500 to-pink-600"
  },
  {
    icon: TrendingUp,
    title: "Impatto",
    description: "Focus concreto sui risultati: job placement, salary growth, career advancement.",
    color: "from-green-500 to-emerald-600"
  }
]

const timeline = [
  {
    year: "2020",
    title: "Fondazione",
    description: "Nasce Education Hub con la vision di rivoluzionare l'education in Italia.",
    icon: Sparkles
  },
  {
    year: "2021",
    title: "Primo Corso",
    description: "Lancio del primo corso UX/UI Design con 25 studenti. 92% placement rate.",
    icon: Users
  },
  {
    year: "2022",
    title: "Espansione",
    description: "Aggiunte le aree Tech e Business. Partnership con 50+ aziende.",
    icon: Globe
  },
  {
    year: "2023",
    title: "AI Integration",
    description: "Integrazione AI tutoring personalizzato. 1.000+ studenti formati.",
    icon: Zap
  },
  {
    year: "2024",
    title: "Blockchain",
    description: "Lancio certificazioni NFT su Polygon. Riconoscimento internazionale.",
    icon: Shield
  },
  {
    year: "2026",
    title: "Serie A",
    description: "Target funding 15M per scalare a 10.000 studenti/anno.",
    icon: Award
  }
]

const team = [
  {
    name: "Dr. Maria Conte",
    role: "CEO & Co-Founder",
    bio: "Ex Google Learning Lead. PhD in Educational Psychology. 15+ anni in EdTech.",
    initials: "MC",
    color: "from-[hsl(var(--indigo))] to-purple-600"
  },
  {
    name: "Luca Verdi",
    role: "CTO & Co-Founder",
    bio: "Ex Meta Engineer. Full-stack expert. Pioneer in blockchain education.",
    initials: "LV",
    color: "from-blue-500 to-cyan-600"
  },
  {
    name: "Anna Bianchi",
    role: "Chief Product Officer",
    bio: "Ex Amazon PM. 10+ anni in product management. Esperta in AI/ML.",
    initials: "AB",
    color: "from-[hsl(var(--amber))] to-orange-600"
  },
  {
    name: "Marco Neri",
    role: "Head of Placement",
    bio: "Ex recruiter Microsoft. Network di 250+ aziende. 87% placement rate.",
    initials: "MN",
    color: "from-green-500 to-emerald-600"
  }
]

const partners = [
  "Google", "Amazon", "Meta", "Microsoft", "Apple",
  "Netflix", "Spotify", "Airbnb", "Uber", "Stripe",
  "Revolut", "Docplanner", "Bending Spoons", "Satispay"
]

export default function AboutPage() {
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
              Chi Siamo
            </Badge>
            <h1 className="mb-6">
              Colmiamo il Gap tra
              <br />
              <span className="text-[hsl(var(--indigo))]">Potenziale</span> e{" "}
              <span className="text-[hsl(var(--amber))]">Opportunità</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Education Hub è nata dalla frustrazione di vedere talenti sprecati per mancanza di formazione
              adeguata. La nostra mission è trasformare l'educazione da trasferimento di nozioni a
              liberazione di potenziale umano.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="font-display text-5xl font-bold text-[hsl(var(--indigo))] mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-center mb-12">La Nostra Mission</h2>
              <Card className="p-8 border-2 border-[hsl(var(--indigo)_/_0.2)]">
                <p className="text-lg leading-relaxed text-muted-foreground mb-6">
                  In Italia c'è un <strong className="text-foreground">gap di 44 miliardi di euro</strong> dovuto
                  al mismatch tra competenze richieste dal mercato e competenze disponibili.
                </p>
                <p className="text-lg leading-relaxed text-muted-foreground mb-6">
                  Questo significa <strong className="text-foreground">talenti sprecati</strong>, aziende che non trovano
                  risorse qualificate, e un'intera generazione che fatica a trovare la propria strada professionale.
                </p>
                <p className="text-lg leading-relaxed text-foreground font-semibold">
                  Noi esistiamo per colmare questo gap, trasformando potenziale in carriere di successo.
                </p>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="mb-4">I Nostri Valori</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Principi che guidano ogni nostra decisione
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-8 h-full hover:border-[hsl(var(--indigo)_/_0.3)] transition-colors">
                    <div className="mb-4">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${value.color} flex items-center justify-center`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                    </div>
                    <h3 className="font-display text-2xl font-semibold mb-3">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="mb-4">La Nostra Storia</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Dal 2020 a oggi, un percorso di crescita e innovazione
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {timeline.map((item, index) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative pl-8 pb-12 border-l-2 border-[hsl(var(--indigo)_/_0.2)] last:pb-0"
                >
                  {/* Timeline dot */}
                  <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-gradient-to-br from-[hsl(var(--indigo))] to-[hsl(var(--amber))] flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </div>

                  <Card className="p-6 hover:border-[hsl(var(--indigo)_/_0.3)] transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="bg-gradient-to-br from-[hsl(var(--indigo)_/_0.1)] to-[hsl(var(--amber)_/_0.1)] p-3 rounded-lg">
                        <Icon className="w-6 h-6 text-[hsl(var(--indigo))]" />
                      </div>
                      <div className="flex-grow">
                        <div className="font-display text-2xl font-bold text-[hsl(var(--indigo))] mb-2">
                          {item.year}
                        </div>
                        <h3 className="font-semibold text-lg mb-2">
                          {item.title}
                        </h3>
                        <p className="text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="mb-4">Il Team</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Esperti di educazione, tecnologia e placement aziendale
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 text-center hover:border-[hsl(var(--indigo)_/_0.3)] transition-colors h-full">
                  <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${member.color} flex items-center justify-center text-white font-display text-2xl font-bold mx-auto mb-4`}>
                    {member.initials}
                  </div>
                  <h3 className="font-semibold text-lg mb-1">
                    {member.name}
                  </h3>
                  <div className="text-sm text-[hsl(var(--indigo))] font-medium mb-3">
                    {member.role}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {member.bio}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <h2 className="mb-4">I Nostri Partner</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Collaboriamo con le migliori aziende tech in Italia e all'estero
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8 items-center">
              {partners.map((partner, index) => (
                <div
                  key={index}
                  className="text-center text-muted-foreground hover:text-foreground transition-colors font-semibold text-sm"
                >
                  {partner}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
