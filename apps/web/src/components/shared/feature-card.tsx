import { LucideIcon } from "lucide-react"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

/**
 * Props per il componente FeatureCard
 */
interface FeatureCardProps {
  /**
   * Icona della feature
   */
  icon: LucideIcon

  /**
   * Titolo della feature
   */
  title: string

  /**
   * Descrizione della feature
   */
  description: string

  /**
   * Gradient colors per l'icona (from, to)
   */
  iconGradient?: string

  /**
   * Size dell'icona (default: "md")
   */
  iconSize?: "sm" | "md" | "lg"

  /**
   * Mostra come Card o div semplice (default: true)
   */
  asCard?: boolean

  /**
   * Classe CSS custom per il container
   */
  className?: string

  /**
   * Classe CSS custom per il titolo
   */
  titleClassName?: string

  /**
   * Classe CSS custom per la descrizione
   */
  descriptionClassName?: string

  /**
   * Align contenuto (default: "left")
   */
  align?: "left" | "center"
}

/**
 * FeatureCard - Componente card per mostrare feature/benefit/value
 *
 * @example
 * ```tsx
 * <FeatureCard
 *   icon={Target}
 *   title="Eccellenza"
 *   description="Standard altissimi in ogni aspetto della formazione, dal curriculum alla mentorship."
 *   iconGradient="from-[hsl(var(--indigo))] to-[hsl(var(--indigo)_/_0.8)]"
 * />
 * ```
 */
export function FeatureCard({
  icon: Icon,
  title,
  description,
  iconGradient = "from-[hsl(var(--indigo))] to-[hsl(var(--amber))]",
  iconSize = "md",
  asCard = true,
  className,
  titleClassName,
  descriptionClassName,
  align = "left"
}: FeatureCardProps) {
  const iconSizeClasses = {
    sm: { container: "w-10 h-10 rounded-lg", icon: "w-5 h-5" },
    md: { container: "w-14 h-14 rounded-xl", icon: "w-7 h-7" },
    lg: { container: "w-16 h-16 rounded-2xl", icon: "w-8 h-8" }
  }

  const alignClasses = {
    left: "text-left items-start",
    center: "text-center items-center"
  }

  const content = (
    <div className={cn("flex flex-col gap-4", alignClasses[align])}>
      {/* Icon */}
      <div className="mb-2">
        <div
          className={cn(
            iconSizeClasses[iconSize].container,
            "bg-gradient-to-br flex items-center justify-center",
            iconGradient
          )}
        >
          <Icon className={cn(iconSizeClasses[iconSize].icon, "text-white")} />
        </div>
      </div>

      {/* Title */}
      <h3
        className={cn(
          "font-display text-2xl font-semibold",
          titleClassName
        )}
      >
        {title}
      </h3>

      {/* Description */}
      <p
        className={cn(
          "text-muted-foreground leading-relaxed",
          descriptionClassName
        )}
      >
        {description}
      </p>
    </div>
  )

  if (asCard) {
    return (
      <Card className={cn("p-8 h-full hover:border-[hsl(var(--indigo)_/_0.3)] transition-colors", className)}>
        {content}
      </Card>
    )
  }

  return (
    <div className={className}>
      {content}
    </div>
  )
}

/**
 * FeatureGrid - Wrapper per mostrare più FeatureCard in griglia
 *
 * @example
 * ```tsx
 * <FeatureGrid cols={2}>
 *   <FeatureCard icon={Target} title="Eccellenza" description="..." />
 *   <FeatureCard icon={Lightbulb} title="Innovazione" description="..." />
 * </FeatureGrid>
 * ```
 */
export function FeatureGrid({
  children,
  cols = 2,
  className
}: {
  children: React.ReactNode
  cols?: 2 | 3 | 4
  className?: string
}) {
  const colClasses = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
  }

  return (
    <div className={cn("grid gap-8", colClasses[cols], className)}>
      {children}
    </div>
  )
}
