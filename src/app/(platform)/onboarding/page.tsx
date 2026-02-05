"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  User,
  Video,
  BookOpen,
  Headphones,
  Target,
  Calendar,
  Linkedin,
  Github,
  Figma,
  Upload,
  Check,
  ArrowRight,
  Sparkles,
  Brain,
  AlertCircle,
  ChevronRight,
  Loader2
} from "lucide-react"
import { useZodValidation } from "@/hooks/useZodValidation"
import { FormError } from "@/components/ui/form-error"
import { step2Schema, step3Schema } from "@/lib/validations/onboarding"
import { cn } from "@/lib/utils"

const learningPreferences = [
  { id: "video", label: "Video lezioni", icon: Video },
  { id: "reading", label: "Letture e articoli", icon: BookOpen },
  { id: "audio", label: "Audio/Podcast", icon: Headphones },
  { id: "practice", label: "Esercizi pratici", icon: Target }
]

const accessibilityNeeds = [
  { id: "dyslexia", label: "Dislessia" },
  { id: "adhd", label: "ADHD" },
  { id: "other", label: "Altro" },
  { id: "none", label: "Nessuna" }
]

const availabilityOptions = [
  { id: "full-time", label: "Full-time (lun-ven 9-18)" },
  { id: "part-time", label: "Part-time sera" },
  { id: "weekend", label: "Weekend" }
]

const totalSteps = 5

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    photo: "",
    learningPrefs: [] as string[],
    accessibility: "none",
    otherAccessibility: "",
    goal: "",
    dreamCompanies: [] as string[],
    availability: "",
    linkedinConnected: false,
    githubConnected: false,
    figmaConnected: false
  })

  // Fix H3: Navigation error handling states
  const [isNavigating, setIsNavigating] = useState(false)
  const [navError, setNavError] = useState<string | null>(null)

  const progress = (step / totalSteps) * 100

  // Validation setup (only for steps 2 & 3)
  const stepSchemas = [null, null, step2Schema, step3Schema, null, null]
  const currentSchema = stepSchemas[step - 1]
  const validation = currentSchema
    ? useZodValidation(currentSchema)
    : { errors: {}, validate: () => true, getError: () => undefined, clearErrors: () => {}, hasErrors: false }

  const toggleLearningPref = (pref: string) => {
    const current = formData.learningPrefs
    if (current.includes(pref)) {
      setFormData({ ...formData, learningPrefs: current.filter(p => p !== pref) })
    } else {
      setFormData({ ...formData, learningPrefs: [...current, pref] })
    }
  }

  const addCompany = (company: string) => {
    if (company && !formData.dreamCompanies.includes(company)) {
      setFormData({ ...formData, dreamCompanies: [...formData.dreamCompanies, company] })
    }
  }

  const removeCompany = (company: string) => {
    setFormData({
      ...formData,
      dreamCompanies: formData.dreamCompanies.filter(c => c !== company)
    })
  }

  const handleNext = async () => {
    // Validate only steps 2 and 3
    if (currentSchema && !validation.validate(formData)) return

    if (step < totalSteps) {
      validation.clearErrors() // Clear errors when moving to next step
      setStep(step + 1)
    } else {
      // Fix H3: Complete onboarding with error handling
      setIsNavigating(true)
      setNavError(null)

      try {
        router.push("/pre-assessment")
        // Wait a bit to ensure navigation started
        await new Promise(resolve => setTimeout(resolve, 500))
      } catch (error) {
        console.error('Navigation failed:', error)
        setNavError("Non siamo riusciti a proseguire al prossimo step. Potrebbe essere un problema temporaneo.")
      } finally {
        setIsNavigating(false)
      }
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  return (
    <div className="min-h-screen grain-texture flex items-center justify-center p-4">
      <div className="w-full max-w-3xl space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[hsl(var(--indigo))] to-[hsl(var(--amber))] flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl mb-4">
            Benvenuto! 👋
          </h1>
          <p className="text-xl text-muted-foreground">
            Completiamo il tuo profilo per personalizzare l'esperienza
          </p>
        </motion.div>

        {/* Progress */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
        >
          <div className="flex items-center justify-between mb-2 text-sm">
            <span className="text-muted-foreground">Step {step} di {totalSteps}</span>
            <span className="font-semibold text-[hsl(var(--indigo))]">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </motion.div>

        {/* Form Card */}
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-2xl font-display">
                {step === 1 && "Foto Profilo"}
                {step === 2 && "Preferenze di Apprendimento"}
                {step === 3 && "Obiettivi Professionali"}
                {step === 4 && "Disponibilità"}
                {step === 5 && "Connessioni"}
              </CardTitle>
              <CardDescription>
                {step === 1 && "Carica una foto o importala da LinkedIn"}
                {step === 2 && "Come preferisci studiare? Seleziona tutte le opzioni che ti rappresentano"}
                {step === 3 && "Dove vuoi arrivare professionalmente?"}
                {step === 4 && "Quando puoi partecipare alle lezioni?"}
                {step === 5 && "Collega i tuoi account per un'esperienza ottimale"}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Step 1: Photo */}
              {step === 1 && (
                <div className="flex flex-col items-center gap-6">
                  <Avatar className="h-32 w-32 border-4 border-[hsl(var(--indigo)_/_0.2)]">
                    {formData.photo ? (
                      <AvatarImage src={formData.photo} />
                    ) : (
                      <AvatarFallback className="bg-gradient-to-br from-[hsl(var(--indigo))] to-[hsl(var(--amber))] text-white text-3xl font-semibold">
                        FR
                      </AvatarFallback>
                    )}
                  </Avatar>

                  <div className="flex gap-3">
                    <Button variant="outline" className="gap-2">
                      <Upload className="w-4 h-4" />
                      Upload Foto
                    </Button>
                    <Button variant="outline" className="gap-2">
                      <Linkedin className="w-4 h-4" />
                      Usa da LinkedIn
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 2: Learning Preferences */}
              {step === 2 && (
                <div className="space-y-6">
                  <div className="space-y-3">
                    <Label>Come preferisci studiare?</Label>
                    <div className="grid md:grid-cols-2 gap-3">
                      {learningPreferences.map((pref) => {
                        const Icon = pref.icon
                        const isSelected = formData.learningPrefs.includes(pref.id)
                        return (
                          <button
                            key={pref.id}
                            type="button"
                            onClick={() => toggleLearningPref(pref.id)}
                            className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-all text-left ${
                              isSelected
                                ? "border-[hsl(var(--indigo)_/_0.5)] bg-[hsl(var(--indigo)_/_0.05)]"
                                : "border-border hover:border-[hsl(var(--indigo)_/_0.2)]"
                            }`}
                          >
                            <div className={`p-2 rounded-lg ${
                              isSelected ? "bg-[hsl(var(--indigo)_/_0.1)]" : "bg-muted"
                            }`}>
                              <Icon className="w-5 h-5" />
                            </div>
                            <span className="flex-1">{pref.label}</span>
                            {isSelected && <Check className="w-5 h-5 text-[hsl(var(--indigo))]" />}
                          </button>
                        )
                      })}
                    </div>
                    <FormError message={validation.getError("learningPrefs")} />
                  </div>

                  <div className="space-y-3">
                    <Label>Hai difficoltà di apprendimento che dovremmo conoscere?</Label>
                    <div className="grid md:grid-cols-2 gap-3">
                      {accessibilityNeeds.map((need) => (
                        <label
                          key={need.id}
                          className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                            formData.accessibility === need.id
                              ? "border-[hsl(var(--amber)_/_0.5)] bg-[hsl(var(--amber)_/_0.05)]"
                              : "border-border hover:border-[hsl(var(--amber)_/_0.2)]"
                          }`}
                        >
                          <input
                            type="radio"
                            name="accessibility"
                            value={need.id}
                            checked={formData.accessibility === need.id}
                            onChange={(e) => setFormData({ ...formData, accessibility: e.target.value })}
                            className="w-4 h-4"
                          />
                          <span>{need.label}</span>
                        </label>
                      ))}
                    </div>
                    <FormError message={validation.getError("accessibility")} />

                    {formData.accessibility === "other" && (
                      <>
                        <Input
                          id="otherAccessibility"
                          placeholder="Specifica..."
                          value={formData.otherAccessibility}
                          onChange={(e) => setFormData({ ...formData, otherAccessibility: e.target.value })}
                          className={validation.getError("otherAccessibility") ? "border-destructive" : ""}
                          aria-invalid={!!validation.getError("otherAccessibility")}
                        />
                        <FormError message={validation.getError("otherAccessibility")} />
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Step 3: Professional Goals */}
              {step === 3 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="goal">Cosa vuoi fare dopo il master?</Label>
                    <Select value={formData.goal} onValueChange={(val) => setFormData({ ...formData, goal: val })}>
                      <SelectTrigger className={validation.getError("goal") ? "border-destructive" : ""}>
                        <SelectValue placeholder="Seleziona..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="product-designer">Product Designer in startup tech</SelectItem>
                        <SelectItem value="ux-researcher">UX Researcher</SelectItem>
                        <SelectItem value="ui-designer">UI Designer</SelectItem>
                        <SelectItem value="design-lead">Design Lead/Manager</SelectItem>
                        <SelectItem value="freelance">Freelance Designer</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormError message={validation.getError("goal")} />
                  </div>

                  <div className="space-y-3">
                    <Label>Aziende dove sogni di lavorare</Label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Es: Spotify, Google, Shopify..."
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            addCompany((e.target as HTMLInputElement).value)
                            ;(e.target as HTMLInputElement).value = ""
                          }
                        }}
                      />
                    </div>
                    {formData.dreamCompanies.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {formData.dreamCompanies.map((company) => (
                          <Badge
                            key={company}
                            variant="secondary"
                            className="px-3 py-1 cursor-pointer hover:bg-destructive/10"
                            onClick={() => removeCompany(company)}
                          >
                            {company}
                            <span className="ml-2">×</span>
                          </Badge>
                        ))}
                      </div>
                    )}
                    <FormError message={validation.getError("dreamCompanies")} />
                    <p className="text-xs text-muted-foreground">
                      Premi Invio per aggiungere un'azienda
                    </p>
                  </div>
                </div>
              )}

              {/* Step 4: Availability */}
              {step === 4 && (
                <div className="space-y-3">
                  <Label>Quando puoi partecipare alle lezioni?</Label>
                  <div className="space-y-3">
                    {availabilityOptions.map((option) => (
                      <label
                        key={option.id}
                        className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          formData.availability === option.id
                            ? "border-[hsl(var(--indigo)_/_0.5)] bg-[hsl(var(--indigo)_/_0.05)]"
                            : "border-border hover:border-[hsl(var(--indigo)_/_0.2)]"
                        }`}
                      >
                        <input
                          type="radio"
                          name="availability"
                          value={option.id}
                          checked={formData.availability === option.id}
                          onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                          className="w-4 h-4"
                        />
                        <Calendar className="w-5 h-5" />
                        <span>{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 5: Connections */}
              {step === 5 && (
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-[hsl(var(--indigo)_/_0.05)] border-2 border-[hsl(var(--indigo)_/_0.2)]">
                    <p className="text-sm">
                      <Brain className="w-4 h-4 inline mr-2" />
                      Collegare i tuoi account ci permette di personalizzare meglio l'esperienza e importare automaticamente progetti e certificazioni
                    </p>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full justify-between h-auto py-4"
                    onClick={() => setFormData({ ...formData, linkedinConnected: !formData.linkedinConnected })}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-[#0077B5]/10">
                        <Linkedin className="w-5 h-5 text-[#0077B5]" />
                      </div>
                      <div className="text-left">
                        <div className="font-semibold">Collega LinkedIn</div>
                        <div className="text-xs text-muted-foreground">Badge automatici sul profilo</div>
                      </div>
                    </div>
                    {formData.linkedinConnected ? (
                      <Badge className="bg-[hsl(var(--sage))]">Collegato</Badge>
                    ) : (
                      <ArrowRight className="w-4 h-4" />
                    )}
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full justify-between h-auto py-4"
                    onClick={() => setFormData({ ...formData, githubConnected: !formData.githubConnected })}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-muted">
                        <Github className="w-5 h-5" />
                      </div>
                      <div className="text-left">
                        <div className="font-semibold">Collega GitHub</div>
                        <div className="text-xs text-muted-foreground">Portfolio progetti</div>
                      </div>
                    </div>
                    {formData.githubConnected ? (
                      <Badge className="bg-[hsl(var(--sage))]">Collegato</Badge>
                    ) : (
                      <ArrowRight className="w-4 h-4" />
                    )}
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full justify-between h-auto py-4"
                    onClick={() => setFormData({ ...formData, figmaConnected: !formData.figmaConnected })}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-[#F24E1E]/10">
                        <Figma className="w-5 h-5 text-[#F24E1E]" />
                      </div>
                      <div className="text-left">
                        <div className="font-semibold">Collega Figma</div>
                        <div className="text-xs text-muted-foreground">Import design work</div>
                      </div>
                    </div>
                    {formData.figmaConnected ? (
                      <Badge className="bg-[hsl(var(--sage))]">Collegato</Badge>
                    ) : (
                      <ArrowRight className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              )}

              {/* Fix H3: Navigation Error Alert */}
              {navError && (
                <Alert variant="destructive" className="mt-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Impossibile Continuare</AlertTitle>
                  <AlertDescription>
                    {navError}
                  </AlertDescription>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setNavError(null)}
                    >
                      Chiudi
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleNext}
                      disabled={isNavigating}
                    >
                      Riprova
                    </Button>
                    <Button
                      variant="link"
                      size="sm"
                      onClick={() => window.location.href = "/pre-assessment"}
                    >
                      Navigazione Manuale
                      <ChevronRight className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                </Alert>
              )}

              {/* Navigation */}
              <div className="flex items-center justify-between pt-6 border-t">
                {step > 1 ? (
                  <Button type="button" variant="outline" onClick={handleBack}>
                    Indietro
                  </Button>
                ) : (
                  <div />
                )}

                <Button
                  onClick={handleNext}
                  disabled={isNavigating}
                  className="bg-gradient-to-r from-[hsl(var(--indigo))] to-[hsl(var(--indigo)_/_0.8)]"
                >
                  {isNavigating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Continuando...
                    </>
                  ) : (
                    <>
                      {step === totalSteps ? "Completa Setup" : "Continua"}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
