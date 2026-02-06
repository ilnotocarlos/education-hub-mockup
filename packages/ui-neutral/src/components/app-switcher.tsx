"use client"

import * as React from "react"
import Link from "next/link"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "../lib/utils"
import { Button } from "./button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu"

export type Role = "STUDENT" | "TEACHER" | "MARKETING" | "EDUCATION_TEAM" | "ADMIN"

interface App {
  name: string
  url: string
  roles: Role[]
  description?: string
}

// Default URLs (can be overridden via props or env vars in consuming app)
const DEFAULT_INTERNAL_APPS: App[] = [
  {
    name: "Planning",
    url: "http://localhost:3334",
    roles: ["ADMIN", "EDUCATION_TEAM"],
    description: "Education planning e curricula",
  },
  {
    name: "Teach",
    url: "http://localhost:3335",
    roles: ["TEACHER"],
    description: "Gestione lezioni e contenuti",
  },
  {
    name: "Insights",
    url: "http://localhost:3336",
    roles: ["MARKETING", "EDUCATION_TEAM"],
    description: "Analytics e market research",
  },
  {
    name: "Faculty",
    url: "http://localhost:3337",
    roles: ["ADMIN", "EDUCATION_TEAM"],
    description: "Faculty e content planning",
  },
]

interface AppSwitcherProps {
  currentApp?: string
  userRole?: Role
  apps?: App[]
  className?: string
}

export function AppSwitcher({ currentApp, userRole, apps = DEFAULT_INTERNAL_APPS, className }: AppSwitcherProps) {
  // Filter apps based on user role
  const availableApps = userRole
    ? apps.filter((app) => app.roles.includes(userRole))
    : apps

  if (availableApps.length === 0) {
    return null
  }

  const current = apps.find((app) => app.name === currentApp)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className={cn(
            "w-[200px] justify-between",
            className
          )}
        >
          {current ? current.name : "Select app"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[200px]">
        <DropdownMenuLabel>Internal Apps</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {availableApps.map((app) => (
          <DropdownMenuItem key={app.name} asChild>
            <Link href={app.url} className="w-full cursor-pointer">
              <Check
                className={cn(
                  "mr-2 h-4 w-4",
                  currentApp === app.name ? "opacity-100" : "opacity-0"
                )}
              />
              <div className="flex flex-col">
                <span className="font-medium">{app.name}</span>
                {app.description && (
                  <span className="text-xs text-[hsl(var(--muted-foreground))]">
                    {app.description}
                  </span>
                )}
              </div>
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
