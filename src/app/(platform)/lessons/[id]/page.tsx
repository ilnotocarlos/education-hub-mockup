"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  ArrowLeft,
  Play,
  Pause,
  Settings,
  BookOpen,
  Headphones,
  Video,
  FileText,
  CheckCircle2,
  MessageCircle,
  Bookmark,
  ChevronRight
} from "lucide-react"

export default function LessonPage() {
  const [contentMode, setContentMode] = useState<"video-text" | "text" | "audio" | "video">("video-text")
  const [isPlaying, setIsPlaying] = useState(false)
  const [accessibilityMode, setAccessibilityMode] = useState(false)
  const [progress, setProgress] = useState(42)
  const [quizAnswer, setQuizAnswer] = useState("")
  const [currentSection, setCurrentSection] = useState(1)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <div className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between flex-wrap gap-4">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Indietro
          </Button>

          <div className="flex-1 mx-8 min-w-[200px]">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="font-medium">Lesson 1.2: Design Thinking Process</span>
              <span className="text-gray-600">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Bookmark className="w-4 h-4 mr-2" />
              Salva
            </Button>
            <Button variant="outline" size="sm" className="hidden md:flex">
              <MessageCircle className="w-4 h-4 mr-2" />
              AI Tutor
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Lesson Header */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <Badge>Settimana 1</Badge>
              <Badge variant="outline">60 min</Badge>
              <Badge variant="outline">UX/UI Master</Badge>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              🎓 Lesson 1.2: Design Thinking Process
            </h1>
          </div>

          {/* Content Preferences */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">🎛️ Preferenze Contenuto</h3>
              <p className="text-sm text-gray-600 mb-4">
                Come vuoi fruire questa lezione? Scegli il formato che preferisci.
              </p>

              <Tabs value={contentMode} onValueChange={(v) => setContentMode(v as "video-text" | "text" | "audio" | "video")}>
                <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full">
                  <TabsTrigger value="video-text" className="text-xs md:text-sm">
                    <Video className="w-4 h-4 mr-1 md:mr-2" />
                    Video + Testo
                  </TabsTrigger>
                  <TabsTrigger value="text" className="text-xs md:text-sm">
                    <FileText className="w-4 h-4 mr-1 md:mr-2" />
                    Solo Testo
                  </TabsTrigger>
                  <TabsTrigger value="audio" className="text-xs md:text-sm">
                    <Headphones className="w-4 h-4 mr-1 md:mr-2" />
                    Solo Audio
                  </TabsTrigger>
                  <TabsTrigger value="video" className="text-xs md:text-sm">
                    <Play className="w-4 h-4 mr-1 md:mr-2" />
                    Solo Video
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="flex flex-col md:flex-row items-start md:items-center justify-between mt-4 pt-4 border-t gap-4">
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">Velocità:</span>
                    <select className="text-sm border rounded px-2 py-1 bg-white">
                      <option>0.75x</option>
                      <option>1.0x</option>
                      <option>1.25x</option>
                      <option>1.5x</option>
                      <option>2.0x</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">Dimensione Font:</span>
                    <select className="text-sm border rounded px-2 py-1 bg-white">
                      <option>Standard</option>
                      <option>Grande</option>
                      <option>Extra Grande</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Switch
                    id="accessibility"
                    checked={accessibilityMode}
                    onCheckedChange={setAccessibilityMode}
                  />
                  <Label htmlFor="accessibility" className="cursor-pointer text-sm md:text-base">
                    ♿ Modalità Accessibilità
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Accessibility Banner */}
          {accessibilityMode && (
            <Card className="mb-6 border-blue-200 bg-blue-50">
              <CardContent className="p-4">
                <h4 className="font-semibold text-blue-900 mb-2">
                  ♿ Modalità Accessibilità Attiva
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm text-blue-800">
                  <div>✓ Font leggibile</div>
                  <div>✓ Spaziatura 2x</div>
                  <div>✓ Alto contrasto</div>
                  <div>✓ No animazioni</div>
                  <div>✓ Focus visibile</div>
                  <div>✓ Sottotitoli video</div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Lesson Content */}
          <Card className="mb-6">
            <CardContent className={`p-8 ${accessibilityMode ? 'leading-relaxed' : ''}`}>
              <div className="mb-6 text-center">
                <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                  Sezione {currentSection} di 4
                </Badge>
              </div>

              <h2 className={`text-2xl font-bold text-gray-900 mb-6 text-center ${accessibilityMode ? 'text-3xl mb-8' : ''}`}>
                Introduzione al Design Thinking
              </h2>

              {/* Video Player */}
              {(contentMode === "video-text" || contentMode === "video") && (
                <div className="mb-8">
                  <div className="aspect-video bg-gray-900 rounded-lg relative overflow-hidden shadow-lg">
                    {/* Video placeholder */}
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-900 to-pink-900">
                      <Button
                        size="lg"
                        className="rounded-full w-16 h-16 bg-white hover:bg-gray-100 shadow-xl"
                        onClick={() => setIsPlaying(!isPlaying)}
                      >
                        {isPlaying ? (
                          <Pause className="w-8 h-8 text-gray-900" />
                        ) : (
                          <Play className="w-8 h-8 text-gray-900 ml-1" />
                        )}
                      </Button>
                    </div>

                    {/* Video Controls */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                      <div className="flex items-center gap-2 md:gap-4">
                        <Button size="sm" variant="ghost" className="text-white" onClick={() => setIsPlaying(!isPlaying)}>
                          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </Button>
                        <div className="flex-1">
                          <Progress value={25} className="h-1 bg-white/20" />
                        </div>
                        <span className="text-white text-xs md:text-sm">2:35 / 10:00</span>
                        <Button size="sm" variant="ghost" className="text-white hidden md:flex">
                          CC
                        </Button>
                        <Button size="sm" variant="ghost" className="text-white">
                          <Settings className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-2 flex-wrap">
                    <Badge variant="outline">📝 Transcript disponibile</Badge>
                    <Badge variant="outline">🎧 Audio disponibile</Badge>
                    {accessibilityMode && <Badge variant="outline" className="bg-blue-100">♿ Sottotitoli attivi</Badge>}
                  </div>
                </div>
              )}

              {/* Audio Player */}
              {contentMode === "audio" && (
                <div className="mb-8">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg p-8 text-white text-center">
                    <Headphones className="w-16 h-16 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Modalità Audio</h3>
                    <p className="text-sm opacity-90 mb-6">Ascolta la lezione mentre fai altro</p>

                    <div className="space-y-4">
                      <div className="flex items-center justify-center gap-4">
                        <Button size="lg" variant="secondary" className="rounded-full w-14 h-14">
                          <Play className="w-6 h-6 ml-1" />
                        </Button>
                      </div>

                      <div className="flex items-center gap-4 max-w-md mx-auto">
                        <span className="text-sm">0:00</span>
                        <Progress value={0} className="h-2 bg-white/20" />
                        <span className="text-sm">10:00</span>
                      </div>

                      <div className="flex justify-center gap-2">
                        <Button size="sm" variant="secondary">0.75x</Button>
                        <Button size="sm" variant="secondary">1x</Button>
                        <Button size="sm" variant="secondary">1.5x</Button>
                        <Button size="sm" variant="secondary">2x</Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Text Content */}
              {(contentMode === "video-text" || contentMode === "text") && (
                <div className={`prose prose-lg max-w-none ${accessibilityMode ? 'text-lg leading-loose' : ''}`}>
                  <h3 className={accessibilityMode ? 'text-2xl mb-6' : ''}>🎯 Cos'è il Design Thinking?</h3>

                  <p className={accessibilityMode ? 'mb-6' : ''}>
                    Il Design Thinking è un approccio iterativo alla risoluzione di
                    problemi complessi, centrato sull'utente finale. Non è solo un processo,
                    ma una mentalità che mette le persone al centro dell'innovazione.
                  </p>

                  <div className={`bg-purple-50 border-l-4 border-purple-500 p-4 my-6 ${accessibilityMode ? 'p-6 my-8 border-l-8' : ''}`}>
                    <p className={`font-semibold mb-2 ${accessibilityMode ? 'text-lg mb-4' : ''}`}>💡 CONCETTO CHIAVE</p>
                    <p className={`mb-0 ${accessibilityMode ? 'text-base' : ''}`}>
                      Design Thinking = Processo NON lineare. Non segui steps 1→2→3,
                      ma vai avanti e indietro tra le fasi based on learning.
                    </p>
                  </div>

                  <div className={`bg-white border-2 border-gray-200 rounded-lg p-6 my-6 ${accessibilityMode ? 'p-8 my-8 border-4' : ''}`}>
                    <h4 className={`text-center mb-4 ${accessibilityMode ? 'text-xl mb-6' : ''}`}>Le 5 Fasi del Design Thinking</h4>
                    <div className="flex flex-wrap justify-center items-center gap-4">
                      {["Empathize", "Define", "Ideate", "Prototype", "Test"].map((step, i) => (
                        <div key={step} className="flex items-center">
                          <div className={`bg-purple-100 border-2 border-purple-500 rounded-full px-4 py-2 font-semibold ${accessibilityMode ? 'border-4 px-6 py-3 text-lg' : ''}`}>
                            {step}
                          </div>
                          {i < 4 && <ChevronRight className={`text-gray-400 mx-2 ${accessibilityMode ? 'w-8 h-8' : 'w-6 h-6'}`} />}
                        </div>
                      ))}
                    </div>
                    <p className={`text-center text-sm text-gray-600 mt-4 ${accessibilityMode ? 'text-base mt-6' : ''}`}>
                      Processo iterativo - puoi tornare indietro in qualsiasi momento
                    </p>
                  </div>

                  {/* Audio Option */}
                  <div className={`bg-blue-50 rounded-lg p-4 my-6 ${accessibilityMode ? 'p-6 my-8' : ''}`}>
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div className="flex items-center gap-3">
                        <Headphones className={`text-blue-600 ${accessibilityMode ? 'w-8 h-8' : 'w-6 h-6'}`} />
                        <div>
                          <p className={`font-medium ${accessibilityMode ? 'text-lg' : ''}`}>Ascolta questa sezione</p>
                          <p className="text-sm text-gray-600">Narrazione AI • 3 min</p>
                        </div>
                      </div>
                      <Button size="sm">
                        <Play className="w-4 h-4 mr-2" />
                        Play
                      </Button>
                    </div>
                  </div>

                  {/* Book Extract - Content Mashup */}
                  <div className={`bg-amber-50 border-2 border-amber-200 rounded-lg p-6 my-6 ${accessibilityMode ? 'p-8 my-8 border-4' : ''}`}>
                    <div className="flex items-start gap-3">
                      <BookOpen className={`text-amber-600 flex-shrink-0 mt-1 ${accessibilityMode ? 'w-8 h-8' : 'w-6 h-6'}`} />
                      <div>
                        <p className={`font-semibold mb-2 ${accessibilityMode ? 'text-lg mb-4' : ''}`}>
                          📚 Approfondimento (Contenuto Casa Editrice)
                        </p>
                        <p className={`text-sm text-gray-600 mb-3 ${accessibilityMode ? 'text-base mb-4' : ''}`}>
                          Dal libro "Design Thinking for Beginners" di Tim Brown (IDEO)
                        </p>
                        <blockquote className={`border-l-4 border-amber-500 pl-4 italic text-gray-700 ${accessibilityMode ? 'border-l-8 pl-6 text-base not-italic' : ''}`}>
                          "Il Design Thinking è emerso negli anni '60 come metodologia
                          formale per l'innovazione. L'approccio si basa sulla convinzione
                          che i problemi complessi richiedano soluzioni creative che mettano
                          l'utente al centro del processo di progettazione."
                        </blockquote>
                        <Button variant="link" className={`mt-2 px-0 ${accessibilityMode ? 'text-base underline' : ''}`}>
                          Continua lettura (5 min) →
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* External Resources */}
                  <div className={`border-2 border-gray-200 rounded-lg p-6 my-6 ${accessibilityMode ? 'p-8 my-8 border-4' : ''}`}>
                    <h4 className={`font-semibold mb-4 ${accessibilityMode ? 'text-xl mb-6' : ''}`}>🔗 Risorse Extra</h4>
                    <div className="space-y-3">
                      <a href="#" className={`flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors ${accessibilityMode ? 'p-4 ring-2 ring-transparent hover:ring-purple-300' : ''}`}>
                        <FileText className={`text-gray-600 ${accessibilityMode ? 'w-6 h-6' : 'w-5 h-5'}`} />
                        <div>
                          <p className={`font-medium ${accessibilityMode ? 'text-lg' : ''}`}>Design Thinking Toolkit (IDEO)</p>
                          <p className="text-sm text-gray-600">PDF • 2 MB</p>
                        </div>
                      </a>
                      <a href="#" className={`flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors ${accessibilityMode ? 'p-4 ring-2 ring-transparent hover:ring-purple-300' : ''}`}>
                        <Video className={`text-gray-600 ${accessibilityMode ? 'w-6 h-6' : 'w-5 h-5'}`} />
                        <div>
                          <p className={`font-medium ${accessibilityMode ? 'text-lg' : ''}`}>TED Talk: Tim Brown on Design Thinking</p>
                          <p className="text-sm text-gray-600">Video • 18 min</p>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* Quick Quiz */}
              <div className={`bg-green-50 border-2 border-green-200 rounded-lg p-6 mt-8 ${accessibilityMode ? 'p-8 mt-12 border-4' : ''}`}>
                <h3 className={`font-semibold text-lg mb-4 ${accessibilityMode ? 'text-2xl mb-6' : ''}`}>❓ Verifica la Comprensione</h3>
                <p className={`mb-4 ${accessibilityMode ? 'text-lg mb-6' : ''}`}>Il Design Thinking è un processo:</p>

                <RadioGroup value={quizAnswer} onValueChange={setQuizAnswer}>
                  <div className="space-y-3">
                    <div>
                      <RadioGroupItem value="linear" id="linear" className="peer sr-only" />
                      <Label
                        htmlFor="linear"
                        className={`flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-white peer-data-[state=checked]:border-green-500 peer-data-[state=checked]:bg-white ${accessibilityMode ? 'p-6 border-4 text-lg ring-2 ring-transparent focus-within:ring-purple-500' : ''}`}
                      >
                        A. Lineare - segui steps sequenziali
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="iterative" id="iterative" className="peer sr-only" />
                      <Label
                        htmlFor="iterative"
                        className={`flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-white peer-data-[state=checked]:border-green-500 peer-data-[state=checked]:bg-white ${accessibilityMode ? 'p-6 border-4 text-lg ring-2 ring-transparent focus-within:ring-purple-500' : ''}`}
                      >
                        B. Iterativo - vai avanti/indietro tra fasi
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="random" id="random" className="peer sr-only" />
                      <Label
                        htmlFor="random"
                        className={`flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-white peer-data-[state=checked]:border-green-500 peer-data-[state=checked]:bg-white ${accessibilityMode ? 'p-6 border-4 text-lg ring-2 ring-transparent focus-within:ring-purple-500' : ''}`}
                      >
                        C. Randomico - fai quello che vuoi
                      </Label>
                    </div>
                  </div>
                </RadioGroup>

                {quizAnswer === "iterative" && (
                  <div className={`mt-4 p-4 bg-white rounded-lg border-2 border-green-500 ${accessibilityMode ? 'mt-6 p-6 border-4' : ''}`}>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className={`text-green-500 flex-shrink-0 ${accessibilityMode ? 'w-8 h-8' : 'w-6 h-6'}`} />
                      <div>
                        <p className={`font-semibold text-green-900 ${accessibilityMode ? 'text-xl mb-3' : ''}`}>✅ Corretto!</p>
                        <p className={`text-sm text-gray-700 mt-1 ${accessibilityMode ? 'text-base mt-2' : ''}`}>
                          Esattamente. Il Design Thinking è un processo iterativo dove
                          puoi tornare indietro e ripetere fasi basandoti sugli insights ottenuti.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {quizAnswer && quizAnswer !== "iterative" && (
                  <div className={`mt-4 p-4 bg-white rounded-lg border-2 border-red-500 ${accessibilityMode ? 'mt-6 p-6 border-4' : ''}`}>
                    <div className="flex items-start gap-3">
                      <div className={`flex-shrink-0 ${accessibilityMode ? 'text-2xl' : 'text-xl'}`}>❌</div>
                      <div>
                        <p className={`font-semibold text-red-900 ${accessibilityMode ? 'text-xl mb-3' : ''}`}>Non proprio...</p>
                        <p className={`text-sm text-gray-700 mt-1 ${accessibilityMode ? 'text-base mt-2' : ''}`}>
                          Riprova! Pensa alle parole chiave menzionate nella lezione.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Navigation */}
              <div className={`flex flex-col sm:flex-row justify-between items-center mt-8 pt-8 border-t gap-4 ${accessibilityMode ? 'mt-12 pt-12' : ''}`}>
                <Button variant="outline" disabled={currentSection === 1} onClick={() => setCurrentSection(prev => prev - 1)}>
                  ← Sezione Precedente
                </Button>
                <div className="text-sm text-gray-600">
                  Sezione {currentSection} di 4
                </div>
                <Button onClick={() => setCurrentSection(prev => Math.min(prev + 1, 4))}>
                  {currentSection === 4 ? 'Completa Lezione' : 'Continua a Sezione ' + (currentSection + 1)}
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Progress Indicator */}
          <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Ottimo lavoro! 👏</p>
                  <p className="text-sm text-gray-600">
                    Hai completato {currentSection} di 4 sezioni di questa lezione
                  </p>
                </div>
                <Button variant="outline">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Hai domande? Chiedi all'AI Tutor
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
