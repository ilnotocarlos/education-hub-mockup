'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertTriangle, Save, RefreshCw, MessageSquare, LayoutDashboard } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'

export default function OnboardingError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log to console (future: Sentry)
    console.error('Onboarding Error:', error)

    // Attempt to save form data to localStorage (recovery mechanism)
    try {
      const formData = sessionStorage.getItem('onboardingFormData')
      if (formData) {
        localStorage.setItem('onboardingFormBackup', formData)
        localStorage.setItem('onboardingFormBackupTimestamp', new Date().toISOString())
      }
    } catch (e) {
      console.error('Failed to backup form data:', e)
    }
  }, [error])

  const hasBackup = typeof window !== 'undefined' && localStorage.getItem('onboardingFormBackup')

  return (
    <div className="min-h-screen grain-texture flex items-center justify-center p-4 bg-background">
      <Card className="max-w-lg border-2 border-[hsl(var(--amber)_/_0.3)] shadow-xl">
        <CardHeader>
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[hsl(var(--amber)_/_0.1)] flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-[hsl(var(--amber))]" />
          </div>
          <CardTitle className="text-2xl font-display text-center">
            Errore durante l'onboarding
          </CardTitle>
          <CardDescription className="text-center">
            Non perdere i tuoi progressi! Abbiamo salvato i tuoi dati automaticamente.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {hasBackup && (
            <Alert className="bg-[hsl(var(--sage)_/_0.1)] border-[hsl(var(--sage)_/_0.3)]">
              <Save className="h-4 w-4 text-[hsl(var(--sage))]" />
              <AlertDescription className="text-sm">
                I tuoi progressi sono stati salvati. Riprova per recuperarli automaticamente.
              </AlertDescription>
            </Alert>
          )}
          <Button
            onClick={reset}
            className="w-full bg-gradient-to-r from-[hsl(var(--indigo))] to-[hsl(var(--indigo)_/_0.8)] hover:opacity-90"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Riprova (Recupera i tuoi dati)
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
            onClick={() => window.location.href = 'mailto:support@educationhub.com?subject=Errore Onboarding&body=Ho riscontrato un errore durante l\'onboarding.'}
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Contatta il Supporto
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
