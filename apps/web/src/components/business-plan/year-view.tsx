"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { yearlySnapshots } from "@/data/business-plan"
import { formatCurrency, formatNumber } from "@/lib/utils"
import { cn } from "@/lib/utils"
import {
  Users, Building2, Euro, TrendingUp, Cpu, Target,
  GraduationCap, Briefcase, CheckCircle2, ArrowUp, ArrowDown,
} from "lucide-react"
import Link from "next/link"
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell,
} from "recharts"

const PIE_COLORS = [
  "oklch(0.55 0.15 260)",
  "oklch(0.65 0.18 160)",
  "oklch(0.7 0.15 80)",
  "oklch(0.6 0.2 310)",
]

export function YearView() {
  const [selectedYear, setSelectedYear] = useState(0)
  const snap = yearlySnapshots[selectedYear]
  const prev = selectedYear > 0 ? yearlySnapshots[selectedYear - 1] : null

  function delta(current: number, previous: number | null) {
    if (previous == null || previous === 0) return null
    return Math.round(((current - previous) / Math.abs(previous)) * 100)
  }

  function DeltaBadge({ current, previous }: { current: number; previous: number | null }) {
    const d = delta(current, previous)
    if (d == null) return null
    const isPositive = d >= 0
    return (
      <span className={cn("inline-flex items-center gap-0.5 text-[10px] font-semibold", isPositive ? "text-success" : "text-destructive")}>
        {isPositive ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
        {Math.abs(d)}%
      </span>
    )
  }

  const revenueBreakdown = [
    { name: "B2C", value: snap.revenue.totalB2C },
    { name: "B2B", value: snap.revenue.totalB2B },
    { name: "Platform", value: snap.revenue.platform },
    { name: "Altro", value: snap.revenue.placement + snap.revenue.licensing },
  ]

  const b2cBarData = [
    { name: "Masterclass", studenti: snap.b2cStudents.masterclass, revenue: snap.revenue.b2cMasterclass },
    { name: "Bootcamp", studenti: snap.b2cStudents.bootcamp, revenue: snap.revenue.b2cBootcamp },
    { name: "Master", studenti: snap.b2cStudents.master, revenue: snap.revenue.b2cMaster },
    { name: "Full-time", studenti: snap.b2cStudents.fulltime, revenue: snap.revenue.b2cFulltime },
  ]

  const b2bBarData = [
    { name: "Corp. Academy", clienti: snap.b2bClients.corporateAcademy, revenue: snap.revenue.b2bCorporateAcademy },
    { name: "Upskilling", clienti: snap.b2bClients.upskilling, revenue: snap.revenue.b2bUpskilling },
    { name: "Innovation Lab", clienti: snap.b2bClients.innovationLab, revenue: snap.revenue.b2bInnovationLab },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Consulta per Anno</h2>
        <p className="text-muted-foreground mt-1">Snapshot completo anno per anno del business plan</p>
        <div className="flex gap-4 mt-2">
          <Link href="/business-plan/business-areas" className="text-xs text-primary hover:underline">Aree di business &rarr;</Link>
          <Link href="/business-plan/financials" className="text-xs text-primary hover:underline">Proiezioni finanziarie &rarr;</Link>
          <Link href="/business-plan/costs" className="text-xs text-primary hover:underline">Struttura costi &rarr;</Link>
          <Link href="/business-plan/platform-costs" className="text-xs text-primary hover:underline">Piattaforma &rarr;</Link>
        </div>
      </div>

      {/* Year Selector */}
      <div className="flex gap-2">
        {yearlySnapshots.map((y, i) => (
          <button
            key={y.year}
            onClick={() => setSelectedYear(i)}
            className={cn(
              "flex-1 py-3 px-4 rounded-xl text-center transition-all cursor-pointer border",
              selectedYear === i
                ? "bg-primary text-primary-foreground border-primary shadow-md"
                : "bg-card border-border hover:bg-muted"
            )}
          >
            <div className="text-lg font-bold">{y.label}</div>
            <div className={cn("text-xs mt-0.5", selectedYear === i ? "text-primary-foreground/70" : "text-muted-foreground")}>
              {y.period}
            </div>
          </button>
        ))}
      </div>

      {/* KPI Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: "Studenti B2C", value: formatNumber(snap.b2cStudents.total), prev: prev?.b2cStudents.total ?? null, current: snap.b2cStudents.total, icon: Users, color: "text-chart-1" },
          { label: "Clienti B2B", value: formatNumber(snap.b2bClients.total), prev: prev?.b2bClients.total ?? null, current: snap.b2bClients.total, icon: Building2, color: "text-chart-4" },
          { label: "Revenue Totale", value: formatCurrency(snap.revenue.totalRevenue * 1000, true), prev: prev?.revenue.totalRevenue ?? null, current: snap.revenue.totalRevenue, icon: Euro, color: "text-chart-1" },
          { label: "EBITDA", value: `€${snap.financials.ebitda}k`, prev: null, current: snap.financials.ebitda, icon: TrendingUp, color: snap.financials.ebitda >= 0 ? "text-success" : "text-destructive" },
          { label: "Team", value: `${snap.team} FTE`, prev: prev?.team ?? null, current: snap.team, icon: Target, color: "text-chart-3" },
          { label: "Utenti Platform", value: formatNumber(snap.platformUsers), prev: prev?.platformUsers ?? null, current: snap.platformUsers, icon: Cpu, color: "text-info" },
        ].map((item) => {
          const Icon = item.icon
          return (
            <Card key={item.label}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <Icon className={`h-4 w-4 ${item.color}`} />
                  <DeltaBadge current={item.current} previous={item.prev} />
                </div>
                <div className="text-xl font-bold">{item.value}</div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-wide mt-1">{item.label}</div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Revenue Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Euro className="h-5 w-5 text-primary" />
              Revenue Breakdown {snap.label}
            </CardTitle>
            <CardDescription>Totale: {formatCurrency(snap.revenue.totalRevenue * 1000, true)}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={revenueBreakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={90}
                    paddingAngle={3}
                    dataKey="value"
                    label={(props) => `${props.name ?? ''} €${Number(props.value)}k`}
                  >
                    {revenueBreakdown.map((_, i) => (
                      <Cell key={i} fill={PIE_COLORS[i]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `€${Number(value)}k`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* P&L + Cash Flow */}
        <Card>
          <CardHeader>
            <CardTitle>P&L & Cash Flow</CardTitle>
            <CardDescription>{snap.label} — {snap.period}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Profittabilita</div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-muted/50">
                    <div className="text-xs text-muted-foreground">Gross Margin</div>
                    <div className="text-lg font-bold">{snap.financials.grossMargin}%</div>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50">
                    <div className="text-xs text-muted-foreground">EBITDA Margin</div>
                    <div className={`text-lg font-bold ${snap.financials.ebitdaMargin < 0 ? 'text-destructive' : 'text-success'}`}>
                      {snap.financials.ebitdaMargin}%
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50">
                    <div className="text-xs text-muted-foreground">EBITDA</div>
                    <div className={`text-lg font-bold ${snap.financials.ebitda < 0 ? 'text-destructive' : ''}`}>€{snap.financials.ebitda}k</div>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50">
                    <div className="text-xs text-muted-foreground">Net Income</div>
                    <div className={`text-lg font-bold ${snap.financials.netIncome < 0 ? 'text-destructive' : ''}`}>€{snap.financials.netIncome}k</div>
                  </div>
                </div>
              </div>
              <Separator />
              <div>
                <div className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Cash Flow</div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 rounded-lg bg-muted/50">
                    <div className="text-xs text-muted-foreground">CapEx</div>
                    <div className="text-lg font-bold text-destructive">€{snap.cashflow.capex}k</div>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50">
                    <div className="text-xs text-muted-foreground">FCF</div>
                    <div className={`text-lg font-bold ${snap.cashflow.fcf < 0 ? 'text-destructive' : 'text-success'}`}>€{snap.cashflow.fcf}k</div>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50">
                    <div className="text-xs text-muted-foreground">Cumulativo</div>
                    <div className={`text-lg font-bold ${snap.cashflow.cumulative < 0 ? 'text-destructive' : ''}`}>
                      {formatCurrency(snap.cashflow.cumulative * 1000, true)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* B2C Detail */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-primary" />
            B2C — Studenti & Revenue {snap.label}
          </CardTitle>
          <CardDescription>
            {formatNumber(snap.b2cStudents.total)} studenti — {formatCurrency(snap.revenue.totalB2C * 1000, true)} revenue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={b2cBarData}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.9 0.01 75)" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis yAxisId="left" tick={{ fontSize: 12 }} />
                <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} tickFormatter={(v: number) => `€${v}k`} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid oklch(0.9 0.01 75)', fontSize: '13px' }} />
                <Legend />
                <Bar yAxisId="left" dataKey="studenti" name="Studenti" fill="oklch(0.55 0.15 260)" radius={[4, 4, 0, 0]} />
                <Bar yAxisId="right" dataKey="revenue" name="Revenue (€k)" fill="oklch(0.65 0.18 160)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* B2B Detail */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-primary" />
            B2B — Clienti & Revenue {snap.label}
          </CardTitle>
          <CardDescription>
            {formatNumber(snap.b2bClients.total)} clienti — {formatCurrency(snap.revenue.totalB2B * 1000, true)} revenue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={b2bBarData}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.9 0.01 75)" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis yAxisId="left" tick={{ fontSize: 12 }} />
                <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} tickFormatter={(v: number) => `€${v}k`} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid oklch(0.9 0.01 75)', fontSize: '13px' }} />
                <Legend />
                <Bar yAxisId="left" dataKey="clienti" name="Clienti" fill="oklch(0.55 0.15 260)" radius={[4, 4, 0, 0]} />
                <Bar yAxisId="right" dataKey="revenue" name="Revenue (€k)" fill="oklch(0.7 0.15 80)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>KPIs Operativi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Retention", value: `${snap.kpis.retention}%`, target: "70-75%" },
                { label: "Placement", value: `${snap.kpis.placement}%`, target: "87%" },
                { label: "Completion", value: `${snap.kpis.completion}%`, target: "89%" },
                { label: "NPS", value: String(snap.kpis.nps), target: "72" },
                { label: "B2B Retention", value: `${snap.kpis.b2bRetention}%`, target: "80%" },
                { label: "NRR", value: `${snap.kpis.nrr}%`, target: "135%" },
              ].map((kpi) => (
                <div key={kpi.label} className="p-3 rounded-lg bg-muted/50">
                  <div className="text-xs text-muted-foreground">{kpi.label}</div>
                  <div className="text-lg font-bold">{kpi.value}</div>
                  <div className="text-[10px] text-muted-foreground">Target Y5: {kpi.target}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Milestone {snap.label}</CardTitle>
            <CardDescription>{snap.period}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {snap.milestones.map((m, i) => (
                <div key={i} className="flex items-start gap-3 p-2.5 rounded-lg bg-muted/50">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm">{m}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Year comparison mini-table */}
      <Card>
        <CardHeader>
          <CardTitle>Evoluzione 5 Anni</CardTitle>
          <CardDescription>Confronto rapido tra tutti gli anni</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">Metrica</th>
                  {yearlySnapshots.map((y) => (
                    <th key={y.year} className={cn("text-right py-3 px-2 font-medium", selectedYear === y.year - 1 ? "text-primary bg-primary/5" : "text-muted-foreground")}>
                      {y.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { label: "Studenti B2C", values: yearlySnapshots.map((y) => formatNumber(y.b2cStudents.total)) },
                  { label: "Clienti B2B", values: yearlySnapshots.map((y) => formatNumber(y.b2bClients.total)) },
                  { label: "Revenue Totale", values: yearlySnapshots.map((y) => formatCurrency(y.revenue.totalRevenue * 1000, true)) },
                  { label: "EBITDA", values: yearlySnapshots.map((y) => `€${y.financials.ebitda}k`) },
                  { label: "EBITDA Margin", values: yearlySnapshots.map((y) => `${y.financials.ebitdaMargin}%`) },
                  { label: "FCF", values: yearlySnapshots.map((y) => `€${y.cashflow.fcf}k`) },
                  { label: "Team", values: yearlySnapshots.map((y) => `${y.team} FTE`) },
                ].map((row) => (
                  <tr key={row.label} className="border-b border-border/50 hover:bg-muted/50">
                    <td className="py-2.5 px-2 font-medium">{row.label}</td>
                    {row.values.map((v, i) => (
                      <td key={i} className={cn("py-2.5 px-2 text-right", selectedYear === i ? "font-semibold text-primary bg-primary/5" : "")}>
                        {v}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
