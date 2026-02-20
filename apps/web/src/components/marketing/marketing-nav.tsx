"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { NavLogo } from "@/components/shared/nav-logo"
import { MobileMenu } from "@/components/shared/mobile-menu"

const NAV_ITEMS = [
  { label: "Corsi", href: "/courses" },
  { label: "Metodo", href: "/method" },
  { label: "Chi siamo", href: "/about" },
] as const

export function MarketingNav() {
  const [isScrolled, setIsScrolled] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={cn(
        "fixed top-8 w-full z-50 transition-all duration-300",
        isScrolled ? "bg-white shadow-sm" : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavLogo
            variant="minimal"
            className={cn(
              "transition-colors",
              isScrolled ? "text-[hsl(var(--foreground))]" : "text-white"
            )}
          />

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-[hsl(var(--indigo))]",
                  isScrolled
                    ? "text-[hsl(var(--foreground))]"
                    : "text-white"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Desktop Login Link */}
          <Link
            href="/login"
            className={cn(
              "hidden md:block text-sm transition-colors hover:text-[hsl(var(--indigo))]",
              isScrolled
                ? "text-[hsl(var(--muted-foreground))]"
                : "text-white/80"
            )}
          >
            Accedi
          </Link>

          {/* Mobile Menu */}
          <MobileMenu
            items={NAV_ITEMS}
            buttonClassName={cn(isScrolled ? "text-foreground" : "text-white")}
            bottomSlot={
              <Link
                href="/login"
                className="text-lg font-medium text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--indigo))] transition-colors"
              >
                Accedi all'area studenti
              </Link>
            }
          />
        </div>
      </div>
    </nav>
  )
}
