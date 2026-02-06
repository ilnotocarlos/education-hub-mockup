"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Linkedin, Github, Figma, CheckCircle2 } from "lucide-react"

export function ConnectionsTab() {
  return (
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
  )
}
