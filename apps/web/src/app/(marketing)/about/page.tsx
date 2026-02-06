import * as React from "react"

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-display text-5xl font-bold mb-6">
            Chi Siamo
          </h1>
          <p className="text-xl text-[hsl(var(--muted-foreground))] mb-12">
            Colmiamo il gap tra potenziale umano e opportunità professionali.
          </p>

          <div className="space-y-12">
            {/* Placeholder content */}
            <section>
              <h2 className="font-display text-3xl font-semibold mb-4">
                La Nostra Mission
              </h2>
              <p className="text-lg text-[hsl(var(--muted-foreground))]">
                Trasformare l'educazione da trasferimento di nozioni a liberazione di talenti.
              </p>
            </section>

            <section>
              <h2 className="font-display text-3xl font-semibold mb-4">
                Il Team
              </h2>
              <p className="text-lg text-[hsl(var(--muted-foreground))]">
                Esperti di educazione, tecnologia e placement aziendale.
              </p>
            </section>

            <section>
              <h2 className="font-display text-3xl font-semibold mb-4">
                I Nostri Valori
              </h2>
              <p className="text-lg text-[hsl(var(--muted-foreground))]">
                Eccellenza, innovazione, inclusività e impatto sociale.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
