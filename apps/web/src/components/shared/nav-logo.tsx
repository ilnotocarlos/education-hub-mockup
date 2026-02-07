import Link from "next/link"
import { GraduationCap } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavLogoProps {
  href?: string
  label?: string
  tagline?: string
  showIcon?: boolean
  className?: string
  variant?: "default" | "minimal"
}

export function NavLogo({
  href = "/",
  label = "Education Hub",
  tagline,
  showIcon = false,
  className,
  variant = "default",
}: NavLogoProps) {
  if (variant === "minimal") {
    return (
      <Link
        href={href}
        className={cn(
          "font-display text-2xl font-semibold transition-colors",
          className
        )}
      >
        {label}
      </Link>
    )
  }

  return (
    <Link href={href} className={cn("flex items-center gap-3 group", className)}>
      {showIcon && (
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--indigo))] to-[hsl(var(--amber))] rounded-xl opacity-75 blur-sm group-hover:blur-md transition-all" />
          <div className="relative bg-gradient-to-br from-[hsl(var(--indigo))] to-[hsl(var(--amber))] p-2 rounded-xl">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
        </div>
      )}
      <div>
        <span className="font-display text-2xl font-bold tracking-tight">
          {label}
        </span>
        {tagline && (
          <p className="text-xs text-muted-foreground hidden md:block">
            {tagline}
          </p>
        )}
      </div>
    </Link>
  )
}
