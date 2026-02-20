"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { futureBusinessAreas } from "@/data/business-plan"
import { Lightbulb, Rocket, FlaskConical, BriefcaseBusiness, CheckCircle2 } from "lucide-react"

const icons = [FlaskConical, Rocket, BriefcaseBusiness]

export function FutureAreas() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Aree di Business Future</h2>
        <p className="text-muted-foreground mt-1">Espansione strategica post-consolidamento core business</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {futureBusinessAreas.map((area, i) => {
          const Icon = icons[i]
          return (
            <Card key={area.name} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{area.name}</CardTitle>
                      <CardDescription className="mt-0.5">{area.timeline}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{area.status}</Badge>
                    <Badge variant="secondary">{area.potential}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{area.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {area.details.map((detail, j) => (
                    <div key={j} className="flex items-start gap-2 p-2 rounded-md bg-muted/50">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">{detail}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Strategic Vision */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-warning" />
            Visione Strategica
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Le aree future rappresentano un&apos;evoluzione naturale del core business, trasformando Education Innovation Hub
              da pure-play formazione a <strong>ecosistema completo per l&apos;innovazione delle competenze</strong>.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="p-4 rounded-lg bg-muted/50 text-center">
                <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Potenziale Addizionale</div>
                <div className="text-2xl font-bold text-primary">€6-16M</div>
                <div className="text-xs text-muted-foreground">/anno da nuove aree</div>
              </div>
              <div className="p-4 rounded-lg bg-muted/50 text-center">
                <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Timeline</div>
                <div className="text-2xl font-bold">2028-2030</div>
                <div className="text-xs text-muted-foreground">Dopo consolidamento core</div>
              </div>
              <div className="p-4 rounded-lg bg-muted/50 text-center">
                <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Modello</div>
                <div className="text-2xl font-bold">Ecosystem</div>
                <div className="text-xs text-muted-foreground">Formazione + Consulenza + Incubazione</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
