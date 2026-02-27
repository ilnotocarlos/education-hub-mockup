"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useBusinessPlanStore } from "@/stores/use-business-plan-store"
import { EditableCell } from "@/components/business-plan/ui/editable-cell"
import { costStructure, teamComposition, revenueProjections } from "@/data/business-plan"
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, ComposedChart, Line,
} from "recharts"
import { Users, TrendingDown, Wallet, Building2 } from "lucide-react"
import Link from "next/link"

const OPEX_COLORS = [
  "oklch(0.50 0.14 260)",
  "oklch(0.60 0.16 30)",
  "oklch(0.55 0.15 160)",
  "oklch(0.60 0.14 80)",
  "oklch(0.65 0.08 300)",
]

const TEAM_COLORS = [
  "oklch(0.50 0.14 260)",
  "oklch(0.60 0.16 30)",
  "oklch(0.55 0.15 160)",
  "oklch(0.60 0.14 80)",
  "oklch(0.65 0.08 300)",
]

const FUND_COLORS = [
  "oklch(0.45 0.12 260)",
  "oklch(0.55 0.15 260)",
  "oklch(0.65 0.18 160)",
  "oklch(0.7 0.15 80)",
  "oklch(0.6 0.2 310)",
]

const fmtK = (v: number) => v >= 1000 ? `€${(v / 1000).toFixed(1)}M` : `€${v}k`

const STUDENTS = [75, 150, 250, 500, 800]

export function Costs() {
  const useOfFunds = useBusinessPlanStore((s) => s.useOfFunds)
  const updateFundRow = useBusinessPlanStore((s) => s.updateFundRow)

  const y5 = costStructure[costStructure.length - 1]
  const y1 = costStructure[0]

  const costPerStudentY1 = Math.round((y1.totalCosts + y1.capex) / STUDENTS[0])
  const costPerStudentY5 = Math.round((y5.totalCosts + y5.capex) / STUDENTS[4])

  const summaryCards = [
    { label: "Costi Totali Y1", value: fmtK(y1.totalCosts), sub: `${y1.team} FTE`, icon: Wallet },
    { label: "Costi Totali Y5", value: fmtK(y5.totalCosts), sub: `${y5.team} FTE`, icon: Building2 },
    { label: "Costo/Studente Y1", value: `€${costPerStudentY1.toLocaleString('it-IT')}`, sub: "75 studenti", icon: Users },
    { label: "Costo/Studente Y5", value: `€${costPerStudentY5.toLocaleString('it-IT')}`, sub: `-${Math.round((1 - costPerStudentY5 / costPerStudentY1) * 100)}% economia di scala`, icon: TrendingDown },
  ]

  const stackedData = costStructure.map(c => ({
    name: c.year,
    COGS: c.cogs,
    Personale: c.personnel,
    Marketing: c.marketing,
    Tecnologia: c.technology,
    Contenuti: c.content,
    "G&A": c.gAndA,
  }))

  const opexPieY5 = [
    { name: "Personale", value: y5.personnel },
    { name: "Marketing", value: y5.marketing },
    { name: "Tecnologia", value: y5.technology },
    { name: "Contenuti", value: y5.content },
    { name: "G&A", value: y5.gAndA },
  ]

  const efficiencyData = costStructure.map((c, i) => ({
    name: c.year,
    "Costo/Studente": Math.round((c.totalCosts + c.capex) / STUDENTS[i]),
    "Revenue/Studente": Math.round((revenueProjections[i]?.total ?? 0) * 1000 / STUDENTS[i]),
    "Team": c.team,
  }))

  const fundPieData = useOfFunds.map(f => ({
    name: f.category,
    value: f.amount,
  }))

  const teamData = [
    {
      name: "Anno 1",
      ...Object.fromEntries(teamComposition.map(t => [t.role, t.y1])),
    },
    {
      name: "Anno 5",
      ...Object.fromEntries(teamComposition.map(t => [t.role, t.y5])),
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Struttura Costi</h2>
        <p className="text-muted-foreground mt-1">COGS, OpEx, team, use of funds e unit costs</p>
        <div className="flex gap-4 mt-2">
          <Link href="/business-plan/platform-costs" className="text-xs text-primary hover:underline">Costi piattaforma →</Link>
          <Link href="/business-plan/financials" className="text-xs text-primary hover:underline">Proiezioni finanziarie →</Link>
          <Link href="/business-plan/business-areas" className="text-xs text-primary hover:underline">Aree di business →</Link>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryCards.map((c) => {
          const Icon = c.icon
          return (
            <Card key={c.label}>
              <CardContent className="pt-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">{c.label}</p>
                    <p className="text-2xl font-bold mt-1">{c.value}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{c.sub}</p>
                  </div>
                  <Icon className="h-5 w-5 text-muted-foreground/50" />
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full max-w-2xl grid-cols-4">
          <TabsTrigger value="overview">Panoramica</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="funding">Allocazione Budget</TabsTrigger>
          <TabsTrigger value="efficiency">Efficienza</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Evoluzione Costi</CardTitle>
                <CardDescription>COGS + OpEx per categoria — 5 anni (€k)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={stackedData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.9 0.01 75)" />
                      <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} tickFormatter={(v: number) => fmtK(v)} />
                      <Tooltip formatter={(value) => fmtK(Number(value))} contentStyle={{ borderRadius: '8px', border: '1px solid oklch(0.9 0.01 75)', fontSize: '13px' }} />
                      <Legend />
                      <Bar dataKey="COGS" stackId="a" fill="oklch(0.75 0.08 260)" />
                      <Bar dataKey="Personale" stackId="a" fill={OPEX_COLORS[0]} />
                      <Bar dataKey="Marketing" stackId="a" fill={OPEX_COLORS[1]} />
                      <Bar dataKey="Tecnologia" stackId="a" fill={OPEX_COLORS[2]} />
                      <Bar dataKey="Contenuti" stackId="a" fill={OPEX_COLORS[3]} />
                      <Bar dataKey="G&A" stackId="a" fill={OPEX_COLORS[4]} radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>OpEx Breakdown Anno 5</CardTitle>
                <CardDescription>Distribuzione spese operative €{(y5.totalOpex / 1000).toFixed(1)}M</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={opexPieY5} cx="50%" cy="50%" innerRadius={55} outerRadius={95} paddingAngle={3} dataKey="value"
                        label={(props) => `${props.name ?? ''} ${((props.percent ?? 0) * 100).toFixed(0)}%`}>
                        {opexPieY5.map((_, i) => <Cell key={i} fill={OPEX_COLORS[i]} />)}
                      </Pie>
                      <Tooltip formatter={(value) => fmtK(Number(value))} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Dettaglio Costi per Anno</CardTitle>
              <CardDescription>Tutti i valori in €k</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-2 font-medium text-muted-foreground">Voce</th>
                      {costStructure.map(c => (
                        <th key={c.year} className="text-right py-3 px-2 font-medium text-muted-foreground">{c.year}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border/50 bg-muted/30">
                      <td className="py-2 px-2 font-semibold">COGS</td>
                      {costStructure.map(c => <td key={c.year} className="py-2 px-2 text-right font-semibold">{c.cogs.toLocaleString('it-IT')}</td>)}
                    </tr>
                    {([
                      ["Personale", "personnel"],
                      ["Marketing", "marketing"],
                      ["Tecnologia", "technology"],
                      ["Contenuti & Faculty", "content"],
                      ["G&A", "gAndA"],
                    ] as const).map(([label, key]) => (
                      <tr key={key} className="border-b border-border/50 hover:bg-muted/50">
                        <td className="py-2 px-2 text-muted-foreground pl-4">{label}</td>
                        {costStructure.map(c => <td key={c.year} className="py-2 px-2 text-right">{c[key].toLocaleString('it-IT')}</td>)}
                      </tr>
                    ))}
                    <tr className="border-b border-border bg-muted/30">
                      <td className="py-2 px-2 font-semibold">Totale OpEx</td>
                      {costStructure.map(c => <td key={c.year} className="py-2 px-2 text-right font-semibold">{c.totalOpex.toLocaleString('it-IT')}</td>)}
                    </tr>
                    <tr className="border-b border-border/50 hover:bg-muted/50">
                      <td className="py-2 px-2 text-muted-foreground">CapEx</td>
                      {costStructure.map(c => <td key={c.year} className="py-2 px-2 text-right">{c.capex.toLocaleString('it-IT')}</td>)}
                    </tr>
                    <tr className="border-t-2 border-border font-bold">
                      <td className="py-3 px-2">Costi Totali</td>
                      {costStructure.map(c => <td key={c.year} className="py-3 px-2 text-right">{(c.totalCosts + c.capex).toLocaleString('it-IT')}</td>)}
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Composizione Team</CardTitle>
                <CardDescription>Da {y1.team} a {y5.team} FTE in 5 anni</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={teamData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.9 0.01 75)" />
                      <XAxis type="number" tick={{ fontSize: 12 }} />
                      <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} width={80} />
                      <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid oklch(0.9 0.01 75)', fontSize: '13px' }} />
                      <Legend />
                      {teamComposition.map((t, i) => (
                        <Bar key={t.role} dataKey={t.role} stackId="a" fill={TEAM_COLORS[i]} radius={i === teamComposition.length - 1 ? [0, 4, 4, 0] : undefined} />
                      ))}
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Dettaglio Team & Costi</CardTitle>
                <CardDescription>Headcount e costo medio per ruolo</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-2 font-medium text-muted-foreground">Ruolo</th>
                        <th className="text-right py-3 px-2 font-medium text-muted-foreground">Y1</th>
                        <th className="text-right py-3 px-2 font-medium text-muted-foreground">Y5</th>
                        <th className="text-right py-3 px-2 font-medium text-muted-foreground">Costo medio (€k)</th>
                        <th className="text-right py-3 px-2 font-medium text-muted-foreground">Costo Y5 (€k)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {teamComposition.map(t => (
                        <tr key={t.role} className="border-b border-border/50 hover:bg-muted/50">
                          <td className="py-2 px-2 font-medium">{t.role}</td>
                          <td className="py-2 px-2 text-right">{t.y1}</td>
                          <td className="py-2 px-2 text-right">{t.y5}</td>
                          <td className="py-2 px-2 text-right">€{t.avgCost}k</td>
                          <td className="py-2 px-2 text-right font-semibold">{(t.y5 * t.avgCost).toLocaleString('it-IT')}</td>
                        </tr>
                      ))}
                      <tr className="border-t-2 border-border font-bold">
                        <td className="py-3 px-2">Totale</td>
                        <td className="py-3 px-2 text-right">{teamComposition.reduce((s, t) => s + t.y1, 0)}</td>
                        <td className="py-3 px-2 text-right">{teamComposition.reduce((s, t) => s + t.y5, 0)}</td>
                        <td className="py-3 px-2 text-right">—</td>
                        <td className="py-3 px-2 text-right">{teamComposition.reduce((s, t) => s + t.y5 * t.avgCost, 0).toLocaleString('it-IT')}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="funding" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Allocazione Budget</CardTitle>
                <CardDescription>Distribuzione del budget complessivo</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={fundPieData} cx="50%" cy="50%" innerRadius={55} outerRadius={95} paddingAngle={3} dataKey="value"
                        label={(props) => `${((props.percent ?? 0) * 100).toFixed(0)}%`}>
                        {fundPieData.map((_, i) => <Cell key={i} fill={FUND_COLORS[i % FUND_COLORS.length]} />)}
                      </Pie>
                      <Tooltip formatter={(value) => `€${(Number(value) / 1_000_000).toFixed(2)}M`} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Dettaglio Allocazione</CardTitle>
                <CardDescription>Clicca su importi o percentuali per modificare</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {useOfFunds.map((f, i) => (
                    <div key={f.category}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">{f.category}</span>
                        <span className="text-sm font-semibold">
                          <EditableCell value={f.amount} type="currency" onSave={(v) => updateFundRow(i, 'amount', Number(v))} />
                          {' '}(<EditableCell value={f.percent} type="number" suffix="%" onSave={(v) => updateFundRow(i, 'percent', Number(v))} />)
                        </span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${f.percent * 2.5}%` }} />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{f.detail}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="efficiency" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Costo vs Revenue per Studente</CardTitle>
              <CardDescription>Evoluzione costo unitario e revenue unitaria su 5 anni</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={efficiencyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.9 0.01 75)" />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis yAxisId="left" tick={{ fontSize: 12 }} tickFormatter={(v: number) => `€${(v / 1000).toFixed(0)}k`} />
                    <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} />
                    <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid oklch(0.9 0.01 75)', fontSize: '13px' }} />
                    <Legend />
                    <Bar yAxisId="left" dataKey="Costo/Studente" fill="oklch(0.60 0.16 30)" radius={[4, 4, 0, 0]} />
                    <Bar yAxisId="left" dataKey="Revenue/Studente" fill="oklch(0.55 0.15 160)" radius={[4, 4, 0, 0]} />
                    <Line yAxisId="right" type="monotone" dataKey="Team" stroke="oklch(0.50 0.14 260)" strokeWidth={2} dot={{ r: 4 }} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            {costStructure.map((c, i) => {
              const totalWithCapex = c.totalCosts + c.capex
              const revK = revenueProjections[i]?.total ?? 0
              const costPerStudent = Math.round(totalWithCapex / STUDENTS[i])
              const revPerStudent = Math.round(revK * 1000 / STUDENTS[i])
              const margin = ((revPerStudent - costPerStudent) / revPerStudent * 100)
              return (
                <Card key={c.year}>
                  <CardContent className="pt-5">
                    <p className="text-sm font-semibold">{c.year}</p>
                    <p className="text-xs text-muted-foreground">{STUDENTS[i]} studenti</p>
                    <div className="mt-3 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Costo/studente</span>
                        <span className="font-medium">€{costPerStudent.toLocaleString('it-IT')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Revenue/studente</span>
                        <span className="font-medium">€{revPerStudent.toLocaleString('it-IT')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Margine</span>
                        <span className={`font-semibold ${margin > 0 ? 'text-success' : 'text-destructive'}`}>
                          {margin > 0 ? '+' : ''}{margin.toFixed(0)}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Costo/FTE</span>
                        <span className="font-medium">€{Math.round((c.personnel / c.team) * 1000).toLocaleString('it-IT')}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
