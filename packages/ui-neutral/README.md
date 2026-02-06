# @edu-hub/ui-neutral

Design system neutro B&W per le applicazioni interne di Education Hub (Planning, Teach, Insights, Faculty).

## 🎨 Filosofia Design

- **Palette**: Solo bianco, nero e grigi (neutral-50 → neutral-950)
- **Accenti**: Colori semantici minimal (blue per primary, green per success, red per error, yellow per warning)
- **Tipografia**: Inter font only
- **Stile**: Ispirato a Vercel Dashboard — pulito, moderno, professionale

## 📦 Installazione

```bash
pnpm add @edu-hub/ui-neutral
```

## 🚀 Utilizzo

### 1. Importare CSS Globals

Nel tuo layout root (`app/layout.tsx`):

```tsx
import "@edu-hub/ui-neutral/styles.css"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
```

### 2. Usare Componenti

```tsx
import { Button, Card, Badge } from "@edu-hub/ui-neutral"

export function MyComponent() {
  return (
    <Card>
      <h2>Dashboard</h2>
      <Button variant="default">Crea Nuovo</Button>
      <Badge variant="success">Attivo</Badge>
    </Card>
  )
}
```

### 3. Usare Layout Components

```tsx
import {
  AppSidebar,
  AppHeader,
  PageHeader,
} from "@edu-hub/ui-neutral"
import { Home, Users, Settings } from "lucide-react"

export default function InternalAppLayout({ children }) {
  const navItems = [
    { title: "Home", href: "/", icon: Home },
    { title: "Utenti", href: "/users", icon: Users },
    { title: "Impostazioni", href: "/settings", icon: Settings },
  ]

  return (
    <div className="flex h-screen">
      <AppSidebar brandName="Planning App" navItems={navItems} />
      <div className="flex-1 flex flex-col">
        <AppHeader appName="Education Planning" notifications={3} />
        <main className="flex-1 p-6 overflow-y-auto">
          <PageHeader
            title="Dashboard"
            description="Benvenuto nella tua area Planning"
            breadcrumbs={[
              { label: "Home", href: "/" },
              { label: "Dashboard" },
            ]}
          />
          {children}
        </main>
      </div>
    </div>
  )
}
```

## 📚 Componenti Disponibili

### Base Components
- `Button` — Pulsante con varianti (default, outline, ghost, destructive)
- `Input` — Campo input con error state
- `Card` — Card container con header/content/footer
- `Badge` — Badge per status/labels

### Form Components
- `Label` — Etichetta form accessibile
- `Select` — Dropdown select (Radix UI)
- `Textarea` — Area di testo
- `Checkbox` — Checkbox/toggle

### Data Components
- `Table` — Tabella responsive con header/body/footer
- `Tabs` — Tab navigation (Radix UI)
- `Dialog` — Modal/Dialog (Radix UI)
- `DropdownMenu` — Menu dropdown (Radix UI)

### Layout Components
- `AppSidebar` — Sidebar collapsible per app interne
- `AppHeader` — Header con notifiche e user menu
- `PageHeader` — Header pagina con breadcrumbs e azioni

## 🎨 CSS Variabili

Il design system espone variabili HSL utilizzabili in Tailwind:

```css
/* Grays */
--neutral-50 to --neutral-950

/* Primary/States */
--primary (blue-600)
--success (green-500)
--destructive (red-500)
--warning (yellow-500)

/* Semantic */
--background
--foreground
--card
--border
--muted
--accent
```

**Utilizzo**:
```tsx
<div className="bg-[hsl(var(--card))] border-[hsl(var(--border))]">
  <p className="text-[hsl(var(--muted-foreground))]">Testo secondario</p>
</div>
```

## 🛠️ Utility Classes

### Glassmorphism
```tsx
<div className="glass-effect">
  Effetto glass con blur e border sottile
</div>
```

### Scrollbar Custom
```tsx
<div className="scrollbar-thin overflow-y-auto">
  Scrollbar minimal stile Vercel
</div>
```

### Focus Ring
```tsx
<button className="focus-ring">
  Anello focus consistente
</button>
```

## 📝 Note

- **NON usare** questo package per l'area brand/marketing (usa `@edu-hub/ui` con colori Indigo/Amber/Sage/Gold)
- **Usare solo** per le 4 app interne: Planning, Teach, Insights, Faculty
- Il package esporta TypeScript source direttamente (no build), quindi serve Next.js 16+ con Turborepo

## 🔗 Related Packages

- `@edu-hub/types` — Tipi TypeScript condivisi
- `@edu-hub/config` — Configurazioni ESLint/TS condivise

---

**Maintainer**: Education Hub Tech Team
**License**: Private
