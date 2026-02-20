"use client"

import { useState, useCallback, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import Link from "next/link"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { Slide01 } from "./slides/slide-01"
import { Slide02 } from "./slides/slide-02"
import { Slide03 } from "./slides/slide-03"
import { Slide04 } from "./slides/slide-04"
import { Slide05 } from "./slides/slide-05"
import { Slide06 } from "./slides/slide-06"
import { Slide07 } from "./slides/slide-07"
import { Slide08 } from "./slides/slide-08"
import { Slide09 } from "./slides/slide-09"
import { Slide10 } from "./slides/slide-10"

const slides = [Slide01, Slide02, Slide03, Slide04, Slide05, Slide06, Slide07, Slide08, Slide09, Slide10]
const slideLabels = ["Scenario", "Problema", "Obiettivo", "Paradigma", "Accademia", "Piattaforma AI", "Sistema", "Convergenza", "Relazione", "Proposta"]

export function PresentationDeck() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const goTo = useCallback((index: number) => {
    if (isAnimating || index === current || index < 0 || index >= slides.length) return
    setDirection(index > current ? 1 : -1)
    setIsAnimating(true)
    setCurrent(index)
    setTimeout(() => setIsAnimating(false), 700)
  }, [current, isAnimating])

  const next = useCallback(() => goTo(current + 1), [current, goTo])
  const prev = useCallback(() => goTo(current - 1), [current, goTo])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " " || e.key === "PageDown") { e.preventDefault(); next() }
      else if (e.key === "ArrowLeft" || e.key === "ArrowUp" || e.key === "PageUp") { e.preventDefault(); prev() }
      else if (e.key === "Home") { e.preventDefault(); goTo(0) }
      else if (e.key === "End") { e.preventDefault(); goTo(slides.length - 1) }
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [next, prev, goTo])

  useEffect(() => {
    let lastWheel = 0
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      const now = Date.now()
      if (now - lastWheel < 800) return
      lastWheel = now
      if (e.deltaY > 0) next()
      else if (e.deltaY < 0) prev()
    }
    window.addEventListener("wheel", handleWheel, { passive: false })
    return () => window.removeEventListener("wheel", handleWheel)
  }, [next, prev])

  useEffect(() => {
    let startY = 0
    const handleTouchStart = (e: TouchEvent) => { startY = e.touches[0].clientY }
    const handleTouchEnd = (e: TouchEvent) => {
      const diff = startY - e.changedTouches[0].clientY
      if (Math.abs(diff) > 50) { diff > 0 ? next() : prev() }
    }
    window.addEventListener("touchstart", handleTouchStart)
    window.addEventListener("touchend", handleTouchEnd)
    return () => { window.removeEventListener("touchstart", handleTouchStart); window.removeEventListener("touchend", handleTouchEnd) }
  }, [next, prev])

  const CurrentSlide = slides[current]

  const variants = {
    enter: (dir: number) => ({ y: dir > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { y: 0, opacity: 1 },
    exit: (dir: number) => ({ y: dir > 0 ? "-100%" : "100%", opacity: 0 }),
  }

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Exit button */}
      <Link
        href="/"
        className="fixed top-4 left-4 z-50 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white text-sm transition-all backdrop-blur-sm"
      >
        <X className="h-4 w-4" />
        <span className="hidden sm:inline">Esci</span>
      </Link>

      {/* Slide content */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.6, ease: [0.45, 0.05, 0.15, 1] }}
          className="absolute inset-0"
        >
          <CurrentSlide />
        </motion.div>
      </AnimatePresence>

      {/* Progress track (right side) */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="group relative flex items-center justify-end"
            aria-label={slideLabels[i]}
          >
            <span className="absolute right-5 opacity-0 group-hover:opacity-100 text-[10px] text-white/60 whitespace-nowrap transition-opacity mr-1">
              {slideLabels[i]}
            </span>
            <div className={`w-2 h-2 rounded-full transition-all ${i === current ? "bg-[hsl(37,88%,55%)] scale-125" : "bg-white/30 hover:bg-white/50"}`} />
          </button>
        ))}
      </div>

      {/* Bottom navigation */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 flex items-center gap-4">
        <button onClick={prev} disabled={current === 0} className="p-2 text-white/50 hover:text-white disabled:opacity-20 transition-colors">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <span className="text-sm text-white/60 font-mono tabular-nums">
          {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
        </span>
        <button onClick={next} disabled={current === slides.length - 1} className="p-2 text-white/50 hover:text-white disabled:opacity-20 transition-colors">
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}
