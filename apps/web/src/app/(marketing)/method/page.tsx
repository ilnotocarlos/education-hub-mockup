import * as React from "react"

export default function MethodPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-display text-5xl font-bold mb-6">
            Il Nostro Metodo
          </h1>
          <p className="text-xl text-[hsl(var(--muted-foreground))] mb-12">
            Flipped Classroom + AI-Powered Learning + Real Projects
          </p>

          <div className="space-y-12">
            {/* Placeholder content */}
            <section>
              <h2 className="font-display text-3xl font-semibold mb-4">
                Flipped Classroom
              </h2>
              <p className="text-lg text-[hsl(var(--muted-foreground))]">
                Studio autonomo pre-lezione + pratica intensiva in aula.
              </p>
            </section>

            <section>
              <h2 className="font-display text-3xl font-semibold mb-4">
                AI Tutoring
              </h2>
              <p className="text-lg text-[hsl(var(--muted-foreground))]">
                Assistente AI personalizzato per ogni studente.
              </p>
            </section>

            <section>
              <h2 className="font-display text-3xl font-semibold mb-4">
                Real Projects
              </h2>
              <p className="text-lg text-[hsl(var(--muted-foreground))]">
                Progetti reali con aziende partner.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
