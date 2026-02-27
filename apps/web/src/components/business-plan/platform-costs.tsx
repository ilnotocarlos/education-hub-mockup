"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { platformCosts } from "@/data/business-plan"
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  ComposedChart, Line, PieChart, Pie, Cell,
} from "recharts"
import { Cpu, Server, Shield, Zap } from "lucide-react"
import Link from "next/link"

const CAT_COLORS = {
  aiMl: "oklch(0.50 0.14 260)",
  blockchain: "oklch(0.60 0.16 30)",
  infrastructure: "oklch(0.55 0.15 160)",
  services: "oklch(0.60 0.14 80)",
}

const fmtK = (v: number) => v >= 1000 ? `€${(v / 1000).toFixed(1)}k` : `€${v}`

export function PlatformCosts() {
  const { monthly, development, aiBreakdown, infraBreakdown, blockchainBreakdown, servicesBreakdown, optimizations, techKpis } = platformCosts

  const y1 = monthly[0]
  const y5 = monthly[monthly.length - 1]

  const summaryCards = [
    { label: "Costo Mensile Y1", value: fmtK(y1.total), sub: `${y1.students} studenti`, icon: Server },
    { label: "Costo Mensile Y5", value: fmtK(y5.total), sub: `${y5.students} studenti`, icon: Cpu },
    { label: "Costo/Utente/Mese Y1", value: `€${y1.costPerUser.toFixed(1)}`, sub: "con AI + blockchain", icon: Zap },
    { label: "Costo/Utente/Mese Y5", value: `€${y5.costPerUser.toFixed(1)}`, sub: `-${Math.round((1 - y5.costPerUser / y1.costPerUser) * 100)}% economia di scala`, icon: Shield },
  ]

  // Stacked bar: cost categories per year
  const stackedData = monthly.map(m => ({
    name: m.year,
    "AI/ML": m.aiMl,
    "Blockchain": m.blockchain,
    "Infrastruttura": m.infrastructure,
    "Servizi": m.services,
  }))

  // Cost per user evolution
  const costPerUserData = monthly.map(m => ({
    name: m.year,
    "Costo/Utente": m.costPerUser,
    "Studenti": m.students,
    "Costo Totale": m.total,
  }))

  // AI breakdown pie (Y1 base)
  const aiPieData = aiBreakdown.map(a => ({
    name: a.service.split(' ').slice(0, 2).join(' '),
    value: a.costMonth,
  }))
  const aiColors = ["oklch(0.45 0.14 260)", "oklch(0.55 0.12 260)", "oklch(0.50 0.15 160)", "oklch(0.60 0.14 80)", "oklch(0.55 0.14 30)"]

  // All monthly costs combined for detail view
  const allCosts = [
    ...aiBreakdown.map(a => ({ ...a, category: "AI/ML" })),
    ...infraBreakdown.map(a => ({ ...a, category: "Infrastruttura" })),
    ...blockchainBreakdown.map(a => ({ ...a, category: "Blockchain" })),
    ...servicesBreakdown.map(a => ({ ...a, category: "Servizi" })),
  ]

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Piattaforma</h2>
        <p className="text-muted-foreground mt-1">Costi operativi, AI/ML, infrastruttura, blockchain e ottimizzazioni</p>
        <div className="flex gap-4 mt-2">
          <Link href="/business-plan/costs" className="text-xs text-primary hover:underline">Struttura costi completa →</Link>
          <Link href="/business-plan/financials" className="text-xs text-primary hover:underline">Proiezioni finanziarie →</Link>
          <Link href="/business-plan/kpis" className="text-xs text-primary hover:underline">KPIs tecnici →</Link>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryCards.map(c => {
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
          <TabsTrigger value="detail">Dettaglio Costi</TabsTrigger>
          <TabsTrigger value="development">Sviluppo</TabsTrigger>
          <TabsTrigger value="optimization">Ottimizzazione</TabsTrigger>
        </TabsList>

        {/* Overview */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Evoluzione Costi Piattaforma</CardTitle>
                <CardDescription>Costi mensili per categoria — 5 anni (€/mese)</CardDescription>
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
                      <Bar dataKey="AI/ML" stackId="a" fill={CAT_COLORS.aiMl} />
                      <Bar dataKey="Infrastruttura" stackId="a" fill={CAT_COLORS.infrastructure} />
                      <Bar dataKey="Blockchain" stackId="a" fill={CAT_COLORS.blockchain} />
                      <Bar dataKey="Servizi" stackId="a" fill={CAT_COLORS.services} radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Costo per Utente</CardTitle>
                <CardDescription>Economia di scala: da €{y1.costPerUser} a €{y5.costPerUser}/mese</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={costPerUserData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.9 0.01 75)" />
                      <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                      <YAxis yAxisId="left" tick={{ fontSize: 12 }} tickFormatter={(v: number) => `€${v}`} />
                      <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} />
                      <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid oklch(0.9 0.01 75)', fontSize: '13px' }} />
                      <Legend />
                      <Bar yAxisId="right" dataKey="Studenti" fill="oklch(0.80 0.08 260)" radius={[4, 4, 0, 0]} />
                      <Line yAxisId="left" type="monotone" dataKey="Costo/Utente" stroke="oklch(0.55 0.18 30)" strokeWidth={3} dot={{ r: 5 }} />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Cost table */}
          <Card>
            <CardHeader>
              <CardTitle>Costi Mensili per Anno</CardTitle>
              <CardDescription>Dettaglio costi operativi piattaforma (€/mese)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-2 font-medium text-muted-foreground">Categoria</th>
                      {monthly.map(m => (
                        <th key={m.year} className="text-right py-3 px-2 font-medium text-muted-foreground">{m.year}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border/50 hover:bg-muted/50">
                      <td className="py-2 px-2 flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ background: CAT_COLORS.aiMl }} /> AI/ML
                      </td>
                      {monthly.map(m => <td key={m.year} className="py-2 px-2 text-right">{fmtK(m.aiMl)}</td>)}
                    </tr>
                    <tr className="border-b border-border/50 hover:bg-muted/50">
                      <td className="py-2 px-2 flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ background: CAT_COLORS.infrastructure }} /> Infrastruttura
                      </td>
                      {monthly.map(m => <td key={m.year} className="py-2 px-2 text-right">{fmtK(m.infrastructure)}</td>)}
                    </tr>
                    <tr className="border-b border-border/50 hover:bg-muted/50">
                      <td className="py-2 px-2 flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ background: CAT_COLORS.blockchain }} /> Blockchain
                      </td>
                      {monthly.map(m => <td key={m.year} className="py-2 px-2 text-right">{fmtK(m.blockchain)}</td>)}
                    </tr>
                    <tr className="border-b border-border/50 hover:bg-muted/50">
                      <td className="py-2 px-2 flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ background: CAT_COLORS.services }} /> Servizi
                      </td>
                      {monthly.map(m => <td key={m.year} className="py-2 px-2 text-right">{fmtK(m.services)}</td>)}
                    </tr>
                    <tr className="border-t-2 border-border font-bold">
                      <td className="py-3 px-2">Totale/Mese</td>
                      {monthly.map(m => <td key={m.year} className="py-3 px-2 text-right">{fmtK(m.total)}</td>)}
                    </tr>
                    <tr className="border-b border-border/50 bg-muted/30 font-semibold">
                      <td className="py-2 px-2">Totale/Anno</td>
                      {monthly.map(m => <td key={m.year} className="py-2 px-2 text-right">{fmtK(m.annual)}</td>)}
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 px-2 text-muted-foreground">€/studente/mese</td>
                      {monthly.map(m => <td key={m.year} className="py-2 px-2 text-right">€{m.costPerUser.toFixed(1)}</td>)}
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Detail */}
        <TabsContent value="detail" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>AI/ML — Composizione Costi</CardTitle>
                <CardDescription>€{aiBreakdown.reduce((s, a) => s + a.costMonth, 0).toLocaleString('it-IT')}/mese (Anno 1, 75 studenti)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={aiPieData} cx="50%" cy="50%" innerRadius={45} outerRadius={80} paddingAngle={3} dataKey="value"
                        label={(props) => `${((props.percent ?? 0) * 100).toFixed(0)}%`}>
                        {aiPieData.map((_, i) => <Cell key={i} fill={aiColors[i]} />)}
                      </Pie>
                      <Tooltip formatter={(value) => `€${Number(value)}/mese`} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>KPI Tecnici Target</CardTitle>
                <CardDescription>Performance e SLA della piattaforma</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(techKpis).map(([key, value]) => {
                    const labels: Record<string, string> = {
                      uptime: "Uptime SLA",
                      apiResponseTime: "API Response Time",
                      aiResponseTime: "AI Response Time",
                      errorRate: "Error Rate",
                      pageLoadTime: "Page Load Time",
                      costPerAiInteraction: "Costo per interazione AI",
                      costPerCertificate: "Costo per certificato NFT",
                    }
                    return (
                      <div key={key} className="flex items-center justify-between py-2 border-b border-border/50">
                        <span className="text-sm text-muted-foreground">{labels[key] || key}</span>
                        <span className="text-sm font-semibold">{value}</span>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Full detail table */}
          <Card>
            <CardHeader>
              <CardTitle>Tutti i Servizi — Anno 1</CardTitle>
              <CardDescription>Breakdown completo dei costi operativi mensili</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-2 font-medium text-muted-foreground">Servizio</th>
                      <th className="text-left py-3 px-2 font-medium text-muted-foreground">Categoria</th>
                      <th className="text-left py-3 px-2 font-medium text-muted-foreground">Descrizione</th>
                      <th className="text-right py-3 px-2 font-medium text-muted-foreground">€/mese</th>
                      <th className="text-right py-3 px-2 font-medium text-muted-foreground">€/anno</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allCosts.map((c, i) => (
                      <tr key={i} className="border-b border-border/50 hover:bg-muted/50">
                        <td className="py-2 px-2 font-medium">{c.service}</td>
                        <td className="py-2 px-2">
                          <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                            c.category === 'AI/ML' ? 'bg-muted text-foreground' :
                            c.category === 'Infrastruttura' ? 'bg-muted text-foreground' :
                            c.category === 'Blockchain' ? 'bg-muted text-foreground' :
                            'bg-muted text-foreground'
                          }`}>
                            {c.category}
                          </span>
                        </td>
                        <td className="py-2 px-2 text-muted-foreground text-xs">{c.desc}</td>
                        <td className="py-2 px-2 text-right font-medium">€{c.costMonth}</td>
                        <td className="py-2 px-2 text-right">€{(c.costMonth * 12).toLocaleString('it-IT')}</td>
                      </tr>
                    ))}
                    <tr className="border-t-2 border-border font-bold">
                      <td className="py-3 px-2" colSpan={3}>Totale Operativo Mensile</td>
                      <td className="py-3 px-2 text-right">€{allCosts.reduce((s, c) => s + c.costMonth, 0).toLocaleString('it-IT')}</td>
                      <td className="py-3 px-2 text-right">€{(allCosts.reduce((s, c) => s + c.costMonth, 0) * 12).toLocaleString('it-IT')}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Development */}
        <TabsContent value="development" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Costi di Sviluppo (One-Time)</CardTitle>
                <CardDescription>Investimento iniziale piattaforma: €{(development.total / 1000).toFixed(0)}k</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {development.items.map(item => (
                    <div key={item.name} className="flex items-center justify-between py-2 border-b border-border/50">
                      <span className="text-sm font-medium">{item.name}</span>
                      <span className="text-sm font-semibold">€{(item.cost / 1000).toFixed(0)}k</span>
                    </div>
                  ))}
                  <div className="flex items-center justify-between py-3 border-t-2 border-border font-bold">
                    <span>Totale Sviluppo</span>
                    <span>€{(development.total / 1000).toFixed(0)}k</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tech Stack</CardTitle>
                <CardDescription>Architettura tecnologica della piattaforma</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { area: "Frontend", tech: "Next.js 16+, React 19, TypeScript, Tailwind v4, shadcn/ui" },
                    { area: "Backend", tech: "Node.js 20, Fastify, tRPC, Prisma" },
                    { area: "Database", tech: "PostgreSQL (Supabase), Redis (Upstash), Pinecone" },
                    { area: "AI/ML", tech: "Claude API, GPT-4 Turbo, LangChain, Whisper, ElevenLabs" },
                    { area: "Blockchain", tech: "Polygon L2, Hardhat, IPFS/Pinata, ERC-721" },
                    { area: "Hosting", tech: "Vercel (FE), Railway (BE), AWS S3+CloudFront" },
                    { area: "Auth", tech: "NextAuth.js v5, OAuth (Google, LinkedIn)" },
                    { area: "Monitoring", tech: "Sentry, Vercel Analytics, Pino logging" },
                  ].map(s => (
                    <div key={s.area} className="flex gap-3">
                      <span className="text-xs font-semibold text-muted-foreground w-24 shrink-0 pt-0.5">{s.area}</span>
                      <span className="text-sm">{s.tech}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Timeline Sviluppo</CardTitle>
              <CardDescription>Time to market: 4-5 mesi</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                  { phase: "Foundation", weeks: "Sett. 1-4", items: ["Infrastruttura setup", "DB configuration", "Account servizi esterni"], cost: "€500/mese baseline" },
                  { phase: "Development", weeks: "Sett. 5-12", items: ["Backend (4 dev, 8 sett.)", "Frontend (2 dev, 8 sett.)", "Contenuti (8-12 sett.)"], cost: "€2.056/mese full" },
                  { phase: "Testing", weeks: "Sett. 13-14", items: ["Automated testing", "Penetration testing", "Beta 20-30 utenti"], cost: "€5-10k audit" },
                  { phase: "Launch", weeks: "Sett. 15-16", items: ["Deploy produzione", "Smart contract mainnet", "Monitoring 24/7"], cost: "Go live" },
                ].map(p => (
                  <div key={p.phase} className="p-4 rounded-lg border border-border bg-muted/20">
                    <p className="font-semibold text-sm">{p.phase}</p>
                    <p className="text-xs text-muted-foreground mb-2">{p.weeks}</p>
                    <ul className="space-y-1">
                      {p.items.map(item => (
                        <li key={item} className="text-xs text-muted-foreground">• {item}</li>
                      ))}
                    </ul>
                    <p className="text-xs font-medium mt-2 text-primary">{p.cost}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Optimization */}
        <TabsContent value="optimization" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Strategie di Ottimizzazione Costi</CardTitle>
              <CardDescription>Potenziale risparmio applicando tutte le strategie</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-2 font-medium text-muted-foreground">Strategia</th>
                      <th className="text-left py-3 px-2 font-medium text-muted-foreground">Area</th>
                      <th className="text-left py-3 px-2 font-medium text-muted-foreground">Descrizione</th>
                      <th className="text-right py-3 px-2 font-medium text-muted-foreground">Risparmio</th>
                    </tr>
                  </thead>
                  <tbody>
                    {optimizations.map((o, i) => (
                      <tr key={i} className="border-b border-border/50 hover:bg-muted/50">
                        <td className="py-2 px-2 font-medium">{o.strategy}</td>
                        <td className="py-2 px-2">
                          <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                            o.area === 'AI/ML' ? 'bg-muted text-foreground' :
                            o.area === 'Blockchain' ? 'bg-muted text-foreground' :
                            'bg-muted text-foreground'
                          }`}>
                            {o.area}
                          </span>
                        </td>
                        <td className="py-2 px-2 text-xs text-muted-foreground">{o.desc}</td>
                        <td className="py-2 px-2 text-right font-semibold text-success">{o.saving}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Impatto Ottimizzazione AI</CardTitle>
                <CardDescription>L&apos;AI/ML rappresenta il {Math.round(y1.aiMl / y1.total * 100)}% dei costi piattaforma</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 rounded-lg bg-muted/30 border border-border">
                    <p className="text-sm font-semibold">Scenario Attuale (Y1)</p>
                    <p className="text-2xl font-bold mt-1">€{y1.aiMl}/mese</p>
                    <p className="text-xs text-muted-foreground">51M token GPT-4 + 10M token Claude</p>
                  </div>
                  <div className="p-3 rounded-lg bg-success/10 border border-success/20">
                    <p className="text-sm font-semibold text-success">Con Ottimizzazioni</p>
                    <p className="text-2xl font-bold mt-1 text-success">€{Math.round(y1.aiMl * 0.4)}/mese</p>
                    <p className="text-xs text-muted-foreground">Caching + modelli ibridi + fine-tuning</p>
                  </div>
                  <div className="text-center">
                    <span className="text-lg font-bold text-success">-60% costi AI</span>
                    <p className="text-xs text-muted-foreground">Risparmio: €{Math.round(y1.aiMl * 0.6)}/mese (€{Math.round(y1.aiMl * 0.6 * 12).toLocaleString('it-IT')}/anno)</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Budget Alert Consigliati</CardTitle>
                <CardDescription>Soglie di monitoraggio per prevenire costi imprevisti</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { label: "AI spending giornaliero", threshold: "€100/giorno", action: "Alert Slack + email" },
                    { label: "AI spending orario", threshold: "€10/ora", action: "Rate limiting automatico" },
                    { label: "Infrastructure mensile", threshold: "+20% vs media", action: "Review automatica" },
                    { label: "Blockchain gas spike", threshold: ">€1/transazione", action: "Pausa batch minting" },
                    { label: "Storage 80% capacity", threshold: "80% quota S3", action: "Cleanup + expand" },
                  ].map(alert => (
                    <div key={alert.label} className="flex items-start justify-between py-2 border-b border-border/50">
                      <div>
                        <p className="text-sm font-medium">{alert.label}</p>
                        <p className="text-xs text-muted-foreground">{alert.action}</p>
                      </div>
                      <span className="text-xs font-semibold bg-warning/10 text-warning-foreground px-2 py-0.5 rounded-full shrink-0">
                        {alert.threshold}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
