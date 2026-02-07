import { ReactNode } from "react"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

/**
 * Variant background per la CTA section
 */
type CTAVariant = "gradient" | "muted" | "solid" | "transparent"

/**
 * Layout per i bottoni
 */
type CTAButtonLayout = "horizontal" | "vertical" | "stacked"

/**
 * Props per il componente CTASection
 */
interface CTASectionProps {
  /**
   * Heading principale della CTA
   */
  title: string | ReactNode

  /**
   * Descrizione sotto il titolo
   */
  description?: string | ReactNode

  /**
   * Slot per i CTA buttons (1-2 bottoni)
   */
  actions?: ReactNode

  /**
   * Variant background (default: "gradient")
   */
  variant?: CTAVariant

  /**
   * Layout bottoni (default: "horizontal")
   */
  buttonLayout?: CTAButtonLayout

  /**
   * Allineamento testo (default: "center")
   */
  align?: "left" | "center"

  /**
   * Mostra come Card o section semplice (default: true)
   */
  asCard?: boolean

  /**
   * Dimensione massima del container (default: "3xl")
   */
  maxWidth?: "2xl" | "3xl" | "4xl" | "5xl" | "full"

  /**
   * Classe CSS custom per il container
   */
  className?: string

  /**
   * Classe CSS custom per il title
   */
  titleClassName?: string

  /**
   * Classe CSS custom per la description
   */
  descriptionClassName?: string

  /**
   * Classe CSS custom per l'actions container
   */
  actionsClassName?: string
}

/**
 * CTASection - Componente call-to-action riusabile
 *
 * @example
 * ```tsx
 * // CTA semplice con gradient
 * <CTASection
 *   title="Pronto a Iniziare?"
 *   description="Fai l'assessment gratuito e scopri il percorso personalizzato per te"
 *   actions={
 *     <>
 *       <Button size="lg" asChild>
 *         <Link href="/discover">Inizia Assessment</Link>
 *       </Button>
 *       <Button size="lg" variant="outline" asChild>
 *         <Link href="/courses">Esplora Corsi</Link>
 *       </Button>
 *     </>
 *   }
 * />
 *
 * // CTA come Card con background muted
 * <CTASection
 *   title="Non Sai Quale Corso Scegliere?"
 *   description="Fai il nostro assessment e ti consiglieremo il percorso più adatto"
 *   variant="muted"
 *   asCard
 *   actions={<Button>Inizia Assessment Gratuito</Button>}
 * />
 * ```
 */
export function CTASection({
  title,
  description,
  actions,
  variant = "gradient",
  buttonLayout = "horizontal",
  align = "center",
  asCard = true,
  maxWidth = "3xl",
  className,
  titleClassName,
  descriptionClassName,
  actionsClassName
}: CTASectionProps) {
  const variantClasses = {
    gradient: "bg-gradient-to-br from-[hsl(var(--indigo)_/_0.05)] to-[hsl(var(--amber)_/_0.05)] border-[hsl(var(--indigo)_/_0.2)]",
    muted: "bg-muted/30",
    solid: "bg-background",
    transparent: "bg-transparent border-0"
  }

  const alignClasses = {
    left: "text-left items-start",
    center: "text-center items-center"
  }

  const maxWidthClasses = {
    "2xl": "max-w-2xl",
    "3xl": "max-w-3xl",
    "4xl": "max-w-4xl",
    "5xl": "max-w-5xl",
    full: "max-w-full"
  }

  const buttonLayoutClasses = {
    horizontal: "flex-row",
    vertical: "flex-col",
    stacked: "flex-col sm:flex-row"
  }

  const content = (
    <div className={cn("flex flex-col", alignClasses[align], "space-y-6")}>
      {/* Title */}
      {typeof title === "string" ? (
        <h2
          className={cn(
            "font-display text-2xl md:text-3xl font-semibold",
            titleClassName
          )}
        >
          {title}
        </h2>
      ) : (
        title
      )}

      {/* Description */}
      {description && (
        typeof description === "string" ? (
          <p
            className={cn(
              "text-lg text-muted-foreground",
              align === "center" && "mx-auto",
              descriptionClassName
            )}
          >
            {description}
          </p>
        ) : (
          description
        )
      )}

      {/* Actions */}
      {actions && (
        <div
          className={cn(
            "flex gap-4",
            buttonLayoutClasses[buttonLayout],
            align === "center" && "justify-center",
            actionsClassName
          )}
        >
          {actions}
        </div>
      )}
    </div>
  )

  if (asCard) {
    return (
      <Card className={cn("p-8", variantClasses[variant], className)}>
        <div className={cn("mx-auto", maxWidthClasses[maxWidth])}>
          {content}
        </div>
      </Card>
    )
  }

  return (
    <section className={cn("py-12", className)}>
      <div className={cn("mx-auto", maxWidthClasses[maxWidth])}>
        {content}
      </div>
    </section>
  )
}

/**
 * CTACard - Variante compatta come Card inline
 *
 * @example
 * ```tsx
 * <CTACard
 *   title="Prova l'AI Tutor"
 *   description="Fai una domanda, chiedi una code review, o richiedi esercizi personalizzati"
 *   icon={<Play className="w-6 h-6" />}
 *   action={<Button variant="outline">Inizia</Button>}
 * />
 * ```
 */
export function CTACard({
  title,
  description,
  icon,
  action,
  className
}: {
  title: string
  description?: string
  icon?: ReactNode
  action?: ReactNode
  className?: string
}) {
  return (
    <Card className={cn("p-6 md:p-8", className)}>
      <div className="flex items-start gap-4">
        {icon && (
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[hsl(var(--indigo))] to-[hsl(var(--amber))] flex items-center justify-center text-white shrink-0">
            {icon}
          </div>
        )}
        <div className="flex-grow">
          <h3 className="font-semibold text-lg mb-2">{title}</h3>
          {description && (
            <p className="text-muted-foreground mb-4">{description}</p>
          )}
          {action}
        </div>
      </div>
    </Card>
  )
}
