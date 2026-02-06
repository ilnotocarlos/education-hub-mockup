import * as React from "react"
import { MarketingNav } from "@/components/marketing/marketing-nav"

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <MarketingNav />
      <main>{children}</main>
      {/* Footer will be added later */}
    </>
  )
}
