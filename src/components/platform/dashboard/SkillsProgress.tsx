"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Target } from "lucide-react"

interface Skill {
  name: string
  level: number
  color: string
}

interface SkillsProgressProps {
  skills: Skill[]
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const }
  }
}

export function SkillsProgress({ skills }: SkillsProgressProps) {
  return (
    <motion.div variants={fadeInUp}>
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="text-2xl font-display flex items-center gap-2">
            <Target className="w-6 h-6 text-[hsl(var(--indigo))]" />
            Competenze in Sviluppo
          </CardTitle>
          <CardDescription className="text-base mt-2">
            Il tuo progress verso il job-readiness
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {skills.map((skill) => (
            <div key={skill.name}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold">{skill.name}</span>
                <span className="text-sm text-muted-foreground">{skill.level}%</span>
              </div>
              <div className="relative h-3 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, delay: 0.2, ease: "easeOut" as const }}
                  className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  )
}
