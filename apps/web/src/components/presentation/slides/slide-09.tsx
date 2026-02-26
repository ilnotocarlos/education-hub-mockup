"use client"
import { motion } from "framer-motion"

const reveal = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.7 } } }
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.15 } } }

export function Slide09({ skipReveal }: { skipReveal?: boolean }) {
  const flywheel = [
    "Studenti si iscrivono e trasformano",
    "Sviluppano idee tech e progetti reali",
    "Le idee creano valore per aziende",
    "Il valore attrae nuovi studenti e aziende",
    "Ogni ciclo accelera il successivo",
  ]
  const roles = [
    { title: "Studente", desc: "Studente → Alumni → Mentor → Docente. Accesso a vita alla formazione." },
    { title: "Azienda", desc: "Assume → Commissiona challenge → Usa piattaforma → Co-crea curriculum" },
    { title: "Gruppo Editoriale", desc: "Catalogo → Formazione → Dati → Scelte editoriali" },
  ]
  return (
    <div className="h-screen flex flex-col justify-center px-8 md:px-16 lg:px-24 overflow-y-auto">
      <motion.div variants={stagger} initial={skipReveal ? "show" : "hidden"} animate="show" className="max-w-5xl mx-auto w-full">
        <motion.div variants={reveal} className="text-xs uppercase tracking-[0.3em] text-[hsl(37,88%,55%)] mb-6 flex items-center gap-3">
          <span className="w-8 h-px bg-[hsl(37,88%,55%)]" />Ecosistema di Business
        </motion.div>
        <motion.h1 variants={reveal} className="font-display text-3xl md:text-5xl font-light mb-10 leading-[1.1]">
          Circolarita tra <em className="text-[hsl(37,88%,55%)]">relazioni</em> ed <em className="text-[hsl(37,88%,55%)]">economia</em>.
        </motion.h1>
        <motion.div variants={reveal} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-sm uppercase tracking-wide text-white/40 mb-4">Flywheel</h3>
            <div className="space-y-3">
              {flywheel.map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-[hsl(37,88%,55%)] font-mono text-sm font-bold shrink-0">{String(i + 1).padStart(2, "0")}</span>
                  <p className="text-sm text-white/70">{step}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            {roles.map((r, i) => (
              <div key={i} className="p-4 rounded-xl border border-white/10 bg-white/5">
                <div className="text-sm font-semibold text-[hsl(37,88%,55%)] mb-1">{r.title}</div>
                <p className="text-xs text-white/60 leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
