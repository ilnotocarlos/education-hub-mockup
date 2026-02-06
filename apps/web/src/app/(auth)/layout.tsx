import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Autenticazione | Education Hub",
  description: "Accedi o registrati per iniziare il tuo percorso formativo",
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(var(--indigo))] via-[hsl(var(--sage))] to-[hsl(var(--amber))] relative overflow-hidden">
      {/* Grain Texture Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Glass Panel */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
        {/* Logo */}
        <Link
          href="/"
          className="mb-8 font-display text-4xl font-bold text-white hover:text-white/90 transition-colors"
        >
          Education Hub
        </Link>

        {/* Auth Card Container */}
        <div className="w-full max-w-md">
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20">
            {children}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-8 text-center text-white/80 text-sm">
          <p>
            © 2026 Education Hub.{" "}
            <Link
              href="/privacy"
              className="underline hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
          </p>
        </footer>
      </div>
    </div>
  )
}
