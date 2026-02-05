"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Download, CheckCircle2, AlertTriangle } from "lucide-react"

export function BillingTab() {
  return (
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
  )
}
