"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Brain,
  Clock,
  CheckCircle2,
  Target,
  TrendingUp,
  BookOpen,
  Zap,
  Award,
  ArrowRight,
  Shield
} from "lucide-react"

const assessmentQuestions = [
  {
    id: 1,
    category: "Design Theory",
    question: "Cos'è lo User-Centered Design?",
    options: [
      "Design che mette l'utente al centro delle decisioni",
      "Design fatto da utenti invece che designer",
      "Design con l'utente fisicamente al centro dello schermo",
      "Design che permette all'utente di customizzare tutto"
    ],
    correctAnswer: 0
  },
  {
    id: 2,
    category: "UX Research",
    question: "Qual è la differenza principale tra ricerca qualitativa e quantitativa?",
    options: [
      "Qualitativa esplora il 'perché', quantitativa misura il 'quanto'",
      "Qualitativa usa numeri, quantitativa usa testo",
      "Qualitativa è più veloce, quantitativa è più costosa",
      "Non c'è differenza, sono sinonimi"
    ],
    correctAnswer: 0
  },
  {
    id: 3,
    category: "Visual Design",
    question: "Cosa sono le 'Golden Ratio' e le 'Rule of Thirds' nel design?",
    options: [
      "Tecniche per creare composizioni visivamente bilanciate",
      "Regole per definire i prezzi dei progetti",
      "Standard per la grandezza dei font",
      "Metodi per organizzare file in Figma"
    ],
    correctAnswer: 0
  },
  {
    id: 4,
    category: "Prototyping",
    question: "Cosa significa 'fidelity' in un prototipo?",
    options: [
      "Il livello di dettaglio e realismo del prototipo",
      "La velocità di caricamento del prototipo",
      "Il numero di utenti che possono testarlo",
      "La compatibilità con diversi browser"
    ],
    correctAnswer: 0
  },
  {
    id: 5,
    category: "Tools",
    question: "Figma è principalmente usato per:",
    options: [
      "UI design e prototipazione collaborativa",
      "Editing video e animazioni",
      "Gestione progetti e task",
      "Sviluppo frontend in React"
    ],
    correctAnswer: 0
  },
  {
    id: 6,
    category: "Design Systems",
    question: "Cosa include tipicamente un Design System?",
    options: [
      "Componenti UI, guidelines, token di design",
      "Solo i colori del brand",
      "Codice backend dell'applicazione",
      "Strategie di marketing"
    ],
    correctAnswer: 0
  },
  {
    id: 7,
    category: "Accessibility",
    question: "Perché l'accessibilità è importante nel design?",
    options: [
      "Rende i prodotti usabili da tutti, incluse persone con disabilità",
      "Migliora solo l'estetica del design",
      "È un requisito solo per siti governativi",
      "Serve solo per ridurre i costi di sviluppo"
    ],
    correctAnswer: 0
  },
  {
    id: 8,
    category: "UX Writing",
    question: "Cos'è uno stato 'empty state' in UI design?",
    options: [
      "Lo stato quando non ci sono dati da mostrare",
      "Uno schermo completamente bianco",
      "Un errore del codice",
      "Una pagina senza testo"
    ],
    correctAnswer: 0
  }
]

export default function PreAssessmentPage() {
  const router = useRouter()
  const [started, setStarted] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({})
  const [showResults, setShowResults] = useState(false)

  const totalQuestions = assessmentQuestions.length
  const progress = ((currentQuestion + 1) / totalQuestions) * 100
  const answered = Object.keys(selectedAnswers).length

  const handleAnswer = (questionId: number, answerIndex: number) => {
    setSelectedAnswers({ ...selectedAnswers, [questionId]: answerIndex })
  }

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResults(true)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const calculateScore = () => {
    let correct = 0
    assessmentQuestions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correct++
      }
    })
    return Math.round((correct / totalQuestions) * 100)
  }

  const getScoreLevel = (score: number) => {
    if (score >= 80) return { label: "Avanzato", color: "sage", icon: Award }
    if (score >= 60) return { label: "Intermedio", color: "amber", icon: TrendingUp }
    if (score >= 40) return { label: "Base", color: "indigo", icon: BookOpen }
    return { label: "Principiante", color: "gold", icon: Zap }
  }

  if (showResults) {
    const score = calculateScore()
    const level = getScoreLevel(score)
    const LevelIcon = level.icon

    return (
      <div className="min-h-screen grain-texture flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-3xl"
        >
          <Card className="border-2">
            <CardContent className="p-12 text-center">
              <div className={`w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-[hsl(var(--${level.color}))] to-[hsl(var(--${level.color})_/_0.8)] flex items-center justify-center`}>
                <LevelIcon className="w-12 h-12 text-white" />
              </div>

              <h1 className="text-4xl mb-4">
                Assessment Completato!
              </h1>

              <div className="mb-8">
                <div className="font-display text-6xl font-bold mb-2">
                  {score}%
                </div>
                <Badge
                  className={`text-lg px-6 py-2 bg-[hsl(var(--${level.color})_/_0.1)] border-[hsl(var(--${level.color})_/_0.3)] text-[hsl(var(--${level.color}))]`}
                >
                  Livello {level.label}
                </Badge>
              </div>

              <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
                Ottimo lavoro! Hai risposto correttamente a {Math.round(score / 100 * totalQuestions)} su {totalQuestions} domande.
              </p>

              <div className="grid md:grid-cols-3 gap-4 mb-12">
                <Card className="border-2">
                  <CardContent className="p-6 text-center">
                    <Target className="w-8 h-8 mx-auto mb-3 text-[hsl(var(--indigo))]" />
                    <div className="font-display text-2xl font-bold mb-1">
                      {Math.round(score / 100 * totalQuestions)}/{totalQuestions}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Risposte Corrette
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardContent className="p-6 text-center">
                    <Brain className="w-8 h-8 mx-auto mb-3 text-[hsl(var(--amber))]" />
                    <div className="font-display text-2xl font-bold mb-1">
                      {level.label}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Livello Attuale
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardContent className="p-6 text-center">
                    <BookOpen className="w-8 h-8 mx-auto mb-3 text-[hsl(var(--sage))]" />
                    <div className="font-display text-2xl font-bold mb-1">
                      Personalizzato
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Percorso Creato
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="p-6 rounded-xl bg-[hsl(var(--indigo)_/_0.05)] border-2 border-[hsl(var(--indigo)_/_0.2)] text-left mb-8">
                <div className="flex items-start gap-3">
                  <Brain className="w-6 h-6 text-[hsl(var(--indigo))] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-display text-lg font-semibold mb-2">
                      Personalizzazione del Percorso
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Basandoci sui tuoi risultati, abbiamo personalizzato il tuo percorso formativo per darti:
                    </p>
                    <ul className="mt-3 space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[hsl(var(--sage))]" />
                        Contenuti supplementari sulle aree da migliorare
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[hsl(var(--sage))]" />
                        Esercizi mirati al tuo livello
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[hsl(var(--sage))]" />
                        AI tutor configurato sulle tue esigenze
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <Button
                size="lg"
                className="bg-gradient-to-r from-[hsl(var(--indigo))] to-[hsl(var(--indigo)_/_0.8)] text-lg px-8"
                onClick={() => router.push("/dashboard")}
              >
                Vai alla Dashboard
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  if (!started) {
    return (
      <div className="min-h-screen grain-texture flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-3xl"
        >
          <Card className="border-2">
            <CardHeader className="text-center pb-6">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[hsl(var(--indigo))] to-[hsl(var(--amber))] flex items-center justify-center">
                <Brain className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-3xl font-display">
                Pre-Assessment Iniziale
              </CardTitle>
              <CardDescription className="text-lg mt-4">
                Prima di iniziare il master, vogliamo capire il tuo livello attuale
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-8">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4">
                  <Clock className="w-8 h-8 mx-auto mb-2 text-[hsl(var(--indigo))]" />
                  <div className="font-semibold">~15 minuti</div>
                  <div className="text-sm text-muted-foreground">Durata stimata</div>
                </div>
                <div className="text-center p-4">
                  <Target className="w-8 h-8 mx-auto mb-2 text-[hsl(var(--amber))]" />
                  <div className="font-semibold">{totalQuestions} domande</div>
                  <div className="text-sm text-muted-foreground">Teoria + pratica</div>
                </div>
                <div className="text-center p-4">
                  <Shield className="w-8 h-8 mx-auto mb-2 text-[hsl(var(--sage))]" />
                  <div className="font-semibold">Nessun giudizio</div>
                  <div className="text-sm text-muted-foreground">Serve solo a aiutarti</div>
                </div>
              </div>

              <div className="p-6 rounded-xl bg-[hsl(var(--indigo)_/_0.05)] border-2 border-[hsl(var(--indigo)_/_0.2)]">
                <h3 className="font-display text-lg font-semibold mb-3 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-[hsl(var(--indigo))]" />
                  Questo assessment ci aiuterà a:
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[hsl(var(--sage))] flex-shrink-0 mt-0.5" />
                    <span>Personalizzare il tuo percorso formativo in base al livello attuale</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[hsl(var(--sage))] flex-shrink-0 mt-0.5" />
                    <span>Darti contenuti supplementari dove serve per colmare i gap</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[hsl(var(--sage))] flex-shrink-0 mt-0.5" />
                    <span>Misurare i tuoi progressi durante e alla fine del master</span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[hsl(var(--indigo))] to-[hsl(var(--indigo)_/_0.8)] text-lg px-8"
                  onClick={() => setStarted(true)}
                >
                  Inizia Assessment
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8"
                  onClick={() => router.push("/dashboard")}
                >
                  Fallo più tardi
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  const question = assessmentQuestions[currentQuestion]
  const isAnswered = selectedAnswers[question.id] !== undefined

  return (
    <div className="min-h-screen grain-texture flex items-center justify-center p-4">
      <div className="w-full max-w-3xl space-y-6">
        {/* Progress */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between mb-2 text-sm">
            <span className="text-muted-foreground">
              Domanda {currentQuestion + 1} di {totalQuestions}
            </span>
            <span className="font-semibold text-[hsl(var(--indigo))]">
              {Math.round(progress)}%
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </motion.div>

        {/* Question Card */}
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="border-2">
            <CardHeader>
              <Badge variant="outline" className="w-fit mb-4">
                {question.category}
              </Badge>
              <CardTitle className="text-2xl font-display leading-relaxed">
                {question.question}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-3">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(question.id, index)}
                  className={`w-full text-left p-5 rounded-lg border-2 transition-all ${
                    selectedAnswers[question.id] === index
                      ? "border-[hsl(var(--indigo)_/_0.5)] bg-[hsl(var(--indigo)_/_0.05)]"
                      : "border-border hover:border-[hsl(var(--indigo)_/_0.2)]"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      selectedAnswers[question.id] === index
                        ? "border-[hsl(var(--indigo))] bg-[hsl(var(--indigo))]"
                        : "border-muted-foreground"
                    }`}>
                      {selectedAnswers[question.id] === index && (
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <span className="flex-1 leading-relaxed">{option}</span>
                  </div>
                </button>
              ))}

              {/* Navigation */}
              <div className="flex items-center justify-between pt-6 border-t">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                >
                  Indietro
                </Button>

                <div className="text-sm text-muted-foreground">
                  {answered}/{totalQuestions} risposte
                </div>

                <Button
                  onClick={handleNext}
                  disabled={!isAnswered}
                  className="bg-gradient-to-r from-[hsl(var(--indigo))] to-[hsl(var(--indigo)_/_0.8)]"
                >
                  {currentQuestion === totalQuestions - 1 ? "Completa" : "Prossima"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
