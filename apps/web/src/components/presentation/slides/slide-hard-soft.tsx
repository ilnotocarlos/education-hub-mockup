"use client"
import { motion } from "framer-motion"
import { Monitor, Users } from "lucide-react"

const reveal = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.7 } } }
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.15 } } }

export function SlideHardSoft({ skipReveal }: { skipReveal?: boolean }) {
  return (
    <div className="h-full flex flex-col justify-center px-8 md:px-16 lg:px-24 overflow-y-auto">
      <motion.div variants={stagger} initial={skipReveal ? "show" : "hidden"} animate="show" className="max-w-5xl mx-auto w-full">
        <motion.div variants={reveal} className="text-xs uppercase tracking-[0.3em] text-[hsl(37,88%,55%)] mb-6 flex items-center gap-3">
          <span className="w-8 h-px bg-[hsl(37,88%,55%)]" />Il Metodo
        </motion.div>
        <motion.h1 variants={reveal} className="font-display text-3xl md:text-5xl font-light mb-4 leading-[1.1]">
          Hard skills <em className="text-[hsl(37,88%,55%)]">digitali</em>.<br />Soft skills <em className="text-[hsl(37,88%,55%)]">in presenza</em>.
        </motion.h1>
        <motion.p variants={reveal} className="text-white/60 text-sm md:text-base mb-10 max-w-2xl">
          Due modalita complementari per un apprendimento completo: la tecnologia per scalare le competenze tecniche, l&apos;esperienza in aula per far emergere quelle umane.
        </motion.p>
        <motion.div variants={reveal} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* Hard Skills */}
          <div className="p-6 rounded-xl border border-[hsl(37,88%,55%)]/20 bg-[hsl(37,88%,55%)]/5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-[hsl(37,88%,55%)]/10 flex items-center justify-center">
                <Monitor className="w-5 h-5 text-[hsl(37,88%,55%)]" />
              </div>
              <h3 className="text-lg font-semibold text-white">Hard Skills</h3>
            </div>
            <div className="text-xs text-[hsl(37,88%,55%)] uppercase tracking-wide mb-3">Piattaforma Digitale</div>
            <ul className="space-y-2 mb-4">
              {[
                "AI Tutor personale 24/7",
                "Percorsi adattivi in tempo reale",
                "Video lezioni, coding lab, esercitazioni",
                "Dashboard progressi e skill tracking",
                "Certificazioni verificabili blockchain",
              ].map((item, i) => (
                <li key={i} className="text-sm text-white/70 flex items-start gap-2">
                  <span className="text-[hsl(37,88%,55%)] mt-0.5">&#8250;</span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="text-xs text-white/40 italic">Scalabile, accessibile ovunque, personalizzata</div>
          </div>
          {/* Soft Skills */}
          <div className="p-6 rounded-xl border border-white/10 bg-white/5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-white/80" />
              </div>
              <h3 className="text-lg font-semibold text-white">Soft Skills</h3>
            </div>
            <div className="text-xs text-white/60 uppercase tracking-wide mb-3">Esperienza in Aula</div>
            <ul className="space-y-2 mb-4">
              {[
                "Workshop immersivi e laboratori",
                "Team project su brief reali",
                "Mentoring con professionisti del settore",
                "Public speaking e presentazioni",
                "Networking e community building",
              ].map((item, i) => (
                <li key={i} className="text-sm text-white/70 flex items-start gap-2">
                  <span className="text-white/40 mt-0.5">&#8250;</span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="text-xs text-white/40 italic">Le competenze umane si sviluppano tra umani</div>
          </div>
        </motion.div>
        <motion.div variants={reveal} className="p-4 rounded-xl border border-[hsl(37,88%,55%)]/20 bg-gradient-to-r from-[hsl(37,88%,55%)]/5 to-transparent">
          <p className="text-sm text-white/60 text-center">
            La <strong className="text-white">piattaforma digitale</strong> non sostituisce l&apos;aula: la potenzia. Ogni studente arriva preparato sulle hard skills, e in aula si concentra su cio che la tecnologia non puo insegnare.
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}
