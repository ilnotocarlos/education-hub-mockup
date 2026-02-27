"use client"
import { motion } from "framer-motion"

const reveal = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.7 } } }
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }

const sources = [
  { dato: "€44 mld costo mismatch competenze", fonte: "Rapporto Formazione e Lavoro 2025, Unioncamere-Excelsior" },
  { dato: "39% competenze obsolete entro 2030", fonte: "World Economic Forum, Future of Jobs Report 2025, Cap. 3" },
  { dato: "3,5M fabbisogno lavoratori 2025-2029", fonte: "Unioncamere-Excelsior, Report Previsivo 2025-2029" },
  { dato: "€730M Fondo Nuove Competenze", fonte: "Ministero del Lavoro, FNC3 (2025)" },
  { dato: "64% aziende IT +budget formazione", fonte: "LinkedIn, The Future of Recruiting 2025 — Italia" },
  { dato: "Italia 3,9% PIL in istruzione vs 4,7% UE", fonte: "Eurostat (dati 2023)" },
  { dato: "3,3M green jobs Italia (13,8%)", fonte: "Fondazione Symbola / Unioncamere, GreenItaly 2025" },
  { dato: "+517% crescita ruolo AI Manager", fonte: "LinkedIn Green Skills Report 2025" },
  { dato: "+33,6% stipendio post-master", fonte: "AlmaLaurea, Report Occupazione Diplomati Master 2024" },
  { dato: "89,2% occupazione post-master II livello", fonte: "AlmaLaurea, Report 2024" },
  { dato: "2% retention a 30gg (EdTech)", fonte: "Business of Apps, Education App Benchmarks" },
  { dato: "Dati finanziari Gruppo Feltrinelli", fonte: "Bilancio consolidato 2024, CCIAA Milano" },
]

export function SlideSources({ skipReveal }: { skipReveal?: boolean }) {
  return (
    <div className="h-full flex flex-col justify-center px-8 md:px-16 lg:px-24 overflow-y-auto">
      <motion.div variants={stagger} initial={skipReveal ? "show" : "hidden"} animate="show" className="max-w-5xl mx-auto w-full">
        <motion.div variants={reveal} className="text-xs uppercase tracking-[0.3em] text-[hsl(37,88%,55%)] mb-6 flex items-center gap-3">
          <span className="w-8 h-px bg-[hsl(37,88%,55%)]" />Appendice
        </motion.div>
        <motion.h1 variants={reveal} className="font-display text-3xl md:text-5xl font-light mb-8 leading-[1.1]">
          Fonti e <em className="text-[hsl(37,88%,55%)]">Riferimenti</em>
        </motion.h1>
        <motion.div variants={reveal} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
          {sources.map((s, i) => (
            <motion.div key={i} variants={reveal} className="flex gap-3 py-2 border-b border-white/5">
              <span className="text-[hsl(37,88%,55%)] font-mono text-[10px] font-bold shrink-0 mt-0.5">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <div className="text-xs text-white/80 font-medium leading-relaxed">{s.dato}</div>
                <div className="text-[10px] text-white/40 leading-relaxed">{s.fonte}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        <motion.p variants={reveal} className="mt-6 text-[10px] text-white/30 italic">
          Tutti i dati di mercato sono verificati e aggiornati a febbraio 2026. Le proiezioni finanziarie sono stime interne basate su assunzioni documentate nel business plan.
        </motion.p>
      </motion.div>
    </div>
  )
}
