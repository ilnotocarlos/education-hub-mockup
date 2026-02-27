"use client"
import { motion } from "framer-motion"
import { Building2, TrendingUp, Users, GraduationCap } from "lucide-react"

const reveal = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.7 } } }
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } }

export function SlideB2B({ skipReveal }: { skipReveal?: boolean }) {
  return (
    <div className="h-full flex flex-col justify-center px-8 md:px-16 lg:px-24 overflow-y-auto">
      <motion.div variants={stagger} initial={skipReveal ? "show" : "hidden"} animate="show" className="max-w-5xl mx-auto w-full">
        <motion.div variants={reveal} className="text-xs uppercase tracking-[0.3em] text-[hsl(37,88%,55%)] mb-6 flex items-center gap-3">
          <span className="w-8 h-px bg-[hsl(37,88%,55%)]" />B2B & Corporate
        </motion.div>
        <motion.h1 variants={reveal} className="font-display text-3xl md:text-5xl font-light mb-4 leading-[1.1]">
          Formazione corporate.<br /><em className="text-[hsl(37,88%,55%)]">Su misura</em>, non a catalogo.
        </motion.h1>
        <motion.p variants={reveal} className="text-white/60 text-sm md:text-base mb-10 max-w-3xl">
          Le aziende hanno bisogno di upskilling reale, non di corsi generici. Offriamo percorsi personalizzati che combinano le competenze del catalogo editoriale con le esigenze specifiche di ogni organizzazione.
        </motion.p>

        <motion.div variants={reveal} className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          <div className="p-5 rounded-xl border border-[hsl(37,88%,55%)]/20 bg-[hsl(37,88%,55%)]/5">
            <div className="flex items-center gap-3 mb-3">
              <Building2 className="w-5 h-5 text-[hsl(37,88%,55%)]" />
              <h3 className="text-sm font-semibold text-white">Corporate Academy</h3>
            </div>
            <p className="text-xs text-white/60 mb-3">Percorsi di formazione personalizzati per team aziendali, con contenuti costruiti sulle reali esigenze operative.</p>
            <ul className="space-y-1">
              {["Upskilling AI & Digital", "Leadership & Management", "Comunicazione & Storytelling aziendale"].map((item, i) => (
                <li key={i} className="text-xs text-white/50 flex items-start gap-2">
                  <span className="text-[hsl(37,88%,55%)]">&#8250;</span>{item}
                </li>
              ))}
            </ul>
          </div>
          <div className="p-5 rounded-xl border border-white/10 bg-white/5">
            <div className="flex items-center gap-3 mb-3">
              <TrendingUp className="w-5 h-5 text-white/60" />
              <h3 className="text-sm font-semibold text-white">Piattaforma White-Label</h3>
            </div>
            <p className="text-xs text-white/60 mb-3">La nostra piattaforma AI licenziata alle aziende per la formazione interna, con branding personalizzato.</p>
            <ul className="space-y-1">
              {["AI Tutor configurabile", "Analytics e reportistica avanzata", "Integrazione con sistemi HR aziendali"].map((item, i) => (
                <li key={i} className="text-xs text-white/50 flex items-start gap-2">
                  <span className="text-white/40">&#8250;</span>{item}
                </li>
              ))}
            </ul>
          </div>
          <div className="p-5 rounded-xl border border-white/10 bg-white/5">
            <div className="flex items-center gap-3 mb-3">
              <Users className="w-5 h-5 text-white/60" />
              <h3 className="text-sm font-semibold text-white">Talent Pipeline</h3>
            </div>
            <p className="text-xs text-white/60 mb-3">Le aziende partner accedono direttamente ai talenti formati, riducendo tempi e costi di recruiting.</p>
            <ul className="space-y-1">
              {["Accesso prioritario ai diplomati", "Stage e project work sponsorizzati", "Co-design dei percorsi formativi"].map((item, i) => (
                <li key={i} className="text-xs text-white/50 flex items-start gap-2">
                  <span className="text-white/40">&#8250;</span>{item}
                </li>
              ))}
            </ul>
          </div>
          <div className="p-5 rounded-xl border border-[hsl(37,88%,55%)]/20 bg-[hsl(37,88%,55%)]/5">
            <div className="flex items-center gap-3 mb-3">
              <GraduationCap className="w-5 h-5 text-[hsl(37,88%,55%)]" />
              <h3 className="text-sm font-semibold text-white">Fondi & Incentivi</h3>
            </div>
            <p className="text-xs text-white/60 mb-3">Supportiamo le aziende nell&apos;accesso ai fondi interprofessionali e agli incentivi per la formazione.</p>
            <ul className="space-y-1">
              {["€730M di fondi pubblici disponibili", "Fondi interprofessionali (Fondimpresa, etc.)", "Credito d'imposta formazione 4.0"].map((item, i) => (
                <li key={i} className="text-xs text-white/50 flex items-start gap-2">
                  <span className="text-[hsl(37,88%,55%)]">&#8250;</span>{item}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

      </motion.div>
    </div>
  )
}
