# Layouts - Education Hub

Layout components e navigation del progetto Education Hub.

---

## Root Layout

**File**: `/apps/web/src/app/layout.tsx`
**Description**: Root layout con font configuration, providers e global styles

```tsx
import type { Metadata } from "next";
import { Cormorant, Inter } from "next/font/google";
import { AuthProvider } from "@/components/providers/auth-provider";
import { MotionProvider } from "@/components/providers/motion-provider";
import { DevNav } from "@/components/dev/dev-nav";
import "./globals.css";

const cormorant = Cormorant({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Education Hub - Il Futuro dell'Apprendimento",
  description: "Piattaforma educativa innovativa con AI e blockchain",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className="scroll-smooth">
      <body
        className={`${cormorant.variable} ${inter.variable} font-body antialiased`}
      >
        <AuthProvider>
          <MotionProvider>
            <DevNav />
            {children}
          </MotionProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
```

---

## Marketing Layout

**File**: `/apps/web/src/app/(marketing)/layout.tsx`
**Description**: Layout per pagine marketing (homepage, discover, courses, apply)

```tsx
import * as React from "react"
import { MarketingNav } from "@/components/marketing/marketing-nav"
import { Footer } from "@/components/shared/footer"

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <MarketingNav />
      <main>{children}</main>
      <Footer />
    </>
  )
}
```

---

## Platform Layout

**File**: `/apps/web/src/app/(platform)/layout.tsx`
**Description**: Layout per piattaforma studenti (dashboard, lessons, community)

```tsx
import * as React from "react"
import { PlatformNav } from "@/components/platform/platform-nav"
import { Footer } from "@/components/shared/footer"

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <PlatformNav />
      <main className="min-h-screen bg-[hsl(var(--background))]">
        {children}
      </main>
      <Footer />
    </>
  )
}
```

---

## MarketingNav Component

**File**: `/apps/web/src/components/marketing/marketing-nav.tsx`
**Description**: Navigation per sezioni marketing con scroll detection

```tsx
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
        "fixed top-0 w-full z-50 transition-all duration-300",
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
```

---

## PlatformNav Component

**File**: `/apps/web/src/components/platform/platform-nav.tsx`
**Description**: Navigation per piattaforma con active state detection

```tsx
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
    <nav className="sticky top-0 z-50 border-b bg-white">
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
```

---

## Footer Component

**File**: `/apps/web/src/components/shared/footer.tsx`
**Description**: Footer component condiviso tra layouts

```tsx
import Link from "next/link"
import { GraduationCap, Github, Linkedin, Twitter, Mail } from "lucide-react"

const footerLinks = {
  product: [
    { label: "Corsi", href: "/discover" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Community", href: "/community" },
    { label: "Placement", href: "/placement" },
  ],
  company: [
    { label: "Chi Siamo", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Carriere", href: "/careers" },
    { label: "Contatti", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
  ],
  social: [
    { label: "LinkedIn", href: "https://linkedin.com/company/education-hub", icon: Linkedin },
    { label: "Twitter", href: "https://twitter.com/educationhub", icon: Twitter },
    { label: "GitHub", href: "https://github.com/educationhub", icon: Github },
    { label: "Email", href: "mailto:info@educationhub.com", icon: Mail },
  ],
}

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="editorial-grid py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 group mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--indigo))] to-[hsl(var(--amber))] rounded-xl opacity-75 blur-sm group-hover:blur-md transition-all" />
                <div className="relative bg-gradient-to-br from-[hsl(var(--indigo))] to-[hsl(var(--amber))] p-2 rounded-xl">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
              </div>
              <div>
                <span className="font-display text-xl font-bold">
                  Education Hub
                </span>
                <p className="text-xs text-muted-foreground">
                  Il Futuro dell'Apprendimento
                </p>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground mb-6 max-w-sm">
              Trasformiamo la formazione professionale attraverso AI, blockchain
              e un approccio human-centered. Colmiamo il gap di competenze con
              percorsi personalizzati e certificazioni verificabili.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {footerLinks.social.map((social) => {
                const Icon = social.icon
                return (
                  <Link
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg bg-muted hover:bg-[hsl(var(--indigo)_/_0.1)] border border-border hover:border-[hsl(var(--indigo)_/_0.3)] flex items-center justify-center transition-all group"
                    aria-label={social.label}
                  >
                    <Icon className="w-4 h-4 text-muted-foreground group-hover:text-[hsl(var(--indigo))]" />
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-semibold text-sm mb-4">Prodotto</h3>
            <ul className="space-y-2.5">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-sm mb-4">Azienda</h3>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold text-sm mb-4">Legale</h3>
            <ul className="space-y-2.5">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            © 2026 Education Hub. Tutti i diritti riservati.
          </p>
          <p className="text-xs text-muted-foreground text-center md:text-right">
            Powered by AI & Blockchain · Next.js 16 · React 19 · TypeScript
          </p>
        </div>
      </div>
    </footer>
  )
}
```
