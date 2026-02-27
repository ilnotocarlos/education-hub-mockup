"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { marketData, competitors, differentiators } from "@/data/business-plan"
import { formatCurrency } from "@/lib/utils"
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts"
import { Globe, TrendingUp, AlertTriangle, CheckCircle2, Swords } from "lucide-react"

const sectorData = marketData.sectors.map((s) => ({
  name: s.name,
  "Crescita %": s.growth,
  "Nuovi Posti": s.jobs / 1000,
}))

export function Market() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Analisi di Mercato</h2>
        <p className="text-muted-foreground mt-1">Formazione professionale in Italia — opportunita e competizione</p>
      </div>

      {/* Market Size */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Mercato Attuale", value: formatCurrency(marketData.currentSize, true), sub: "Formazione professionale IT 2025", icon: Globe },
          { label: "Mercato Proiettato", value: formatCurrency(marketData.projectedSize, true), sub: `CAGR ${marketData.cagr} annuo → 2030`, icon: TrendingUp },
          { label: "Costo Skill Gap", value: formatCurrency(marketData.skillGapCost, true), sub: marketData.skillGapGdpNote, icon: AlertTriangle },
          { label: "Fondi Pubblici", value: formatCurrency(marketData.publicFunding, true), sub: "Fondo Nuove Competenze 2025", icon: CheckCircle2 },
        ].map((m) => {
          const Icon = m.icon
          return (
            <Card key={m.label}>
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{m.label}</span>
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <div className="text-2xl font-bold">{m.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{m.sub}</div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Key Stats */}
      <Card>
        <CardContent className="p-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-destructive">3.5M</div>
              <div className="text-xs text-muted-foreground mt-1">Posti vacanti per skill gap</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-warning">{marketData.obsoleteSkills}</div>
              <div className="text-xs text-muted-foreground mt-1">Competenze obsolete entro 2030</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-success">{marketData.companiesIncreasingBudget}</div>
              <div className="text-xs text-muted-foreground mt-1">Aziende che aumentano il budget formazione</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">{marketData.cagr}</div>
              <div className="text-xs text-muted-foreground mt-1">CAGR mercato annuo</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sectors */}
      <Card>
        <CardHeader>
          <CardTitle>Settori ad Alta Crescita (5 anni)</CardTitle>
          <CardDescription>Domanda annuale di nuove competenze e posti di lavoro</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sectorData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.9 0.01 75)" />
                <XAxis type="number" tick={{ fontSize: 12 }} />
                <YAxis dataKey="name" type="category" width={130} tick={{ fontSize: 12 }} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid oklch(0.9 0.01 75)', fontSize: '13px' }} />
                <Bar dataKey="Crescita %" fill="oklch(0.55 0.15 260)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Competition */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Swords className="h-5 w-5" />
              Landscape Competitivo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {competitors.map((c) => (
                <div key={c.name} className="p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-sm">{c.name}</span>
                    <Badge variant="outline" className="text-xs">{c.price}</Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">{c.example}</div>
                  <div className="text-xs text-destructive mt-1">{c.weakness}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-success" />
              I Nostri Differenziatori
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {differentiators.map((d, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <div className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </div>
                  <span className="text-sm">{d}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
