"use client"
import { motion } from "framer-motion"

const reveal = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.7 } } }
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.15 } } }

export function Slide07() {
  return (
    <div className="h-screen flex flex-col justify-center px-8 md:px-16 lg:px-24 overflow-y-auto">
      <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-5xl mx-auto w-full">
        <motion.div variants={reveal} className="text-xs uppercase tracking-[0.3em] text-[hsl(37,88%,55%)] mb-6 flex items-center gap-3">
          <span className="w-8 h-px bg-[hsl(37,88%,55%)]" />Il Sistema
        </motion.div>
        <motion.h1 variants={reveal} className="font-display text-3xl md:text-5xl font-light mb-10 leading-[1.1]">
          Hard skills + soft skills + <em className="text-[hsl(37,88%,55%)]">valore per la casa editrice</em>
        </motion.h1>
        <motion.div variants={reveal} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            { value: "3.500+", label: "titoli catalogo come knowledge base AI" },
            { value: "500+", label: "autori come Faculty potenziale" },
            { value: "120+", label: "librerie in 58 citta" },
          ].map((s, i) => (
            <div key={i} className="p-6 rounded-xl border border-white/10 bg-white/5 text-center">
              <div className="text-3xl font-bold text-white">{s.value}</div>
              <div className="text-xs text-white/50 mt-2">{s.label}</div>
            </div>
          ))}
        </motion.div>
        <motion.div variants={reveal} className="p-6 rounded-xl border border-[hsl(37,88%,55%)]/20 bg-[hsl(37,88%,55%)]/5 backdrop-blur-sm text-center">
          <div className="text-4xl font-bold text-[hsl(37,88%,55%)]">4,5M</div>
          <div className="text-sm text-white/60 mt-2">titolari carte fedelta — lead generation a costo quasi zero</div>
        </motion.div>
      </motion.div>
    </div>
  )
}
