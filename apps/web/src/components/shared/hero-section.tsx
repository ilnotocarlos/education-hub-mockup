import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface HeroSectionProps {
  /**
   * Titolo principale del hero
   */
  title: string | ReactNode

  /**
   * Sottotitolo o descrizione
   */
  subtitle?: string | ReactNode

  /**
   * Slot per CTA buttons
   */
  actions?: ReactNode

  /**
   * Background variant
   */
  variant?: "gradient" | "solid" | "transparent"

  /**
   * Align content
   */
  align?: "left" | "center"

  /**
   * Custom className
   */
  className?: string

  /**
   * Children (optional content below hero)
   */
  children?: ReactNode
}

export function HeroSection({
  title,
  subtitle,
  actions,
  variant = "gradient",
  align = "center",
  className,
  children,
}: HeroSectionProps) {
  const backgroundClasses = {
    gradient: "bg-gradient-to-br from-[hsl(var(--indigo))] via-[hsl(var(--sage))] to-[hsl(var(--amber))]",
    solid: "bg-[hsl(var(--background))]",
    transparent: "bg-transparent",
  }

  const alignClasses = {
    left: "text-left items-start",
    center: "text-center items-center",
  }

  return (
    <section
      className={cn(
        "relative py-20 md:py-28 overflow-hidden",
        backgroundClasses[variant],
        className
      )}
    >
      {/* Grain Texture (only for gradient) */}
      {variant === "gradient" && (
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      )}

      <div className="container mx-auto px-4 relative z-10">
        <div className={cn("flex flex-col gap-6 max-w-4xl mx-auto", alignClasses[align])}>
          {/* Title */}
          {typeof title === "string" ? (
            <h1
              className={cn(
                "font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight",
                variant === "gradient" ? "text-white" : "text-foreground"
              )}
            >
              {title}
            </h1>
          ) : (
            title
          )}

          {/* Subtitle */}
          {subtitle && (
            typeof subtitle === "string" ? (
              <p
                className={cn(
                  "text-lg md:text-xl max-w-2xl",
                  variant === "gradient"
                    ? "text-white/90"
                    : "text-muted-foreground"
                )}
              >
                {subtitle}
              </p>
            ) : (
              subtitle
            )
          )}

          {/* Actions */}
          {actions && <div className="flex flex-wrap gap-4 justify-center">{actions}</div>}
        </div>

        {/* Children (optional content) */}
        {children && <div className="mt-12">{children}</div>}
      </div>
    </section>
  )
}
