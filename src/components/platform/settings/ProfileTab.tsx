"use client"

import { useState, Dispatch, SetStateAction } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Upload, Eye, EyeOff } from "lucide-react"
import { useZodValidation } from "@/hooks/useZodValidation"
import { FormError } from "@/components/ui/form-error"
import { profileSchema, passwordChangeSchema } from "@/lib/validations/settings"
import { cn } from "@/lib/utils"

interface ProfileData {
  firstName: string
  lastName: string
  email: string
  bio: string
}

interface PasswordData {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

interface ProfileTabProps {
  profileData: ProfileData
  setProfileData: Dispatch<SetStateAction<ProfileData>>
  passwordData: PasswordData
  setPasswordData: Dispatch<SetStateAction<PasswordData>>
  onProfileSave: () => void
  onPasswordSave: () => void
}

export function ProfileTab({
  profileData,
  setProfileData,
  passwordData,
  setPasswordData,
  onProfileSave,
  onPasswordSave
}: ProfileTabProps) {
  const [showPassword, setShowPassword] = useState(false)
  const profileValidation = useZodValidation(profileSchema)
  const passwordValidation = useZodValidation(passwordChangeSchema)

  const handleReset = () => {
    setProfileData({
      firstName: "Filippo",
      lastName: "Rossi",
      email: "filippo.rossi@email.com",
      bio: "UX/UI Designer in formazione. Appassionato di design systems e accessibilità."
    })
    profileValidation.clearErrors()
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" })
    passwordValidation.clearErrors()
  }

  const handleSave = () => {
    onProfileSave()
    if (passwordData.currentPassword || passwordData.newPassword) {
      onPasswordSave()
    }
  }

  return (
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
              onClick={handleReset}
            >
              Annulla
            </Button>
            <Button
              onClick={handleSave}
              disabled={profileValidation.hasErrors || passwordValidation.hasErrors}
              className="bg-gradient-to-r from-[hsl(var(--indigo))] to-[hsl(var(--indigo)_/_0.8)]"
            >
              Salva Modifiche
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
