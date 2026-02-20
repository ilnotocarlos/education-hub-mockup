"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { EditableCell } from "@/components/business-plan/ui/editable-cell"
import { useBusinessPlanStore } from "@/stores/use-business-plan-store"
import type { KpisData } from "@/stores/use-business-plan-store"
import { Users, Building2, Cpu } from "lucide-react"
import Link from "next/link"

function KPITable({ category, icon: Icon, title, description }: {
  category: keyof KpisData
  icon: typeof Users
  title: string
  description: string
}) {
  const data = useBusinessPlanStore((s) => s.kpis[category])
  const updateKpi = useBusinessPlanStore((s) => s.updateKpi)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon className="h-5 w-5 text-primary" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-2 font-medium text-muted-foreground">Metrica</th>
                <th className="text-right py-3 px-2 font-medium text-muted-foreground">Anno 1</th>
                <th className="text-right py-3 px-2 font-medium text-muted-foreground">Anno 5</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, i) => (
                <tr key={row.metric} className="border-b border-border/50 hover:bg-muted/50">
                  <td className="py-3 px-2 font-medium">{row.metric}</td>
                  <td className="py-3 px-2 text-right text-muted-foreground">
                    <EditableCell value={row.y1} type="text" onSave={(v) => updateKpi(category, i, 'y1', String(v))} />
                  </td>
                  <td className="py-3 px-2 text-right">
                    <EditableCell value={row.y5} type="text" className="font-semibold text-primary" onSave={(v) => updateKpi(category, i, 'y5', String(v))} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}

export function KPIs() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">KPIs & Metriche</h2>
        <p className="text-muted-foreground mt-1">Target operativi — clicca sui valori per modificare</p>
        <div className="flex gap-4 mt-2">
          <Link href="/business-plan/business-areas" className="text-xs text-primary hover:underline">Aree di business →</Link>
          <Link href="/business-plan/platform-costs" className="text-xs text-primary hover:underline">Piattaforma →</Link>
          <Link href="/business-plan/scenarios" className="text-xs text-primary hover:underline">Scenari →</Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <KPITable
          category="students"
          icon={Users}
          title="Metriche Studenti"
          description="Acquisizione, retention e outcome"
        />
        <KPITable
          category="corporate"
          icon={Building2}
          title="Metriche Corporate"
          description="Clienti B2B, contratti e retention"
        />
      </div>

      <KPITable
        category="technology"
        icon={Cpu}
        title="Metriche Piattaforma"
        description="Adozione, performance e costi"
      />

      <Card>
        <CardHeader>
          <CardTitle>Benchmark vs Industry</CardTitle>
          <CardDescription>Come ci posizioniamo rispetto al settore EdTech</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { metric: "Retention", ours: "70-75%", industry: "30%", note: "EdTech benchmark" },
              { metric: "Completion", ours: "89%", industry: "60%", note: "Corsi online media" },
              { metric: "Placement", ours: "87%", industry: "65%", note: "Bootcamp media" },
            ].map((b) => (
              <div key={b.metric} className="p-4 rounded-lg bg-muted/50">
                <div className="text-sm font-semibold mb-3">{b.metric}</div>
                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-xs text-muted-foreground">Industry</div>
                    <div className="text-lg font-mono text-muted-foreground">{b.industry}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-success">Nostro Target</div>
                    <div className="text-2xl font-bold text-primary">{b.ours}</div>
                  </div>
                </div>
                <div className="text-[10px] text-muted-foreground mt-2">{b.note}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
