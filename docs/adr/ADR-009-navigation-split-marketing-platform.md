# ADR-009: Navigation Split — Marketing vs Platform

- **Status**: Accepted
- **Date**: 2026-02-06
- **Deciders**: UX Designer, Tech Lead, Frontend Dev

## Contesto

Education Innovation Hub ha 2 tipi di utenti con needs radicalmente diversi:

### 1. Utenti Non Autenticati (Marketing Context)
- Visitano homepage, about, method, courses catalog
- Obiettivo: **scoprire** valore, **convertire** in applicants
- Needs: CTA prominent ("Apply Now", "Discover"), social proof, value proposition

### 2. Utenti Autenticati (Platform Context)
- Accedono a dashboard, lessons, profile, community
- Obiettivo: **completare** corsi, **progredire** nel curriculum
- Needs: user menu, progress tracking, quick access a lessons

**Problema attuale:**
Navigation condivisa (`components/Navigation.tsx`) cerca di servire entrambi i contesti con conditional rendering:

```typescript
{!session ? (
  <Button>Apply Now</Button>
) : (
  <UserMenu />
)}
```

Questo porta a:
- **Cluttered UI:** Troppe opzioni in un solo component
- **Poor UX:** Marketing CTA competono con platform links
- **Maintenance hell:** Conditional logic complesso, hard to test
- **Performance:** Render inutile di marketing CTA per logged users

## Decisione

**Splittare Navigation in 2 componenti separati:**

### 1. NavigationMarketing
**Path:** `src/components/marketing/NavigationMarketing.tsx`
**Used in:** Routes `/(marketing)/*` e `/` (homepage)
**Features:**
- Logo + links marketing (About, Method, Courses, Pricing)
- CTA primary: "Apply Now" (high visibility)
- CTA secondary: "Login" (subtle)
- No user menu, no dashboard links
- Optimized per conversion

```typescript
export function NavigationMarketing() {
  return (
    <nav>
      <Logo />
      <NavLinks>
        <NavLink href="/about">About</NavLink>
        <NavLink href="/method">Method</NavLink>
        <NavLink href="/courses">Courses</NavLink>
      </NavLinks>
      <CTAGroup>
        <Button variant="primary" href="/apply">Apply Now</Button>
        <Button variant="ghost" href="/login">Login</Button>
      </CTAGroup>
    </nav>
  )
}
```

### 2. NavigationPlatform
**Path:** `src/components/platform/NavigationPlatform.tsx`
**Used in:** Routes `/(platform)/*` (dashboard, lessons, profile)
**Features:**
- Logo + links platform (Dashboard, My Courses, Community, Placement)
- User menu con avatar (Profile, Settings, Logout)
- Progress indicator (optional)
- No marketing CTA
- Optimized per task completion

```typescript
export function NavigationPlatform() {
  const { data: session } = useSession()

  return (
    <nav>
      <Logo />
      <NavLinks>
        <NavLink href="/dashboard">Dashboard</NavLink>
        <NavLink href="/my-courses">My Courses</NavLink>
        <NavLink href="/community">Community</NavLink>
      </NavLinks>
      <UserMenu user={session.user} />
    </nav>
  )
}
```

### Routing Strategy
```typescript
// app/(marketing)/layout.tsx
export default function MarketingLayout({ children }) {
  return (
    <>
      <NavigationMarketing />
      {children}
      <Footer />
    </>
  )
}

// app/(platform)/layout.tsx
export default function PlatformLayout({ children }) {
  return (
    <>
      <NavigationPlatform />
      {children}
    </>
  )
}
```

## Alternative considerate

### 1. Navigation Condivisa con Props
Single component con props `variant="marketing" | "platform"`.

- **Pro:** DRY, single source of truth
- **Contro:** Props drilling, conditional hell, testing complesso

### 2. Navigation Theming
Single component con theme CSS switching.

- **Pro:** Riuso completo
- **Contro:** CSS override fragile, logic condizionale rimane

### 3. Navigation con Context
Single component che legge context (MarketingContext vs PlatformContext).

- **Pro:** Automatic switching
- **Contro:** Over-engineering, context overhead, hard to debug

### 4. Status Quo
Mantenere navigation condivisa con conditional rendering.

- **Pro:** Zero effort
- **Contro:** UX suboptimal, maintenance burden, performance overhead

## Razionale

Navigation Split scelta per:

- **Clarity of Intent:** Marketing nav ottimizza conversion, platform nav ottimizza task completion
- **Separation of Concerns:** Marketing e platform sono domains diversi
- **Performance:** Zero rendering di marketing CTA per logged users
- **Maintainability:** 2 componenti semplici > 1 component complesso con conditionals
- **Testing:** Test isolation più facile (marketing vs platform scenarios)
- **Design Freedom:** UX può divergere senza compromessi

## Conseguenze

### Positive
- ✅ **UX migliorata:** Navigation ottimizzata per contesto (conversion vs task)
- ✅ **Code clarity:** No conditional logic complesso, intent esplicito
- ✅ **Performance:** -3KB bundle per logged users (no marketing CTA render)
- ✅ **Maintainability:** Changes a marketing nav non impattano platform (e viceversa)
- ✅ **Testing:** Test isolation migliore, scenarios chiari

### Negative
- ⚠️ **Code duplication:** Logo, base layout duplicati (acceptable trade-off)
- ⚠️ **Maintenance burden:** 2 navigation da mantenere invece di 1
- ⚠️ **Onboarding:** Dev devono sapere quale navigation usare

### Rischi
- **Risk:** Logo/brand changes richiedono update in 2 posti
  - **Mitigation:** Extract `<Logo />` component condiviso
- **Risk:** Divergenza eccessiva tra marketing e platform nav
  - **Mitigation:** Shared base styles, design system components
- **Risk:** Confusion su quando usare quale navigation
  - **Mitigation:** Clear naming, layout enforcement, docs

## Implementazione

### Fase 1: Extract NavigationMarketing (Issue #46)
- ✅ Creato `src/components/marketing/NavigationMarketing.tsx`
- ✅ Migrati routes `/(marketing)/*` a nuovo component
- ✅ CTA "Apply Now" prominent

### Fase 2: Extract NavigationPlatform (Issue #46)
- ✅ Creato `src/components/platform/NavigationPlatform.tsx`
- ✅ Migrati routes `/(platform)/*` a nuovo component
- ✅ User menu con avatar

### Fase 3: Remove Old Navigation (Issue #46)
- ✅ Deprecato `components/Navigation.tsx`
- ✅ Verificato no breaking changes

## Metriche Success

| Metrica | Before | After | Delta |
|---------|--------|-------|-------|
| Navigation LOC | 180 | 120+100=220 | +40 (+22%) ✅ Acceptable |
| Conditional branches | 8 | 0 | -8 ✅ |
| Bundle size (logged) | 45KB | 42KB | -3KB ✅ |
| Test complexity | High | Low | ✅ |
| UX clarity | Medium | High | ✅ |

**Nota:** LOC aumenta (+40) ma complexity diminuisce drasticamente (no conditionals).

## Metriche UX (Target Post-Launch)

| Metrica | Target | Measurement |
|---------|--------|-------------|
| Marketing CTR "Apply Now" | >5% | Analytics (futuro) |
| Platform task completion time | -10% | User testing (futuro) |
| Navigation satisfaction | >8/10 | User survey (futuro) |

## Riferimenti

- [Sprint 5 Documentation](../sprints/sprint-5-frontend-backend.md)
- PRs: [#50](https://github.com/ilnotocarlos/education-hub-mockup/pull/50)
- [Nielsen Norman Group: Context-Specific Navigation](https://www.nngroup.com/articles/contextual-navigation/)
- [Next.js Layout Groups](https://nextjs.org/docs/app/building-your-application/routing/route-groups)
