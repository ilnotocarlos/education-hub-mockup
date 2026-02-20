"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EditableCell } from "@/components/business-plan/ui/editable-cell"
import { useBusinessPlanStore } from "@/stores/use-business-plan-store"
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  ComposedChart, Line,
} from "recharts"

export function Financials() {
  const revenueProjections = useBusinessPlanStore((s) => s.revenueProjections)
  const profitability = useBusinessPlanStore((s) => s.profitability)
  const cashFlow = useBusinessPlanStore((s) => s.cashFlow)
  const updateRevenueRow = useBusinessPlanStore((s) => s.updateRevenueRow)
  const updateProfitRow = useBusinessPlanStore((s) => s.updateProfitRow)
  const updateCashFlowRow = useBusinessPlanStore((s) => s.updateCashFlowRow)

  const profitChartData = profitability.map((p) => ({
    name: p.year,
    "Gross Margin %": p.grossMargin,
    "EBITDA": p.ebitda,
    "EBITDA Margin %": p.ebitdaMargin,
    "Net Income": p.netIncome,
  }))

  const cashFlowData = cashFlow.map((c) => ({
    name: c.year,
    "EBITDA": c.ebitda,
    "CapEx": c.capex,
    "NWC": c.nwc,
    "FCF": c.fcf,
    "Cumulativo": c.cumulative,
  }))

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Proiezioni Finanziarie</h2>
        <p className="text-muted-foreground mt-1">Revenue, P&L consolidato e cash flow — clicca su un valore per modificarlo</p>
        <div className="flex gap-4 mt-2">
          <Link href="/business-plan/costs" className="text-xs text-primary hover:underline">Struttura costi →</Link>
          <Link href="/business-plan/business-areas" className="text-xs text-primary hover:underline">Aree di business →</Link>
          <Link href="/business-plan/scenarios" className="text-xs text-primary hover:underline">Analisi scenari →</Link>
        </div>
      </div>

      <Tabs defaultValue="revenue" className="space-y-6">
        <TabsList className="grid w-full max-w-lg grid-cols-3">
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="profitability">P&L</TabsTrigger>
          <TabsTrigger value="cashflow">Cash Flow</TabsTrigger>
        </TabsList>

        <TabsContent value="revenue" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Projections</CardTitle>
              <CardDescription>Crescita consolidata 5 anni — CAGR ~94%</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueProjections.map(r => ({ name: r.year, Servizi: r.services, Piattaforma: r.platform }))}>
                    <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.9 0.01 75)" />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} tickFormatter={(v: number) => `€${v >= 1000 ? `${(v/1000).toFixed(0)}M` : `${v}k`}`} />
                    <Tooltip formatter={(value) => { const v = Number(value); return [`€${v >= 1000 ? `${(v/1000).toFixed(1)}M` : `${v}k`}`]; }} contentStyle={{ borderRadius: '8px', border: '1px solid oklch(0.9 0.01 75)', fontSize: '13px' }} />
                    <Legend />
                    <Bar dataKey="Servizi" stackId="a" fill="oklch(0.55 0.15 260)" radius={[0, 0, 0, 0]} />
                    <Bar dataKey="Piattaforma" stackId="a" fill="oklch(0.65 0.18 160)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Dettaglio Revenue</CardTitle>
              <CardDescription>Clicca su un valore numerico per modificarlo</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-2 font-medium text-muted-foreground">Anno</th>
                      <th className="text-right py-3 px-2 font-medium text-muted-foreground">Piattaforma (€k)</th>
                      <th className="text-right py-3 px-2 font-medium text-muted-foreground">Servizi (€k)</th>
                      <th className="text-right py-3 px-2 font-medium text-muted-foreground">Totale (€k)</th>
                      <th className="text-right py-3 px-2 font-medium text-muted-foreground">Crescita</th>
                    </tr>
                  </thead>
                  <tbody>
                    {revenueProjections.map((r, i) => (
                      <tr key={r.year} className="border-b border-border/50 hover:bg-muted/50">
                        <td className="py-3 px-2 font-medium">{r.year}</td>
                        <td className="py-3 px-2 text-right">
                          <EditableCell value={r.platform} type="number" onSave={(v) => updateRevenueRow(i, 'platform', Number(v))} />
                        </td>
                        <td className="py-3 px-2 text-right">
                          <EditableCell value={r.services} type="number" onSave={(v) => updateRevenueRow(i, 'services', Number(v))} />
                        </td>
                        <td className="py-3 px-2 text-right">
                          <EditableCell value={r.total} type="number" className="font-semibold" onSave={(v) => updateRevenueRow(i, 'total', Number(v))} />
                        </td>
                        <td className="py-3 px-2 text-right text-success font-semibold">
                          {r.growth != null ? (
                            <EditableCell value={r.growth} type="number" suffix="%" onSave={(v) => updateRevenueRow(i, 'growth', Number(v))} />
                          ) : '—'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profitability" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>EBITDA & Net Income</CardTitle>
              <CardDescription>Evoluzione della profittabilita (in €k)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={profitChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.9 0.01 75)" />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis yAxisId="left" tick={{ fontSize: 12 }} tickFormatter={(v: number) => `€${v >= 1000 ? `${(v/1000).toFixed(0)}M` : `${v}k`}`} />
                    <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} tickFormatter={(v: number) => `${v}%`} />
                    <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid oklch(0.9 0.01 75)', fontSize: '13px' }} />
                    <Legend />
                    <Bar yAxisId="left" dataKey="EBITDA" fill="oklch(0.55 0.15 260)" radius={[4, 4, 0, 0]} />
                    <Bar yAxisId="left" dataKey="Net Income" fill="oklch(0.65 0.18 160)" radius={[4, 4, 0, 0]} />
                    <Line yAxisId="right" type="monotone" dataKey="EBITDA Margin %" stroke="oklch(0.65 0.18 30)" strokeWidth={2} dot={{ r: 4 }} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>P&L Consolidato</CardTitle>
              <CardDescription>Clicca su un valore per modificarlo</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-2 font-medium text-muted-foreground">Anno</th>
                      <th className="text-right py-3 px-2 font-medium text-muted-foreground">Gross Margin %</th>
                      <th className="text-right py-3 px-2 font-medium text-muted-foreground">EBITDA (€k)</th>
                      <th className="text-right py-3 px-2 font-medium text-muted-foreground">EBITDA %</th>
                      <th className="text-right py-3 px-2 font-medium text-muted-foreground">Net Income (€k)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {profitability.map((p, i) => (
                      <tr key={p.year} className="border-b border-border/50 hover:bg-muted/50">
                        <td className="py-3 px-2 font-medium">{p.year}</td>
                        <td className="py-3 px-2 text-right">
                          <EditableCell value={p.grossMargin} type="number" suffix="%" onSave={(v) => updateProfitRow(i, 'grossMargin', Number(v))} />
                        </td>
                        <td className={`py-3 px-2 text-right ${p.ebitda < 0 ? 'text-destructive' : ''}`}>
                          <EditableCell value={p.ebitda} type="number" className="font-semibold" onSave={(v) => updateProfitRow(i, 'ebitda', Number(v))} />
                        </td>
                        <td className={`py-3 px-2 text-right ${p.ebitdaMargin < 0 ? 'text-destructive' : 'text-success'}`}>
                          <EditableCell value={p.ebitdaMargin} type="number" suffix="%" onSave={(v) => updateProfitRow(i, 'ebitdaMargin', Number(v))} />
                        </td>
                        <td className={`py-3 px-2 text-right ${p.netIncome < 0 ? 'text-destructive' : ''}`}>
                          <EditableCell value={p.netIncome} type="number" className="font-semibold" onSave={(v) => updateProfitRow(i, 'netIncome', Number(v))} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cashflow" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Free Cash Flow & Cumulativo</CardTitle>
              <CardDescription>Cumulative FCF a 5 anni: €381k</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={cashFlowData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.9 0.01 75)" />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} tickFormatter={(v: number) => `€${v >= 1000 ? `${(v/1000).toFixed(0)}M` : `${v}k`}`} />
                    <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid oklch(0.9 0.01 75)', fontSize: '13px' }} />
                    <Legend />
                    <Bar dataKey="FCF" fill="oklch(0.55 0.15 260)" radius={[4, 4, 0, 0]} />
                    <Line type="monotone" dataKey="Cumulativo" stroke="oklch(0.65 0.18 30)" strokeWidth={2} dot={{ r: 4 }} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Dettaglio Cash Flow</CardTitle>
              <CardDescription>Clicca su un valore per modificarlo</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-2 font-medium text-muted-foreground">Anno</th>
                      <th className="text-right py-3 px-2 font-medium text-muted-foreground">EBITDA (€k)</th>
                      <th className="text-right py-3 px-2 font-medium text-muted-foreground">CapEx (€k)</th>
                      <th className="text-right py-3 px-2 font-medium text-muted-foreground">NWC (€k)</th>
                      <th className="text-right py-3 px-2 font-medium text-muted-foreground">FCF (€k)</th>
                      <th className="text-right py-3 px-2 font-medium text-muted-foreground">Cumulativo (€k)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cashFlow.map((c, i) => (
                      <tr key={c.year} className="border-b border-border/50 hover:bg-muted/50">
                        <td className="py-3 px-2 font-medium">{c.year}</td>
                        <td className={`py-3 px-2 text-right ${c.ebitda < 0 ? 'text-destructive' : ''}`}>
                          <EditableCell value={c.ebitda} type="number" onSave={(v) => updateCashFlowRow(i, 'ebitda', Number(v))} />
                        </td>
                        <td className="py-3 px-2 text-right text-destructive">
                          <EditableCell value={c.capex} type="number" onSave={(v) => updateCashFlowRow(i, 'capex', Number(v))} />
                        </td>
                        <td className="py-3 px-2 text-right text-destructive">
                          <EditableCell value={c.nwc} type="number" onSave={(v) => updateCashFlowRow(i, 'nwc', Number(v))} />
                        </td>
                        <td className={`py-3 px-2 text-right ${c.fcf < 0 ? 'text-destructive' : 'text-success'}`}>
                          <EditableCell value={c.fcf} type="number" className="font-semibold" onSave={(v) => updateCashFlowRow(i, 'fcf', Number(v))} />
                        </td>
                        <td className={`py-3 px-2 text-right ${c.cumulative < 0 ? 'text-destructive' : ''}`}>
                          <EditableCell value={c.cumulative} type="number" className="font-semibold" onSave={(v) => updateCashFlowRow(i, 'cumulative', Number(v))} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
