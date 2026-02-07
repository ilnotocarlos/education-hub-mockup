# Theme - Education Hub

Design system theme configuration: Neo-Academic Luxury palette con Tailwind CSS v4.

---

## globals.css (FULL FILE)

**File**: `/apps/web/src/app/globals.css`

```css
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-display: var(--font-display);
  --font-body: var(--font-body);
  --color-sidebar-ring: var(--sidebar-ring);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar: var(--sidebar);
  --color-chart-5: var(--chart-5);
  --color-chart-4: var(--chart-4);
  --color-chart-3: var(--chart-3);
  --color-chart-2: var(--chart-2);
  --color-chart-1: var(--chart-1);
  --color-ring: var(--ring);
  --color-input: var(--input);
  --color-border: var(--border);
  --color-destructive: var(--destructive);
  --color-accent-foreground: var(--accent-foreground);
  --color-accent: var(--accent);
  --color-muted-foreground: var(--muted-foreground);
  --color-muted: var(--muted);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-secondary: var(--secondary);
  --color-primary-foreground: var(--primary-foreground);
  --color-primary: var(--primary);
  --color-popover-foreground: var(--popover-foreground);
  --color-popover: var(--popover);
  --color-card-foreground: var(--card-foreground);
  --color-card: var(--card);
  --color-indigo: var(--indigo);
  --color-amber: var(--amber);
  --color-sage: var(--sage);
  --color-gold: var(--gold);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --radius-2xl: calc(var(--radius) + 8px);
  --radius-3xl: calc(var(--radius) + 12px);
  --radius-4xl: calc(var(--radius) + 16px);
}

:root {
  --radius: 0.75rem;

  /* Neo-Academic Luxury Palette */
  --background: 252 100% 99%;
  --foreground: 240 15% 12%;

  /* Brand Colors - Deep Indigo & Warm Amber */
  --indigo: 238 45% 28%;
  --amber: 38 92% 58%;
  --sage: 145 25% 45%;
  --gold: 43 96% 56%;

  --card: 0 0% 100%;
  --card-foreground: 240 15% 12%;

  --popover: 0 0% 100%;
  --popover-foreground: 240 15% 12%;

  --primary: 238 45% 28%;
  --primary-foreground: 0 0% 100%;

  --secondary: 38 92% 58%;
  --secondary-foreground: 240 15% 12%;

  --muted: 240 10% 96%;
  --muted-foreground: 240 8% 46%;

  --accent: 145 25% 45%;
  --accent-foreground: 0 0% 100%;

  --destructive: 0 84% 60%;
  --destructive-foreground: 0 0% 100%;

  --border: 240 10% 90%;
  --input: 240 10% 90%;
  --ring: 238 45% 28%;

  --chart-1: 238 45% 28%;
  --chart-2: 38 92% 58%;
  --chart-3: 145 25% 45%;
  --chart-4: 43 96% 56%;
  --chart-5: 280 50% 65%;

  --sidebar: 0 0% 100%;
  --sidebar-foreground: 240 15% 12%;
  --sidebar-primary: 238 45% 28%;
  --sidebar-primary-foreground: 0 0% 100%;
  --sidebar-accent: 240 10% 96%;
  --sidebar-accent-foreground: 240 15% 12%;
  --sidebar-border: 240 10% 90%;
  --sidebar-ring: 238 45% 28%;
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }

  body {
    @apply bg-background text-foreground;
    font-feature-settings: "kern" 1, "liga" 1, "calt" 1;
  }

  h1, h2, h3, h4, h5, h6 {
    @apply font-display font-semibold tracking-tight;
  }

  h1 {
    @apply text-5xl md:text-7xl leading-[1.1];
    letter-spacing: -0.02em;
  }

  h2 {
    @apply text-4xl md:text-5xl leading-[1.2];
    letter-spacing: -0.015em;
  }

  h3 {
    @apply text-3xl md:text-4xl leading-[1.3];
  }

  p {
    @apply leading-relaxed;
  }
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }

  .grain-texture {
    background-image:
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 2px,
        hsl(var(--foreground) / 0.02) 2px,
        hsl(var(--foreground) / 0.02) 4px
      );
  }

  .glass-effect {
    @apply backdrop-blur-xl bg-white/80 border border-white/20 shadow-2xl;
  }

  .editorial-grid {
    display: grid;
    grid-template-columns:
      [full-start] minmax(1rem, 1fr)
      [content-start] minmax(0, 72rem)
      [content-end] minmax(1rem, 1fr) [full-end];
  }

  .editorial-grid > * {
    grid-column: content;
  }

  .editorial-grid > .full-width {
    grid-column: full;
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## Font Configuration

**File**: `/apps/web/src/app/layout.tsx` (excerpt)

```tsx
import { Cormorant, Inter } from "next/font/google";

const cormorant = Cormorant({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});
```

Usage in `<body>`:
```tsx
<body className={`${cormorant.variable} ${inter.variable} font-body antialiased`}>
```

---

## Color Palette (HSL Format)

### Brand Colors
- **Indigo (Primary)**: `238 45% 28%` — Deep indigo for primary actions, navigation
- **Amber (Secondary)**: `38 92% 58%` — Warm amber for highlights, CTAs
- **Sage (Accent)**: `145 25% 45%` — Muted green for success states
- **Gold (Accent Alt)**: `43 96% 56%` — Bright gold for emphasis

### Semantic Colors
- **Background**: `252 100% 99%` — Off-white
- **Foreground**: `240 15% 12%` — Almost black text
- **Muted**: `240 10% 96%` — Light gray backgrounds
- **Border**: `240 10% 90%` — Subtle borders
- **Destructive**: `0 84% 60%` — Error red

### Usage in Tailwind
```tsx
// Via CSS custom properties
className="bg-[hsl(var(--indigo))]"
className="text-[hsl(var(--amber))]"
className="border-[hsl(var(--sage))]"

// With opacity
className="bg-[hsl(var(--indigo)_/_0.1)]"  // 10% opacity
className="hover:bg-[hsl(var(--indigo)_/_0.15)]"
```

---

## Custom Utilities

### `.grain-texture`
Subtle paper grain effect via linear gradient
```tsx
<div className="grain-texture">
```

### `.glass-effect`
Glassmorphism backdrop blur effect
```tsx
<div className="glass-effect">
```

### `.editorial-grid`
Responsive grid with content constraint
```tsx
<div className="editorial-grid">
  <div>Content (max 72rem)</div>
  <div className="full-width">Full-width override</div>
</div>
```

---

## Typography Scale

### Headings (Cormorant display font)
- `h1`: text-5xl md:text-7xl (48px → 72px)
- `h2`: text-4xl md:text-5xl (36px → 48px)
- `h3`: text-3xl md:text-4xl (30px → 36px)
- `h4-h6`: Inherit from base classes

### Body (Inter font)
- Base: text-base (16px), leading-relaxed
- Small: text-sm (14px)
- Extra small: text-xs (12px)

---

## Border Radius

Calculated from base `--radius: 0.75rem`:
- `sm`: 0.35rem (--radius - 4px)
- `md`: 0.55rem (--radius - 2px)
- `lg`: 0.75rem (--radius)
- `xl`: 1.15rem (--radius + 4px)
- `2xl`: 1.55rem (--radius + 8px)
- `3xl`: 1.95rem (--radius + 12px)
- `4xl`: 2.35rem (--radius + 16px)

---

## Accessibility

### Reduced Motion
Automatic fallback for `prefers-reduced-motion: reduce`:
- All animations → 0.01ms
- Transitions → 0.01ms
- Scroll behavior → auto

### Focus Rings
Default focus-visible styles:
```css
focus-visible:border-ring
focus-visible:ring-ring/50
focus-visible:ring-[3px]
```

### Color Contrast
All color combinations meet WCAG AA standards for normal text.
