"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { roadmap } from "@/data/business-plan"
import { CheckCircle2, Circle, Clock } from "lucide-react"

const statusConfig: Record<number, { icon: typeof CheckCircle2; color: string; badge: string }> = {
  0: { icon: Clock, color: "text-warning", badge: "In Corso" },
  1: { icon: Circle, color: "text-muted-foreground", badge: "Prossimo" },
  2: { icon: Circle, color: "text-muted-foreground", badge: "Pianificato" },
  3: { icon: Circle, color: "text-muted-foreground", badge: "Pianificato" },
  4: { icon: Circle, color: "text-muted-foreground", badge: "Futuro" },
}

export function Roadmap() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Roadmap</h2>
        <p className="text-muted-foreground mt-1">Piano di esecuzione 2026-2030</p>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />

        <div className="space-y-8">
          {roadmap.map((phase, i) => {
            const config = statusConfig[i]
            const Icon = config.icon
            return (
              <div key={phase.phase} className="relative pl-16">
                {/* Timeline dot */}
                <div className={`absolute left-4 top-5 w-5 h-5 rounded-full border-2 bg-background flex items-center justify-center ${i === 0 ? 'border-warning' : 'border-border'}`}>
                  <Icon className={`h-3 w-3 ${config.color}`} />
                </div>

                <Card className={i === 0 ? 'border-warning/30 shadow-md' : ''}>
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-base">{phase.phase}</h3>
                        <p className="text-sm text-muted-foreground">{phase.period}</p>
                      </div>
                      <Badge variant="secondary">
                        {config.badge}
                      </Badge>
                    </div>
                    <ul className="space-y-2">
                      {phase.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
