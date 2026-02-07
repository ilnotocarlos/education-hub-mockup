import { LucideIcon } from "lucide-react"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

/**
 * Props per il componente TimelineItem
 */
interface TimelineItemProps {
  /**
   * Anno/data del timeline item
   */
  year: string

  /**
   * Titolo dell'evento
   */
  title: string

  /**
   * Descrizione dell'evento
   */
  description: string

  /**
   * Icona dell'evento
   */
  icon: LucideIcon

  /**
   * Se è l'ultimo item (nasconde la linea verticale)
   */
  isLast?: boolean

  /**
   * Gradient per il dot (default: indigo to amber)
   */
  dotGradient?: string

  /**
   * Colore della linea verticale (default: indigo con opacity)
   */
  lineColor?: string

  /**
   * Mostra contenuto come Card (default: true)
   */
  asCard?: boolean

  /**
   * Classe CSS custom per il container
   */
  className?: string
}

/**
 * TimelineItem - Componente item timeline verticale
 *
 * @example
 * ```tsx
 * <TimelineItem
 *   year="2020"
 *   title="Fondazione"
 *   description="Nasce Education Hub con la vision di rivoluzionare l'education in Italia."
 *   icon={Sparkles}
 * />
 * ```
 */
export function TimelineItem({
  year,
  title,
  description,
  icon: Icon,
  isLast = false,
  dotGradient = "from-[hsl(var(--indigo))] to-[hsl(var(--amber))]",
  lineColor = "border-[hsl(var(--indigo)_/_0.2)]",
  asCard = true,
  className
}: TimelineItemProps) {
  const content = (
    <div className="flex items-start gap-4">
      {/* Icon container */}
      <div className="bg-gradient-to-br from-[hsl(var(--indigo)_/_0.1)] to-[hsl(var(--amber)_/_0.1)] p-3 rounded-lg shrink-0">
        <Icon className="w-6 h-6 text-[hsl(var(--indigo))]" />
      </div>

      {/* Content */}
      <div className="flex-grow">
        {/* Year */}
        <div className="font-display text-2xl font-bold text-[hsl(var(--indigo))] mb-2">
          {year}
        </div>

        {/* Title */}
        <h3 className="font-semibold text-lg mb-2">
          {title}
        </h3>

        {/* Description */}
        <p className="text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  )

  return (
    <div
      className={cn(
        "relative pl-8 pb-12",
        !isLast && `border-l-2 ${lineColor}`,
        isLast && "pb-0",
        className
      )}
    >
      {/* Timeline dot */}
      <div
        className={cn(
          "absolute -left-3 top-0 w-6 h-6 rounded-full bg-gradient-to-br flex items-center justify-center",
          dotGradient
        )}
      >
        <div className="w-2 h-2 rounded-full bg-white" />
      </div>

      {/* Content */}
      {asCard ? (
        <Card className="p-6 hover:border-[hsl(var(--indigo)_/_0.3)] transition-colors">
          {content}
        </Card>
      ) : (
        content
      )}
    </div>
  )
}

/**
 * Timeline - Wrapper per mostrare più TimelineItem in sequenza
 *
 * @example
 * ```tsx
 * <Timeline>
 *   <TimelineItem year="2020" title="Fondazione" description="..." icon={Sparkles} />
 *   <TimelineItem year="2021" title="Primo Corso" description="..." icon={Users} />
 *   <TimelineItem year="2022" title="Espansione" description="..." icon={Globe} isLast />
 * </Timeline>
 * ```
 */
export function Timeline({
  children,
  className
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("max-w-4xl mx-auto", className)}>
      {children}
    </div>
  )
}
