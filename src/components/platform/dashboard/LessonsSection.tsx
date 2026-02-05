"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Users, Play, Lock, ChevronRight } from "lucide-react"

interface Lesson {
  id: number
  title: string
  module: string
  duration: string
  type: "live" | "async" | "project"
  status: "available" | "locked"
  dueDate: string
  instructor: string
  preworkCompleted: boolean
}

interface LessonsSectionProps {
  lessons: Lesson[]
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const }
  }
}

export function LessonsSection({ lessons }: LessonsSectionProps) {
  return (
    <motion.div variants={fadeInUp}>
      <Card className="border-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-display">
              Prossime Lezioni
            </CardTitle>
            <Button variant="outline" size="sm">
              Vedi Tutte
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {lessons.map((lesson) => (
            <div
              key={lesson.id}
              className={`p-6 rounded-xl border-2 transition-all ${
                lesson.status === "locked"
                  ? "opacity-50 bg-muted/20"
                  : "hover:border-[hsl(var(--indigo)_/_0.3)] hover:shadow-lg bg-card"
              }`}
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="text-xs">
                      {lesson.module}
                    </Badge>
                    <Badge
                      variant="secondary"
                      className={
                        lesson.type === "live"
                          ? "bg-[hsl(var(--indigo)_/_0.1)] text-[hsl(var(--indigo))]"
                          : ""
                      }
                    >
                      {lesson.type}
                    </Badge>
                    {!lesson.preworkCompleted && lesson.status === "available" && (
                      <Badge variant="outline" className="text-xs bg-[hsl(var(--amber)_/_0.1)] border-[hsl(var(--amber)_/_0.3)] text-[hsl(var(--amber))]">
                        Pre-work richiesto
                      </Badge>
                    )}
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-2">
                    {lesson.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {lesson.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {lesson.dueDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {lesson.instructor}
                    </span>
                  </div>
                </div>

                <div>
                  {lesson.status === "available" ? (
                    <Button className="bg-gradient-to-r from-[hsl(var(--indigo))] to-[hsl(var(--indigo)_/_0.8)]">
                      <Play className="w-4 h-4 mr-2" />
                      {lesson.type === "live" ? "Entra" : "Inizia"}
                    </Button>
                  ) : (
                    <Button disabled variant="outline">
                      <Lock className="w-4 h-4 mr-2" />
                      Bloccato
                    </Button>
                  )}
                </div>
              </div>

              {lesson.status === "available" && lesson.type === "live" && (
                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground">
                    💡 Completa i materiali pre-work per massimizzare l'apprendimento durante la sessione live
                  </p>
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  )
}
