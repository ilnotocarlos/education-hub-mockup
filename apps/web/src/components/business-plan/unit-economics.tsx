"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { unitEconomics } from "@/data/business-plan"
import { formatCurrency } from "@/lib/utils"
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts"
import { ArrowRight } from "lucide-react"

const ltvCacData = [
  { name: "B2C Y1", LTV: unitEconomics.b2c.ltv.y1, CAC: unitEconomics.b2c.cac.y1, ratio: unitEconomics.b2c.ltvCac.y1 },
  { name: "B2C Y5", LTV: unitEconomics.b2c.ltv.y5, CAC: unitEconomics.b2c.cac.y5, ratio: unitEconomics.b2c.ltvCac.y5 },
  { name: "B2B Y1", LTV: unitEconomics.b2b.ltv.y1 / 100, CAC: unitEconomics.b2b.cac.y1, ratio: unitEconomics.b2b.ltvCac.y1 },
  { name: "B2B Y5", LTV: unitEconomics.b2b.ltv.y5 / 100, CAC: unitEconomics.b2b.cac.y5, ratio: unitEconomics.b2b.ltvCac.y5 },
]

function MetricEvolution({ label, y1, y5, format = "currency" }: {
  label: string; y1: number; y5: number; format?: "currency" | "ratio"
}) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
      <span className="text-sm font-medium min-w-[80px]">{label}</span>
      <span className="text-sm font-mono">
        {format === "currency" ? formatCurrency(y1) : `${y1}x`}
      </span>
      <ArrowRight className="h-4 w-4 text-success shrink-0" />
      <span className="text-sm font-mono font-bold text-primary">
        {format === "currency" ? formatCurrency(y5) : `${y5}x`}
      </span>
    </div>
  )
}

export function UnitEconomics() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Unit Economics</h2>
        <p className="text-muted-foreground mt-1">CAC, LTV e rapporti di efficienza per canale</p>
      </div>

      {/* B2C */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>B2C — Direct Training</CardTitle>
            <CardDescription>Payback: {unitEconomics.b2c.payback}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <MetricEvolution label="CAC" y1={unitEconomics.b2c.cac.y1} y5={unitEconomics.b2c.cac.y5} />
            <MetricEvolution label="LTV (2y)" y1={unitEconomics.b2c.ltv.y1} y5={unitEconomics.b2c.ltv.y5} />
            <MetricEvolution label="LTV/CAC" y1={unitEconomics.b2c.ltvCac.y1} y5={unitEconomics.b2c.ltvCac.y5} format="ratio" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>B2B — Corporate Training</CardTitle>
            <CardDescription>Payback: {unitEconomics.b2b.payback}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <MetricEvolution label="CAC" y1={unitEconomics.b2b.cac.y1} y5={unitEconomics.b2b.cac.y5} />
            <MetricEvolution label="LTV (3y)" y1={unitEconomics.b2b.ltv.y1} y5={unitEconomics.b2b.ltv.y5} />
            <MetricEvolution label="LTV/CAC" y1={unitEconomics.b2b.ltvCac.y1} y5={unitEconomics.b2b.ltvCac.y5} format="ratio" />
          </CardContent>
        </Card>
      </div>

      {/* Platform */}
      <Card>
        <CardHeader>
          <CardTitle>Piattaforma SaaS</CardTitle>
          <CardDescription>Unit economics della business unit tecnologica</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">{unitEconomics.platform.grossMargin}</div>
              <div className="text-xs text-muted-foreground mt-1">Gross Margin</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-success">{unitEconomics.platform.ltvCac}x</div>
              <div className="text-xs text-muted-foreground mt-1">LTV/CAC</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{formatCurrency(unitEconomics.platform.cac)}</div>
              <div className="text-xs text-muted-foreground mt-1">CAC</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* LTV/CAC Comparison Chart */}
      <Card>
        <CardHeader>
          <CardTitle>LTV/CAC Ratio Comparison</CardTitle>
          <CardDescription>Benchmark: buono &gt;3x, eccellente &gt;10x</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ltvCacData}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.9 0.01 75)" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} tickFormatter={(v: number) => `${v}x`} />
                <Tooltip
                  formatter={(value, name) => [String(name) === "ratio" ? `${Number(value)}x` : formatCurrency(Number(value)), String(name)]}
                  contentStyle={{ borderRadius: '8px', border: '1px solid oklch(0.9 0.01 75)', fontSize: '13px' }}
                />
                <Legend />
                <Bar dataKey="ratio" name="LTV/CAC Ratio" fill="oklch(0.55 0.15 260)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Benchmark */}
      <Card>
        <CardContent className="p-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-muted/50 text-center">
              <div className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Industry Average LTV/CAC</div>
              <div className="text-2xl font-bold text-muted-foreground">3-5x</div>
            </div>
            <div className="p-4 rounded-lg bg-success/10 text-center">
              <div className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Nostro B2C Y5</div>
              <div className="text-2xl font-bold text-success">35.5x</div>
            </div>
            <div className="p-4 rounded-lg bg-primary/10 text-center">
              <div className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Nostro B2B Y5</div>
              <div className="text-2xl font-bold text-primary">105x</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
