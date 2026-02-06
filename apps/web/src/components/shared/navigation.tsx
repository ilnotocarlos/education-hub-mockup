"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  BookOpen,
  LayoutDashboard,
  Sparkles,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  GraduationCap
} from "lucide-react"

const navLinks = [
  { href: "/", label: "Home", icon: Sparkles },
  { href: "/discover", label: "Scopri", icon: GraduationCap },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/lessons/1", label: "Lezioni", icon: BookOpen },
]

export function Navigation() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "glass-effect shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="editorial-grid py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--indigo))] to-[hsl(var(--amber))] rounded-xl opacity-75 blur-sm group-hover:blur-md transition-all" />
                <div className="relative bg-gradient-to-br from-[hsl(var(--indigo))] to-[hsl(var(--amber))] p-2 rounded-xl">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <span className="font-display text-2xl font-bold tracking-tight text-foreground">
                  Education Hub
                </span>
                <p className="text-xs text-muted-foreground hidden md:block">Il Futuro dell'Apprendimento</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const Icon = link.icon
                const isActive = pathname === link.href || pathname.startsWith(link.href)

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="relative px-4 py-2 rounded-lg transition-colors hover:bg-muted/50 group"
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{link.label}</span>
                    </div>
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-[hsl(var(--indigo)_/_0.1)] rounded-lg border border-[hsl(var(--indigo)_/_0.3)]"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </Link>
                )
              })}
            </div>

            {/* User Menu */}
            <div className="hidden md:flex items-center gap-3">
              <Button variant="ghost" size="sm" className="text-sm">
                Prova Gratis
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar className="h-9 w-9 border-2 border-[hsl(var(--indigo)_/_0.2)]">
                      <AvatarImage src="/avatars/user.svg" />
                      <AvatarFallback className="bg-gradient-to-br from-[hsl(var(--indigo))] to-[hsl(var(--amber))] text-white font-semibold">
                        FR
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span className="font-semibold">Filippo Rossi</span>
                      <span className="text-xs text-muted-foreground">filippo@example.com</span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile">
                      <User className="w-4 h-4 mr-2" />
                      Profilo
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings">
                      <Settings className="w-4 h-4 mr-2" />
                      Impostazioni
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">
                    <LogOut className="w-4 h-4 mr-2" />
                    Esci
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[45] md:hidden"
            style={{ top: "80px" }}
          >
            <div className="glass-effect h-full p-6">
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => {
                  const Icon = link.icon
                  const isActive = pathname === link.href

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        isActive
                          ? "bg-[hsl(var(--indigo)_/_0.1)] border border-[hsl(var(--indigo)_/_0.3)]"
                          : "hover:bg-muted/50"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{link.label}</span>
                    </Link>
                  )
                })}
              </div>

              <div className="mt-8 pt-8 border-t">
                <div className="flex items-center gap-3 mb-6">
                  <Avatar className="h-12 w-12 border-2 border-[hsl(var(--indigo)_/_0.2)]">
                    <AvatarFallback className="bg-gradient-to-br from-[hsl(var(--indigo))] to-[hsl(var(--amber))] text-white font-semibold">
                      FR
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">Filippo Rossi</p>
                    <p className="text-sm text-muted-foreground">filippo@example.com</p>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Button variant="ghost" className="justify-start" asChild>
                    <Link href="/profile" onClick={() => setIsMobileMenuOpen(false)}>
                      <User className="w-4 h-4 mr-2" />
                      Profilo
                    </Link>
                  </Button>
                  <Button variant="ghost" className="justify-start" asChild>
                    <Link href="/settings" onClick={() => setIsMobileMenuOpen(false)}>
                      <Settings className="w-4 h-4 mr-2" />
                      Impostazioni
                    </Link>
                  </Button>
                  <Button variant="ghost" className="justify-start text-destructive" asChild>
                    <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                      <LogOut className="w-4 h-4 mr-2" />
                      Esci
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer for fixed nav */}
      <div className="h-20" />
    </>
  )
}
