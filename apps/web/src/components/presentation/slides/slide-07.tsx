"use client"
import { motion } from "framer-motion"

const reveal = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.7 } } }
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.15 } } }

export function Slide07({ skipReveal }: { skipReveal?: boolean }) {
  return (
    <div className="h-screen flex flex-col justify-center px-8 md:px-16 lg:px-24 overflow-y-auto">
      <motion.div variants={stagger} initial={skipReveal ? "show" : "hidden"} animate="show" className="max-w-5xl mx-auto w-full">
        <motion.div variants={reveal} className="text-xs uppercase tracking-[0.3em] text-[hsl(37,88%,55%)] mb-6 flex items-center gap-3">
          <span className="w-8 h-px bg-[hsl(37,88%,55%)]" />La Casa Editrice
        </motion.div>
        <motion.h1 variants={reveal} className="font-display text-3xl md:text-5xl font-light mb-4 leading-[1.1]">
          I contenuti <em className="text-[hsl(37,88%,55%)]">nascono qui</em>.<br />E qui <em className="text-[hsl(37,88%,55%)]">ritornano</em>.
        </motion.h1>
        <motion.p variants={reveal} className="text-white/60 text-sm md:text-base mb-10 max-w-3xl">
          La casa editrice non e solo un partner: e l&apos;origine e la destinazione dei contenuti. Un ecosistema circolare dove il sapere editoriale alimenta la formazione, e la formazione genera nuovo sapere editoriale.
        </motion.p>

        {/* Circularity diagram */}
        <motion.div variants={reveal} className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-xl border border-[hsl(37,88%,55%)]/20 bg-[hsl(37,88%,55%)]/5 relative">
              <div className="text-[hsl(37,88%,55%)] font-mono text-xs mb-2">01 — Origine</div>
              <h3 className="text-sm font-semibold text-white mb-2">Il Catalogo come Knowledge Base</h3>
              <p className="text-xs text-white/50">3.500+ titoli diventano il cuore della formazione: contenuti curati, validati, autorevoli. La base di conoscenza per l&apos;AI e i percorsi didattici.</p>
            </div>
            <div className="p-5 rounded-xl border border-white/10 bg-white/5 relative">
              <div className="text-white/40 font-mono text-xs mb-2">02 — Trasformazione</div>
              <h3 className="text-sm font-semibold text-white mb-2">Gli Autori come Faculty</h3>
              <p className="text-xs text-white/50">500+ autori diventano docenti, mentor, ispiratori. Il loro sapere passa dalla pagina all&apos;aula, dal libro al laboratorio.</p>
            </div>
            <div className="p-5 rounded-xl border border-[hsl(37,88%,55%)]/20 bg-[hsl(37,88%,55%)]/5 relative">
              <div className="text-[hsl(37,88%,55%)] font-mono text-xs mb-2">03 — Ritorno</div>
              <h3 className="text-sm font-semibold text-white mb-2">Gli Studenti come Creatori</h3>
              <p className="text-xs text-white/50">I progetti degli studenti generano nuovi contenuti, ricerche, pubblicazioni. Il sapere torna alla casa editrice arricchito.</p>
            </div>
          </div>
        </motion.div>

        {/* Key numbers */}
        <motion.div variants={reveal} className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: "3.500+", label: "titoli catalogo" },
            { value: "500+", label: "autori-docenti" },
            { value: "120+", label: "librerie in 58 citta" },
            { value: "4,5M", label: "titolari carte fedelta" },
          ].map((s, i) => (
            <div key={i} className="p-4 rounded-xl border border-white/10 bg-white/5 text-center">
              <div className="text-2xl font-bold text-[hsl(37,88%,55%)]">{s.value}</div>
              <div className="text-[10px] text-white/50 mt-1">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}
