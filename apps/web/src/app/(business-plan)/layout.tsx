import { BPSidebar } from "@/components/business-plan/bp-sidebar"
import { BPHeader } from "@/components/business-plan/bp-header"

export default function BusinessPlanLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen pt-8">
      <BPSidebar />
      <div className="flex-1 min-w-0">
        <BPHeader />
        <main className="p-6 max-w-6xl">{children}</main>
      </div>
    </div>
  )
}
