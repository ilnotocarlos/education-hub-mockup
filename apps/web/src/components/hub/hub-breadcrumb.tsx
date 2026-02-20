"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

interface Crumb {
  label: string
  href?: string
}

const routeMap: Record<string, Crumb[]> = {
  "/": [{ label: "Hub" }],
  "/home": [{ label: "Hub", href: "/" }, { label: "Sito" }],
  "/discover": [{ label: "Hub", href: "/" }, { label: "Sito", href: "/home" }, { label: "Scopri" }],
  "/courses": [{ label: "Hub", href: "/" }, { label: "Sito", href: "/home" }, { label: "Corsi" }],
  "/apply": [{ label: "Hub", href: "/" }, { label: "Sito", href: "/home" }, { label: "Iscrizione" }],
  "/about": [{ label: "Hub", href: "/" }, { label: "Sito", href: "/home" }, { label: "Chi siamo" }],
  "/method": [{ label: "Hub", href: "/" }, { label: "Sito", href: "/home" }, { label: "Metodo" }],
  "/business-plan": [{ label: "Hub", href: "/" }, { label: "Business Plan" }],
  "/business-plan/financials": [{ label: "Hub", href: "/" }, { label: "Business Plan", href: "/business-plan" }, { label: "Finanze" }],
  "/business-plan/costs": [{ label: "Hub", href: "/" }, { label: "Business Plan", href: "/business-plan" }, { label: "Costi" }],
  "/business-plan/business-areas": [{ label: "Hub", href: "/" }, { label: "Business Plan", href: "/business-plan" }, { label: "Aree" }],
  "/business-plan/platform-costs": [{ label: "Hub", href: "/" }, { label: "Business Plan", href: "/business-plan" }, { label: "Piattaforma" }],
  "/business-plan/kpis": [{ label: "Hub", href: "/" }, { label: "Business Plan", href: "/business-plan" }, { label: "KPIs" }],
  "/business-plan/scenarios": [{ label: "Hub", href: "/" }, { label: "Business Plan", href: "/business-plan" }, { label: "Scenari" }],
  "/business-plan/year-view": [{ label: "Hub", href: "/" }, { label: "Business Plan", href: "/business-plan" }, { label: "Per Anno" }],
  "/business-plan/synergies": [{ label: "Hub", href: "/" }, { label: "Business Plan", href: "/business-plan" }, { label: "Sinergie" }],
  "/business-plan/roadmap": [{ label: "Hub", href: "/" }, { label: "Business Plan", href: "/business-plan" }, { label: "Roadmap" }],
  "/business-plan/unit-economics": [{ label: "Hub", href: "/" }, { label: "Business Plan", href: "/business-plan" }, { label: "Unit Economics" }],
  "/business-plan/market": [{ label: "Hub", href: "/" }, { label: "Business Plan", href: "/business-plan" }, { label: "Mercato" }],
  "/business-plan/future-areas": [{ label: "Hub", href: "/" }, { label: "Business Plan", href: "/business-plan" }, { label: "Aree Future" }],
  "/dashboard": [{ label: "Hub", href: "/" }, { label: "Piattaforma", href: "/home" }, { label: "Dashboard" }],
  "/my-courses": [{ label: "Hub", href: "/" }, { label: "Piattaforma", href: "/home" }, { label: "I miei corsi" }],
  "/community": [{ label: "Hub", href: "/" }, { label: "Piattaforma", href: "/home" }, { label: "Community" }],
  "/placement": [{ label: "Hub", href: "/" }, { label: "Piattaforma", href: "/home" }, { label: "Placement" }],
  "/profile": [{ label: "Hub", href: "/" }, { label: "Piattaforma", href: "/home" }, { label: "Profilo" }],
  "/settings": [{ label: "Hub", href: "/" }, { label: "Piattaforma", href: "/home" }, { label: "Impostazioni" }],
}

export function HubBreadcrumb() {
  const pathname = usePathname()
  const crumbs = routeMap[pathname] ?? [{ label: "Hub", href: "/" }, { label: pathname.split("/").pop() || "" }]

  return (
    <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
      {crumbs.map((crumb, i) => (
        <span key={i} className="flex items-center gap-1">
          {i > 0 && <ChevronRight className="h-3 w-3" />}
          {crumb.href ? (
            <Link href={crumb.href} className="hover:text-foreground transition-colors">
              {crumb.label}
            </Link>
          ) : (
            <span className="text-foreground font-medium">{crumb.label}</span>
          )}
        </span>
      ))}
    </div>
  )
}
