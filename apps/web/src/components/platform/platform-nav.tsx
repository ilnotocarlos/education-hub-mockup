"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { UserMenu } from "./user-menu"

const NAV_ITEMS = [
  { label: "Dashboard", href: "/(platform)/dashboard" },
  { label: "I miei corsi", href: "/(platform)/courses" },
  { label: "Community", href: "/(platform)/community" },
  { label: "Placement", href: "/(platform)/placement" },
] as const

export function PlatformNav() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

  const isActive = (href: string) => {
    // Remove route group syntax for comparison
    const cleanHref = href.replace(/\(platform\)\//, "")
    const cleanPath = pathname.replace(/\(platform\)\//, "")
    return cleanPath.startsWith(`/${cleanHref}`)
  }

  return (
    <nav className="sticky top-8 z-50 border-b bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/(platform)/dashboard"
            className="font-display text-2xl font-semibold text-foreground"
          >
            Education Hub
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors relative py-5",
                  isActive(item.href)
                    ? "text-[hsl(var(--indigo))]"
                    : "text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
                )}
              >
                {item.label}
                {isActive(item.href) && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[hsl(var(--indigo))]" />
                )}
              </Link>
            ))}
          </div>

          {/* Desktop User Menu */}
          <div className="hidden md:block">
            <UserMenu />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-white z-40">
          <div className="container mx-auto px-4 py-8">
            <nav className="flex flex-col gap-6">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "text-lg font-medium transition-colors",
                    isActive(item.href)
                      ? "text-[hsl(var(--indigo))]"
                      : "text-[hsl(var(--foreground))] hover:text-[hsl(var(--indigo))]"
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <hr className="border-t border-border" />
              <div className="pt-4">
                <UserMenu isMobile />
              </div>
            </nav>
          </div>
        </div>
      )}
    </nav>
  )
}
