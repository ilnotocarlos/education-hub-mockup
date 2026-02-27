"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function SignupPage() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Le password non coincidono")
      return
    }

    if (formData.password.length < 8) {
      setError("La password deve essere di almeno 8 caratteri")
      return
    }

    setIsLoading(true)

    try {
      // Create user via API
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Errore durante la registrazione")
      }

      // Auto-login after signup
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      })

      if (result?.error) {
        setError("Account creato ma errore durante l'accesso. Prova a fare login.")
      } else {
        router.push("/onboarding")
        router.refresh()
      }
    } catch (error: any) {
      setError(error.message || "Si è verificato un errore. Riprova.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialSignup = async (provider: "google" | "linkedin") => {
    setIsLoading(true)
    await signIn(provider, { callbackUrl: "/onboarding" })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="font-display text-3xl font-bold text-[hsl(var(--indigo))]">
          Crea il tuo account
        </h1>
        <p className="text-muted-foreground">
          Inizia il tuo percorso formativo con Education Hub
        </p>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Signup Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nome completo</Label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Mario Rossi"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="mario.rossi@example.com"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            required
            disabled={isLoading}
          />
          <p className="text-xs text-muted-foreground">
            Minimo 8 caratteri
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Conferma password</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            disabled={isLoading}
          />
        </div>

        {/* Terms Checkbox */}
        <div className="flex items-start space-x-2 pt-2">
          <input
            type="checkbox"
            id="terms"
            required
            disabled={isLoading}
            className="mt-1 h-4 w-4 rounded border-gray-300 text-[hsl(var(--indigo))] focus:ring-[hsl(var(--indigo))]"
          />
          <Label htmlFor="terms" className="text-sm font-normal leading-relaxed">
            Accetto i{" "}
            <Link href="/terms" className="text-[hsl(var(--indigo))] hover:underline">
              Termini e Condizioni
            </Link>{" "}
            e la{" "}
            <Link href="/privacy" className="text-[hsl(var(--indigo))] hover:underline">
              Privacy Policy
            </Link>
          </Label>
        </div>

        <Button
          type="submit"
          className="w-full bg-[hsl(var(--indigo))] hover:bg-[hsl(var(--indigo))]/90 text-white"
          disabled={isLoading}
        >
          {isLoading ? "Registrazione in corso..." : "Crea account"}
        </Button>
      </form>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-4 text-muted-foreground">
            Oppure registrati con
          </span>
        </div>
      </div>

      {/* Social Signup Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => handleSocialSignup("google")}
          disabled={isLoading}
          className="border-gray-300"
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Google
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={() => handleSocialSignup("linkedin")}
          disabled={isLoading}
          className="border-gray-300"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
          LinkedIn
        </Button>
      </div>

      {/* Login Link */}
      <div className="text-center text-sm">
        <span className="text-muted-foreground">Hai già un account? </span>
        <Link
          href="/login"
          className="font-medium text-[hsl(var(--indigo))] hover:underline"
        >
          Accedi
        </Link>
      </div>
    </div>
  )
}
