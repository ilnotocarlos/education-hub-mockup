"use client"
import { motion } from "framer-motion"

const reveal = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.7 } } }
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.15 } } }

export function Slide06() {
  const features = [
    { num: "01", text: "Tiene agganciato lo studente — 75% retention vs 30% industry" },
    { num: "02", text: "Si adatta alle esigenze — personalizzazione real-time del percorso" },
    { num: "03", text: "Monitora le competenze — skill dashboard + certificazioni NFT blockchain" },
    { num: "04", text: "Coach 24/7 — Claude AI + RAG + Pinecone per risposte contestuali" },
    { num: "05", text: "Community integrata — forum, peer mentorship, alumni network" },
  ]
  return (
    <div className="h-screen flex flex-col justify-center px-8 md:px-16 lg:px-24 overflow-y-auto">
      <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-5xl mx-auto w-full">
        <motion.div variants={reveal} className="text-xs uppercase tracking-[0.3em] text-[hsl(37,88%,55%)] mb-6 flex items-center gap-3">
          <span className="w-8 h-px bg-[hsl(37,88%,55%)]" />La Piattaforma
        </motion.div>
        <motion.h1 variants={reveal} className="font-display text-4xl md:text-5xl font-light mb-10 leading-[1.1]">
          Un coach <em className="text-[hsl(37,88%,55%)]">personale</em>, 24 ore su 24
        </motion.h1>
        <motion.div variants={reveal} className="space-y-4">
          {features.map((f) => (
            <div key={f.num} className="flex items-start gap-4 p-4 rounded-xl border border-white/10 bg-white/5">
              <span className="text-[hsl(37,88%,55%)] font-mono text-sm font-bold shrink-0">{f.num}</span>
              <p className="text-sm text-white/80 leading-relaxed">{f.text}</p>
            </div>
          ))}
        </motion.div>
        <motion.p variants={reveal} className="mt-8 text-xs text-white/40 italic">Piattaforma white-label — licenziabile a scuole e corporate</motion.p>
      </motion.div>
    </div>
  )
}
