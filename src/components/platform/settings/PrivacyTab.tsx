"use client"

import { Dispatch, SetStateAction } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Download, Trash2 } from "lucide-react"

interface PrivacyState {
  profilePublic: boolean
  showProgress: boolean
  showCertificates: boolean
  allowMessages: boolean
}

interface PrivacyTabProps {
  privacy: PrivacyState
  setPrivacy: Dispatch<SetStateAction<PrivacyState>>
}

export function PrivacyTab({ privacy, setPrivacy }: PrivacyTabProps) {
  return (
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
  )
}
