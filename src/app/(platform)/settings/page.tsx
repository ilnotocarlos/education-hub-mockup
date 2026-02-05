"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Navigation } from "@/components/shared/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  User,
  Mail,
  Bell,
  Shield,
  Palette,
  Globe,
  CreditCard,
  Download,
  Trash2,
  Upload,
  Eye,
  EyeOff,
  CheckCircle2,
  Linkedin,
  Github,
  Figma,
  AlertTriangle,
  Settings as SettingsIcon
} from "lucide-react"
import { useZodValidation } from "@/hooks/useZodValidation"
import { FormError } from "@/components/ui/form-error"
import { profileSchema, passwordChangeSchema } from "@/lib/validations/settings"
import { cn } from "@/lib/utils"

export default function SettingsPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    lessonReminders: true,
    communityActivity: false,
    placementUpdates: true,
    newsletter: true
  })
  const [accessibility, setAccessibility] = useState({
    dyslexiaMode: false,
    focusMode: false,
    highContrast: false,
    reducedMotion: false
  })
  const [privacy, setPrivacy] = useState({
    profilePublic: true,
    showProgress: true,
    showCertificates: true,
    allowMessages: true
  })

  // Profile data and validation
  const [profileData, setProfileData] = useState({
    firstName: "Filippo",
    lastName: "Rossi",
    email: "filippo.rossi@email.com",
    bio: "UX/UI Designer in formazione. Appassionato di design systems e accessibilità."
  })
  const profileValidation = useZodValidation(profileSchema)

  // Password data and validation
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  })
  const passwordValidation = useZodValidation(passwordChangeSchema)

  // Save handlers
  const handleProfileSave = () => {
    if (!profileValidation.validate(profileData)) return
    console.log("Profile saved:", profileData)
    // TODO: API call to save profile
  }

  const handlePasswordSave = () => {
    if (!passwordValidation.validate(passwordData)) return
    console.log("Password changed")
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" })
    passwordValidation.clearErrors()
    // TODO: API call to change password
  }

  return (
    <div className="min-h-screen grain-texture">
      <Navigation />

      <div className="editorial-grid py-8 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="mb-2">Impostazioni</h1>
          <p className="text-xl text-muted-foreground">
            Gestisci il tuo account e le preferenze
          </p>
        </motion.div>

        {/* Tabs */}
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-6">
            <TabsTrigger value="profile" className="gap-2">
              <User className="w-4 h-4" />
              Profilo
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="w-4 h-4" />
              Notifiche
            </TabsTrigger>
            <TabsTrigger value="accessibility" className="gap-2">
              <Palette className="w-4 h-4" />
              Accessibilità
            </TabsTrigger>
            <TabsTrigger value="privacy" className="gap-2">
              <Shield className="w-4 h-4" />
              Privacy
            </TabsTrigger>
            <TabsTrigger value="connections" className="gap-2">
              <Globe className="w-4 h-4" />
              Connessioni
            </TabsTrigger>
            <TabsTrigger value="billing" className="gap-2">
              <CreditCard className="w-4 h-4" />
              Billing
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <div className="space-y-6">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-2xl font-display">
                    Informazioni Personali
                  </CardTitle>
                  <CardDescription>
                    Aggiorna le tue informazioni di base
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Avatar */}
                  <div className="flex items-center gap-6">
                    <Avatar className="h-24 w-24 border-4 border-[hsl(var(--indigo)_/_0.2)]">
                      <AvatarFallback className="bg-gradient-to-br from-[hsl(var(--indigo))] to-[hsl(var(--amber))] text-white text-3xl font-semibold">
                        FR
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <Button variant="outline" className="gap-2 mb-2">
                        <Upload className="w-4 h-4" />
                        Carica Nuova Foto
                      </Button>
                      <p className="text-sm text-muted-foreground">
                        JPG, PNG o GIF. Max 5MB.
                      </p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Nome</Label>
                      <Input
                        id="firstName"
                        value={profileData.firstName}
                        onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                        className={profileValidation.getError("firstName") ? "border-destructive" : ""}
                        aria-invalid={!!profileValidation.getError("firstName")}
                      />
                      <FormError message={profileValidation.getError("firstName")} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Cognome</Label>
                      <Input
                        id="lastName"
                        value={profileData.lastName}
                        onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                        className={profileValidation.getError("lastName") ? "border-destructive" : ""}
                        aria-invalid={!!profileValidation.getError("lastName")}
                      />
                      <FormError message={profileValidation.getError("lastName")} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      className={profileValidation.getError("email") ? "border-destructive" : ""}
                      aria-invalid={!!profileValidation.getError("email")}
                    />
                    <FormError message={profileValidation.getError("email")} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <textarea
                      id="bio"
                      className={cn(
                        "w-full min-h-24 p-3 rounded-lg border-2 border-border bg-background resize-none focus:outline-none focus:border-[hsl(var(--indigo)_/_0.3)]",
                        profileValidation.getError("bio") && "border-destructive"
                      )}
                      placeholder="Raccontaci qualcosa di te..."
                      value={profileData.bio}
                      onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                      aria-invalid={!!profileValidation.getError("bio")}
                    />
                    <FormError message={profileValidation.getError("bio")} />
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="font-semibold">Sicurezza</h3>

                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Password Attuale</Label>
                      <div className="relative">
                        <Input
                          id="currentPassword"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={passwordData.currentPassword}
                          onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                          className={passwordValidation.getError("currentPassword") ? "border-destructive" : ""}
                          aria-invalid={!!passwordValidation.getError("currentPassword")}
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                      <FormError message={passwordValidation.getError("currentPassword")} />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="newPassword">Nuova Password</Label>
                        <Input
                          id="newPassword"
                          type="password"
                          placeholder="••••••••"
                          value={passwordData.newPassword}
                          onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                          className={passwordValidation.getError("newPassword") ? "border-destructive" : ""}
                          aria-invalid={!!passwordValidation.getError("newPassword")}
                        />
                        <FormError message={passwordValidation.getError("newPassword")} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Conferma Password</Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          placeholder="••••••••"
                          value={passwordData.confirmPassword}
                          onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                          className={passwordValidation.getError("confirmPassword") ? "border-destructive" : ""}
                          aria-invalid={!!passwordValidation.getError("confirmPassword")}
                        />
                        <FormError message={passwordValidation.getError("confirmPassword")} />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setProfileData({
                          firstName: "Filippo",
                          lastName: "Rossi",
                          email: "filippo.rossi@email.com",
                          bio: "UX/UI Designer in formazione. Appassionato di design systems e accessibilità."
                        })
                        profileValidation.clearErrors()
                        setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" })
                        passwordValidation.clearErrors()
                      }}
                    >
                      Annulla
                    </Button>
                    <Button
                      onClick={() => {
                        handleProfileSave()
                        if (passwordData.currentPassword || passwordData.newPassword) {
                          handlePasswordSave()
                        }
                      }}
                      disabled={profileValidation.hasErrors || passwordValidation.hasErrors}
                      className="bg-gradient-to-r from-[hsl(var(--indigo))] to-[hsl(var(--indigo)_/_0.8)]"
                    >
                      Salva Modifiche
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-2xl font-display">
                  Preferenze Notifiche
                </CardTitle>
                <CardDescription>
                  Scegli come e quando vuoi ricevere aggiornamenti
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">Notifiche Email</p>
                      <p className="text-sm text-muted-foreground">
                        Ricevi aggiornamenti via email
                      </p>
                    </div>
                    <Switch
                      checked={notifications.email}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, email: checked })
                      }
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">Notifiche Push</p>
                      <p className="text-sm text-muted-foreground">
                        Notifiche nel browser
                      </p>
                    </div>
                    <Switch
                      checked={notifications.push}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, push: checked })
                      }
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">Reminder Lezioni</p>
                      <p className="text-sm text-muted-foreground">
                        Promemoria per live sessions e deadline
                      </p>
                    </div>
                    <Switch
                      checked={notifications.lessonReminders}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, lessonReminders: checked })
                      }
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">Attività Community</p>
                      <p className="text-sm text-muted-foreground">
                        Risposte ai tuoi post e menzioni
                      </p>
                    </div>
                    <Switch
                      checked={notifications.communityActivity}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, communityActivity: checked })
                      }
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">Placement Updates</p>
                      <p className="text-sm text-muted-foreground">
                        Nuove opportunità di lavoro e interview
                      </p>
                    </div>
                    <Switch
                      checked={notifications.placementUpdates}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, placementUpdates: checked })
                      }
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">Newsletter</p>
                      <p className="text-sm text-muted-foreground">
                        Tips, risorse e novità dal team
                      </p>
                    </div>
                    <Switch
                      checked={notifications.newsletter}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, newsletter: checked })
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Accessibility Tab */}
          <TabsContent value="accessibility">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-2xl font-display">
                  Accessibilità
                </CardTitle>
                <CardDescription>
                  Personalizza l'interfaccia per le tue esigenze
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">Modalità Dislessia</p>
                      <p className="text-sm text-muted-foreground">
                        Font OpenDyslexic e spaziatura maggiorata
                      </p>
                    </div>
                    <Switch
                      checked={accessibility.dyslexiaMode}
                      onCheckedChange={(checked) =>
                        setAccessibility({ ...accessibility, dyslexiaMode: checked })
                      }
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">Modalità Focus (ADHD)</p>
                      <p className="text-sm text-muted-foreground">
                        Riduci distrazioni e semplifica l'interfaccia
                      </p>
                    </div>
                    <Switch
                      checked={accessibility.focusMode}
                      onCheckedChange={(checked) =>
                        setAccessibility({ ...accessibility, focusMode: checked })
                      }
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">Alto Contrasto</p>
                      <p className="text-sm text-muted-foreground">
                        Aumenta il contrasto dei colori
                      </p>
                    </div>
                    <Switch
                      checked={accessibility.highContrast}
                      onCheckedChange={(checked) =>
                        setAccessibility({ ...accessibility, highContrast: checked })
                      }
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">Riduzione Movimento</p>
                      <p className="text-sm text-muted-foreground">
                        Disattiva animazioni e transizioni
                      </p>
                    </div>
                    <Switch
                      checked={accessibility.reducedMotion}
                      onCheckedChange={(checked) =>
                        setAccessibility({ ...accessibility, reducedMotion: checked })
                      }
                    />
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-[hsl(var(--indigo)_/_0.05)] border-2 border-[hsl(var(--indigo)_/_0.2)]">
                  <p className="text-sm">
                    💡 <strong>Tip:</strong> Puoi attivare/disattivare rapidamente la modalità accessibilità anche dal lesson viewer usando il pulsante dedicato.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy Tab */}
          <TabsContent value="privacy">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-2xl font-display">
                  Privacy & Sicurezza
                </CardTitle>
                <CardDescription>
                  Controlla chi può vedere le tue informazioni
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">Profilo Pubblico</p>
                      <p className="text-sm text-muted-foreground">
                        Altri studenti possono vedere il tuo profilo
                      </p>
                    </div>
                    <Switch
                      checked={privacy.profilePublic}
                      onCheckedChange={(checked) =>
                        setPrivacy({ ...privacy, profilePublic: checked })
                      }
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">Mostra Progresso</p>
                      <p className="text-sm text-muted-foreground">
                        Rendi visibile il tuo progresso nel corso
                      </p>
                    </div>
                    <Switch
                      checked={privacy.showProgress}
                      onCheckedChange={(checked) =>
                        setPrivacy({ ...privacy, showProgress: checked })
                      }
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">Mostra Certificati</p>
                      <p className="text-sm text-muted-foreground">
                        Certificati NFT visibili nel profilo pubblico
                      </p>
                    </div>
                    <Switch
                      checked={privacy.showCertificates}
                      onCheckedChange={(checked) =>
                        setPrivacy({ ...privacy, showCertificates: checked })
                      }
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">Permetti Messaggi</p>
                      <p className="text-sm text-muted-foreground">
                        Altri studenti possono inviarti messaggi diretti
                      </p>
                    </div>
                    <Switch
                      checked={privacy.allowMessages}
                      onCheckedChange={(checked) =>
                        setPrivacy({ ...privacy, allowMessages: checked })
                      }
                    />
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold mb-4">Gestione Dati</h3>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <Download className="w-4 h-4" />
                      Esporta I Miei Dati
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-2 text-destructive hover:bg-destructive/10">
                      <Trash2 className="w-4 h-4" />
                      Elimina Account
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Connections Tab */}
          <TabsContent value="connections">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-2xl font-display">
                  Account Collegati
                </CardTitle>
                <CardDescription>
                  Gestisci le connessioni con servizi esterni
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-lg border-2 border-[hsl(var(--sage)_/_0.3)] bg-[hsl(var(--sage)_/_0.05)]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-[#0077B5]/10">
                        <Linkedin className="w-5 h-5 text-[#0077B5]" />
                      </div>
                      <div>
                        <p className="font-semibold">LinkedIn</p>
                        <p className="text-sm text-muted-foreground">Collegato</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <CheckCircle2 className="w-5 h-5 text-[hsl(var(--sage))]" />
                      <Button variant="outline" size="sm">
                        Disconnetti
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg border-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-muted">
                        <Github className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-semibold">GitHub</p>
                        <p className="text-sm text-muted-foreground">Non collegato</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Connetti
                    </Button>
                  </div>
                </div>

                <div className="p-4 rounded-lg border-2 border-[hsl(var(--sage)_/_0.3)] bg-[hsl(var(--sage)_/_0.05)]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-[#F24E1E]/10">
                        <Figma className="w-5 h-5 text-[#F24E1E]" />
                      </div>
                      <div>
                        <p className="font-semibold">Figma</p>
                        <p className="text-sm text-muted-foreground">Collegato</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <CheckCircle2 className="w-5 h-5 text-[hsl(var(--sage))]" />
                      <Button variant="outline" size="sm">
                        Disconnetti
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Billing Tab */}
          <TabsContent value="billing">
            <div className="space-y-6">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-2xl font-display">
                    Subscription & Billing
                  </CardTitle>
                  <CardDescription>
                    Gestisci il tuo abbonamento e metodi di pagamento
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-6 rounded-xl bg-gradient-to-br from-[hsl(var(--indigo)_/_0.05)] to-transparent border-2 border-[hsl(var(--indigo)_/_0.2)]">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-display text-xl font-semibold mb-1">
                          UX/UI Design Master
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Piano Completo • Fatturazione mensile
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="font-display text-3xl font-bold">€750</div>
                        <div className="text-sm text-muted-foreground">/mese</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">
                        Prossimo addebito: 1 Giugno 2026
                      </p>
                      <Button variant="outline" size="sm">
                        Gestisci
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-semibold mb-4">Metodi di Pagamento</h3>
                    <div className="p-4 rounded-lg border-2 mb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-8 rounded bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
                            VISA
                          </div>
                          <div>
                            <p className="font-semibold">•••• 4242</p>
                            <p className="text-sm text-muted-foreground">Scade 12/2028</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <CheckCircle2 className="w-5 h-5 text-[hsl(var(--sage))]" />
                          <Button variant="ghost" size="sm">
                            Rimuovi
                          </Button>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full">
                      Aggiungi Metodo di Pagamento
                    </Button>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-semibold mb-4">Fatture</h3>
                    <div className="space-y-2">
                      {["Maggio 2026", "Aprile 2026", "Marzo 2026"].map((month) => (
                        <div key={month} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
                          <div>
                            <p className="font-semibold">{month}</p>
                            <p className="text-sm text-muted-foreground">€750,00</p>
                          </div>
                          <Button variant="ghost" size="sm" className="gap-2">
                            <Download className="w-3 h-3" />
                            Scarica
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-[hsl(var(--amber)_/_0.3)] bg-[hsl(var(--amber)_/_0.05)]">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-[hsl(var(--amber))] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold mb-1">Cancella Subscription</p>
                      <p className="text-sm text-muted-foreground mb-3">
                        Puoi cancellare in qualsiasi momento. L'accesso continuerà fino alla fine del periodo di fatturazione corrente.
                      </p>
                      <Button variant="outline" size="sm" className="text-destructive">
                        Cancella Subscription
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
