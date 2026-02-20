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

  // Hide on presentation pages (full-screen immersive)
  if (pathname.startsWith("/presentation")) return null

  const activeId = getActiveAreaId(pathname)

  return (
    <nav className="fixed top-0 left-0 right-0 z-[60] h-8 glass-effect border-b border-border/30">
      <div className="h-full max-w-screen-2xl mx-auto px-4 flex items-center justify-between gap-4">
        {/* Left: Logo mini */}
        <Link
          href="/"
          className="shrink-0 font-display text-sm font-semibold tracking-tight text-foreground hover:text-primary transition-colors"
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
                  isActive
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {area.label}
              </Link>
            )
          })}
        </div>

        {/* Right: Breadcrumb */}
        <div className="hidden md:block">
          <HubBreadcrumb />
        </div>
      </div>
    </nav>
  )
}
