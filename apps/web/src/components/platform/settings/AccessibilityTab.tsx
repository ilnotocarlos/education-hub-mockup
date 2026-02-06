"use client"

import { Dispatch, SetStateAction } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"

interface AccessibilityState {
  dyslexiaMode: boolean
  focusMode: boolean
  highContrast: boolean
  reducedMotion: boolean
}

interface AccessibilityTabProps {
  accessibility: AccessibilityState
  setAccessibility: Dispatch<SetStateAction<AccessibilityState>>
}

export function AccessibilityTab({ accessibility, setAccessibility }: AccessibilityTabProps) {
  return (
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
  )
}
