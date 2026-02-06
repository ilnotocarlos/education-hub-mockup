"use client"

import * as React from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "../lib/utils"
import { Button } from "../components/button"

interface SidebarNavItem {
  title: string
  href: string
  icon?: React.ComponentType<{ className?: string }>
  badge?: string
}

interface AppSidebarProps {
  brandName?: string
  navItems: SidebarNavItem[]
  currentPath?: string
  footer?: React.ReactNode
}

export function AppSidebar({
  brandName = "Education Hub",
  navItems,
  currentPath,
  footer,
}: AppSidebarProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(false)

  return (
    <aside
      className={cn(
        "flex flex-col border-r border-[hsl(var(--border))] bg-[hsl(var(--card))] transition-all duration-300",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-[hsl(var(--border))]">
        {!isCollapsed && (
          <h2 className="text-lg font-semibold tracking-tight">{brandName}</h2>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="ml-auto"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-2 overflow-y-auto scrollbar-thin">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = currentPath === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-[hsl(var(--accent))] text-accent-foreground"
                  : "text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--accent))] hover:text-accent-foreground"
              )}
            >
              {Icon && <Icon className="h-4 w-4 shrink-0" />}
              {!isCollapsed && (
                <>
                  <span className="flex-1">{item.title}</span>
                  {item.badge && (
                    <span className="rounded-full bg-[hsl(var(--primary))] px-2 py-0.5 text-xs text-primary-foreground">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      {footer && !isCollapsed && (
        <div className="border-t border-[hsl(var(--border))] p-4">{footer}</div>
      )}
    </aside>
  )
}
