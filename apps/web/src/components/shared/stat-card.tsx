import { LucideIcon } from "lucide-react"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

/**
 * Size variant per il numero
 */
type StatSize = "sm" | "md" | "lg" | "xl"

/**
 * Props per il componente StatCard
 */
interface StatCardProps {
  /**
   * Valore principale (numero o testo)
   */
  value: string | number

  /**
   * Label descrittiva sotto il valore
   */
  label: string

  /**
   * Icona opzionale (mostrata sopra o a sinistra del valore)
   */
  icon?: LucideIcon

  /**
   * Posizione dell'icona (default: "top")
   */
  iconPosition?: "top" | "left"

  /**
   * Size del valore (default: "lg")
   */
  size?: StatSize

  /**
   * Colore del valore (default: "hsl(var(--indigo))")
   */
  valueColor?: string

  /**
   * Colore dell'icona (default: valueColor)
   */
  iconColor?: string

  /**
   * Mostra come Card o div semplice (default: false = div semplice)
   */
  asCard?: boolean

  /**
   * Classe CSS custom per il container
   */
  className?: string

  /**
   * Classe CSS custom per il valore
   */
  valueClassName?: string

  /**
   * Classe CSS custom per la label
   */
  labelClassName?: string

  /**
   * Allineamento del testo (default: "center")
   */
  align?: "left" | "center" | "right"
}

/**
 * StatCard - Componente per mostrare metriche/statistiche con numero grande
 *
 * @example
 * ```tsx
 * // Stat semplice
 * <StatCard value="87%" label="Placement Rate" />
 *
 * // Stat con icona
 * <StatCard
 *   value="5,000+"
 *   label="Alumni"
 *   icon={Users}
 *   size="xl"
 * />
 *
 * // Stat come Card
 * <StatCard
 *   value="2x"
 *   label="Più efficace del metodo tradizionale"
 *   asCard
 *   size="lg"
 * />
 * ```
 */
export function StatCard({
  value,
  label,
  icon: Icon,
  iconPosition = "top",
  size = "lg",
  valueColor = "hsl(var(--indigo))",
  iconColor,
  asCard = false,
  className,
  valueClassName,
  labelClassName,
  align = "center"
}: StatCardProps) {
  const sizeClasses = {
    sm: "text-3xl",
    md: "text-4xl",
    lg: "text-5xl",
    xl: "text-6xl"
  }

  const alignClasses = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end"
  }

  const iconSizes = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-10 h-10",
    xl: "w-12 h-12"
  }

  const content = (
    <div
      className={cn(
        "flex flex-col gap-2",
        alignClasses[align],
        iconPosition === "left" && "flex-row items-center gap-4"
      )}
    >
      {/* Icon */}
      {Icon && iconPosition === "top" && (
        <Icon
          className={cn(iconSizes[size])}
          style={{ color: iconColor || valueColor }}
        />
      )}

      <div
        className={cn(
          "flex gap-4",
          iconPosition === "left" ? "flex-row items-center" : "flex-col"
        )}
      >
        {Icon && iconPosition === "left" && (
          <Icon
            className={cn(iconSizes[size])}
            style={{ color: iconColor || valueColor }}
          />
        )}

        <div className={cn("flex flex-col", alignClasses[align])}>
          {/* Value */}
          <div
            className={cn(
              "font-display font-bold mb-2",
              sizeClasses[size],
              valueClassName
            )}
            style={{ color: valueColor }}
          >
            {value}
          </div>

          {/* Label */}
          <div
            className={cn(
              "text-sm text-muted-foreground",
              size === "xl" && "text-base",
              labelClassName
            )}
          >
            {label}
          </div>
        </div>
      </div>
    </div>
  )

  if (asCard) {
    return (
      <Card className={cn("p-6", className)}>
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
 * StatCardGrid - Wrapper per mostrare più StatCard in griglia
 *
 * @example
 * ```tsx
 * <StatCardGrid cols={4}>
 *   <StatCard value="2020" label="Anno di Fondazione" />
 *   <StatCard value="5,000+" label="Alumni" />
 *   <StatCard value="250+" label="Aziende Partner" />
 *   <StatCard value="87%" label="Placement Rate" />
 * </StatCardGrid>
 * ```
 */
export function StatCardGrid({
  children,
  cols = 4,
  className
}: {
  children: React.ReactNode
  cols?: 2 | 3 | 4
  className?: string
}) {
  const colClasses = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-3",
    4: "grid-cols-2 md:grid-cols-4"
  }

  return (
    <div className={cn("grid gap-8", colClasses[cols], className)}>
      {children}
    </div>
  )
}
