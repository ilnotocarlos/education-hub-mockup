"use client"
import { motion } from "framer-motion"

const reveal = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.7 } } }
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } }

const temi = [
  { area: "Digital & AI", percorsi: ["AI & Machine Learning", "Data Science & Analytics", "Web Development Full-Stack", "Cybersecurity"] },
  { area: "Creative & Design", percorsi: ["UX/UI Design", "Digital Content Creation", "Brand & Visual Identity", "Motion Design"] },
  { area: "Business & Innovation", percorsi: ["Digital Marketing & Growth", "Product Management", "Startup & Imprenditorialita", "E-commerce Strategy"] },
  { area: "Editoriale & Comunicazione", percorsi: ["Storytelling Digitale", "Content Strategy & SEO", "Publishing Technologies", "Podcasting & Audio"] },
]

const modelli = [
  { nome: "Masterclass", durata: "1-2 giorni", desc: "Immersione verticale su un singolo tema" },
  { nome: "Bootcamp", durata: "2-4 settimane", desc: "Sprint intensivo con progetto finale" },
  { nome: "Master", durata: "12 settimane", desc: "Percorso strutturato con specializzazione" },
  { nome: "Full-time", durata: "12-18 mesi", desc: "Trasformazione completa con placement" },
]

export function Slide05({ skipReveal }: { skipReveal?: boolean }) {
  return (
    <div className="h-full flex flex-col justify-center px-8 md:px-16 lg:px-24 overflow-y-auto">
      <motion.div variants={stagger} initial={skipReveal ? "show" : "hidden"} animate="show" className="max-w-5xl mx-auto w-full">
        <motion.div variants={reveal} className="text-xs uppercase tracking-[0.3em] text-[hsl(37,88%,55%)] mb-6 flex items-center gap-3">
          <span className="w-8 h-px bg-[hsl(37,88%,55%)]" />L&apos;Accademia
        </motion.div>
        <motion.h1 variants={reveal} className="font-display text-3xl md:text-5xl font-light mb-4 leading-[1.1]">
          Temi, modelli e <em className="text-[hsl(37,88%,55%)]">meccanica</em>
        </motion.h1>
        <motion.p variants={reveal} className="text-white/60 text-sm md:text-base mb-8 max-w-3xl">
          La formazione e modulare: ogni studente compone il proprio percorso scegliendo un tema e un modello. Come mattoncini che si combinano, ogni configurazione e unica.
        </motion.p>

        {/* Temi */}
        <motion.div variants={reveal} className="mb-6">
          <div className="text-xs uppercase tracking-wide text-white/40 mb-3">Temi</div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {temi.map((t, i) => (
              <div key={i} className="p-4 rounded-xl border border-white/10 bg-white/5">
                <div className="text-xs text-[hsl(37,88%,55%)] font-semibold mb-2">{t.area}</div>
                <ul className="space-y-1">
                  {t.percorsi.map((p, j) => (
                    <li key={j} className="text-[11px] text-white/50 flex items-start gap-1.5">
                      <span className="text-[hsl(37,88%,55%)] mt-0.5 text-[7px]">&#9670;</span>{p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Modelli */}
        <motion.div variants={reveal} className="mb-6">
          <div className="text-xs uppercase tracking-wide text-white/40 mb-3">Modelli</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {modelli.map((m, i) => (
              <div key={i} className="p-3 rounded-xl border border-[hsl(37,88%,55%)]/15 bg-[hsl(37,88%,55%)]/5 text-center">
                <div className="text-sm font-semibold text-white">{m.nome}</div>
                <div className="text-[10px] text-[hsl(37,88%,55%)] mt-1">{m.durata}</div>
                <div className="text-[10px] text-white/40 mt-1">{m.desc}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Meccanica */}
        <motion.div variants={reveal} className="p-4 rounded-xl border border-[hsl(37,88%,55%)]/20 bg-gradient-to-r from-[hsl(37,88%,55%)]/5 to-transparent">
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <span className="px-3 py-1 rounded-full text-xs border border-white/20 bg-white/5 text-white/70">Tema a scelta</span>
            <span className="text-[hsl(37,88%,55%)] text-lg">+</span>
            <span className="px-3 py-1 rounded-full text-xs border border-[hsl(37,88%,55%)]/30 bg-[hsl(37,88%,55%)]/10 text-[hsl(37,88%,55%)]">Modello a scelta</span>
            <span className="text-[hsl(37,88%,55%)] text-lg">=</span>
            <span className="px-3 py-1.5 rounded-full text-xs border border-[hsl(37,88%,55%)]/50 bg-[hsl(37,88%,55%)]/20 text-white font-semibold">Il tuo percorso unico</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
