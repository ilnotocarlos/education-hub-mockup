"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ChevronDown,
  ChevronUp,
  Code,
  Home,
  Megaphone,
  Lock,
  Layout,
  X
} from "lucide-react"

// Tutte le route del mockup organizzate per categoria
const routes = {
  marketing: {
    label: "Marketing",
    icon: Megaphone,
    color: "indigo",
    routes: [
      { path: "/", label: "Homepage" },
      { path: "/about", label: "About" },
      { path: "/method", label: "Method" },
      { path: "/courses", label: "Courses Catalog" },
      { path: "/courses/ux-ui-design-master", label: "Course Detail (UX/UI)" },
      { path: "/discover", label: "Discover (Assessment)" },
      { path: "/apply", label: "Apply (Application Form)" },
    ]
  },
  auth: {
    label: "Auth",
    icon: Lock,
    color: "amber",
    routes: [
      { path: "/login", label: "Login" },
      { path: "/signup", label: "Signup" },
      { path: "/forgot-password", label: "Forgot Password" },
    ]
  },
  platform: {
    label: "Platform",
    icon: Layout,
    color: "green",
    routes: [
      { path: "/dashboard", label: "Dashboard" },
      { path: "/my-courses", label: "My Courses" },
      { path: "/lessons/1", label: "Lesson View (ID: 1)" },
      { path: "/onboarding", label: "Onboarding" },
      { path: "/pre-assessment", label: "Pre-Assessment" },
      { path: "/ai-tutor", label: "AI Tutor" },
      { path: "/community", label: "Community" },
      { path: "/placement", label: "Placement" },
      { path: "/profile", label: "Profile" },
      { path: "/certificates", label: "Certificates" },
      { path: "/settings", label: "Settings" },
    ]
  }
}

export function DevNav() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [expandedSection, setExpandedSection] = useState<string | null>("marketing")

  // Mostra solo in development
  if (process.env.NODE_ENV !== "development") {
    return null
  }

  const totalRoutes = Object.values(routes).reduce((acc, section) => acc + section.routes.length, 0)
  const currentRoute = Object.values(routes)
    .flatMap(section => section.routes)
    .find(route => route.path === pathname)

  return (
    <>
      {/* Toggle Button - Fixed in basso a destra */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-[100] shadow-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
        size="lg"
      >
        <Code className="w-5 h-5 mr-2" />
        Dev Nav {isOpen ? <ChevronDown className="w-4 h-4 ml-2" /> : <ChevronUp className="w-4 h-4 ml-2" />}
      </Button>

      {/* DevNav Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-purple-900/95 to-pink-900/95 backdrop-blur-xl shadow-2xl border-b-4 border-purple-500"
          >
            <div className="container mx-auto px-4 py-3">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-purple-500 p-2 rounded-lg">
                    <Code className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg">Dev Navigation Panel</h3>
                    <p className="text-xs text-purple-200">
                      {totalRoutes} routes • Current: {currentRoute?.label || "Unknown"}
                    </p>
                  </div>
                </div>
                <Button
                  onClick={() => setIsOpen(false)}
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Routes Grid */}
              <div className="grid md:grid-cols-3 gap-4">
                {Object.entries(routes).map(([key, section]) => {
                  const Icon = section.icon
                  const isExpanded = expandedSection === key

                  return (
                    <div key={key} className="bg-white/10 rounded-lg p-4 backdrop-blur">
                      {/* Section Header */}
                      <button
                        onClick={() => setExpandedSection(isExpanded ? null : key)}
                        className="w-full flex items-center justify-between mb-3 text-white hover:text-purple-200 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4" />
                          <span className="font-semibold">{section.label}</span>
                          <Badge variant="secondary" className="text-xs">
                            {section.routes.length}
                          </Badge>
                        </div>
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>

                      {/* Routes List */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="space-y-1 overflow-hidden"
                          >
                            {section.routes.map((route) => {
                              const isActive = pathname === route.path

                              return (
                                <Link
                                  key={route.path}
                                  href={route.path}
                                  onClick={() => setIsOpen(false)}
                                  className={`block px-3 py-2 rounded text-sm transition-all ${
                                    isActive
                                      ? "bg-white text-purple-900 font-semibold"
                                      : "text-white hover:bg-white/20"
                                  }`}
                                >
                                  {route.label}
                                </Link>
                              )
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                })}
              </div>

              {/* Quick Stats */}
              <div className="mt-4 flex items-center justify-between text-xs text-purple-200">
                <div className="flex gap-4">
                  <span>ENV: {process.env.NODE_ENV}</span>
                  <span>•</span>
                  <span>Next.js 16.1.6</span>
                </div>
                <span className="opacity-60">Visible only in development mode</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
