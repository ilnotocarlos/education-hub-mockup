"use client"
import { motion } from "framer-motion"

const reveal = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.7 } } }
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.15 } } }

export function Slide08({ skipReveal }: { skipReveal?: boolean }) {
  return (
    <div className="h-screen flex flex-col justify-center px-8 md:px-16 lg:px-24 overflow-y-auto">
      <motion.div variants={stagger} initial={skipReveal ? "show" : "hidden"} animate="show" className="max-w-5xl mx-auto w-full">
        <motion.div variants={reveal} className="text-xs uppercase tracking-[0.3em] text-[hsl(37,88%,55%)] mb-6 flex items-center gap-3">
          <span className="w-8 h-px bg-[hsl(37,88%,55%)]" />La Convergenza
        </motion.div>
        <motion.h1 variants={reveal} className="font-display text-3xl md:text-5xl font-light mb-12 leading-[1.1]">
          Storytelling + Coding = <em className="text-[hsl(37,88%,55%)]">il profilo del futuro</em>
        </motion.h1>
        <motion.div variants={reveal} className="flex flex-col md:flex-row items-center justify-center gap-6 mb-10">
          <div className="w-40 h-40 rounded-full border-2 border-[hsl(243,76%,55%)]/50 flex items-center justify-center bg-[hsl(243,76%,55%)]/10">
            <div className="text-center"><div className="text-lg font-semibold text-white">Umanistica</div><div className="text-xs text-white/40 mt-1">storytelling, cultura</div></div>
          </div>
          <div className="text-3xl font-bold text-[hsl(37,88%,55%)]">+</div>
          <div className="w-40 h-40 rounded-full border-2 border-[hsl(145,15%,55%)]/50 flex items-center justify-center bg-[hsl(145,15%,55%)]/10">
            <div className="text-center"><div className="text-lg font-semibold text-white">Tecnologia</div><div className="text-xs text-white/40 mt-1">AI, coding, data</div></div>
          </div>
          <div className="text-3xl font-bold text-[hsl(37,88%,55%)]">=</div>
          <div className="w-40 h-40 rounded-full border-2 border-[hsl(37,88%,55%)]/50 flex items-center justify-center bg-[hsl(37,88%,55%)]/10">
            <div className="text-center"><div className="text-sm font-semibold text-[hsl(37,88%,55%)]">Il profilo che</div><div className="text-sm font-bold text-white">nessuno forma</div></div>
          </div>
        </motion.div>
        <motion.p variants={reveal} className="text-sm text-white/60 max-w-2xl mx-auto text-center leading-relaxed">
          WEF: il 39% delle competenze attuali sara obsoleto entro il 2030. Il profilo ibrido umanistica+tech e il piu scarso e il meglio pagato.
        </motion.p>
      </motion.div>
    </div>
  )
}
