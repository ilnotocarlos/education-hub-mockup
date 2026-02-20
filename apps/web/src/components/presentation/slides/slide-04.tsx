"use client"
import { motion } from "framer-motion"

const reveal = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.7 } } }
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.15 } } }

export function Slide04() {
  return (
    <div className="h-screen flex flex-col justify-center px-8 md:px-16 lg:px-24 overflow-y-auto">
      <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-5xl mx-auto w-full">
        <motion.div variants={reveal} className="text-xs uppercase tracking-[0.3em] text-[hsl(37,88%,55%)] mb-6 flex items-center gap-3">
          <span className="w-8 h-px bg-[hsl(37,88%,55%)]" />Il Paradigma
        </motion.div>
        <motion.h1 variants={reveal} className="font-display text-3xl md:text-5xl font-light mb-10 leading-[1.1]">
          Formazione <em className="text-[hsl(37,88%,55%)]">continua</em>, senza vincoli di eta, senza esclusioni
        </motion.h1>
        <motion.div variants={reveal} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { myth: "Mito #1", title: "Formazione e una fase della vita", answer: "NO — e la vita. Education Insurance: accesso a vita." },
            { myth: "Mito #2", title: "Nessuno fa formazione continua", answer: "NO — il modello sbagliato scoraggia. Noi cambiamo il modello." },
            { myth: "Mito #3", title: "Soft skills si insegnano", answer: "NO — si creano ambienti dove emergono naturalmente." },
          ].map((m, i) => (
            <div key={i} className="p-6 rounded-xl border border-white/10 bg-white/5">
              <div className="text-xs text-[hsl(37,88%,55%)] uppercase tracking-wide mb-2">{m.myth}</div>
              <h3 className="text-base font-semibold text-white/40 line-through mb-3">{m.title}</h3>
              <p className="text-sm text-white/80 leading-relaxed">{m.answer}</p>
            </div>
          ))}
        </motion.div>
        <motion.blockquote variants={reveal} className="mt-10 pl-4 border-l-2 border-[hsl(37,88%,55%)]/40 text-white/50 italic">
          &ldquo;We don&apos;t teach soft skills, we create environments where they emerge naturally.&rdquo;
        </motion.blockquote>
      </motion.div>
    </div>
  )
}
