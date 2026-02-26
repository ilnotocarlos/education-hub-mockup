"use client"
import { motion } from "framer-motion"

const reveal = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.7 } } }
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } }

const aree = [
  {
    area: "Digital & AI",
    percorsi: ["AI & Machine Learning", "Data Science & Analytics", "Web Development Full-Stack", "Cybersecurity"],
  },
  {
    area: "Creative & Design",
    percorsi: ["UX/UI Design", "Digital Content Creation", "Brand & Visual Identity", "Motion Design"],
  },
  {
    area: "Business & Innovation",
    percorsi: ["Digital Marketing & Growth", "Product Management", "Startup & Imprenditorialita", "E-commerce Strategy"],
  },
  {
    area: "Editoriale & Comunicazione",
    percorsi: ["Storytelling Digitale", "Content Strategy & SEO", "Publishing Technologies", "Podcasting & Audio"],
  },
]

export function Slide05({ skipReveal }: { skipReveal?: boolean }) {
  return (
    <div className="h-screen flex flex-col justify-center px-8 md:px-16 lg:px-24 overflow-y-auto">
      <motion.div variants={stagger} initial={skipReveal ? "show" : "hidden"} animate="show" className="max-w-5xl mx-auto w-full">
        <motion.div variants={reveal} className="text-xs uppercase tracking-[0.3em] text-[hsl(37,88%,55%)] mb-6 flex items-center gap-3">
          <span className="w-8 h-px bg-[hsl(37,88%,55%)]" />L&apos;Accademia
        </motion.div>
        <motion.h1 variants={reveal} className="font-display text-3xl md:text-5xl font-light mb-10 leading-[1.1]">
          Non corsi, ma <em className="text-[hsl(37,88%,55%)]">trasformazioni</em>.<br />Non diplomi, ma <em className="text-[hsl(37,88%,55%)]">carriere</em>.
        </motion.h1>
        <motion.div variants={reveal} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {aree.map((a, i) => (
            <div key={i} className="p-5 rounded-xl border border-white/10 bg-white/5">
              <div className="text-xs text-[hsl(37,88%,55%)] uppercase tracking-wide font-semibold mb-3">{a.area}</div>
              <ul className="space-y-2">
                {a.percorsi.map((p, j) => (
                  <li key={j} className="text-sm text-white/70 flex items-start gap-2">
                    <span className="text-[hsl(37,88%,55%)] mt-1 text-[8px]">&#9670;</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>
        <motion.div variants={reveal} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            {["4 formati: Masterclass, Bootcamp, Master, Full-time", "Dai 1-2 giorni ai 12-18 mesi", "Design transformations, not courses"].map((m, i) => (
              <p key={i} className="text-white/60 italic text-sm">{m}</p>
            ))}
          </div>
          <div className="space-y-3">
            {[
              { label: "Nostro completion", value: 89, color: "bg-[hsl(37,88%,55%)]" },
              { label: "Bootcamp media", value: 45, color: "bg-white/20" },
              { label: "MOOC media", value: 10, color: "bg-white/10" },
            ].map((b, i) => (
              <div key={i}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-white/60">{b.label}</span>
                  <span className="text-white font-semibold">{b.value}%</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div initial={skipReveal ? { width: `${b.value}%` } : { width: 0 }} animate={{ width: `${b.value}%` }} transition={skipReveal ? { duration: 0 } : { duration: 1.5, delay: 0.5 + i * 0.2 }} className={`h-full rounded-full ${b.color}`} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
