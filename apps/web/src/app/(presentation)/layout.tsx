export default function PresentationLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="presentation-theme bg-[hsl(240,10%,4%)] text-[hsl(30,6%,90%)] min-h-screen overflow-hidden pt-8">
      {children}
    </div>
  )
}
