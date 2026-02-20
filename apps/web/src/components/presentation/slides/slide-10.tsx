"use client"
import { motion } from "framer-motion"

const reveal = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.7 } } }
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.15 } } }

export function Slide10({ skipReveal }: { skipReveal?: boolean }) {
  return (
    <div className="h-screen flex flex-col justify-center px-8 md:px-16 lg:px-24 overflow-y-auto">
      <motion.div variants={stagger} initial={skipReveal ? "show" : "hidden"} animate="show" className="max-w-5xl mx-auto w-full">
        <motion.div variants={reveal} className="text-xs uppercase tracking-[0.3em] text-[hsl(37,88%,55%)] mb-6 flex items-center gap-3">
          <span className="w-8 h-px bg-[hsl(37,88%,55%)]" />La Proposta
        </motion.div>
        <motion.h1 variants={reveal} className="font-display text-3xl md:text-5xl font-light mb-10 leading-[1.1]">
          Non una scuola in piu. <em className="text-[hsl(37,88%,55%)]">Un motore di crescita.</em>
        </motion.h1>
        <motion.div variants={reveal} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            { num: "01", title: "Il Contenuto", desc: "Accademia job-ready che genera idee tech e innovazione" },
            { num: "02", title: "La Piattaforma AI", desc: "White-label, personalizza, certifica — scalabile globalmente" },
            { num: "03", title: "La Relazione", desc: "Flywheel che connette ecosistema studenti-aziende-editore" },
          ].map((p, i) => (
            <div key={i} className="p-6 rounded-xl border border-white/10 bg-white/5">
              <div className="text-[hsl(37,88%,55%)] font-mono text-sm mb-2">{p.num}</div>
              <h3 className="text-lg font-semibold text-white mb-2">{p.title}</h3>
              <p className="text-sm text-white/60">{p.desc}</p>
            </div>
          ))}
        </motion.div>
        <motion.div variants={reveal} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { value: "€86M", label: "Revenue Anno 5 (JV)" },
            { value: "36%", label: "EBITDA Margin" },
            { value: "€187M", label: "Enterprise Value A5" },
            { value: "15%", label: "Peso Polo Education" },
          ].map((s, i) => (
            <div key={i} className="p-4 rounded-xl border border-[hsl(37,88%,55%)]/20 bg-[hsl(37,88%,55%)]/5 text-center">
              <div className="text-2xl font-bold text-[hsl(37,88%,55%)]">{s.value}</div>
              <div className="text-[10px] text-white/50 mt-1">{s.label}</div>
            </div>
          ))}
        </motion.div>
        <motion.div variants={reveal} className="p-6 rounded-xl border border-[hsl(37,88%,55%)]/30 bg-gradient-to-r from-[hsl(37,88%,55%)]/10 to-transparent text-center">
          <p className="text-lg text-white/80 mb-2">Not a school. A <strong className="text-[hsl(37,88%,55%)]">transformation engine</strong>.</p>
          <p className="text-lg text-white/80 mb-4">Not a cost center. A <strong className="text-[hsl(37,88%,55%)]">value creator</strong>.</p>
          <p className="text-sm text-white/40 italic mt-6">&ldquo;In un mondo dove l&apos;AI puo fare quasi tutto, noi creiamo gli umani che fanno la differenza.&rdquo;</p>
        </motion.div>
      </motion.div>
    </div>
  )
}
