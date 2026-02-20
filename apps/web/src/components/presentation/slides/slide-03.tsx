"use client"
import { motion } from "framer-motion"

const reveal = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.7 } } }
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.15 } } }

export function Slide03() {
  return (
    <div className="h-screen flex flex-col justify-center px-8 md:px-16 lg:px-24 overflow-y-auto">
      <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-5xl mx-auto w-full">
        <motion.div variants={reveal} className="text-xs uppercase tracking-[0.3em] text-[hsl(37,88%,55%)] mb-6 flex items-center gap-3">
          <span className="w-8 h-px bg-[hsl(37,88%,55%)]" />L&apos;Obiettivo
        </motion.div>
        <motion.h1 variants={reveal} className="font-display text-4xl md:text-5xl font-light mb-8 leading-[1.1]">
          Ne universita, ne content factory.<br /><em className="text-[hsl(37,88%,55%)]">Un nuovo paradigma.</em>
        </motion.h1>
        <motion.p variants={reveal} className="text-xl text-white/60 italic max-w-3xl leading-relaxed mb-8">
          &ldquo;Education for transformation, powered by technology. Not a school, a transformation engine.&rdquo;
        </motion.p>
        <motion.div variants={reveal} className="flex flex-wrap gap-3 mb-10">
          {["Flywheel", "Trasformazione", "Creazione", "Competenze verificabili"].map((pill) => (
            <span key={pill} className="px-4 py-1.5 rounded-full text-sm border border-[hsl(37,88%,55%)]/30 bg-[hsl(37,88%,55%)]/10 text-[hsl(37,88%,55%)]">{pill}</span>
          ))}
        </motion.div>
        <motion.p variants={reveal} className="text-lg text-white/70 max-w-2xl leading-relaxed">
          Non colmiamo un gap. <strong className="text-white">Creiamo qualcosa che prima non esisteva.</strong>
        </motion.p>
      </motion.div>
    </div>
  )
}
