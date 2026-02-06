import {
  AppSidebar,
  AppHeader,
  PageHeader,
  Card,
  Button,
  Badge
} from "@edu-hub/ui-neutral"
import { LayoutDashboard, Users, BookOpen, Calendar, Settings } from "lucide-react"

export default function PlanningDashboard() {
  const navItems = [
    { title: "Dashboard", href: "/", icon: LayoutDashboard },
    { title: "Curricula", href: "/curricula", icon: BookOpen },
    { title: "Cohorts", href: "/cohorts", icon: Users },
    { title: "Schedule", href: "/schedule", icon: Calendar },
    { title: "Settings", href: "/settings", icon: Settings },
  ]

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <AppSidebar
        brandName="Education Planning"
        navItems={navItems}
        currentPath="/"
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <AppHeader
          appName="Education Planning"
          notifications={3}
        />

        <main className="flex-1 p-6 overflow-y-auto bg-[hsl(var(--background))]">
          <PageHeader
            title="Dashboard"
            description="Gestisci curricula, cohorts e planning educativo"
            breadcrumbs={[
              { label: "Home", href: "/" },
              { label: "Dashboard" },
            ]}
            actions={
              <Button variant="default">
                Crea Nuovo Corso
              </Button>
            }
          />

          {/* Dashboard Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {/* Stats Cards */}
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[hsl(var(--muted-foreground))]">Corsi Attivi</p>
                  <h3 className="text-3xl font-bold mt-2">12</h3>
                </div>
                <Badge variant="success">+2 questo mese</Badge>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[hsl(var(--muted-foreground))]">Studenti Totali</p>
                  <h3 className="text-3xl font-bold mt-2">248</h3>
                </div>
                <Badge variant="default">+45 questo mese</Badge>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[hsl(var(--muted-foreground))]">Docenti</p>
                  <h3 className="text-3xl font-bold mt-2">18</h3>
                </div>
                <Badge variant="outline">Stabile</Badge>
              </div>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="mt-6 p-6">
            <h2 className="text-lg font-semibold mb-4">Azioni Rapide</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button variant="outline" className="justify-start">
                <BookOpen className="mr-2 h-4 w-4" />
                Aggiungi Curriculum
              </Button>
              <Button variant="outline" className="justify-start">
                <Users className="mr-2 h-4 w-4" />
                Crea Cohort
              </Button>
              <Button variant="outline" className="justify-start">
                <Calendar className="mr-2 h-4 w-4" />
                Programma Lezione
              </Button>
              <Button variant="outline" className="justify-start">
                <Settings className="mr-2 h-4 w-4" />
                Configurazioni
              </Button>
            </div>
          </Card>

          {/* Recent Activity */}
          <Card className="mt-6 p-6">
            <h2 className="text-lg font-semibold mb-4">Attività Recente</h2>
            <div className="space-y-3">
              {[
                { action: "Nuovo corso creato", course: "UX/UI Design Master", time: "2 ore fa" },
                { action: "Cohort aggiornato", course: "Data Science Bootcamp", time: "5 ore fa" },
                { action: "Curriculum modificato", course: "Full Stack Web Dev", time: "1 giorno fa" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b border-[hsl(var(--border))] last:border-0">
                  <div>
                    <p className="text-sm font-medium">{item.action}</p>
                    <p className="text-sm text-[hsl(var(--muted-foreground))]">{item.course}</p>
                  </div>
                  <span className="text-xs text-[hsl(var(--muted-foreground))]">{item.time}</span>
                </div>
              ))}
            </div>
          </Card>
        </main>
      </div>
    </div>
  )
}
