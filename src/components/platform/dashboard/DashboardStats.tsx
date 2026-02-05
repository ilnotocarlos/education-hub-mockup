"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { LucideIcon } from "lucide-react"

interface StatCard {
  label: string
  value: string | number
  subtitle: string
  icon: LucideIcon
  color: string
  progress: number
}

interface DashboardStatsProps {
  stats: StatCard[]
}

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const }
  }
}

export function DashboardStats({ stats }: DashboardStatsProps) {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={staggerContainer}
      className="grid grid-cols-2 md:grid-cols-4 gap-4"
    >
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <motion.div key={stat.label} variants={fadeInUp}>
            <Card className="relative overflow-hidden border-2 hover:border-[hsl(var(--indigo)_/_0.3)] transition-all duration-300 hover:shadow-xl group">
              <div className={`absolute inset-0 bg-gradient-to-br from-[hsl(var(--${stat.color}))] to-transparent opacity-0 group-hover:opacity-5 transition-opacity`} />

              <CardContent className="p-6 relative">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-2 rounded-lg bg-gradient-to-br from-[hsl(var(--${stat.color})_/_0.1)] to-transparent`}>
                    <Icon className={`w-5 h-5 text-[hsl(var(--${stat.color}))]`} />
                  </div>
                </div>

                <div className="font-display text-4xl font-bold mb-1">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-muted-foreground mb-3">
                  {stat.label}
                </div>

                <div className="space-y-2">
                  <Progress value={stat.progress} className="h-1.5" />
                  <p className="text-xs text-muted-foreground">
                    {stat.subtitle}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )
      })}
    </motion.div>
  )
}
