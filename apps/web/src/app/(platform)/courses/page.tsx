import * as React from "react"

export default function MyCoursesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-display text-4xl font-bold mb-2">
          I Miei Corsi
        </h1>
        <p className="text-lg text-[hsl(var(--muted-foreground))] mb-8">
          Visualizza e gestisci i tuoi corsi attivi.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Placeholder - Mock course card */}
          <div className="p-6 border border-border rounded-lg bg-card">
            <h3 className="font-semibold text-xl mb-2">UX/UI Design Master</h3>
            <p className="text-sm text-[hsl(var(--muted-foreground))] mb-4">
              In corso · 2/16 lezioni completate
            </p>
            <div className="w-full bg-[hsl(var(--muted))] h-2 rounded-full">
              <div
                className="bg-[hsl(var(--indigo))] h-2 rounded-full"
                style={{ width: "12.5%" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
