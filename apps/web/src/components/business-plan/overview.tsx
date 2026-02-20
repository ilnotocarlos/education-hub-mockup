"use client"

import Link from "next/link"
import {
  TrendingUp, Users, Building2, Cpu, Euro, Target, Clock, Zap, GraduationCap, Monitor,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { returnMetrics, validationScore } from "@/data/business-plan"
import { useBusinessPlanStore } from "@/stores/use-business-plan-store"
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts"

const highlights = [
  { label: "Revenue Anno 5", value: "€11.0M", change: "CAGR ~94%", icon: Euro, color: "text-chart-1", link: "financials" },
  { label: "EBITDA Margin Anno 5", value: "17%", change: "€1.9M", icon: TrendingUp, color: "text-success", link: "financials" },
  { label: "ROI Multiple", value: "2.5x", change: "in 5 anni", icon: Target, color: "text-chart-5", link: "scenarios" },
  { label: "IRR", value: "20%", change: "annuo", icon: Zap, color: "text-chart-1", link: "scenarios" },
  { label: "Break-even", value: "Mese 28-32", change: "inizio Anno 3", icon: Clock, color: "text-chart-2", link: "financials" },
  { label: "Costi Totali Y5", value: "€9.1M", change: "40 FTE", icon: Target, color: "text-chart-4", link: "costs" },
]

export function Overview() {
  const companyInfo = useBusinessPlanStore((s) => s.companyInfo)
  const revenueProjections = useBusinessPlanStore((s) => s.revenueProjections)

  const chartData = revenueProjections.map((r) => ({
    name: r.year,
    "Servizi": r.services,
    "Piattaforma": r.platform,
    "Totale": r.total,
  }))

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h2 className="text-3xl font-bold tracking-tight">{companyInfo.name}</h2>
          <Badge variant="secondary">{companyInfo.fundingType}</Badge>
        </div>
        <p className="text-muted-foreground max-w-2xl text-base italic">&ldquo;{companyInfo.tagline}&rdquo;</p>
        <p className="text-muted-foreground max-w-3xl mt-3 text-sm leading-relaxed">{companyInfo.purpose}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Card className="border-l-4 border-l-chart-1">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap className="h-5 w-5 text-chart-1" />
              <span className="font-semibold">B2C — Studenti</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-muted-foreground">Anno 1</div>
                <div className="text-2xl font-bold">75</div>
                <div className="text-xs text-muted-foreground">€375k revenue</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Anno 5</div>
                <div className="text-2xl font-bold text-primary">800</div>
                <div className="text-xs text-muted-foreground">€3.7M revenue</div>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-border text-xs text-muted-foreground space-y-1">
              <div className="flex justify-between"><span>Masterclass</span><span>30 → 320</span></div>
              <div className="flex justify-between"><span>Bootcamp</span><span>20 → 216</span></div>
              <div className="flex justify-between"><span>Master</span><span>15 → 160</span></div>
              <div className="flex justify-between"><span>Full-time</span><span>10 → 104</span></div>
            </div>
            <div className="mt-3">
              <Link href="/business-plan/business-areas" className="text-xs text-primary hover:underline">Dettaglio prodotti B2C →</Link>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-chart-4">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="h-5 w-5 text-chart-4" />
              <span className="font-semibold">B2B — Clienti Corporate</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-muted-foreground">Anno 1</div>
                <div className="text-2xl font-bold">3</div>
                <div className="text-xs text-muted-foreground">€400k revenue</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Anno 5</div>
                <div className="text-2xl font-bold text-primary">50</div>
                <div className="text-xs text-muted-foreground">€6.5M revenue</div>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-border text-xs text-muted-foreground space-y-1">
              <div className="flex justify-between"><span>Corp. Academy</span><span>1 → 15 clienti</span></div>
              <div className="flex justify-between"><span>Upskilling</span><span>1 → 20 clienti</span></div>
              <div className="flex justify-between"><span>Innovation Lab</span><span>1 → 15 clienti</span></div>
            </div>
            <div className="mt-3">
              <Link href="/business-plan/business-areas" className="text-xs text-primary hover:underline">Dettaglio servizi B2B →</Link>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-chart-3">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <Monitor className="h-5 w-5 text-chart-3" />
              <span className="font-semibold">Piattaforma — Utenti</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-muted-foreground">Anno 1</div>
                <div className="text-2xl font-bold">200</div>
                <div className="text-xs text-muted-foreground">€10k revenue</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Anno 5</div>
                <div className="text-2xl font-bold text-primary">4.000</div>
                <div className="text-xs text-muted-foreground">€450k revenue</div>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-border text-xs text-muted-foreground space-y-1">
              <div className="flex justify-between"><span>Costo/utente/mese</span><span>€23 → €18</span></div>
              <div className="flex justify-between"><span>Costo infra/mese</span><span>€1.7k → €14.6k</span></div>
              <div className="flex justify-between"><span>Licensing + SaaS</span><span>White-label, B2B ext.</span></div>
            </div>
            <div className="mt-3">
              <Link href="/business-plan/platform-costs" className="text-xs text-primary hover:underline">Costi e infrastruttura →</Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {highlights.map((h) => {
          const Icon = h.icon
          return (
            <Card key={h.label} className="group">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{h.label}</span>
                  <Icon className={`h-4 w-4 ${h.color}`} />
                </div>
                <div className="text-2xl font-bold">{h.value}</div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-muted-foreground">{h.change}</span>
                  <Link href={`/business-plan/${h.link}`} className="text-xs text-primary hover:underline">Approfondisci →</Link>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Proiezione Revenue 5 Anni</CardTitle>
                <CardDescription>Servizi formativi + Piattaforma SaaS (in €k)</CardDescription>
              </div>
              <Link href="/business-plan/financials" className="text-xs text-primary hover:underline">Vedi dettagli →</Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorServizi" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="oklch(0.55 0.15 260)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="oklch(0.55 0.15 260)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorPlatform" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="oklch(0.65 0.18 160)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="oklch(0.65 0.18 160)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.9 0.01 75)" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} tickFormatter={(v: number) => `${v >= 1000 ? `${(v/1000).toFixed(0)}M` : `${v}k`}`} />
                  <Tooltip
                    formatter={(value) => { const v = Number(value); return [`€${v >= 1000 ? `${(v/1000).toFixed(1)}M` : `${v}k`}`]; }}
                    contentStyle={{ borderRadius: '8px', border: '1px solid oklch(0.9 0.01 75)', fontSize: '13px' }}
                  />
                  <Area type="monotone" dataKey="Servizi" stackId="1" stroke="oklch(0.55 0.15 260)" fill="url(#colorServizi)" strokeWidth={2} />
                  <Area type="monotone" dataKey="Piattaforma" stackId="1" stroke="oklch(0.65 0.18 160)" fill="url(#colorPlatform)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Validazione</CardTitle>
            <CardDescription>Score complessivo: {validationScore.overall}/100</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {validationScore.categories.map((cat) => (
              <div key={cat.name}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm">{cat.name}</span>
                  <span className="text-sm font-semibold">{cat.score}/100</span>
                </div>
                <Progress value={cat.score} className="h-2" />
              </div>
            ))}
            <div className="pt-3 border-t border-border">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Grade Complessivo</span>
                <Badge variant="default">A-/B+</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle className="text-base">Vision</CardTitle></CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground leading-relaxed italic">&ldquo;{companyInfo.vision}&rdquo;</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-base">Mission</CardTitle></CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground leading-relaxed italic">&ldquo;{companyInfo.mission}&rdquo;</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Metriche di Ritorno</CardTitle>
              <CardDescription>Investimento €4.5M — Return profile a 5 anni</CardDescription>
            </div>
            <Link href="/business-plan/scenarios" className="text-xs text-primary hover:underline">Analisi scenari →</Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[
              { label: "Enterprise Value Y5", value: "€11.3M" },
              { label: "ROI Multiple", value: `${returnMetrics.roiMultiple}x` },
              { label: "IRR Annuo", value: `${returnMetrics.irr}%` },
              { label: "Payback", value: `${returnMetrics.paybackMonths} mesi` },
              { label: "Cash Generata", value: "€381k" },
            ].map((m) => (
              <div key={m.label} className="text-center">
                <div className="text-2xl font-bold text-primary">{m.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{m.label}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-5">
          <div className="flex flex-wrap gap-x-8 gap-y-3 justify-center">
            {[
              { label: "Consulta per Anno", href: "/business-plan/year-view" },
              { label: "Aree di Business", href: "/business-plan/business-areas" },
              { label: "Proiezioni Finanziarie", href: "/business-plan/financials" },
              { label: "Struttura Costi", href: "/business-plan/costs" },
              { label: "Piattaforma", href: "/business-plan/platform-costs" },
              { label: "KPIs & Metriche", href: "/business-plan/kpis" },
              { label: "Analisi Scenari", href: "/business-plan/scenarios" },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="text-sm text-primary hover:underline">{item.label} →</Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
