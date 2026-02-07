import * as React from "react"
import { PlatformNav } from "@/components/platform/platform-nav"
import { Footer } from "@/components/shared/footer"

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <PlatformNav />
      <main className="min-h-screen bg-[hsl(var(--background))]">
        {children}
      </main>
      <Footer />
    </>
  )
}
