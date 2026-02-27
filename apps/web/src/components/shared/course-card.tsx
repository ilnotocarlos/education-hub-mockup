import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Users, Star, ArrowRight, LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * Stat per il corso (duration, students, rating, etc.)
 */
interface CourseStat {
  /**
   * Icona dello stat (opzionale, default: nessuna icona)
   */
  icon?: LucideIcon

  /**
   * Label dello stat
   */
  label: string

  /**
   * Valore dello stat
   */
  value: string | number

  /**
   * Classe CSS custom per l'icona (es: fill per Star)
   */
  iconClassName?: string
}

/**
 * Props per il componente CourseCard
 */
interface CourseCardProps {
  /**
   * Titolo del corso
   */
  title: string

  /**
   * Descrizione breve del corso
   */
  description: string

  /**
   * Link al dettaglio del corso
   */
  href: string

  /**
   * Categoria del corso (es: "Design", "Tech", "Business")
   */
  category?: string

  /**
   * Livello del corso (es: "Beginner", "Intermediate", "Advanced")
   */
  level?: string

  /**
   * URL immagine di copertina (opzionale)
   */
  imageUrl?: string

  /**
   * Colore gradiente fallback se no imageUrl
   */
  gradientFrom?: string
  gradientTo?: string

  /**
   * Prezzo del corso
   */
  price?: number

  /**
   * Label del prezzo (default: "A partire da")
   */
  priceLabel?: string

  /**
   * Stats del corso (duration, students, rating, etc.)
   */
  stats?: CourseStat[]

  /**
   * Label del CTA button (default: "Scopri")
   */
  ctaLabel?: string

  /**
   * Classe CSS custom per il card
   */
  className?: string

  /**
   * Numero di linee max per la description (default: 3)
   */
  descriptionLines?: number

  /**
   * Mostra effetto hover (default: true)
   */
  showHoverEffect?: boolean
}

/**
 * CourseCard - Componente card per mostrare informazioni di un corso
 *
 * @example
 * ```tsx
 * <CourseCard
 *   title="UX/UI Design Master"
 *   description="Diventa un designer ricercato dalle aziende con portfolio di progetti reali"
 *   href="/courses/ux-ui-design-master"
 *   category="Design"
 *   level="Intermediate"
 *   price={4500}
 *   stats={[
 *     { icon: Clock, label: "Duration", value: "12 settimane" },
 *     { icon: Users, label: "Students", value: "125" },
 *     { icon: Star, label: "Rating", value: "4.9", iconClassName: "fill-amber-400 text-amber-400" }
 *   ]}
 * />
 * ```
 */
export function CourseCard({
  title,
  description,
  href,
  category,
  level,
  imageUrl,
  gradientFrom = "hsl(var(--indigo))",
  gradientTo = "hsl(var(--amber))",
  price,
  priceLabel = "A partire da",
  stats,
  ctaLabel = "Scopri",
  className,
  descriptionLines = 3,
  showHoverEffect = true
}: CourseCardProps) {
  return (
    <Card
      className={cn(
        "group overflow-hidden border-2 h-full flex flex-col transition-all",
        showHoverEffect && "hover:border-[hsl(var(--indigo)_/_0.3)] hover:shadow-xl",
        className
      )}
    >
      {/* Image / Gradient Header */}
      <div className="relative h-48 overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div
            className="absolute inset-0 bg-gradient-to-br"
            style={{
              backgroundImage: `linear-gradient(to bottom right, ${gradientFrom}, ${gradientTo})`
            }}
          >
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
            {category && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display text-4xl font-bold text-white opacity-50">
                  {category}
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col flex-grow">
        {/* Category & Level Badges */}
        {(category || level) && (
          <div className="flex items-center gap-2 mb-3">
            {category && (
              <Badge variant="secondary" className="text-xs">
                {category}
              </Badge>
            )}
            {level && (
              <Badge variant="outline" className="text-xs">
                {level}
              </Badge>
            )}
          </div>
        )}

        {/* Title */}
        <h3
          className={cn(
            "font-display text-2xl font-semibold mb-2 transition-colors",
            showHoverEffect && "group-hover:text-[hsl(var(--indigo))]"
          )}
        >
          {title}
        </h3>

        {/* Description */}
        <p
          className={cn(
            "text-sm text-muted-foreground mb-4 flex-grow",
            `line-clamp-${descriptionLines}`
          )}
        >
          {description}
        </p>

        {/* Stats */}
        {stats && stats.length > 0 && (
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4 flex-wrap">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={index} className="flex items-center gap-1">
                  {Icon && (
                    <Icon className={cn("w-4 h-4", stat.iconClassName)} />
                  )}
                  <span>{stat.value}</span>
                </div>
              )
            })}
          </div>
        )}

        {/* Price & CTA */}
        <div className="flex items-center justify-between pt-4 border-t">
          {price !== undefined ? (
            <div>
              <div className="text-xs text-muted-foreground">{priceLabel}</div>
              <div className="font-bold text-xl">
                €{price.toLocaleString()}
              </div>
            </div>
          ) : (
            <div />
          )}

          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "transition-colors",
              showHoverEffect && "group-hover:bg-[hsl(var(--indigo))] group-hover:text-white"
            )}
            asChild
          >
            <Link href={href}>
              {ctaLabel}
              <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </Card>
  )
}

/**
 * Helper per creare stats comuni
 */
export const createCourseStats = {
  duration: (value: string): CourseStat => ({
    icon: Clock,
    label: "Duration",
    value
  }),
  students: (value: string | number): CourseStat => ({
    icon: Users,
    label: "Students",
    value
  }),
  rating: (value: string | number): CourseStat => ({
    icon: Star,
    label: "Rating",
    value,
    iconClassName: "fill-muted-foreground text-muted-foreground"
  })
}
