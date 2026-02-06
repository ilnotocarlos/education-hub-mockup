import {
  AppSidebar,
  AppHeader,
  PageHeader,
  Card,
  Button,
  Badge
} from "@edu-hub/ui-neutral"
import { LayoutDashboard, BookOpen, Calendar, Video, MessageSquare, Settings } from "lucide-react"

export default function TeachDashboard() {
  const navItems = [
    { title: "Dashboard", href: "/", icon: LayoutDashboard },
    { title: "Miei Corsi", href: "/courses", icon: BookOpen },
    { title: "Calendario", href: "/calendar", icon: Calendar },
    { title: "Registrazioni", href: "/recordings", icon: Video },
    { title: "Feedback", href: "/feedback", icon: MessageSquare },
    { title: "Settings", href: "/settings", icon: Settings },
  ]

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <AppSidebar
        brandName="Teach Plan"
        navItems={navItems}
        currentPath="/"
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <AppHeader
          appName="Teach Plan"
          notifications={5}
        />

        <main className="flex-1 p-6 overflow-y-auto bg-[hsl(var(--background))]">
          <PageHeader
            title="Dashboard Docente"
            description="Gestisci lezioni, contenuti e interazioni con gli studenti"
            breadcrumbs={[
              { label: "Home", href: "/" },
              { label: "Dashboard" },
            ]}
            actions={
              <Button variant="default">
                Crea Nuova Lezione
              </Button>
            }
          />

          {/* Dashboard Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {/* Stats Cards */}
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[hsl(var(--muted-foreground))]">Lezioni Oggi</p>
                  <h3 className="text-3xl font-bold mt-2">3</h3>
                </div>
                <Badge variant="default">2 upcoming</Badge>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[hsl(var(--muted-foreground))]">Studenti Attivi</p>
                  <h3 className="text-3xl font-bold mt-2">87</h3>
                </div>
                <Badge variant="success">92% attendance</Badge>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[hsl(var(--muted-foreground))]">Feedback Pending</p>
                  <h3 className="text-3xl font-bold mt-2">12</h3>
                </div>
                <Badge variant="warning">Da completare</Badge>
              </div>
            </Card>
          </div>

          {/* Upcoming Lessons */}
          <Card className="mt-6 p-6">
            <h2 className="text-lg font-semibold mb-4">Prossime Lezioni</h2>
            <div className="space-y-3">
              {[
                { title: "UX Research Methods", time: "Oggi, 14:00 - 16:00", students: 24 },
                { title: "Design Thinking Workshop", time: "Oggi, 17:00 - 19:00", students: 18 },
                { title: "Portfolio Review", time: "Domani, 10:00 - 12:00", students: 15 },
              ].map((lesson, i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b border-[hsl(var(--border))] last:border-0">
                  <div>
                    <p className="text-sm font-medium">{lesson.title}</p>
                    <p className="text-sm text-[hsl(var(--muted-foreground))]">{lesson.time}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[hsl(var(--muted-foreground))]">{lesson.students} studenti</span>
                    <Button variant="outline" size="sm">Dettagli</Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </main>
      </div>
    </div>
  )
}
