"use client"

import * as React from "react"
import { motion, useInView, useMotionValue, useSpring } from "framer-motion"

interface AnimatedCounterProps {
  value: string
  duration?: number
}

export function AnimatedCounter({ value, duration = 2 }: AnimatedCounterProps) {
  const ref = React.useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  // Extract number from string (e.g., "87%" -> 87, "250+" -> 250)
  const numericValue = React.useMemo(() => {
    const match = value.match(/\d+/)
    return match ? parseInt(match[0]) : 0
  }, [value])

  // Get prefix/suffix (e.g., "€45k" -> prefix: "€", suffix: "k")
  const { prefix, suffix } = React.useMemo(() => {
    const beforeNumber = value.match(/^[^\d]*/)?.[0] || ""
    const afterNumber = value.match(/[^\d]*$/)?.[0] || ""
    return { prefix: beforeNumber, suffix: afterNumber }
  }, [value])

  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, {
    duration: duration * 1000,
    bounce: 0
  })

  const [displayValue, setDisplayValue] = React.useState("0")

  React.useEffect(() => {
    if (isInView) {
      motionValue.set(numericValue)
    }
  }, [isInView, numericValue, motionValue])

  React.useEffect(() => {
    return springValue.on("change", (latest) => {
      setDisplayValue(Math.floor(latest).toString())
    })
  }, [springValue])

  return (
    <span ref={ref}>
      {prefix}
      {isInView ? displayValue : "0"}
      {suffix}
    </span>
  )
}
