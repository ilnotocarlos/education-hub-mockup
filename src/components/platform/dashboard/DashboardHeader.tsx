"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Brain } from "lucide-react"

interface DashboardHeaderProps {
  userName: string
  userInitials: string
  currentWeek: number
  modulesCompleted: number
  totalModules: number
  onAITutorClick?: () => void
}

export function DashboardHeader({
  userName,
  userInitials,
  currentWeek,
  modulesCompleted,
  totalModules,
  onAITutorClick
}: DashboardHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col md:flex-row md:items-center md:justify-between gap-6"
    >
      <div>
        <h1 className="mb-2">
          Ciao, {userName}! 👋
        </h1>
        <p className="text-xl text-muted-foreground">
          Settimana {currentWeek} · {modulesCompleted}/{totalModules} moduli completati
        </p>
      </div>

      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          className="gap-2"
          onClick={onAITutorClick}
        >
          <Brain className="w-4 h-4" />
          AI Tutor
        </Button>
        <Avatar className="h-14 w-14 border-2 border-[hsl(var(--indigo)_/_0.3)]">
          <AvatarImage src="/avatars/filippo.jpg" alt={userName} />
          <AvatarFallback className="bg-gradient-to-br from-[hsl(var(--indigo))] to-[hsl(var(--amber))] text-white font-semibold text-lg">
            {userInitials}
          </AvatarFallback>
        </Avatar>
      </div>
    </motion.div>
  )
}
