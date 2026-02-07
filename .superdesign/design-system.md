# Education Hub — Design System

## Product Context

Education Hub è una piattaforma educativa premium per la formazione professionale in Italia. Target: professionisti che cercano upskilling, aziende che investono in formazione dipendenti.

**Tone & Feel**: Neo-Academic Luxury — Eleganza educativa moderna che bilancia tradizione accademica con innovazione digitale. Sofisticata ma accessibile, premium ma non esclusiva.

## Key Pages & Architecture

### Marketing (Public)
- **Homepage** (`/`) — Value proposition, hero section, course showcase, testimonials
- **Discover** (`/discover`) — Interactive course discovery con assessment personalizzato
- **Product Page** (`/product`) — Dettaglio corso con curriculum, docenti, job placement stats
- **Apply** (`/apply`) — Application form multi-step con wizard UI

### Platform (Authenticated)
- **Dashboard** (`/dashboard`) — Hub centrale studente: progress overview, upcoming lessons, community feed
- **Lessons** (`/lessons/[id]`) — Lesson player: video, transcript, resources, AI tutor chat
- **Community** (`/community`) — Forum studenti, networking, study groups
- **Placement** (`/placement`) — Job board, CV builder, interview prep
- **Profile** (`/profile`) — Settings, certificates, learning history

## Visual Identity

### Typography

**Display Font (Headings)**: **Cormorant Garamond**
- Uso: H1, H2, H3, hero titles, section headings
- Peso: 400 (Regular), 600 (Semibold), 700 (Bold)
- Carattere: Serif elegante, reminiscenza accademica, alta leggibilità
- CSS: `font-family: var(--font-display, 'Cormorant Garamond', serif)`

**Body Font**: **Inter**
- Uso: Paragrafi, UI text, form labels, navigation
- Peso: 300 (Light), 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold)
- Carattere: Sans-serif moderna, ottima leggibilità su schermo
- CSS: `font-family: var(--font-body, 'Inter', system-ui, sans-serif)`

**Typography Scale**:
- Display: 3.5rem (56px) — Hero titles
- H1: 2.5rem (40px) — Page headings
- H2: 2rem (32px) — Section headings
- H3: 1.5rem (24px) — Subsection headings
- H4: 1.25rem (20px) — Card titles
- Body: 1rem (16px) — Paragraphs
- Small: 0.875rem (14px) — Captions, labels
- Tiny: 0.75rem (12px) — Meta info

### Color Palette (HSL)

**Brand Colors**:
- **Indigo** (Primary): `hsl(238, 45%, 28%)` — Deep, authoritative, trust
  - Uso: Primary buttons, nav active states, key CTAs, headings
- **Amber** (Secondary): `hsl(38, 92%, 58%)` — Warm, energetic, inviting
  - Uso: Secondary buttons, accents, highlights, badges
- **Sage** (Accent): `hsl(145, 25%, 45%)` — Natural, calming, growth
  - Uso: Success states, progress indicators, tertiary accents
- **Gold** (Accent Alt): `hsl(43, 96%, 56%)` — Premium, achievement, reward
  - Uso: Certificates, achievements, premium features

**Neutral Palette**:
- Background: `hsl(252, 100%, 99%)` — Off-white, soft
- Foreground: `hsl(240, 15%, 12%)` — Near-black, readable
- Muted: `hsl(240, 10%, 96%)` — Light gray backgrounds
- Muted Foreground: `hsl(240, 8%, 46%)` — Secondary text
- Border: `hsl(240, 8%, 90%)` — Subtle borders

**Semantic Colors**:
- Success: Sage (`hsl(145, 25%, 45%)`)
- Warning: Amber (`hsl(38, 92%, 58%)`)
- Error: `hsl(0, 72%, 51%)` — Red
- Info: Indigo (`hsl(238, 45%, 28%)`)

**Usage Rules**:
- **NEVER** use colors outside this palette
- **ALWAYS** use CSS variables: `hsl(var(--indigo))`, `hsl(var(--amber))`, etc.
- Maintain WCAG AA contrast ratios (4.5:1 for body, 3:1 for large text)
- Dark mode: invert lightness, keep hue/saturation

### Spacing Scale (Tailwind)

Base unit: `0.25rem` (4px)

- `0`: 0px
- `1`: 0.25rem (4px)
- `2`: 0.5rem (8px)
- `3`: 0.75rem (12px)
- `4`: 1rem (16px) — **Default padding/margin**
- `6`: 1.5rem (24px)
- `8`: 2rem (32px) — **Section spacing**
- `12`: 3rem (48px) — **Large section spacing**
- `16`: 4rem (64px)
- `24`: 6rem (96px) — **Hero spacing**

**Component Spacing**:
- Card padding: `p-6` (24px) or `p-8` (32px) for large cards
- Button padding: `px-4 py-2` (16px/8px) for default, `px-6 py-3` for large
- Section vertical: `py-12` (48px) or `py-16` (64px) for hero
- Container max-width: `max-w-7xl` (1280px)
- Content max-width: `max-w-4xl` (896px) for reading

### Border Radius

- Small: `0.5rem` (8px) — Badges, tags
- Medium: `0.75rem` (12px) — Buttons, inputs (default `--radius`)
- Large: `1rem` (16px) — Cards
- XL: `1.25rem` (20px) — Large cards
- 2XL: `1.5rem` (24px) — Hero sections
- Full: `9999px` — Pills, avatars

### Shadows

**Elevation System**:
- `shadow-sm`: Subtle, for cards on white background
- `shadow-md`: Default card shadow
- `shadow-lg`: Elevated cards, dropdowns
- `shadow-xl`: Modals, popovers
- `shadow-2xl`: Hero sections, key CTAs

**Custom Shadows**:
- Gold glow: `shadow-[0_0_20px_hsl(var(--gold)/0.3)]` — Achievements
- Amber glow: `shadow-[0_0_15px_hsl(var(--amber)/0.2)]` — Hover states
- Indigo depth: `shadow-[0_10px_40px_hsl(var(--indigo)/0.15)]` — Primary CTAs

## Component Patterns

### Buttons

**Variants**:
1. **Primary** — `bg-[hsl(var(--indigo))]` + `text-white` + `hover:opacity-90`
2. **Secondary** — `bg-[hsl(var(--amber))]` + `text-[hsl(var(--foreground))]` + `hover:opacity-90`
3. **Outline** — `border-2 border-[hsl(var(--indigo))]` + `text-[hsl(var(--indigo))]` + `hover:bg-[hsl(var(--indigo))] hover:text-white`
4. **Ghost** — `text-[hsl(var(--foreground))]` + `hover:bg-[hsl(var(--muted))]`

**Sizes**:
- Small: `px-3 py-1.5 text-sm`
- Default: `px-4 py-2 text-base`
- Large: `px-6 py-3 text-lg`

### Cards

**Structure**:
- Background: `bg-white` or `bg-[hsl(var(--card))]`
- Border: `border border-[hsl(var(--border))]` (optional, use for emphasis)
- Radius: `rounded-xl` (16px) or `rounded-2xl` (24px) for hero
- Padding: `p-6` or `p-8`
- Shadow: `shadow-md` default, `shadow-lg` on hover

**Card Variants**:
- **Default**: White background, subtle border, shadow on hover
- **Elevated**: Persistent shadow, no border
- **Outlined**: Border only, no shadow
- **Interactive**: Hover scale + shadow increase

### Forms

**Inputs**:
- Border: `border border-[hsl(var(--input))]`
- Radius: `rounded-lg` (12px)
- Padding: `px-4 py-2`
- Focus: `ring-2 ring-[hsl(var(--indigo))]`
- Placeholder: `text-[hsl(var(--muted-foreground))]`

**Labels**:
- Font: Inter Medium (500)
- Color: `text-[hsl(var(--foreground))]`
- Spacing: `mb-2` from input

### Navigation

**Marketing Nav**:
- Background: White with subtle border bottom
- Height: `h-16` (64px)
- Logo: Left, Cormorant font
- Links: Inter Medium, `hover:text-[hsl(var(--indigo))]`
- CTA Button: Primary style, right side

**Platform Nav**:
- Sidebar: Fixed left, `w-64` (256px), dark background `bg-[hsl(var(--indigo))]`
- Items: Icon + label, `hover:bg-[hsl(var(--indigo)/0.8)]`
- Active: `bg-[hsl(var(--amber))]` + border-left accent

## Layout Conventions

### Grid System
- Container: `max-w-7xl mx-auto px-6`
- 2 columns: `grid grid-cols-1 md:grid-cols-2 gap-8`
- 3 columns: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`
- 4 columns: `grid grid-cols-2 md:grid-cols-4 gap-4`

### Sections
- Vertical padding: `py-16` (64px) for main sections, `py-24` (96px) for hero
- Background alternation: White → Muted → White
- Max-width: `max-w-7xl` for containers, `max-w-4xl` for content

### Responsiveness
- Mobile-first: Base styles for mobile, add `md:` and `lg:` prefixes
- Breakpoints: `sm:640px`, `md:768px`, `lg:1024px`, `xl:1280px`, `2xl:1536px`
- Hide/show: `hidden md:block`, `block md:hidden`

## Animation & Motion

**Principles**:
- Subtle, purposeful, never distracting
- Framer Motion for complex animations
- CSS transitions for simple states (0.2s-0.3s)

**Common Patterns**:
- **Hover**: Scale 1.02-1.05, shadow increase, color shift
- **Page enter**: Fade in + slide up 20px, stagger children
- **Card hover**: `transition-all duration-300 hover:scale-105 hover:shadow-xl`
- **Button hover**: `transition-all duration-200 hover:opacity-90`

**Framer Motion Variants**:
```tsx
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}
```

## Accessibility

**Keyboard Navigation**:
- All interactive elements focusable
- Focus ring: `ring-2 ring-[hsl(var(--indigo))] ring-offset-2`
- Skip links for main content

**Screen Readers**:
- Semantic HTML: `<nav>`, `<main>`, `<section>`, `<article>`
- ARIA labels where needed: `aria-label`, `aria-describedby`
- Alt text for images

**Color Contrast**:
- WCAG AA minimum (4.5:1 for body, 3:1 for large text)
- Test all color combinations
- Never rely on color alone for meaning

## Brand Assets

**Logo**:
- Wordmark: "Education Hub" in Cormorant Garamond Bold
- Color: Indigo primary, or white on dark backgrounds
- Min size: 120px width
- Clear space: 16px all sides

**Iconography**:
- Library: Lucide React
- Style: Outline (strokeWidth 1.5-2)
- Size: 20px (default), 24px (large), 16px (small)
- Color: Inherit from parent or use semantic colors

## Implementation Notes

**CSS Variables** (from `globals.css`):
```css
:root {
  --indigo: 238 45% 28%;
  --amber: 38 92% 58%;
  --sage: 145 25% 45%;
  --gold: 43 96% 56%;
  /* ... all other variables */
}
```

**Tailwind Usage**:
- Colors: `bg-[hsl(var(--indigo))]`, `text-[hsl(var(--amber))]`
- NEVER use standard Tailwind colors (blue-500, purple-600, etc.)
- ALWAYS use CSS variables for consistency

**Component Library**:
- Based on shadcn/ui + Radix UI primitives
- All components in `apps/web/src/components/ui/`
- TypeScript strict mode, full type safety
- Props interfaces exported, composable APIs

---

## Design Fidelity Rules (CRITICAL)

When iterating designs:
1. **ALWAYS** use ONLY fonts from this system (Cormorant + Inter)
2. **NEVER** introduce new colors outside the defined palette
3. **NEVER** use purple gradients, neon colors, or decorative fonts
4. **ALWAYS** maintain Neo-Academic Luxury aesthetic direction
5. **ALWAYS** use CSS variables syntax: `hsl(var(--indigo))`
6. Design variations explore **layout/structure**, NOT visual style
7. Visual style is FIXED by this design system
