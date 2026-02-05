"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, CheckCircle2, Play, Sparkles, LucideIcon } from "lucide-react"

interface PreworkMaterial {
  id: number
  title: string
  type: string
  duration: string
  status: "completed" | "in-progress" | "pending"
  icon: LucideIcon
  description: string
}

interface PreworkSectionProps {
  nextLiveSession: string
  materials: PreworkMaterial[]
  completedCount: number
  totalCount: number
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const }
  }
}

export function PreworkSection({
  nextLiveSession,
  materials,
  completedCount,
  totalCount
}: PreworkSectionProps) {
  return (
    <div className="space-y-8">
      {/* Next Live Session Alert */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="relative overflow-hidden border-2 border-[hsl(var(--indigo)_/_0.3)]">
          <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--indigo))] to-[hsl(var(--indigo)_/_0.8)] opacity-100" />
          <CardContent className="relative p-6 text-white">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-white/20 backdrop-blur-sm">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-medium opacity-90">Prossima Sessione Live</p>
                  <p className="font-display text-xl font-semibold">
                    {nextLiveSession}
                  </p>
                </div>
              </div>
              <Button
                variant="secondary"
                className="bg-white text-[hsl(var(--indigo))] hover:bg-white/90"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Aggiungi a Calendario
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Pre-work Materials */}
      <motion.div variants={fadeInUp}>
        <Card className="border-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-display flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-[hsl(var(--amber))]" />
                  Pre-work Materiali
                </CardTitle>
                <CardDescription className="text-base mt-2">
                  Preparati per la prossima lezione live
                </CardDescription>
              </div>
              <Badge variant="outline" className="text-sm">
                {completedCount}/{totalCount} completati
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {materials.map((material) => {
              const Icon = material.icon
              return (
                <div
                  key={material.id}
                  className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                    material.status === "completed"
                      ? "bg-[hsl(var(--sage)_/_0.05)] border-[hsl(var(--sage)_/_0.2)]"
                      : material.status === "in-progress"
                      ? "bg-[hsl(var(--amber)_/_0.05)] border-[hsl(var(--amber)_/_0.2)]"
                      : "bg-muted/30 border-border hover:border-[hsl(var(--indigo)_/_0.2)]"
                  }`}
                >
                  <div className={`p-3 rounded-lg ${
                    material.status === "completed"
                      ? "bg-[hsl(var(--sage)_/_0.1)]"
                      : material.status === "in-progress"
                      ? "bg-[hsl(var(--amber)_/_0.1)]"
                      : "bg-muted"
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold mb-1">{material.title}</h4>
                    <p className="text-sm text-muted-foreground">{material.description}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground whitespace-nowrap">
                      {material.duration}
                    </span>
                    {material.status === "completed" ? (
                      <CheckCircle2 className="w-5 h-5 text-[hsl(var(--sage))]" />
                    ) : material.status === "in-progress" ? (
                      <Button size="sm" variant="outline">
                        Continua
                      </Button>
                    ) : (
                      <Button size="sm" variant="ghost">
                        <Play className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
