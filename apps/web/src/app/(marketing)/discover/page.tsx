"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Navigation } from "@/components/shared/navigation"
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Clock,
  Shield,
  Target,
  CheckCircle2
} from "lucide-react"
import Link from "next/link"

const QUESTIONS = [
  {
    id: 1,
    card: "La Torre",
    question: "Come preferisci apprendere nuove competenze?",
    type: "single-choice" as const,
    options: [
      { value: "hands-on", label: "Facendo", sublabel: "Imparo provando direttamente", icon: "🛠️" },
      { value: "visual", label: "Guardando", sublabel: "Video e demo", icon: "👁️" },
      { value: "reading", label: "Leggendo", sublabel: "Guide e documentazione", icon: "📚" },
      { value: "listening", label: "Ascoltando", sublabel: "Podcast e spiegazioni", icon: "🎧" }
    ]
  },
  {
    id: 2,
    card: "Il Mago",
    question: "Quale di queste situazioni ti descrive meglio?",
    type: "single-choice" as const,
    options: [
      { value: "recent-grad", label: "Neo-laureato", sublabel: "Cerco primo lavoro", icon: "🎓" },
      { value: "career-switch", label: "Career Switch", sublabel: "Cambio settore/carriera", icon: "🔄" },
      { value: "upskill", label: "Upskilling", sublabel: "Voglio crescere professionalmente", icon: "📈" },
      { value: "entrepreneur", label: "Imprenditore", sublabel: "Avviare mio progetto/startup", icon: "🚀" }
    ]
  },
  {
    id: 3,
    card: "Le Stelle",
    question: "Su cosa vorresti lavorare nei prossimi mesi?",
    type: "multiple-choice" as const,
    subtitle: "Seleziona fino a 3 aree",
    maxSelect: 3,
    tags: [
      "Data & AI",
      "Design & UX",
      "Digital Marketing",
      "Product Management",
      "Development",
      "Business Strategy",
      "Content Creation",
      "Leadership"
    ]
  },
  {
    id: 4,
    card: "Il Sole",
    question: "Quanto tempo puoi dedicare alla formazione?",
    type: "single-choice" as const,
    options: [
      { value: "full-time", label: "Full-time", sublabel: "9 settimane intensive", icon: "⏰" },
      { value: "part-time-eve", label: "Part-time sera", sublabel: "12 settimane", icon: "🌙" },
      { value: "part-time-weekend", label: "Weekend", sublabel: "16 settimane", icon: "📅" },
      { value: "flexible", label: "Flessibile", sublabel: "Self-paced", icon: "🔄" }
    ]
  },
  {
    id: 5,
    card: "La Ruota",
    question: "Cosa ti blocca di più nel cercare lavoro?",
    type: "ranking" as const,
    subtitle: "Ordina per importanza (trascina)",
    items: [
      "Mancanza di esperienza pratica",
      "Portfolio/progetti da mostrare",
      "Competenze tecniche specifiche",
      "Soft skills (comunicazione, leadership)",
      "Network nel settore"
    ]
  },
  {
    id: 6,
    card: "Il Mondo",
    question: "Descrivi il tuo 'io' professionale ideale tra 6 mesi",
    type: "text-area" as const,
    placeholder: "Es: Sto lavorando come Product Designer in una startup tech, gestisco progetti end-to-end..."
  }
]

type Answer = string | string[] | number[]

export default function DiscoverPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, Answer>>({})
  const [showResults, setShowResults] = useState(false)
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const progress = ((currentQuestion + 1) / QUESTIONS.length) * 100
  const question = QUESTIONS[currentQuestion]

  const handleSingleChoice = (value: string) => {
    setAnswers(prev => ({ ...prev, [currentQuestion]: value }))
  }

  const handleTagToggle = (tag: string) => {
    const maxSelect = question.type === "multiple-choice" ? question.maxSelect || 3 : 3
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : selectedTags.length < maxSelect
      ? [...selectedTags, tag]
      : selectedTags

    setSelectedTags(newTags)
    setAnswers(prev => ({ ...prev, [currentQuestion]: newTags }))
  }

  const handleTextArea = (value: string) => {
    setAnswers(prev => ({ ...prev, [currentQuestion]: value }))
  }

  const handleNext = () => {
    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(prev => prev + 1)
      setSelectedTags([])
    } else {
      setShowResults(true)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1)
      if (question.type === "multiple-choice") {
        setSelectedTags((answers[currentQuestion - 1] as string[]) || [])
      }
    }
  }

  const isAnswered = () => {
    const answer = answers[currentQuestion]
    if (question.type === "multiple-choice") return selectedTags.length > 0
    if (question.type === "text-area") return answer && (answer as string).length >= 50
    if (question.type === "ranking") return answer && (answer as number[]).length === question.items?.length
    return !!answer
  }

  if (showResults) {
    return <ResultsPage answers={answers} />
  }

  return (
    <div className="min-h-screen grain-texture">
      <Navigation />

      <div className="editorial-grid py-12 md:py-20">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <Badge className="mb-6 px-6 py-2 bg-[hsl(var(--indigo)_/_0.1)] border-[hsl(var(--indigo)_/_0.2)] text-[hsl(var(--indigo))]">
              <Sparkles className="w-3 h-3 mr-2" />
              Scopri il Tuo Percorso Ideale
            </Badge>

            <h1 className="mb-6 text-balance">
              Le Carte del<br />Tuo Futuro
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Non serve la sfera di cristallo per vedere il tuo futuro professionale.
              Bastano le domande giuste.
            </p>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>5 minuti</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>100% Privato</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4" />
                <span>Personalizzato</span>
              </div>
            </div>
          </motion.div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium">
                Domanda {currentQuestion + 1} di {QUESTIONS.length}
              </span>
              <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[hsl(var(--indigo))] to-[hsl(var(--amber))]"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Question Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="border-2 hover:border-[hsl(var(--indigo)_/_0.3)] transition-colors">
                <CardContent className="p-8 md:p-12">
                  {/* Card Badge */}
                  <div className="flex justify-center mb-8">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--indigo))] to-[hsl(var(--amber))] rounded-2xl blur-xl opacity-30" />
                      <Badge className="relative px-6 py-3 bg-gradient-to-r from-[hsl(var(--indigo))] to-[hsl(var(--amber))] text-white border-0 text-base font-display">
                        🎴 {question.card}
                      </Badge>
                    </div>
                  </div>

                  {/* Question */}
                  <h2 className="text-center mb-3 text-2xl md:text-3xl">
                    {question.question}
                  </h2>
                  {question.subtitle && (
                    <p className="text-center text-muted-foreground mb-8">
                      {question.subtitle}
                    </p>
                  )}

                  {/* Answer Options */}
                  <div className="mt-8">
                    {question.type === "single-choice" && (
                      <RadioGroup
                        value={answers[currentQuestion] as string}
                        onValueChange={handleSingleChoice}
                        className="space-y-3"
                      >
                        {question.options?.map((option) => (
                          <div key={option.value}>
                            <RadioGroupItem
                              value={option.value}
                              id={option.value}
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor={option.value}
                              className="flex items-center gap-4 p-5 border-2 border-border rounded-xl cursor-pointer transition-all hover:border-[hsl(var(--indigo)_/_0.5)] hover:bg-muted/50 peer-data-[state=checked]:border-[hsl(var(--indigo))] peer-data-[state=checked]:bg-[hsl(var(--indigo)_/_0.05)] peer-data-[state=checked]:shadow-lg group"
                            >
                              <span className="text-3xl">{option.icon}</span>
                              <div className="flex-1">
                                <div className="font-semibold text-base">{option.label}</div>
                                <div className="text-sm text-muted-foreground">{option.sublabel}</div>
                              </div>
                              <CheckCircle2 className="w-5 h-5 text-[hsl(var(--indigo))] opacity-0 peer-data-[state=checked]:opacity-100 transition-opacity" />
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    )}

                    {question.type === "multiple-choice" && (
                      <div className="flex flex-wrap gap-3">
                        {question.tags?.map((tag) => {
                          const isSelected = selectedTags.includes(tag)
                          return (
                            <button
                              key={tag}
                              onClick={() => handleTagToggle(tag)}
                              className={`px-5 py-3 rounded-xl border-2 transition-all font-medium ${
                                isSelected
                                  ? "border-[hsl(var(--indigo))] bg-[hsl(var(--indigo)_/_0.1)] text-[hsl(var(--indigo))] shadow-lg"
                                  : "border-border hover:border-[hsl(var(--indigo)_/_0.3)] hover:bg-muted/50"
                              }`}
                            >
                              {tag}
                            </button>
                          )
                        })}
                      </div>
                    )}

                    {question.type === "ranking" && (
                      <div className="space-y-3">
                        {question.items?.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-4 p-4 border-2 border-border rounded-xl bg-muted/30"
                          >
                            <div className="w-8 h-8 rounded-full bg-[hsl(var(--indigo)_/_0.1)] flex items-center justify-center font-semibold text-[hsl(var(--indigo))]">
                              {index + 1}
                            </div>
                            <div className="flex-1">{item}</div>
                          </div>
                        ))}
                        <p className="text-sm text-muted-foreground text-center mt-4">
                          💡 Per questo mockup, l'ordine è fisso. In produzione potresti trascinare gli elementi.
                        </p>
                      </div>
                    )}

                    {question.type === "text-area" && (
                      <div>
                        <Textarea
                          placeholder={question.placeholder}
                          value={(answers[currentQuestion] as string) || ""}
                          onChange={(e) => handleTextArea(e.target.value)}
                          className="min-h-[200px] text-base resize-none"
                        />
                        <p className="text-xs text-muted-foreground mt-2">
                          Minimo 50 caratteri · {((answers[currentQuestion] as string)?.length || 0)} / 500
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Navigation */}
                  <div className="flex items-center justify-between mt-8 pt-8 border-t">
                    <Button
                      variant="ghost"
                      onClick={handlePrevious}
                      disabled={currentQuestion === 0}
                      className="gap-2"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Indietro
                    </Button>

                    <Button
                      onClick={handleNext}
                      disabled={!isAnswered()}
                      size="lg"
                      className="bg-gradient-to-r from-[hsl(var(--indigo))] to-[hsl(var(--amber))] hover:shadow-xl transition-all gap-2"
                    >
                      {currentQuestion === QUESTIONS.length - 1 ? "Scopri il Risultato" : "Continua"}
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

function ResultsPage({ answers }: { answers: Record<number, Answer> }) {
  // Determina il corso basato sulle risposte
  const determineRecommendedCourse = () => {
    const tags = answers[2] as string[] || []

    if (tags.includes("Design & UX")) {
      return {
        title: "UX/UI Design Master",
        icon: "🎨",
        duration: "12 settimane",
        type: "Full-time",
        description: "Diventa un designer ricercato dalle aziende con portfolio di progetti reali",
        reasons: [
          "Hai mostrato interesse per il design e l'esperienza utente",
          "Preferisci apprendimento pratico e visuale",
          "Gap principale: portfolio con progetti reali",
          "Mercato: 200+ posizioni aperte in Italia"
        ],
        salary: "€28k-35k",
        placement: "92%"
      }
    } else if (tags.includes("Development") || tags.includes("Data & AI")) {
      return {
        title: "Full-Stack Development Bootcamp",
        icon: "💻",
        duration: "16 settimane",
        type: "Part-time",
        description: "Diventa uno sviluppatore completo con competenze front-end e back-end",
        reasons: [
          "Hai interesse per tecnologia e programmazione",
          "Settore in forte crescita con alta domanda",
          "Competenze tecniche immediatamente spendibili",
          "Possibilità di remote working"
        ],
        salary: "€30k-40k",
        placement: "94%"
      }
    } else if (tags.includes("Digital Marketing") || tags.includes("Content Creation")) {
      return {
        title: "Digital Marketing & Growth",
        icon: "📊",
        duration: "10 settimane",
        type: "Full-time",
        description: "Padroneggia strategie di marketing digitale e growth hacking",
        reasons: [
          "Hai creatività e capacità comunicative",
          "Skill richiesta da tutte le aziende",
          "Focus su ROI e metriche concrete",
          "Ampia varietà di opportunità"
        ],
        salary: "€25k-32k",
        placement: "89%"
      }
    } else {
      return {
        title: "Product Management Intensive",
        icon: "🚀",
        duration: "10 settimane",
        type: "Full-time",
        description: "Guida prodotti digitali di successo end-to-end",
        reasons: [
          "Hai visione strategica e capacità organizzative",
          "Ruolo chiave nella trasformazione digitale",
          "Ti piace coordinare team e progetti",
          "Ottime prospettive di carriera"
        ],
        salary: "€35k-45k",
        placement: "90%"
      }
    }
  }

  const course = determineRecommendedCourse()

  return (
    <div className="min-h-screen grain-texture">
      <Navigation />

      <div className="editorial-grid py-12 md:py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-16">
            <Badge className="mb-6 px-6 py-2 bg-[hsl(var(--amber)_/_0.1)] border-[hsl(var(--amber)_/_0.2)] text-[hsl(var(--amber))]">
              <Sparkles className="w-3 h-3 mr-2" />
              Il Tuo Percorso è Rivelato
            </Badge>

            <h1 className="mb-6 text-balance">
              Ecco il Percorso<br />Ideale per Te
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              In base alle tue risposte, abbiamo identificato il programma perfetto
              per trasformare il tuo potenziale in carriera
            </p>
          </div>

          {/* Three Cards - Passato, Presente, Futuro */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              { title: "Passato", content: "Competenze teoriche solide", icon: "📚" },
              { title: "Presente", content: "Gap: Portfolio e strumenti moderni", icon: "🎯" },
              { title: "Futuro", content: course.title.split(' ')[0], icon: course.icon }
            ].map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, rotateY: 180 }}
                animate={{ opacity: 1, rotateY: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
              >
                <Card className="text-center p-8 bg-gradient-to-b from-muted/50 to-background border-2">
                  <div className="text-4xl mb-4">{card.icon}</div>
                  <h3 className="font-display text-xl font-semibold mb-2">{card.title}</h3>
                  <p className="text-muted-foreground">{card.content}</p>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Recommended Course */}
          <Card className="border-2 border-[hsl(var(--indigo)_/_0.3)] bg-gradient-to-br from-[hsl(var(--indigo)_/_0.02)] to-background">
            <CardContent className="p-12">
              <div className="flex items-start gap-6 mb-8">
                <div className="text-6xl">{course.icon}</div>
                <div className="flex-1">
                  <h2 className="mb-2">{course.title}</h2>
                  <p className="text-lg text-muted-foreground mb-4">{course.description}</p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <Badge variant="outline">{course.duration}</Badge>
                    <Badge variant="outline">{course.type}</Badge>
                    <Badge variant="outline">Salary: {course.salary}</Badge>
                    <Badge className="bg-[hsl(var(--sage))] text-white">Placement: {course.placement}</Badge>
                  </div>
                </div>
              </div>

              <div className="bg-muted/50 rounded-xl p-6 mb-8">
                <h4 className="font-semibold mb-4">Perché questo percorso?</h4>
                <ul className="space-y-2">
                  {course.reasons.map((reason, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[hsl(var(--sage))] flex-shrink-0 mt-0.5" />
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  asChild
                  className="flex-1 bg-gradient-to-r from-[hsl(var(--indigo))] to-[hsl(var(--amber))] hover:shadow-2xl transition-all"
                >
                  <Link href="/courses/ux-ui-design-master">
                    Scopri il Corso
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="flex-1" asChild>
                  <Link href="/discover">Vedi Altri Percorsi</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <div className="mt-12 text-center">
            <h3 className="font-display text-2xl font-semibold mb-8">I Prossimi Passi</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: "📞", title: "Call Gratuita", subtitle: "con un advisor" },
                { icon: "📝", title: "Application", subtitle: "5 minuti" },
                { icon: "🚀", title: "Inizio Corso", subtitle: "prossima cohort" }
              ].map((step, index) => (
                <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="text-4xl mb-3">{step.icon}</div>
                  <div className="font-semibold">{step.title}</div>
                  <div className="text-sm text-muted-foreground">{step.subtitle}</div>
                </Card>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
