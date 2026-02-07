import { Variants } from "framer-motion"

/**
 * Configurazione globale per le transizioni
 */
const DEFAULT_DURATION = 0.5
const DEFAULT_EASE = "easeOut" as const
const FAST_DURATION = 0.3
const SLOW_DURATION = 0.6

/**
 * Variants predefiniti per transizioni comuni
 */
export const pageTransitionVariants = {
  /**
   * Fade in dal basso (più comune)
   */
  fadeInUp: {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: DEFAULT_DURATION, ease: DEFAULT_EASE }
    }
  } as Variants,

  /**
   * Fade in dal basso con movimento maggiore
   */
  fadeInUpLarge: {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: SLOW_DURATION, ease: DEFAULT_EASE }
    }
  } as Variants,

  /**
   * Fade in dall'alto
   */
  fadeInDown: {
    hidden: { opacity: 0, y: -20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: DEFAULT_DURATION, ease: DEFAULT_EASE }
    }
  } as Variants,

  /**
   * Fade in da sinistra
   */
  fadeInLeft: {
    hidden: { opacity: 0, x: -20 },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: DEFAULT_DURATION, ease: DEFAULT_EASE }
    }
  } as Variants,

  /**
   * Fade in da destra
   */
  fadeInRight: {
    hidden: { opacity: 0, x: 20 },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: DEFAULT_DURATION, ease: DEFAULT_EASE }
    }
  } as Variants,

  /**
   * Scale in (per modal, success state)
   */
  scaleIn: {
    hidden: { opacity: 0, scale: 0.9 },
    show: {
      opacity: 1,
      scale: 1,
      transition: { duration: DEFAULT_DURATION, ease: DEFAULT_EASE }
    }
  } as Variants,

  /**
   * Scale in ridotto (per elementi piccoli)
   */
  scaleInSmall: {
    hidden: { opacity: 0, scale: 0.95 },
    show: {
      opacity: 1,
      scale: 1,
      transition: { duration: DEFAULT_DURATION, ease: DEFAULT_EASE }
    }
  } as Variants,

  /**
   * Rotate in (effetto carta/flip)
   */
  rotateIn: {
    hidden: { opacity: 0, rotateY: 180 },
    show: {
      opacity: 1,
      rotateY: 0,
      transition: { duration: SLOW_DURATION, ease: DEFAULT_EASE }
    }
  } as Variants,

  /**
   * Scale X (per progress bar)
   */
  scaleX: {
    hidden: { scaleX: 0 },
    show: {
      scaleX: 1,
      transition: { duration: DEFAULT_DURATION, ease: DEFAULT_EASE }
    }
  } as Variants,
}

/**
 * Configurazioni per AnimatePresence (wizard, multi-step)
 */
export const wizardTransition = {
  /**
   * Transizione orizzontale (step avanti/indietro)
   */
  horizontal: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
    transition: { duration: FAST_DURATION }
  },

  /**
   * Transizione verticale
   */
  vertical: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: FAST_DURATION }
  },

  /**
   * Fade semplice (no movimento)
   */
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: FAST_DURATION }
  }
}

/**
 * Hook per gestire transizioni di pagina/sezione
 */
export function usePageTransition() {
  /**
   * Crea una variante custom con parametri personalizzati
   */
  const createCustomVariant = (
    direction: "up" | "down" | "left" | "right" | "scale" = "up",
    distance: number = 20,
    duration: number = DEFAULT_DURATION
  ): Variants => {
    const axisMap = {
      up: { axis: "y" as const, value: distance },
      down: { axis: "y" as const, value: -distance },
      left: { axis: "x" as const, value: -distance },
      right: { axis: "x" as const, value: distance },
      scale: { axis: "scale" as const, value: 0.9 }
    }

    const { axis, value } = axisMap[direction]

    return {
      hidden: {
        opacity: 0,
        [axis]: axis === "scale" ? value : value
      },
      show: {
        opacity: 1,
        [axis]: axis === "scale" ? 1 : 0,
        transition: { duration, ease: DEFAULT_EASE }
      }
    } as Variants
  }

  /**
   * Crea una configurazione stagger per animare liste
   */
  const createStaggerContainer = (
    staggerChildren: number = 0.1,
    delayChildren: number = 0
  ): Variants => {
    return {
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: {
          staggerChildren,
          delayChildren
        }
      }
    }
  }

  /**
   * Crea un item stagger (da usare con createStaggerContainer)
   */
  const createStaggerItem = (
    direction: "up" | "down" | "left" | "right" = "up",
    distance: number = 20
  ): Variants => {
    const axisMap = {
      up: { axis: "y" as const, value: distance },
      down: { axis: "y" as const, value: -distance },
      left: { axis: "x" as const, value: -distance },
      right: { axis: "x" as const, value: distance }
    }

    const { axis, value } = axisMap[direction]

    return {
      hidden: {
        opacity: 0,
        [axis]: value
      },
      show: {
        opacity: 1,
        [axis]: 0,
        transition: { duration: DEFAULT_DURATION, ease: DEFAULT_EASE }
      }
    } as Variants
  }

  return {
    // Variants predefiniti
    variants: pageTransitionVariants,

    // Wizard transitions
    wizard: wizardTransition,

    // Helpers per variants custom
    createCustomVariant,
    createStaggerContainer,
    createStaggerItem,

    // Durations comuni
    durations: {
      fast: FAST_DURATION,
      default: DEFAULT_DURATION,
      slow: SLOW_DURATION
    }
  }
}
