"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EditableCell } from "@/components/business-plan/ui/editable-cell"
import { useBusinessPlanStore } from "@/stores/use-business-plan-store"
import { formatCurrency } from "@/lib/utils"
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend,
} from "recharts"
import { Users, Building2, Cpu, GraduationCap } from "lucide-react"
import Link from "next/link"

const pieData = [
  { name: "B2B", value: 6500, color: "oklch(0.45 0.12 260)" },
  { name: "B2C", value: 3708, color: "oklch(0.65 0.18 160)" },
  { name: "Platform", value: 450, color: "oklch(0.7 0.15 80)" },
  { name: "Altro", value: 320, color: "oklch(0.6 0.2 310)" },
]

export function BusinessAreas() {
  const b2cProducts = useBusinessPlanStore((s) => s.b2cProducts)
  const b2bServices = useBusinessPlanStore((s) => s.b2bServices)
  const platformRevenue = useBusinessPlanStore((s) => s.platformRevenue)
  const revenueMixY5 = useBusinessPlanStore((s) => s.revenueMixY5)
  const updateB2CProduct = useBusinessPlanStore((s) => s.updateB2CProduct)
  const updateB2BService = useBusinessPlanStore((s) => s.updateB2BService)
  const updatePlatformRow = useBusinessPlanStore((s) => s.updatePlatformRow)

  const b2cChartData = b2cProducts.map((p) => ({
    name: p.format,
    "Anno 1": p.y1Students,
    "Anno 5": p.y5Students,
  }))

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Aree di Business</h2>
        <p className="text-muted-foreground mt-1">Revenue mix e struttura — clicca sui valori per modificare</p>
        <div className="flex gap-4 mt-2">
          <Link href="/business-plan/financials" className="text-xs text-primary hover:underline">Proiezioni finanziarie &rarr;</Link>
          <Link href="/business-plan/platform-costs" className="text-xs text-primary hover:underline">Costi piattaforma &rarr;</Link>
          <Link href="/business-plan/kpis" className="text-xs text-primary hover:underline">KPIs & metriche &rarr;</Link>
        </div>
      </div>

      {/* Revenue Mix Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Mix Anno 5</CardTitle>
            <CardDescription>€11.0M — Distribuzione per canale</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={3}
                    dataKey="value"
                    label={(props) => `${props.name ?? ''} ${((props.percent ?? 0) * 100).toFixed(0)}%`}
                  >
                    {pieData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(Number(value) * 1000, true)} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue Breakdown Anno 5</CardTitle>
            <CardDescription>Clicca sui valori per modificare</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {revenueMixY5.map((item) => (
                <div key={item.area} className="flex items-center gap-3">
                  <div className="w-full">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{item.area}</span>
                        <Badge variant={
                          item.type === "B2B" ? "default" : item.type === "B2C" ? "secondary" : "outline"
                        } className="text-[10px] px-1.5 py-0">
                          {item.type}
                        </Badge>
                      </div>
                      <span className="text-sm font-semibold">€{(item.revenue / 1000).toFixed(1)}M</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all"
                        style={{ width: `${item.percent * 3.5}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Business Unit Tabs */}
      <Tabs defaultValue="b2c" className="space-y-6">
        <TabsList className="grid w-full max-w-lg grid-cols-3">
          <TabsTrigger value="b2c" className="flex items-center gap-2">
            <Users className="h-3.5 w-3.5" />
            B2C
          </TabsTrigger>
          <TabsTrigger value="b2b" className="flex items-center gap-2">
            <Building2 className="h-3.5 w-3.5" />
            B2B
          </TabsTrigger>
          <TabsTrigger value="platform" className="flex items-center gap-2">
            <Cpu className="h-3.5 w-3.5" />
            Piattaforma
          </TabsTrigger>
        </TabsList>

        {/* B2C */}
        <TabsContent value="b2c" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {b2cProducts.map((p, idx) => (
              <Card key={p.format}>
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <GraduationCap className="h-4 w-4 text-primary" />
                    <span className="font-semibold text-sm">{p.format}</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Durata</span>
                      <span>{p.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Prezzo</span>
                      <EditableCell value={p.price} type="currency" prefix="€" className="font-semibold" onSave={(v) => updateB2CProduct(idx, 'price', Number(v))} />
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Studenti Y1</span>
                      <EditableCell value={p.y1Students} type="number" onSave={(v) => updateB2CProduct(idx, 'y1Students', Number(v))} />
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Studenti Y5</span>
                      <EditableCell value={p.y5Students} type="number" className="font-semibold" onSave={(v) => updateB2CProduct(idx, 'y5Students', Number(v))} />
                    </div>
                    <div className="pt-2 border-t border-border flex justify-between">
                      <span className="text-muted-foreground">Revenue Y5</span>
                      <EditableCell value={p.y5Revenue} type="number" className="font-bold text-primary" onSave={(v) => updateB2CProduct(idx, 'y5Revenue', Number(v))} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Crescita Studenti B2C</CardTitle>
              <CardDescription>Anno 1 vs Anno 5 per formato</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={b2cChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.9 0.01 75)" />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid oklch(0.9 0.01 75)', fontSize: '13px' }} />
                    <Legend />
                    <Bar dataKey="Anno 1" fill="oklch(0.7 0.15 80)" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="Anno 5" fill="oklch(0.55 0.15 260)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* B2B */}
        <TabsContent value="b2b" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {b2bServices.map((s, idx) => (
              <Card key={s.service}>
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Building2 className="h-4 w-4 text-primary" />
                    <span className="font-semibold text-sm">{s.service}</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">ACV</span>
                      <EditableCell value={s.acv} type="currency" className="font-semibold" onSave={(v) => updateB2BService(idx, 'acv', Number(v))} />
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Clienti Y1</span>
                      <EditableCell value={s.y1Clients} type="number" onSave={(v) => updateB2BService(idx, 'y1Clients', Number(v))} />
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Clienti Y5</span>
                      <EditableCell value={s.y5Clients} type="number" className="font-semibold" onSave={(v) => updateB2BService(idx, 'y5Clients', Number(v))} />
                    </div>
                    <div className="pt-2 border-t border-border flex justify-between">
                      <span className="text-muted-foreground">Revenue Y5 (€k)</span>
                      <EditableCell value={s.y5Revenue} type="number" className="font-bold text-primary" onSave={(v) => updateB2BService(idx, 'y5Revenue', Number(v))} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Platform */}
        <TabsContent value="platform" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {platformRevenue.map((p, idx) => (
              <Card key={p.stream}>
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Cpu className="h-4 w-4 text-primary" />
                    <span className="font-semibold text-sm">{p.stream}</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Pricing</span>
                      <span>{p.pricePerUser}</span>
                    </div>
                    <div className="pt-2 border-t border-border flex justify-between">
                      <span className="text-muted-foreground">Revenue Y5 (€k)</span>
                      <EditableCell value={p.y5Revenue} type="number" className="font-bold text-primary" onSave={(v) => updatePlatformRow(idx, 'y5Revenue', Number(v))} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
