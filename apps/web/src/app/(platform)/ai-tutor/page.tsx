"use client"

import { useState, useRef, useEffect } from "react"
import { nanoid } from "nanoid"
import { motion, AnimatePresence } from "framer-motion"
import { Navigation } from "@/components/shared/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  Brain,
  Send,
  Sparkles,
  BookOpen,
  Code,
  Briefcase,
  HelpCircle,
  RotateCcw,
  Download,
  Share2,
  Lightbulb,
  MessageSquare,
  CheckCircle2,
  Clock
} from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

const suggestedPrompts = [
  {
    category: "Spiegazioni",
    icon: BookOpen,
    color: "indigo",
    prompts: [
      "Spiegami il concetto di User-Centered Design",
      "Qual è la differenza tra UX e UI?",
      "Come si fa una user research efficace?"
    ]
  },
  {
    category: "Pratica",
    icon: Code,
    color: "amber",
    prompts: [
      "Come creo un wireframe in Figma?",
      "Dammi feedback su questo design pattern",
      "Best practices per design systems"
    ]
  },
  {
    category: "Carriera",
    icon: Briefcase,
    color: "sage",
    prompts: [
      "Come preparo un portfolio UX?",
      "Consigli per colloquio Product Designer",
      "Skills più richieste nel 2026"
    ]
  },
  {
    category: "Progetti",
    icon: Lightbulb,
    color: "gold",
    prompts: [
      "Idee per case study interessanti",
      "Come documento un progetto UX?",
      "Feedback su questo concept"
    ]
  }
]

const contextInfo = {
  currentLesson: "User Research Fundamentals",
  module: "Modulo 1: Fondamenti UX",
  progress: 35,
  lastTopic: "Interviste qualitative vs quantitative"
}

const mockResponses = [
  "Ottima domanda! Il User-Centered Design (UCD) è un approccio al design che mette l'utente finale al centro di ogni decisione. Significa:\n\n1. **Ricerca continua**: Parlare costantemente con gli utenti per capire bisogni, pain points e comportamenti\n2. **Iterazione**: Testare prototipi presto e spesso, migliorando basandosi sul feedback\n3. **Empatia**: Mettersi nei panni dell'utente per creare soluzioni che risolvono problemi reali\n\nNella lezione che stai seguendo, vediamo proprio come condurre ricerche utente efficaci. Vuoi che approfondisca qualche aspetto specifico?",

  "Per creare wireframe efficaci in Figma, segui questi step:\n\n**1. Setup**\n- Crea un nuovo file e imposta la griglia (8px base)\n- Usa componenti per elementi ripetuti (bottoni, card)\n\n**2. Structure**\n- Inizia con low-fidelity (box e testo)\n- Focus su gerarchia e layout, non estetica\n- Usa Auto Layout per responsiveness\n\n**3. Annotazioni**\n- Aggiungi note per interazioni\n- Specifica stati (hover, active, disabled)\n\n**Tip**: Non perdere tempo a scegliere colori o font nei wireframe. L'obiettivo è validare la struttura!\n\nVuoi che ti mostri un esempio pratico?",

  "Prepariamo un portfolio UX che converta! 🎯\n\n**Case Study Structure** (3-4 progetti):\n1. **Overview**: Problema, ruolo, timeline\n2. **Research**: Dati, insights, personas\n3. **Ideation**: Sketches, wireframes, rationale\n4. **Solution**: Prototipi, testing, metriche\n5. **Impact**: Risultati misurabili\n\n**Best Practices**:\n- ✅ Storytelling chiaro\n- ✅ Visual più testo\n- ✅ Mostra il processo, non solo il risultato\n- ✅ Quantifica l'impatto (\"Ridotto churn del 25%\")\n- ❌ Evita progetti solo estetici\n\nIl tuo corso include 3 progetti reali che andranno perfetti nel portfolio. Vuoi aiuto a strutturare il primo?"
]

export default function AITutorPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Ciao! 👋 Sono il tuo AI Tutor personalizzato.\n\nVedo che stai seguendo \"" + contextInfo.currentLesson + "\" nel " + contextInfo.module + ". Come posso aiutarti oggi?\n\nPuoi chiedermi:\n• Spiegazioni sui concetti della lezione\n• Chiarimenti su esercizi o progetti\n• Consigli per la carriera\n• Feedback sui tuoi lavori\n\nOppure scegli una delle domande suggerite qui sotto! 👇",
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Fix H2: Track mounted state and timeout for race condition prevention
  const isMountedRef = useRef(true)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Fix H2: Cleanup on unmount
  useEffect(() => {
    return () => {
      isMountedRef.current = false
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const handleSend = () => {
    // Fix H2: Block if already typing or empty input
    if (!inputValue.trim() || isTyping) return

    const userMessage: Message = {
      id: nanoid(), // Fix H2: Use nanoid for unique IDs
      role: "user",
      content: inputValue,
      timestamp: new Date()
    }

    setMessages([...messages, userMessage])
    setInputValue("")

    // Simulate AI response
    setIsTyping(true)
    timeoutRef.current = setTimeout(() => {
      // Fix H2: Guard against unmounted component
      if (!isMountedRef.current) return

      const aiMessage: Message = {
        id: nanoid(), // Fix H2: Use nanoid for unique IDs
        role: "assistant",
        content: mockResponses[Math.floor(Math.random() * mockResponses.length)],
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleSuggestedPrompt = (prompt: string) => {
    setInputValue(prompt)
    textareaRef.current?.focus()
  }

  const handleClearChat = () => {
    setMessages([messages[0]]) // Keep only welcome message
  }

  return (
    <div className="min-h-screen grain-texture">
      <Navigation />

      <div className="editorial-grid py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Sidebar - Context & Suggested Prompts */}
          <div className="lg:col-span-1 space-y-6">
            {/* Context Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card className="border-2 border-[hsl(var(--indigo)_/_0.3)] bg-gradient-to-br from-[hsl(var(--indigo)_/_0.05)] to-transparent">
                <CardHeader>
                  <CardTitle className="text-lg font-display flex items-center gap-2">
                    <Brain className="w-5 h-5 text-[hsl(var(--indigo))]" />
                    Contesto Attuale
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Lezione Corrente</p>
                    <p className="font-semibold">{contextInfo.currentLesson}</p>
                    <p className="text-sm text-muted-foreground">{contextInfo.module}</p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2 text-xs">
                      <span className="text-muted-foreground">Progresso</span>
                      <span className="font-semibold text-[hsl(var(--indigo))]">{contextInfo.progress}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[hsl(var(--indigo))] to-[hsl(var(--amber))]"
                        style={{ width: `${contextInfo.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-[hsl(var(--amber)_/_0.1)] border border-[hsl(var(--amber)_/_0.2)]">
                    <p className="text-xs text-muted-foreground mb-1">Ultimo Argomento</p>
                    <p className="text-sm font-medium">{contextInfo.lastTopic}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Suggested Prompts */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-lg font-display flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[hsl(var(--amber))]" />
                    Domande Suggerite
                  </CardTitle>
                  <CardDescription>
                    Clicca per iniziare una conversazione
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {suggestedPrompts.map((category, index) => {
                    const Icon = category.icon
                    return (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center gap-2 text-sm font-semibold">
                          <Icon className={`w-4 h-4 text-[hsl(var(--${category.color}))]`} />
                          {category.category}
                        </div>
                        <div className="space-y-2">
                          {category.prompts.map((prompt, i) => (
                            <button
                              key={i}
                              onClick={() => handleSuggestedPrompt(prompt)}
                              className="w-full text-left p-3 rounded-lg border-2 border-border hover:border-[hsl(var(--indigo)_/_0.3)] hover:bg-[hsl(var(--indigo)_/_0.05)] transition-all text-sm"
                            >
                              {prompt}
                            </button>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Main Chat Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between"
            >
              <div>
                <h1 className="text-3xl md:text-4xl mb-2">
                  AI Tutor 24/7
                </h1>
                <p className="text-lg text-muted-foreground">
                  Powered by Claude Sonnet 4.5
                </p>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleClearChat}>
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </motion.div>

            {/* Chat Messages */}
            <Card className="border-2">
              <CardContent className="p-0">
                <div className="h-[600px] overflow-y-auto p-6 space-y-6">
                  <AnimatePresence>
                    {messages.map((message, index) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`flex gap-4 ${
                          message.role === "user" ? "flex-row-reverse" : ""
                        }`}
                      >
                        <Avatar className={`h-10 w-10 flex-shrink-0 ${
                          message.role === "assistant"
                            ? "bg-gradient-to-br from-[hsl(var(--indigo))] to-[hsl(var(--amber))]"
                            : "bg-muted"
                        }`}>
                          <AvatarFallback className={
                            message.role === "assistant"
                              ? "text-white font-semibold"
                              : "font-semibold"
                          }>
                            {message.role === "assistant" ? (
                              <Brain className="w-5 h-5" />
                            ) : (
                              "TU"
                            )}
                          </AvatarFallback>
                        </Avatar>

                        <div className={`flex-1 ${
                          message.role === "user" ? "flex justify-end" : ""
                        }`}>
                          <div className={`max-w-2xl ${
                            message.role === "user"
                              ? "bg-[hsl(var(--indigo)_/_0.1)] border-[hsl(var(--indigo)_/_0.2)]"
                              : "bg-muted/30 border-border"
                          } border-2 rounded-2xl p-4`}>
                            <div className="whitespace-pre-wrap leading-relaxed">
                              {message.content}
                            </div>
                            <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
                              <Clock className="w-3 h-3" />
                              {message.timestamp.toLocaleTimeString("it-IT", {
                                hour: "2-digit",
                                minute: "2-digit"
                              })}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {/* Typing Indicator */}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex gap-4"
                    >
                      <Avatar className="h-10 w-10 bg-gradient-to-br from-[hsl(var(--indigo))] to-[hsl(var(--amber))]">
                        <AvatarFallback className="text-white">
                          <Brain className="w-5 h-5" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="bg-muted/30 border-2 border-border rounded-2xl p-4">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-[hsl(var(--indigo))] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                          <div className="w-2 h-2 bg-[hsl(var(--indigo))] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                          <div className="w-2 h-2 bg-[hsl(var(--indigo))] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                <Separator />

                {/* Input Area */}
                <div className="p-4">
                  <div className="flex gap-3">
                    <Textarea
                      ref={textareaRef}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault()
                          handleSend()
                        }
                      }}
                      disabled={isTyping}
                      placeholder={isTyping
                        ? "AI sta rispondendo..."
                        : "Fai una domanda... (Shift+Enter per andare a capo)"
                      }
                      className="min-h-[60px] max-h-[200px] resize-none disabled:opacity-60 disabled:cursor-not-allowed"
                    />
                    <Button
                      onClick={handleSend}
                      disabled={!inputValue.trim() || isTyping}
                      className="bg-gradient-to-r from-[hsl(var(--indigo))] to-[hsl(var(--indigo)_/_0.8)] h-[60px] px-6"
                    >
                      {isTyping ? (
                        <div className="animate-spin">⏳</div>
                      ) : (
                        <Send className="w-5 h-5" />
                      )}
                    </Button>
                  </div>
                  {isTyping ? (
                    <p className="text-xs text-[hsl(var(--amber))] mt-2 flex items-center gap-1">
                      ⏳ AI sta elaborando la risposta... Il tuo prossimo messaggio sarà inviato dopo.
                    </p>
                  ) : (
                    <p className="text-xs text-muted-foreground mt-2">
                      💡 L'AI Tutor conosce il tuo percorso e può aiutarti su lezioni, progetti e carriera
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-3 gap-3">
              <Button variant="outline" className="h-auto py-3 flex-col gap-2">
                <HelpCircle className="w-5 h-5" />
                <span className="text-xs">FAQ</span>
              </Button>
              <Button variant="outline" className="h-auto py-3 flex-col gap-2">
                <MessageSquare className="w-5 h-5" />
                <span className="text-xs">Esempi</span>
              </Button>
              <Button variant="outline" className="h-auto py-3 flex-col gap-2">
                <Share2 className="w-5 h-5" />
                <span className="text-xs">Condividi</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
