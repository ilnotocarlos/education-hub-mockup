"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard, CalendarDays, Briefcase, TrendingUp, Wallet,
  Monitor, Target, AlertTriangle, Handshake, Map, BarChart3,
  Globe, Rocket, ArrowLeft
} from "lucide-react"

const sections = [
  { label: "Overview", href: "/business-plan", icon: LayoutDashboard },
  { label: "Per Anno", href: "/business-plan/year-view", icon: CalendarDays },
  { label: "Aree di Business", href: "/business-plan/business-areas", icon: Briefcase },
  { label: "Financials", href: "/business-plan/financials", icon: TrendingUp },
  { label: "Costi", href: "/business-plan/costs", icon: Wallet },
  { label: "Piattaforma", href: "/business-plan/platform-costs", icon: Monitor },
  { label: "KPIs & Metriche", href: "/business-plan/kpis", icon: Target },
  { label: "Scenari", href: "/business-plan/scenarios", icon: AlertTriangle },
  { label: "Sinergie", href: "/business-plan/synergies", icon: Handshake },
  { label: "Roadmap", href: "/business-plan/roadmap", icon: Map },
  { label: "Unit Economics", href: "/business-plan/unit-economics", icon: BarChart3 },
  { label: "Mercato", href: "/business-plan/market", icon: Globe },
  { label: "Aree Future", href: "/business-plan/future-areas", icon: Rocket },
]

export function BPSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 shrink-0 border-r border-border bg-card hidden lg:block">
      <div className="sticky top-8 h-[calc(100vh-2rem)] overflow-y-auto p-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Torna all&apos;Hub
        </Link>

        <div className="mb-6">
          <h3 className="font-display text-lg font-semibold">Education Hub</h3>
          <p className="text-xs text-muted-foreground">Business Plan 2026-2030</p>
        </div>

        <nav className="space-y-1">
          {sections.map((s) => {
            const Icon = s.icon
            const isActive = pathname === s.href
            return (
              <Link
                key={s.href}
                href={s.href}
                className={cn(
                  "flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {s.label}
              </Link>
            )
          })}
        </nav>

        <div className="mt-8 pt-4 border-t border-border">
          <div className="text-xs text-muted-foreground">
            <div className="font-semibold text-foreground">Piano Quinquennale</div>
            <div className="text-lg font-bold text-primary mt-1">2026–2030</div>
          </div>
        </div>
      </div>
    </aside>
  )
}
