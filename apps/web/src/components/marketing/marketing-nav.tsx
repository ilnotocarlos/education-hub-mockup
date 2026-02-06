"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

const NAV_ITEMS = [
  { label: "Corsi", href: "/(marketing)/courses" },
  { label: "Metodo", href: "/(marketing)/method" },
  { label: "Chi siamo", href: "/(marketing)/about" },
] as const

export function MarketingNav() {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

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
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled
          ? "bg-white shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className={cn(
              "font-display text-2xl font-semibold transition-colors",
              isScrolled ? "text-[hsl(var(--foreground))]" : "text-white"
            )}
          >
            Education Hub
          </Link>

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
            href="/(auth)/login"
            className={cn(
              "hidden md:block text-sm transition-colors hover:text-[hsl(var(--indigo))]",
              isScrolled
                ? "text-[hsl(var(--muted-foreground))]"
                : "text-white/80"
            )}
          >
            Accedi
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className={cn("h-6 w-6", isScrolled ? "text-foreground" : "text-white")} />
            ) : (
              <Menu className={cn("h-6 w-6", isScrolled ? "text-foreground" : "text-white")} />
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
                  className="text-lg font-medium text-foreground hover:text-[hsl(var(--indigo))] transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <hr className="border-t border-border" />
              <Link
                href="/(auth)/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-medium text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--indigo))] transition-colors"
              >
                Accedi all'area studenti
              </Link>
            </nav>
          </div>
        </div>
      )}
    </nav>
  )
}
