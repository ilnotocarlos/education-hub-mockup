'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertTriangle, LayoutDashboard, RefreshCw, MessageSquare, ArrowLeft } from 'lucide-react'

export default function PlatformError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log to console (future: Sentry)
    console.error('Platform Error:', error)
  }, [error])

  return (
    <div className="min-h-screen grain-texture flex items-center justify-center p-4 bg-background">
      <Card className="max-w-lg border-2 border-[hsl(var(--amber)_/_0.3)] shadow-xl">
        <CardHeader>
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[hsl(var(--amber)_/_0.1)] flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-[hsl(var(--amber))]" />
          </div>
          <CardTitle className="text-2xl font-display text-center">
            Si è verificato un errore
          </CardTitle>
          <CardDescription className="text-center">
            Non ti preoccupare, i tuoi progressi sono salvati. Prova una di queste soluzioni:
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button
            onClick={reset}
            className="w-full bg-gradient-to-r from-[hsl(var(--indigo))] to-[hsl(var(--indigo)_/_0.8)] hover:opacity-90"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Riprova
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => window.location.href = '/dashboard'}
          >
            <LayoutDashboard className="w-4 h-4 mr-2" />
            Vai alla Dashboard
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Torna Indietro
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => window.location.href = 'mailto:support@educationhub.com?subject=Errore Piattaforma&body=Ho riscontrato un errore nella piattaforma.'}
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Segnala Problema
          </Button>
          {process.env.NODE_ENV === 'development' && (
            <details className="mt-4 p-3 rounded-lg bg-muted text-xs">
              <summary className="cursor-pointer font-semibold">Dettagli Tecnici (Dev Only)</summary>
              <pre className="mt-2 whitespace-pre-wrap overflow-auto max-h-40">{error.message}</pre>
            </details>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
