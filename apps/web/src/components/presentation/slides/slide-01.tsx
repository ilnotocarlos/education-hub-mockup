"use client"
import { motion } from "framer-motion"

const reveal = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.7 } } }
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.15 } } }

export function Slide01({ skipReveal }: { skipReveal?: boolean }) {
  return (
    <div className="h-screen flex flex-col justify-center px-8 md:px-16 lg:px-24 overflow-y-auto">
      <motion.div variants={stagger} initial={skipReveal ? "show" : "hidden"} animate="show" className="max-w-5xl mx-auto w-full">
        <motion.div variants={reveal} className="text-xs uppercase tracking-[0.3em] text-[hsl(37,88%,55%)] mb-6 flex items-center gap-3">
          <span className="w-8 h-px bg-[hsl(37,88%,55%)]" />Scenario
        </motion.div>
        <motion.h1 variants={reveal} className="font-display text-4xl md:text-6xl font-light mb-12 leading-[1.1]">
          La sfida delle <em className="text-[hsl(37,88%,55%)]">competenze</em>
        </motion.h1>
        <motion.div variants={reveal} className="mb-12 text-center">
          <div className="text-7xl md:text-9xl font-display font-bold bg-gradient-to-r from-[hsl(37,88%,55%)] to-[hsl(37,88%,75%)] bg-clip-text text-transparent">€44</div>
          <div className="text-2xl text-white/60 mt-2">miliardi/anno — il costo del mismatch</div>
        </motion.div>
        <motion.div variants={reveal} className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: "39%", label: "competenze obsolete entro 2030" },
            { value: "3M", label: "assunzioni previste 2024-2028" },
            { value: "€730M", label: "fondi pubblici (Fondo Nuove Competenze)" },
            { value: "+35%", label: "crescita domanda formazione tech" },
          ].map((s, i) => (
            <div key={i} className="p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm text-center">
              <div className="text-2xl md:text-3xl font-bold text-white">{s.value}</div>
              <div className="text-xs text-white/50 mt-2 leading-relaxed">{s.label}</div>
            </div>
          ))}
        </motion.div>
        <motion.p variants={reveal} className="mt-10 text-lg text-white/60 max-w-2xl leading-relaxed">
          La domanda c&apos;e... Quello che manca e qualcuno che <strong className="text-white">metta a sistema</strong> tutto questo.
        </motion.p>
      </motion.div>
    </div>
  )
}
