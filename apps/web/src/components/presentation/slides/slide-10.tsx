"use client"
import { motion } from "framer-motion"

const reveal = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.7 } } }
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.15 } } }

export function Slide10({ skipReveal }: { skipReveal?: boolean }) {
  return (
    <div className="h-full flex flex-col justify-center px-8 md:px-16 lg:px-24 overflow-y-auto">
      <motion.div variants={stagger} initial={skipReveal ? "show" : "hidden"} animate="show" className="max-w-5xl mx-auto w-full">
        <motion.div variants={reveal} className="text-xs uppercase tracking-[0.3em] text-[hsl(37,88%,55%)] mb-6 flex items-center gap-3">
          <span className="w-8 h-px bg-[hsl(37,88%,55%)]" />La Proposta
        </motion.div>
        <motion.h1 variants={reveal} className="font-display text-3xl md:text-5xl font-light mb-10 leading-[1.1]">
          Non una scuola in piu. <em className="text-[hsl(37,88%,55%)]">Un motore di crescita.</em>
        </motion.h1>

        <motion.div variants={reveal} className="mb-8">
          <h2 className="text-lg font-semibold text-white mb-4">Perche la casa editrice e il luogo giusto</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                num: "01",
                title: "Contenuti gia pronti",
                desc: "3.500+ titoli come base formativa: nessun altro player parte con un catalogo cosi profondo e autorevole.",
              },
              {
                num: "02",
                title: "Rete di autori unica",
                desc: "500+ autori diventano docenti e mentor. Un asset inestimabile che nessun competitor puo replicare.",
              },
              {
                num: "03",
                title: "Distribuzione capillare",
                desc: "120+ librerie in 58 citta e 4,5M di carte fedelta: lead generation a costo quasi zero.",
              },
              {
                num: "04",
                title: "Credibilita e brand",
                desc: "Decenni di autorevolezza editoriale trasferiti alla formazione. Non un brand da costruire, ma da estendere.",
              },
              {
                num: "05",
                title: "Circolarita dei contenuti",
                desc: "La formazione genera nuovi contenuti, ricerche e pubblicazioni che alimentano il catalogo. Un ciclo virtuoso.",
              },
              {
                num: "06",
                title: "Nuovo polo di ricavi",
                desc: "Education come vertical ad alta marginalita che diversifica il business editoriale tradizionale.",
              },
            ].map((p, i) => (
              <div key={i} className="p-4 rounded-xl border border-white/10 bg-white/5 flex items-start gap-3">
                <div className="text-[hsl(37,88%,55%)] font-mono text-sm mt-0.5">{p.num}</div>
                <div>
                  <h3 className="text-sm font-semibold text-white mb-1">{p.title}</h3>
                  <p className="text-xs text-white/50">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={reveal} className="p-6 rounded-xl border border-[hsl(37,88%,55%)]/30 bg-gradient-to-r from-[hsl(37,88%,55%)]/10 to-transparent text-center">
          <p className="text-lg text-white/80 mb-2">Non un costo. Un <strong className="text-[hsl(37,88%,55%)]">investimento che si ripaga</strong>.</p>
          <p className="text-sm text-white/40 italic mt-4">&ldquo;La casa editrice ha gia tutto: contenuti, autori, distribuzione, community. Manca solo il sistema che mette tutto a valore.&rdquo;</p>
        </motion.div>
      </motion.div>
    </div>
  )
}
