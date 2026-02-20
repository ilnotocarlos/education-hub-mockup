"use client"
import { motion } from "framer-motion"

const reveal = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.7 } } }
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.15 } } }

export function Slide02({ skipReveal }: { skipReveal?: boolean }) {
  return (
    <div className="h-screen flex flex-col justify-center px-8 md:px-16 lg:px-24 overflow-y-auto">
      <motion.div variants={stagger} initial={skipReveal ? "show" : "hidden"} animate="show" className="max-w-5xl mx-auto w-full">
        <motion.div variants={reveal} className="text-xs uppercase tracking-[0.3em] text-[hsl(37,88%,55%)] mb-6 flex items-center gap-3">
          <span className="w-8 h-px bg-[hsl(37,88%,55%)]" />Il Problema
        </motion.div>
        <motion.h1 variants={reveal} className="font-display text-4xl md:text-5xl font-light mb-12 leading-[1.1]">
          Education + Edutainment = <em className="text-[hsl(37,88%,55%)]">nessuno li mette a sistema</em>
        </motion.h1>
        <motion.div variants={reveal} className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 items-center">
          <div className="p-6 rounded-xl border border-white/10 bg-white/5">
            <h3 className="text-lg font-semibold text-white mb-3">Education</h3>
            <p className="text-sm text-white/60 leading-relaxed">Universita, business school — troppo teoriche, costose (€16-25K), lente ad adattarsi al mercato.</p>
          </div>
          <div className="text-3xl font-display text-[hsl(37,88%,55%)] text-center font-bold">VS</div>
          <div className="p-6 rounded-xl border border-white/10 bg-white/5">
            <h3 className="text-lg font-semibold text-white mb-3">Edutainment</h3>
            <p className="text-sm text-white/60 leading-relaxed">MOOC, podcast, YouTube — zero struttura, retention <strong className="text-white">2% a 30 giorni</strong>.</p>
          </div>
        </motion.div>
        <motion.div variants={reveal} className="mt-10 p-6 rounded-xl border border-[hsl(37,88%,55%)]/20 bg-[hsl(37,88%,55%)]/5 text-center">
          <p className="text-lg text-white/80">Alto job outcomes × alta innovazione tech = <strong className="text-[hsl(37,88%,55%)]">zero player</strong></p>
        </motion.div>
      </motion.div>
    </div>
  )
}
