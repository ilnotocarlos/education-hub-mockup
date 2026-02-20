"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { EditableCell } from "@/components/business-plan/ui/editable-cell"
import { useBusinessPlanStore } from "@/stores/use-business-plan-store"
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts"
import { AlertTriangle, Shield } from "lucide-react"
import Link from "next/link"

const severityConfig = {
  high: { color: "text-destructive", bg: "bg-destructive/10", label: "Alto" },
  medium: { color: "text-warning", bg: "bg-warning/10", label: "Medio" },
  low: { color: "text-success", bg: "bg-success/10", label: "Basso" },
}

export function Scenarios() {
  const scenarios = useBusinessPlanStore((s) => s.scenarios)
  const riskFlags = useBusinessPlanStore((s) => s.riskFlags)
  const updateScenarioRow = useBusinessPlanStore((s) => s.updateScenarioRow)

  const chartData = scenarios.map((s) => ({
    name: s.name,
    "Revenue Y5 (€M)": s.revenueY5 / 1000,
    "EBITDA Y5 (€M)": s.ebitdaY5 / 1000,
  }))

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Analisi Scenari</h2>
        <p className="text-muted-foreground mt-1">Sensitivity analysis e rischi — clicca per modificare i valori</p>
        <div className="flex gap-4 mt-2">
          <Link href="/business-plan/financials" className="text-xs text-primary hover:underline">Proiezioni finanziarie →</Link>
          <Link href="/business-plan/costs" className="text-xs text-primary hover:underline">Struttura costi →</Link>
          <Link href="/business-plan/kpis" className="text-xs text-primary hover:underline">KPIs & metriche →</Link>
        </div>
      </div>

      {/* Scenarios Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Confronto Scenari Anno 5</CardTitle>
          <CardDescription>Revenue ed EBITDA per scenario (in €M)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.9 0.01 75)" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} tickFormatter={(v: number) => `€${v}M`} />
                <Tooltip
                  formatter={(value) => [`€${Number(value).toFixed(1)}M`]}
                  contentStyle={{ borderRadius: '8px', border: '1px solid oklch(0.9 0.01 75)', fontSize: '13px' }}
                />
                <Legend />
                <Bar dataKey="Revenue Y5 (€M)" fill="oklch(0.55 0.15 260)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="EBITDA Y5 (€M)" fill="oklch(0.65 0.18 160)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Scenarios Table */}
      <Card>
        <CardHeader>
          <CardTitle>Dettaglio Scenari</CardTitle>
          <CardDescription>Clicca sui valori numerici per modificarli</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">Scenario</th>
                  <th className="text-right py-3 px-2 font-medium text-muted-foreground">Probabilita %</th>
                  <th className="text-right py-3 px-2 font-medium text-muted-foreground">Revenue Y5 (€k)</th>
                  <th className="text-right py-3 px-2 font-medium text-muted-foreground">EBITDA Y5 (€k)</th>
                  <th className="text-right py-3 px-2 font-medium text-muted-foreground">Margine %</th>
                  <th className="text-right py-3 px-2 font-medium text-muted-foreground">ROI x</th>
                </tr>
              </thead>
              <tbody>
                {scenarios.map((s, i) => (
                  <tr key={s.name} className={`border-b border-border/50 hover:bg-muted/50 ${s.name === 'Base Case' ? 'bg-primary/5' : ''}`}>
                    <td className="py-3 px-2 font-medium">
                      {s.name}
                      {s.name === 'Base Case' && <Badge variant="default" className="ml-2 text-[10px]">Riferimento</Badge>}
                    </td>
                    <td className="py-3 px-2 text-right">
                      <EditableCell value={s.probability} type="number" suffix="%" onSave={(v) => updateScenarioRow(i, 'probability', Number(v))} />
                    </td>
                    <td className="py-3 px-2 text-right">
                      <EditableCell value={s.revenueY5} type="number" className="font-semibold" onSave={(v) => updateScenarioRow(i, 'revenueY5', Number(v))} />
                    </td>
                    <td className="py-3 px-2 text-right">
                      <EditableCell value={s.ebitdaY5} type="number" onSave={(v) => updateScenarioRow(i, 'ebitdaY5', Number(v))} />
                    </td>
                    <td className="py-3 px-2 text-right">
                      <EditableCell value={s.margin} type="number" suffix="%" onSave={(v) => updateScenarioRow(i, 'margin', Number(v))} />
                    </td>
                    <td className="py-3 px-2 text-right">
                      <EditableCell value={s.roi} type="number" suffix="x" className="font-semibold text-primary" onSave={(v) => updateScenarioRow(i, 'roi', Number(v))} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Risk Flags */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-warning" />
            Rischi Critici & Mitigazioni
          </CardTitle>
          <CardDescription>Fattori da monitorare per l'esecuzione del piano</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {riskFlags.map((r) => {
              const config = severityConfig[r.severity]
              return (
                <div key={r.risk} className={`p-4 rounded-lg ${config.bg}`}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-sm">{r.risk}</span>
                        <Badge variant={r.severity === "high" ? "destructive" : "secondary"} className="text-[10px]">
                          {config.label}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">{r.benchmark}</p>
                      <div className="flex items-center gap-2">
                        <Shield className="h-3.5 w-3.5 text-primary shrink-0" />
                        <span className="text-xs">{r.mitigation}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Weighted Average */}
      <Card>
        <CardContent className="p-5">
          <div className="grid grid-cols-2 gap-6 text-center">
            <div>
              <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Media Ponderata Revenue Y5</div>
              <div className="text-3xl font-bold text-primary">€11.4M</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Media Ponderata EBITDA Y5</div>
              <div className="text-3xl font-bold text-success">€2.0M</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
