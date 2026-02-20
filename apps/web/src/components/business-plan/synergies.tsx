"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { synergies } from "@/data/business-plan"
import { ArrowRight, Handshake } from "lucide-react"

export function Synergies() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Sinergie con il Gruppo</h2>
        <p className="text-muted-foreground mt-1">Valorizzazione degli asset del gruppo editoriale</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {synergies.map((s) => (
          <Card key={s.area}>
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <Handshake className="h-4 w-4 text-primary" />
                <span className="font-semibold text-sm">{s.area}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{s.value}</p>
              <div className="flex items-center gap-2 p-2 rounded-md bg-success/10">
                <ArrowRight className="h-3.5 w-3.5 text-success" />
                <span className="text-xs font-medium text-success">{s.impact}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Valore Totale Sinergie</CardTitle>
          <CardDescription>Revenue addizionale stimata dalle sinergie con il gruppo</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-4 rounded-lg bg-muted/50">
              <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Content Licensing</div>
              <div className="text-2xl font-bold">€200-500k</div>
              <div className="text-xs text-muted-foreground">/anno</div>
            </div>
            <div className="p-4 rounded-lg bg-muted/50">
              <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Corporate Cross-Sell</div>
              <div className="text-2xl font-bold">€300-800k</div>
              <div className="text-xs text-muted-foreground">/anno</div>
            </div>
            <div className="p-4 rounded-lg bg-primary/10">
              <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Totale Sinergie</div>
              <div className="text-2xl font-bold text-primary">€500k-1.3M</div>
              <div className="text-xs text-muted-foreground">/anno</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Effetto Moltiplicatore</CardTitle>
          <CardDescription>Come le sinergie amplificano il modello di business</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                from: "Back catalog libri",
                to: "Materiale didattico interattivo",
                benefit: "Costo contenuti ridotto del 60%, time-to-market -40%",
              },
              {
                from: "Network 500+ autori",
                to: "Faculty di esperti di settore",
                benefit: "Qualita premium senza costi di ricerca, brand authority",
              },
              {
                from: "Brand editoriale riconosciuto",
                to: "Trust immediato nella formazione",
                benefit: "CAC ridotto 20-30%, conversion rate +15%",
              },
              {
                from: "Database contatti C-level",
                to: "Pipeline B2B warm leads",
                benefit: "Sales cycle ridotto del 30%, hit rate +25%",
              },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                <div className="flex-1">
                  <div className="text-sm font-medium">{item.from}</div>
                </div>
                <ArrowRight className="h-4 w-4 text-primary shrink-0" />
                <div className="flex-1">
                  <div className="text-sm font-medium">{item.to}</div>
                </div>
                <div className="flex-1 text-right">
                  <span className="text-xs text-success">{item.benefit}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
