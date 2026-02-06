"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  CheckCircle2,
  Brain,
  MessageSquare,
  BookOpen,
  Headphones,
  FileText,
  Settings,
  Eye,
  Sparkles,
  Download,
  Share2,
  Bookmark,
  Clock
} from "lucide-react"

// Mock lesson data
const lessonData = {
  id: 1,
  title: "User Research Fundamentals",
  module: "Modulo 1: Fondamenti UX",
  duration: "45 min",
  progress: 35,
  currentTime: "15:30",
  totalTime: "45:00",
  instructor: "Dr. Maria Conte",
  objectives: [
    "Comprendere i principi fondamentali della ricerca utente",
    "Identificare le diverse metodologie di ricerca",
    "Applicare tecniche di intervista e osservazione",
    "Analizzare e sintetizzare i dati raccolti"
  ],
  transcript: [
    {
      timestamp: "00:00",
      speaker: "Dr. Maria Conte",
      text: "Benvenuti a questa lezione sui fondamenti della user research. Oggi esploreremo perché la ricerca utente è fondamentale nel processo di design."
    },
    {
      timestamp: "00:30",
      speaker: "Dr. Maria Conte",
      text: "La user research ci permette di comprendere profondamente i bisogni, i comportamenti e le motivazioni degli utenti finali."
    },
    {
      timestamp: "01:15",
      speaker: "Dr. Maria Conte",
      text: "Esistono due macro-categorie di ricerca: qualitativa e quantitativa. Vediamo insieme le differenze e quando usare ciascuna."
    }
  ],
  resources: [
    { title: "Slide della lezione", type: "pdf", size: "2.3 MB" },
    { title: "User Research Template", type: "figma", size: "—" },
    { title: "Reading: Nielsen Norman Group", type: "link", size: "—" }
  ],
  nextLesson: {
    id: 2,
    title: "Personas & User Journey Maps",
    module: "Modulo 1"
  }
}

const accessibilityModes = [
  { id: "standard", label: "Standard", icon: Eye },
  { id: "focus", label: "Focus Mode", icon: Sparkles, description: "Minimal distractions per ADHD" },
  { id: "dyslexia", label: "Dislessia", icon: BookOpen, description: "Font OpenDyslexic, spaziatura maggiorata" }
]

export default function LessonPage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [activeMode, setActiveMode] = useState("standard")
  const [activeTab, setActiveTab] = useState("transcript")
  const [notes, setNotes] = useState("")

  const isDyslexiaMode = activeMode === "dyslexia"
  const isFocusMode = activeMode === "focus"

  return (
    <div className={`min-h-screen ${isFocusMode ? "bg-[hsl(220_15%_10%)]" : "grain-texture"}`}>
      <div className="editorial-grid py-6 space-y-6">
        {/* Header & Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between flex-wrap gap-4"
        >
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/dashboard">
                <ChevronLeft className="w-5 h-5" />
              </Link>
            </Button>
            <div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <span>{lessonData.module}</span>
                <span>•</span>
                <span>{lessonData.duration}</span>
              </div>
              <h1 className={`text-3xl md:text-4xl ${isDyslexiaMode ? "font-sans tracking-wide" : ""}`}>
                {lessonData.title}
              </h1>
            </div>
          </div>

          {/* Accessibility Mode Selector */}
          <div className="flex items-center gap-2">
            {accessibilityModes.map((mode) => {
              const Icon = mode.icon
              return (
                <Button
                  key={mode.id}
                  variant={activeMode === mode.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveMode(mode.id)}
                  className={activeMode === mode.id ? "bg-[hsl(var(--indigo))]" : ""}
                  title={mode.description}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {mode.label}
                </Button>
              )
            })}
          </div>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-2 text-sm">
            <span className="text-muted-foreground">Progresso lezione</span>
            <span className="font-semibold text-[hsl(var(--indigo))]">{lessonData.progress}%</span>
          </div>
          <Progress value={lessonData.progress} className="h-2" />
        </motion.div>

        {/* Main Content Grid */}
        <div className={`grid ${isFocusMode ? "lg:grid-cols-1" : "lg:grid-cols-3"} gap-6`}>
          {/* Left Column - Video & Content */}
          <div className={`${isFocusMode ? "max-w-5xl mx-auto w-full" : "lg:col-span-2"} space-y-6`}>
            {/* Video Player */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className={`overflow-hidden border-2 ${isFocusMode ? "border-[hsl(var(--indigo)_/_0.5)]" : ""}`}>
                <div className="relative aspect-video bg-gradient-to-br from-[hsl(var(--indigo))] to-[hsl(var(--indigo)_/_0.8)]">
                  {/* Video placeholder with play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Button
                          size="lg"
                          className="rounded-full w-20 h-20 bg-white/20 backdrop-blur-sm hover:bg-white/30"
                          onClick={() => setIsPlaying(!isPlaying)}
                        >
                          {isPlaying ? (
                            <Pause className="w-10 h-10 text-white" />
                          ) : (
                            <Play className="w-10 h-10 text-white ml-1" />
                          )}
                        </Button>
                      </motion.div>
                      <p className="mt-4 text-sm opacity-75">
                        {lessonData.instructor}
                      </p>
                    </div>
                  </div>

                  {/* Video Controls */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <div className="flex items-center gap-4">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-white hover:bg-white/20"
                        onClick={() => setIsPlaying(!isPlaying)}
                      >
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </Button>

                      <div className="flex-1">
                        <Progress value={35} className="h-1" />
                      </div>

                      <span className="text-white text-sm font-mono">
                        {lessonData.currentTime} / {lessonData.totalTime}
                      </span>

                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-white hover:bg-white/20"
                        onClick={() => setIsMuted(!isMuted)}
                      >
                        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      </Button>

                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-white hover:bg-white/20"
                      >
                        <Maximize className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Content Mashup Tabs */}
                {!isFocusMode && (
                  <CardContent className="p-6">
                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                      <TabsList className="grid w-full grid-cols-3 mb-6">
                        <TabsTrigger value="transcript" className="gap-2">
                          <FileText className="w-4 h-4" />
                          Trascrizione
                        </TabsTrigger>
                        <TabsTrigger value="audio" className="gap-2">
                          <Headphones className="w-4 h-4" />
                          Audio
                        </TabsTrigger>
                        <TabsTrigger value="notes" className="gap-2">
                          <BookOpen className="w-4 h-4" />
                          Note
                        </TabsTrigger>
                      </TabsList>

                      {/* Transcript */}
                      <TabsContent value="transcript" className="space-y-4 mt-0">
                        <div className={`space-y-4 max-h-96 overflow-y-auto pr-4 ${
                          isDyslexiaMode ? "font-sans tracking-wider leading-loose" : ""
                        }`}>
                          {lessonData.transcript.map((item, index) => (
                            <div
                              key={index}
                              className={`p-4 rounded-lg border-2 transition-all ${
                                isDyslexiaMode
                                  ? "bg-[hsl(47_100%_95%)] border-[hsl(47_100%_60%)]"
                                  : "bg-muted/30 border-border hover:border-[hsl(var(--indigo)_/_0.2)]"
                              }`}
                            >
                              <div className="flex items-center gap-2 mb-2">
                                <Badge variant="outline" className="text-xs font-mono">
                                  {item.timestamp}
                                </Badge>
                                <span className="text-sm font-semibold text-[hsl(var(--indigo))]">
                                  {item.speaker}
                                </span>
                              </div>
                              <p className={`text-sm leading-relaxed ${
                                isDyslexiaMode ? "text-lg leading-loose" : ""
                              }`}>
                                {item.text}
                              </p>
                            </div>
                          ))}
                        </div>
                      </TabsContent>

                      {/* Audio Only Mode */}
                      <TabsContent value="audio" className="mt-0">
                        <Card className="bg-gradient-to-br from-[hsl(var(--indigo)_/_0.05)] to-transparent border-2">
                          <CardContent className="p-8 text-center">
                            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-[hsl(var(--indigo))] to-[hsl(var(--amber))] flex items-center justify-center">
                              <Headphones className="w-10 h-10 text-white" />
                            </div>
                            <h3 className="text-xl font-display font-semibold mb-2">
                              Modalità Audio
                            </h3>
                            <p className="text-muted-foreground mb-6">
                              Ascolta la lezione mentre fai altro. Perfetto per il multitasking.
                            </p>
                            <Button className="bg-gradient-to-r from-[hsl(var(--indigo))] to-[hsl(var(--indigo)_/_0.8)]">
                              <Play className="w-4 h-4 mr-2" />
                              Riproduci Audio
                            </Button>
                          </CardContent>
                        </Card>
                      </TabsContent>

                      {/* Notes */}
                      <TabsContent value="notes" className="mt-0">
                        <div className="space-y-4">
                          <textarea
                            placeholder="Scrivi qui i tuoi appunti..."
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            className={`w-full min-h-64 p-4 rounded-lg border-2 bg-background resize-none focus:outline-none focus:border-[hsl(var(--indigo)_/_0.3)] ${
                              isDyslexiaMode ? "font-sans text-lg tracking-wider leading-loose" : ""
                            }`}
                          />
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Download className="w-4 h-4 mr-2" />
                              Esporta Note
                            </Button>
                            <Button variant="outline" size="sm">
                              <Share2 className="w-4 h-4 mr-2" />
                              Condividi
                            </Button>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                )}
              </Card>
            </motion.div>

            {/* Learning Objectives */}
            {!isFocusMode && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="text-xl font-display flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-[hsl(var(--indigo))]" />
                      Obiettivi di Apprendimento
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className={`space-y-3 ${isDyslexiaMode ? "font-sans tracking-wide leading-relaxed" : ""}`}>
                      {lessonData.objectives.map((objective, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="mt-0.5">
                            <div className="w-5 h-5 rounded-full border-2 border-[hsl(var(--indigo))] flex items-center justify-center">
                              <span className="text-xs font-semibold text-[hsl(var(--indigo))]">
                                {index + 1}
                              </span>
                            </div>
                          </div>
                          <span className="flex-1">{objective}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Resources */}
            {!isFocusMode && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="text-xl font-display flex items-center gap-2">
                      <Download className="w-5 h-5 text-[hsl(var(--amber))]" />
                      Risorse & Materiali
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {lessonData.resources.map((resource, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="w-full justify-between h-auto py-4"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-[hsl(var(--amber)_/_0.1)]">
                            <FileText className="w-5 h-5 text-[hsl(var(--amber))]" />
                          </div>
                          <div className="text-left">
                            <div className="font-semibold">{resource.title}</div>
                            <div className="text-xs text-muted-foreground">
                              {resource.type.toUpperCase()} {resource.size !== "—" && `• ${resource.size}`}
                            </div>
                          </div>
                        </div>
                        <Download className="w-4 h-4" />
                      </Button>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Navigation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center justify-between pt-6 border-t"
            >
              <Button variant="outline" size="lg">
                <ChevronLeft className="w-4 h-4 mr-2" />
                Lezione Precedente
              </Button>

              <Button
                size="lg"
                className="bg-gradient-to-r from-[hsl(var(--indigo))] to-[hsl(var(--indigo)_/_0.8)]"
              >
                Prossima Lezione
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          </div>

          {/* Right Column - AI Tutor & Info */}
          {!isFocusMode && (
            <div className="space-y-6">
              {/* AI Tutor Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="border-2 border-[hsl(var(--indigo)_/_0.3)] bg-gradient-to-br from-[hsl(var(--indigo)_/_0.05)] to-transparent sticky top-24">
                  <CardHeader>
                    <CardTitle className="text-lg font-display flex items-center gap-2">
                      <Brain className="w-5 h-5 text-[hsl(var(--indigo))]" />
                      AI Tutor 24/7
                    </CardTitle>
                    <CardDescription>
                      Hai domande? Chiedi a Claude
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      {/* Example questions */}
                      <div className="p-3 rounded-lg bg-white border text-sm">
                        <p className="text-muted-foreground mb-1 text-xs">Tu:</p>
                        <p>"Puoi spiegarmi meglio la differenza tra ricerca qualitativa e quantitativa?"</p>
                      </div>

                      <div className="p-3 rounded-lg bg-[hsl(var(--indigo)_/_0.1)] border border-[hsl(var(--indigo)_/_0.2)] text-sm">
                        <p className="text-[hsl(var(--indigo))] mb-1 text-xs font-semibold">AI Tutor:</p>
                        <p>Certo! La ricerca qualitativa esplora il "perché" e il "come" attraverso interviste e osservazioni...</p>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <textarea
                        placeholder="Fai una domanda sulla lezione..."
                        className="w-full p-3 rounded-lg border-2 bg-background resize-none focus:outline-none focus:border-[hsl(var(--indigo)_/_0.3)] text-sm min-h-24"
                      />
                      <Button className="w-full mt-3 bg-gradient-to-r from-[hsl(var(--indigo))] to-[hsl(var(--indigo)_/_0.8)]">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Chiedi all'AI Tutor
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Next Lesson Preview */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="text-lg font-display">
                      Prossima Lezione
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Badge variant="outline" className="text-xs">
                        {lessonData.nextLesson.module}
                      </Badge>
                      <h4 className="font-semibold">
                        {lessonData.nextLesson.title}
                      </h4>
                      <Button variant="outline" className="w-full">
                        Anteprima
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="text-lg font-display">
                      Azioni Rapide
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <Bookmark className="w-4 h-4" />
                      Salva per dopo
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <Share2 className="w-4 h-4" />
                      Condividi
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <Download className="w-4 h-4" />
                      Download offline
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
