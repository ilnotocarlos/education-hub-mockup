import { LucideIcon } from "lucide-react"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

/**
 * Props per il componente ProcessStep
 */
interface ProcessStepProps {
  /**
   * Numero dello step (es: "01", "02", "03")
   */
  number: string

  /**
   * Icona dello step
   */
  icon: LucideIcon

  /**
   * Titolo dello step
   */
  title: string

  /**
   * Descrizione dello step
   */
  description: string

  /**
   * Gradient colors per l'icona (from, to)
   */
  iconGradient?: string

  /**
   * Mostra come Card (default: true)
   */
  asCard?: boolean

  /**
   * Classe CSS custom per il container
   */
  className?: string
}

/**
 * ProcessStep - Componente step numerato per processi/flow
 *
 * @example
 * ```tsx
 * <ProcessStep
 *   number="01"
 *   icon={BookOpen}
 *   title="Assessment"
 *   description="Valutiamo il tuo livello e disegniamo un percorso personalizzato con AI"
 *   iconGradient="from-purple-500 to-pink-600"
 * />
 * ```
 */
export function ProcessStep({
  number,
  icon: Icon,
  title,
  description,
  iconGradient = "from-[hsl(var(--indigo))] to-[hsl(var(--amber))]",
  asCard = true,
  className
}: ProcessStepProps) {
  const content = (
    <div className="relative h-full">
      {/* Large number in background */}
      <div className="absolute top-6 right-6 font-display text-6xl font-bold text-muted-foreground/10 group-hover:text-[hsl(var(--indigo)_/_0.1)] transition-colors">
        {number}
      </div>

      <div className="relative flex flex-col h-full">
        {/* Icon with gradient blob */}
        <div className="mb-6">
          <div className={cn("absolute w-16 h-16 bg-gradient-to-br rounded-2xl opacity-20 blur-xl", iconGradient)} />
          <div className={cn("relative w-16 h-16 rounded-2xl bg-gradient-to-br flex items-center justify-center group-hover:scale-110 transition-transform", iconGradient)}>
            <Icon className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* Title */}
        <h3 className="font-display text-2xl font-semibold mb-3">
          {title}
        </h3>

        {/* Description */}
        <p className="text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  )

  if (asCard) {
    return (
      <Card className={cn("relative p-8 h-full border-2 hover:border-[hsl(var(--indigo)_/_0.3)] transition-all hover:shadow-lg group", className)}>
        {content}
      </Card>
    )
  }

  return (
    <div className={cn("relative group", className)}>
      {content}
    </div>
  )
}

/**
 * ProcessStepGrid - Wrapper per mostrare più ProcessStep in griglia
 *
 * @example
 * ```tsx
 * <ProcessStepGrid cols={3}>
 *   <ProcessStep number="01" icon={BookOpen} title="Assessment" description="..." />
 *   <ProcessStep number="02" icon={Users} title="Learning" description="..." />
 *   <ProcessStep number="03" icon={Briefcase} title="Placement" description="..." />
 * </ProcessStepGrid>
 * ```
 */
export function ProcessStepGrid({
  children,
  cols = 3,
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
