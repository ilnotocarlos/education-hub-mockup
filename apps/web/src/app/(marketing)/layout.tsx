import * as React from "react"
import { MarketingNav } from "@/components/marketing/marketing-nav"
import { Footer } from "@/components/shared/footer"

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <MarketingNav />
      <main>{children}</main>
      <Footer />
    </>
  )
}
