"use client"
import { motion } from "framer-motion"

const reveal = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.7 } } }
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } }

export function Slide04({ skipReveal }: { skipReveal?: boolean }) {
  return (
    <div className="h-screen flex flex-col justify-center px-8 md:px-16 lg:px-24 overflow-y-auto">
      <motion.div variants={stagger} initial={skipReveal ? "show" : "hidden"} animate="show" className="max-w-5xl mx-auto w-full">
        <motion.div variants={reveal} className="text-xs uppercase tracking-[0.3em] text-[hsl(37,88%,55%)] mb-6 flex items-center gap-3">
          <span className="w-8 h-px bg-[hsl(37,88%,55%)]" />Il Paradigma
        </motion.div>
        <motion.h1 variants={reveal} className="font-display text-3xl md:text-5xl font-light mb-10 leading-[1.1]">
          Formazione <em className="text-[hsl(37,88%,55%)]">continua</em>, senza vincoli di eta, senza esclusioni
        </motion.h1>
        <motion.div variants={reveal} className="space-y-4 mb-10">
          <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-3xl">
            Un modello educativo che rompe i paradigmi tradizionali: non una fase della vita, ma un percorso permanente.
          </p>
        </motion.div>
        <motion.div variants={reveal} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-start gap-3">
            <span className="text-[hsl(37,88%,55%)] font-mono text-sm mt-0.5">01</span>
            <div>
              <h3 className="text-sm font-semibold text-white mb-1">Education Insurance</h3>
              <p className="text-xs text-white/50">Accesso a vita ai contenuti e alla community. La formazione non scade mai.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-[hsl(37,88%,55%)] font-mono text-sm mt-0.5">02</span>
            <div>
              <h3 className="text-sm font-semibold text-white mb-1">Un nuovo modello</h3>
              <p className="text-xs text-white/50">Il problema non e la volonta di imparare, ma modelli che scoraggiano. Noi cambiamo il modello.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-[hsl(37,88%,55%)] font-mono text-sm mt-0.5">03</span>
            <div>
              <h3 className="text-sm font-semibold text-white mb-1">Ambienti, non lezioni</h3>
              <p className="text-xs text-white/50">Le soft skills non si insegnano: si creano ambienti dove emergono naturalmente.</p>
            </div>
          </div>
        </motion.div>
        <motion.blockquote variants={reveal} className="mt-10 pl-4 border-l-2 border-[hsl(37,88%,55%)]/40 text-white/50 italic">
          &ldquo;Non insegniamo soft skills: creiamo ambienti dove emergono naturalmente.&rdquo;
        </motion.blockquote>
      </motion.div>
    </div>
  )
}
