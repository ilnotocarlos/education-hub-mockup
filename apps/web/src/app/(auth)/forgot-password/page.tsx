"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Errore durante l'invio dell'email")
      }

      setIsSubmitted(true)
    } catch (error: any) {
      setError(error.message || "Si è verificato un errore. Riprova.")
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="space-y-6 text-center">
        {/* Success Icon */}
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {/* Success Message */}
        <div className="space-y-2">
          <h1 className="font-display text-3xl font-bold text-[hsl(var(--indigo))]">
            Email inviata
          </h1>
          <p className="text-muted-foreground">
            Abbiamo inviato le istruzioni per reimpostare la password a:
          </p>
          <p className="font-medium text-foreground">{email}</p>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-left space-y-2">
          <p className="font-medium text-blue-900">Prossimi passi:</p>
          <ol className="list-decimal list-inside space-y-1 text-blue-800">
            <li>Controlla la tua casella email</li>
            <li>Clicca sul link di reset che hai ricevuto</li>
            <li>Imposta una nuova password</li>
          </ol>
        </div>

        {/* Note */}
        <p className="text-sm text-muted-foreground">
          Non hai ricevuto l'email? Controlla la cartella spam o{" "}
          <button
            onClick={() => {
              setIsSubmitted(false)
              setEmail("")
            }}
            className="text-[hsl(var(--indigo))] hover:underline font-medium"
          >
            riprova
          </button>
        </p>

        {/* Back to Login */}
        <Link href="/login">
          <Button
            variant="outline"
            className="w-full border-gray-300"
          >
            Torna al login
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="font-display text-3xl font-bold text-[hsl(var(--indigo))]">
          Password dimenticata?
        </h1>
        <p className="text-muted-foreground">
          Inserisci la tua email e ti invieremo le istruzioni per reimpostarla
        </p>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Reset Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="mario.rossi@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-[hsl(var(--indigo))] hover:bg-[hsl(var(--indigo))]/90"
          disabled={isLoading}
        >
          {isLoading ? "Invio in corso..." : "Invia istruzioni"}
        </Button>
      </form>

      {/* Back to Login */}
      <div className="text-center">
        <Link
          href="/login"
          className="text-sm text-[hsl(var(--indigo))] hover:underline flex items-center justify-center gap-2"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M15 19l-7-7 7-7" />
          </svg>
          Torna al login
        </Link>
      </div>
    </div>
  )
}
