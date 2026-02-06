"use client"

import * as React from "react"
import { Bell, User } from "lucide-react"

import { cn } from "../lib/utils"
import { Button } from "../components/button"
import { Badge } from "../components/badge"

interface AppHeaderProps {
  appName?: string
  userMenu?: React.ReactNode
  notifications?: number
  children?: React.ReactNode
  className?: string
}

export function AppHeader({
  appName,
  userMenu,
  notifications = 0,
  children,
  className,
}: AppHeaderProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-40 flex h-16 items-center gap-4 border-b border-[hsl(var(--border))] bg-[hsl(var(--background))] px-6",
        className
      )}
    >
      {/* App Name */}
      {appName && (
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-semibold">{appName}</h1>
        </div>
      )}

      {/* Center Content (e.g., search, breadcrumbs) */}
      {children && <div className="flex-1">{children}</div>}

      {/* Right Actions */}
      <div className="flex items-center gap-2 ml-auto">
        {/* Notifications */}
        {notifications > 0 && (
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-4 w-4" />
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs"
            >
              {notifications > 9 ? "9+" : notifications}
            </Badge>
          </Button>
        )}

        {/* User Menu */}
        {userMenu || (
          <Button variant="ghost" size="icon">
            <User className="h-4 w-4" />
          </Button>
        )}
      </div>
    </header>
  )
}
