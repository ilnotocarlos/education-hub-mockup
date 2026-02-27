"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Navigation } from "@/components/shared/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  User,
  Mail,
  Phone,
  GraduationCap,
  Briefcase,
  Target,
  Upload,
  Calendar,
  CheckCircle2,
  ArrowRight,
  Sparkles
} from "lucide-react"
import { useZodValidation } from "@/hooks/useZodValidation"
import { FormError } from "@/components/ui/form-error"
import {
  applicationStep1Schema,
  applicationStep2Schema,
  applicationStep3Schema,
  applicationStep4Schema,
  applicationStep5Schema
} from "@/lib/validations/application"
import { cn } from "@/lib/utils"

const experienceLevels = [
  { value: "none", label: "Nessuna esperienza lavorativa" },
  { value: "internship", label: "Stage/tirocinio (< 6 mesi)" },
  { value: "junior", label: "Junior (6 mesi - 2 anni)" },
  { value: "mid", label: "Mid-level (2-5 anni)" }
]

const cohortDates = [
  { value: "2026-03-10", label: "10 Marzo 2026", available: 8 },
  { value: "2026-05-05", label: "5 Maggio 2026", available: 18 }
]

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const }
  }
}

export default function ApplicationPage() {
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    degree: "",
    field: "",
    experience: "",
    motivation: "",
    portfolio: "",
    cohortDate: ""
  })

  const totalSteps = 5
  const progress = (step / totalSteps) * 100

  // Validation setup
  const stepSchemas = [
    applicationStep1Schema,
    applicationStep2Schema,
    applicationStep3Schema,
    applicationStep4Schema,
    applicationStep5Schema
  ]
  const { errors, validate, getError, clearErrors } = useZodValidation(stepSchemas[step - 1])

  const updateField = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate current step before proceeding
    if (!validate(formData)) return

    if (step < totalSteps) {
      clearErrors() // Clear errors when moving to next step
      setStep(step + 1)
    } else {
      // Final submission
      setSubmitted(true)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen grain-texture">
        <Navigation />

        <div className="editorial-grid py-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto text-center"
          >
            <Card className="border-2 border-[hsl(var(--sage)_/_0.3)]">
              <CardContent className="p-12">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-[hsl(var(--sage))] to-[hsl(var(--sage)_/_0.8)] flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10 text-white" />
                </div>

                <h1 className="text-3xl md:text-4xl mb-4">
                  Candidatura Ricevuta! 🎉
                </h1>

                <p className="text-xl text-muted-foreground mb-8">
                  Grazie {formData.firstName}! Abbiamo ricevuto la tua candidatura per UX/UI Design Master.
                </p>

                <div className="p-6 rounded-xl bg-[hsl(var(--indigo)_/_0.05)] border-2 border-[hsl(var(--indigo)_/_0.2)] text-left space-y-4 mb-8">
                  <h3 className="font-display text-xl font-semibold">Prossimi Step:</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[hsl(var(--sage))] flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold">Candidatura ricevuta</p>
                        <p className="text-sm text-muted-foreground">Oggi</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full border-2 border-[hsl(var(--indigo))] flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold">Colloquio di orientamento</p>
                        <p className="text-sm text-muted-foreground">Entro 3 giorni</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full border-2 border-[hsl(var(--indigo))] flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold">Esito selezione</p>
                        <p className="text-sm text-muted-foreground">Entro 5 giorni</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    📧 Email di conferma inviata a: <strong>{formData.email}</strong>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    📞 Ti contatteremo al: <strong>{formData.phone}</strong>
                  </p>
                </div>

                <div className="mt-8 pt-8 border-t">
                  <p className="text-sm text-muted-foreground mb-4">
                    Nel frattempo, puoi:
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button variant="outline">
                      Esplora Syllabus
                    </Button>
                    <Button variant="outline">
                      Alumni Stories
                    </Button>
                    <Button variant="outline">
                      Join Discord
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen grain-texture">
      <Navigation />

      <div className="editorial-grid py-8">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <Badge className="mb-4 px-4 py-2 bg-[hsl(var(--indigo)_/_0.1)] border-[hsl(var(--indigo)_/_0.2)] text-[hsl(var(--indigo))]">
              <Sparkles className="w-3 h-3 mr-2" />
              Candidatura UX/UI Design Master
            </Badge>
            <h1 className="mb-4">
              Il Tuo Viaggio Inizia Qui
            </h1>
            <p className="text-xl text-muted-foreground">
              Completa la candidatura in {totalSteps} step. Ci vogliono circa 5 minuti.
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

          {/* Form */}
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-2xl font-display flex items-center gap-3">
                  {step === 1 && <><User className="w-6 h-6 text-[hsl(var(--indigo))]" /> Informazioni Base</>}
                  {step === 2 && <><GraduationCap className="w-6 h-6 text-[hsl(var(--amber))]" /> Background</>}
                  {step === 3 && <><Briefcase className="w-6 h-6 text-[hsl(var(--sage))]" /> Esperienza</>}
                  {step === 4 && <><Target className="w-6 h-6 text-[hsl(var(--gold))]" /> Motivazione</>}
                  {step === 5 && <><Calendar className="w-6 h-6 text-[hsl(var(--indigo))]" /> Preferenze</>}
                </CardTitle>
              </CardHeader>

              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-6">
                  {/* Step 1: Basic Info */}
                  {step === 1 && (
                    <>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">Nome</Label>
                          <Input
                            id="firstName"
                            value={formData.firstName}
                            onChange={(e) => updateField("firstName", e.target.value)}
                            placeholder="Mario"
                            className={getError("firstName") ? "border-destructive" : ""}
                            aria-invalid={!!getError("firstName")}
                          />
                          <FormError message={getError("firstName")} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Cognome</Label>
                          <Input
                            id="lastName"
                            value={formData.lastName}
                            onChange={(e) => updateField("lastName", e.target.value)}
                            placeholder="Rossi"
                            className={getError("lastName") ? "border-destructive" : ""}
                            aria-invalid={!!getError("lastName")}
                          />
                          <FormError message={getError("lastName")} />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => updateField("email", e.target.value)}
                            placeholder="mario.rossi@email.com"
                            className={cn("pl-10", getError("email") && "border-destructive")}
                            aria-invalid={!!getError("email")}
                          />
                        </div>
                        <FormError message={getError("email")} />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Telefono</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => updateField("phone", e.target.value)}
                            placeholder="+39 333 1234567"
                            className={cn("pl-10", getError("phone") && "border-destructive")}
                            aria-invalid={!!getError("phone")}
                          />
                        </div>
                        <FormError message={getError("phone")} />
                      </div>
                    </>
                  )}

                  {/* Step 2: Background */}
                  {step === 2 && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="degree">Ultimo titolo di studio</Label>
                        <Select value={formData.degree} onValueChange={(val) => updateField("degree", val)}>
                          <SelectTrigger className={getError("degree") ? "border-destructive" : ""}>
                            <SelectValue placeholder="Seleziona..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="diploma">Diploma</SelectItem>
                            <SelectItem value="triennale">Laurea Triennale</SelectItem>
                            <SelectItem value="magistrale">Laurea Magistrale</SelectItem>
                            <SelectItem value="master">Master</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormError message={getError("degree")} />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="field">Indirizzo di studio</Label>
                        <Input
                          id="field"
                          value={formData.field}
                          onChange={(e) => updateField("field", e.target.value)}
                          placeholder="Es: Marketing e Comunicazione"
                          className={getError("field") ? "border-destructive" : ""}
                          aria-invalid={!!getError("field")}
                        />
                        <FormError message={getError("field")} />
                      </div>
                    </>
                  )}

                  {/* Step 3: Experience */}
                  {step === 3 && (
                    <div className="space-y-4">
                      <Label>Livello di esperienza lavorativa</Label>
                      <div className="space-y-3">
                        {experienceLevels.map((level) => (
                          <label
                            key={level.value}
                            className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                              formData.experience === level.value
                                ? "border-[hsl(var(--indigo)_/_0.5)] bg-[hsl(var(--indigo)_/_0.05)]"
                                : "border-border hover:border-[hsl(var(--indigo)_/_0.2)]"
                            }`}
                          >
                            <input
                              type="radio"
                              name="experience"
                              value={level.value}
                              checked={formData.experience === level.value}
                              onChange={(e) => updateField("experience", e.target.value)}
                              className="w-4 h-4"
                            />
                            <span>{level.label}</span>
                          </label>
                        ))}
                      </div>
                      <FormError message={getError("experience")} />
                    </div>
                  )}

                  {/* Step 4: Motivation */}
                  {step === 4 && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="motivation">
                          Perché vuoi fare questo master?
                        </Label>
                        <Textarea
                          id="motivation"
                          value={formData.motivation}
                          onChange={(e) => updateField("motivation", e.target.value)}
                          placeholder="Racconta la tua motivazione, cosa ti spinge a voler diventare UX/UI Designer..."
                          className={cn(
                            "min-h-40 resize-none",
                            getError("motivation") && "border-destructive"
                          )}
                          maxLength={500}
                          aria-invalid={!!getError("motivation")}
                        />
                        <p className="text-xs text-muted-foreground text-right">
                          {formData.motivation.length}/500 caratteri
                        </p>
                        <FormError message={getError("motivation")} />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="portfolio">Portfolio (opzionale)</Label>
                        <Input
                          id="portfolio"
                          value={formData.portfolio}
                          onChange={(e) => updateField("portfolio", e.target.value)}
                          placeholder="Link Behance, Dribbble, sito personale..."
                          className={getError("portfolio") ? "border-destructive" : ""}
                          aria-invalid={!!getError("portfolio")}
                        />
                        <FormError message={getError("portfolio")} />
                        <p className="text-xs text-muted-foreground">
                          Se hai già progetti di design, condividili con noi
                        </p>
                      </div>
                    </>
                  )}

                  {/* Step 5: Preferences */}
                  {step === 5 && (
                    <div className="space-y-4">
                      <Label>Preferenza data inizio</Label>
                      <div className="space-y-3">
                        {cohortDates.map((cohort) => (
                          <label
                            key={cohort.value}
                            className={`flex items-center justify-between gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                              formData.cohortDate === cohort.value
                                ? "border-[hsl(var(--indigo)_/_0.5)] bg-[hsl(var(--indigo)_/_0.05)]"
                                : "border-border hover:border-[hsl(var(--indigo)_/_0.2)]"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <input
                                type="radio"
                                name="cohortDate"
                                value={cohort.value}
                                checked={formData.cohortDate === cohort.value}
                                onChange={(e) => updateField("cohortDate", e.target.value)}
                                className="w-4 h-4"
                              />
                              <span className="font-semibold">{cohort.label}</span>
                            </div>
                            <Badge
                              variant={cohort.available < 10 ? "destructive" : "outline"}
                              className={cohort.available < 10 ? "bg-[hsl(var(--amber))]" : ""}
                            >
                              {cohort.available} posti
                            </Badge>
                          </label>
                        ))}
                      </div>
                      <FormError message={getError("cohortDate")} />
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex items-center justify-between pt-6 border-t">
                    {step > 1 ? (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setStep(step - 1)}
                      >
                        Indietro
                      </Button>
                    ) : (
                      <div />
                    )}

                    <Button
                      type="submit"
                      className="bg-gradient-to-r from-[hsl(var(--indigo))] to-[hsl(var(--indigo)_/_0.8)] text-white"
                    >
                      {step === totalSteps ? "Invia Candidatura" : "Continua"}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
