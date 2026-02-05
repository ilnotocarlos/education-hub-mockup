"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  MessageSquare,
  Brain,
  Briefcase,
  Award,
  Download,
  ChevronRight,
  CheckCircle2,
  ExternalLink
} from "lucide-react"

interface CommunityActivity {
  id: number
  user: string
  avatar: string
  action: string
  target: string
  time: string
  reactions: number
}

interface QuickAction {
  id: string
  icon: typeof Brain
  title: string
  description: string
  color: string
}

interface CommunitySidebarProps {
  activities: CommunityActivity[]
  quickActions: QuickAction[]
  jobReadinessProgress: number
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const }
  }
}

export function CommunitySidebar({
  activities,
  quickActions,
  jobReadinessProgress
}: CommunitySidebarProps) {
  return (
    <div className="space-y-8">
      {/* Community Feed */}
      <motion.div variants={fadeInUp}>
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="text-xl font-display flex items-center gap-2">
              <Users className="w-5 h-5 text-[hsl(var(--indigo))]" />
              Community
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 pb-4 border-b last:border-0 last:pb-0">
                <Avatar className="h-10 w-10 border-2 border-[hsl(var(--indigo)_/_0.1)]">
                  <AvatarFallback className="bg-gradient-to-br from-[hsl(var(--indigo)_/_0.1)] to-[hsl(var(--amber)_/_0.1)] text-sm font-semibold">
                    {activity.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm leading-relaxed">
                    <span className="font-semibold">{activity.user}</span>{" "}
                    <span className="text-muted-foreground">{activity.action}</span>{" "}
                    <span className="font-medium text-[hsl(var(--indigo))]">{activity.target}</span>
                  </p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                    <span className="text-xs text-muted-foreground">❤️ {activity.reactions}</span>
                  </div>
                </div>
              </div>
            ))}

            <Button variant="outline" className="w-full mt-4">
              <MessageSquare className="w-4 h-4 mr-2" />
              Vai al Forum
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={fadeInUp}>
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="text-xl font-display">
              Azioni Rapide
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {quickActions.map((action) => {
              const Icon = action.icon
              return (
                <Button
                  key={action.id}
                  variant="outline"
                  className="w-full justify-start gap-3 h-auto py-4"
                >
                  <div className={`p-2 rounded-lg bg-[hsl(var(--${action.color})_/_0.1)]`}>
                    <Icon className={`w-5 h-5 text-[hsl(var(--${action.color}))]`} />
                  </div>
                  <div className="text-left flex-1">
                    <div className="font-semibold">{action.title}</div>
                    <div className="text-xs text-muted-foreground">{action.description}</div>
                  </div>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              )
            })}
          </CardContent>
        </Card>
      </motion.div>

      {/* Placement Progress */}
      <motion.div variants={fadeInUp}>
        <Card className="border-2 border-[hsl(var(--amber)_/_0.3)] bg-gradient-to-br from-[hsl(var(--amber)_/_0.05)] to-transparent">
          <CardHeader>
            <CardTitle className="text-xl font-display flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-[hsl(var(--amber))]" />
              Job Readiness
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Progresso placement</span>
                <span className="text-sm font-semibold text-[hsl(var(--amber))]">{jobReadinessProgress}%</span>
              </div>
              <Progress value={jobReadinessProgress} className="h-2" />
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[hsl(var(--sage))]" />
                <span>Portfolio setup completato</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[hsl(var(--sage))]" />
                <span>CV ottimizzato</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="w-4 h-4 rounded-full border-2 border-muted-foreground" />
                <span>3 progetti portfolio</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="w-4 h-4 rounded-full border-2 border-muted-foreground" />
                <span>Mock interview</span>
              </div>
            </div>

            <Button className="w-full bg-gradient-to-r from-[hsl(var(--amber))] to-[hsl(var(--amber)_/_0.8)] text-white">
              Continua Placement
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
