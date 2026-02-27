"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { HubBreadcrumb } from "./hub-breadcrumb"

const areas = [
  { id: "business-plan", label: "Business Plan", href: "/business-plan" },
  { id: "presentation", label: "Presentazione", href: "/presentation" },
  { id: "piattaforma", label: "Piattaforma", href: "/home" },
] as const

// Platform routes that should highlight "Piattaforma" pill
const platformPrefixes = [
  "/home", "/dashboard", "/my-courses", "/lessons", "/onboarding",
  "/pre-assessment", "/ai-tutor", "/community", "/placement",
  "/profile", "/certificates", "/settings",
  "/courses", "/discover", "/apply", "/about", "/method",
]

function getActiveAreaId(pathname: string): string | null {
  if (pathname === "/") return null
  if (pathname.startsWith("/business-plan")) return "business-plan"
  if (pathname.startsWith("/presentation")) return "presentation"
  if (platformPrefixes.some((p) => pathname === p || pathname.startsWith(p + "/"))) return "piattaforma"
  return null
}

export function HubNavbar() {
  const pathname = usePathname()
  const activeId = getActiveAreaId(pathname)
  const isPresentation = pathname.startsWith("/presentation")

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-[60] h-8 border-b",
      isPresentation
        ? "bg-[hsl(240,10%,6%)]/95 backdrop-blur-sm border-white/10"
        : "glass-effect border-border/30"
    )}>
      <div className="h-full max-w-screen-2xl mx-auto px-4 flex items-center justify-between gap-4">
        {/* Left: Logo mini */}
        <Link
          href="/"
          className={cn(
            "shrink-0 font-display text-sm font-semibold tracking-tight transition-colors",
            isPresentation
              ? "text-white/80 hover:text-white"
              : "text-foreground hover:text-primary"
          )}
        >
          EH
        </Link>

        {/* Center: Pill indicators */}
        <div className="flex items-center gap-1">
          {areas.map((area) => {
            const isActive = activeId === area.id
            return (
              <Link
                key={area.id}
                href={area.href}
                className={cn(
                  "px-3 py-0.5 rounded-full text-[11px] font-medium transition-all",
                  isPresentation
                    ? isActive
                      ? "bg-white/20 text-white"
                      : "text-white/40 hover:text-white/70 hover:bg-white/10"
                    : isActive
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {area.label}
              </Link>
            )
          })}
        </div>

        {/* Right: Breadcrumb (hidden on presentation) */}
        <div className="hidden md:block">
          {!isPresentation && <HubBreadcrumb />}
        </div>
      </div>
    </nav>
  )
}
