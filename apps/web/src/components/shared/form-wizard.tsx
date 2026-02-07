"use client"

import { useState, ReactNode } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * Step configuration per il wizard
 */
export interface WizardStep {
  /**
   * ID univoco dello step
   */
  id: string | number

  /**
   * Badge/tag da mostrare sopra la domanda
   */
  badge?: {
    label: string
    icon?: ReactNode
    className?: string
  }

  /**
   * Titolo principale dello step
   */
  title: string | ReactNode

  /**
   * Sottotitolo opzionale
   */
  subtitle?: string | ReactNode

  /**
   * Contenuto dello step (form fields, options, etc.)
   */
  content: ReactNode

  /**
   * Funzione di validazione custom per questo step
   * @returns true se lo step è valido, false altrimenti
   */
  validate?: () => boolean
}

/**
 * Props per il componente FormWizard
 */
interface FormWizardProps {
  /**
   * Array di step del wizard
   */
  steps: WizardStep[]

  /**
   * Callback chiamata quando il wizard viene completato
   */
  onComplete: () => void

  /**
   * Step iniziale (default: 0)
   */
  initialStep?: number

  /**
   * Etichetta del pulsante finale (default: "Completa")
   */
  submitLabel?: string

  /**
   * Mostra progress bar (default: true)
   */
  showProgress?: boolean

  /**
   * Mostra contatore step (default: true)
   */
  showStepCounter?: boolean

  /**
   * Classe CSS custom per il card
   */
  cardClassName?: string

  /**
   * Classe CSS custom per il container
   */
  containerClassName?: string

  /**
   * Variante animazione transizione
   */
  transitionVariant?: "horizontal" | "vertical" | "fade"

  /**
   * Callback chiamata quando lo step cambia
   */
  onStepChange?: (step: number) => void

  /**
   * Disabilita navigazione indietro (default: false)
   */
  disableBack?: boolean
}

/**
 * FormWizard - Componente wizard multi-step riusabile
 *
 * @example
 * ```tsx
 * const steps: WizardStep[] = [
 *   {
 *     id: 1,
 *     badge: { label: "Step 1", icon: <User /> },
 *     title: "Informazioni Base",
 *     subtitle: "Inserisci i tuoi dati",
 *     content: <MyFormFields />,
 *     validate: () => !!formData.name
 *   },
 *   // ... more steps
 * ]
 *
 * <FormWizard
 *   steps={steps}
 *   onComplete={() => console.log("Wizard completed!")}
 * />
 * ```
 */
export function FormWizard({
  steps,
  onComplete,
  initialStep = 0,
  submitLabel = "Completa",
  showProgress = true,
  showStepCounter = true,
  cardClassName,
  containerClassName,
  transitionVariant = "horizontal",
  onStepChange,
  disableBack = false
}: FormWizardProps) {
  const [currentStep, setCurrentStep] = useState(initialStep)

  const totalSteps = steps.length
  const progress = ((currentStep + 1) / totalSteps) * 100
  const step = steps[currentStep]

  const transitionConfig = {
    horizontal: {
      initial: { opacity: 0, x: 20 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -20 }
    },
    vertical: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 }
    },
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 }
    }
  }

  const transition = transitionConfig[transitionVariant]

  /**
   * Verifica se lo step corrente è valido
   */
  const isCurrentStepValid = () => {
    if (step.validate) {
      return step.validate()
    }
    return true // Se non c'è validazione custom, lo step è sempre valido
  }

  /**
   * Avanza allo step successivo o completa il wizard
   */
  const handleNext = () => {
    if (!isCurrentStepValid()) return

    if (currentStep < totalSteps - 1) {
      const nextStep = currentStep + 1
      setCurrentStep(nextStep)
      onStepChange?.(nextStep)
    } else {
      onComplete()
    }
  }

  /**
   * Torna allo step precedente
   */
  const handleBack = () => {
    if (currentStep > 0 && !disableBack) {
      const prevStep = currentStep - 1
      setCurrentStep(prevStep)
      onStepChange?.(prevStep)
    }
  }

  /**
   * Salta a uno step specifico (opzionale, per future feature)
   */
  const goToStep = (stepIndex: number) => {
    if (stepIndex >= 0 && stepIndex < totalSteps) {
      setCurrentStep(stepIndex)
      onStepChange?.(stepIndex)
    }
  }

  return (
    <div className={cn("w-full", containerClassName)}>
      {/* Progress Bar */}
      {showProgress && (
        <div className="mb-8">
          {showStepCounter && (
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-foreground">
                {currentStep + 1} di {totalSteps}
              </span>
              <span className="text-sm text-muted-foreground">
                {Math.round(progress)}%
              </span>
            </div>
          )}
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[hsl(var(--indigo))] to-[hsl(var(--amber))]"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      )}

      {/* Wizard Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step.id}
          initial={transition.initial}
          animate={transition.animate}
          exit={transition.exit}
          transition={{ duration: 0.3 }}
        >
          <Card className={cn("border-2 hover:border-[hsl(var(--indigo)_/_0.3)] transition-colors", cardClassName)}>
            <CardContent className="p-8 md:p-12">
              {/* Badge (opzionale) */}
              {step.badge && (
                <div className="flex justify-center mb-8">
                  <Badge
                    className={cn(
                      "px-6 py-3 text-base font-display",
                      step.badge.className ||
                        "bg-gradient-to-r from-[hsl(var(--indigo))] to-[hsl(var(--amber))] text-white border-0"
                    )}
                  >
                    {step.badge.icon && (
                      <span className="mr-2">{step.badge.icon}</span>
                    )}
                    {step.badge.label}
                  </Badge>
                </div>
              )}

              {/* Title */}
              <div className="text-center mb-8">
                {typeof step.title === "string" ? (
                  <h2 className="text-2xl md:text-3xl font-display font-semibold mb-3">
                    {step.title}
                  </h2>
                ) : (
                  step.title
                )}

                {step.subtitle && (
                  typeof step.subtitle === "string" ? (
                    <p className="text-muted-foreground">{step.subtitle}</p>
                  ) : (
                    step.subtitle
                  )
                )}
              </div>

              {/* Content */}
              <div className="mb-8">
                {step.content}
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between pt-8 border-t">
                {currentStep > 0 && !disableBack ? (
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={handleBack}
                    className="gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Indietro
                  </Button>
                ) : (
                  <div />
                )}

                <Button
                  type="button"
                  onClick={handleNext}
                  disabled={!isCurrentStepValid()}
                  size="lg"
                  className="bg-gradient-to-r from-[hsl(var(--indigo))] to-[hsl(var(--amber))] hover:shadow-xl transition-all gap-2"
                >
                  {currentStep === totalSteps - 1 ? submitLabel : "Continua"}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

/**
 * Hook helper per gestire lo stato del wizard
 *
 * @example
 * ```tsx
 * const wizard = useWizardState({
 *   name: "",
 *   email: ""
 * })
 *
 * // In step content:
 * <Input
 *   value={wizard.data.name}
 *   onChange={(e) => wizard.updateField("name", e.target.value)}
 * />
 * ```
 */
export function useWizardState<T extends Record<string, any>>(initialData: T) {
  const [data, setData] = useState<T>(initialData)

  const updateField = <K extends keyof T>(field: K, value: T[K]) => {
    setData(prev => ({ ...prev, [field]: value }))
  }

  const updateMultiple = (updates: Partial<T>) => {
    setData(prev => ({ ...prev, ...updates }))
  }

  const reset = () => {
    setData(initialData)
  }

  return {
    data,
    updateField,
    updateMultiple,
    reset,
    setData
  }
}
