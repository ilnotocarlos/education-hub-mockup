# ADR-007: UX Refactoring Strategy — Shared Components Pattern

- **Status**: Accepted
- **Date**: 2026-02-07
- **Deciders**: Tech Lead, Frontend Dev, UX Designer

## Contesto

Dopo Sprint 1-5, il codebase frontend presentava duplicazione significativa:
- 13 pages con inline animation variants identiche (fadeInUp, staggerContainer)
- Pattern Hero Section ripetuto in 4 marketing pages
- Multi-step forms duplicati in 2 pages
- ~263 LOC di codice duplicato

Code review ha identificato quick wins per migliorare consistency e maintainability senza impattare feature development.

## Decisione

Implementare strategia di refactoring UX/UI incrementale basata su **Shared Components Pattern**:

### 1. Shared Animation Hook
Creare `usePageTransition` hook centralizzato:
```typescript
// src/hooks/use-page-transition.ts
export function usePageTransition() {
  return {
    variants: {
      fadeInUp: { /* ... */ },
      slideInRight: { /* ... */ },
      scaleIn: { /* ... */ }
    },
    createStaggerContainer: (delay: number) => ({ /* ... */ })
  }
}
```

### 2. Shared Hero Component
Estrarre `HeroSection` component per marketing pages:
```typescript
// src/components/marketing/HeroSection.tsx
export function HeroSection({
  title,
  subtitle,
  ctaPrimary,
  ctaSecondary
}: HeroSectionProps) { /* ... */ }
```

### 3. Shared Form Wizard
Estrarre `FormWizard` component per multi-step forms:
```typescript
// src/components/forms/FormWizard.tsx
export function FormWizard({
  steps,
  onComplete
}: FormWizardProps) { /* ... */ }
```

### 4. Refactoring Incrementale
- **Phase 1 (Section 1):** Creare shared components (PR singola)
- **Phase 2 (Section 2):** Refactoring 8 marketing pages (3 PRs)
- **Phase 3 (Section 4):** Refactoring 5 platform pages (1 PR)
- **Section 3 skipped:** Auth pages già ottimali

## Alternative considerate

### 1. Monolithic Component Library
Creare libreria completa di componenti upfront prima del refactoring.

- **Pro:** Standardizzazione completa fin da subito
- **Contro:** Over-engineering, blocca feature development, ROI incerto

### 2. Big Bang Refactoring
Refactoring tutte le pages in una singola PR.

- **Pro:** Cambio immediato, nessuna inconsistenza temporanea
- **Contro:** PR gigante (>2000 LOC), review difficile, alto rischio regressioni

### 3. Status Quo
Non fare refactoring, accettare duplicazione.

- **Pro:** Zero effort, no risk
- **Contro:** Tech debt cresce, onboarding difficile, inconsistency aumenta

## Razionale

Shared Components Pattern scelto per:

- **Incremental approach:** 5 PRs piccole > 1 PR gigante (review facili, risk basso)
- **Quick wins:** ROI immediato su pages con duplicazione, skip pages già ottimali
- **Developer Experience:** Pattern chiari per nuovi dev, consistency cross-pages
- **Maintainability:** Changes a `usePageTransition` si propagano automaticamente
- **Performance:** Tree-shaking elimina duplicates (-2KB bundle)

## Conseguenze

### Positive
- ✅ **-263 LOC** di duplicazione eliminata
- ✅ **+3 shared components** riusabili (HeroSection, FormWizard, usePageTransition)
- ✅ **13 pages** refactored con pattern consistente
- ✅ **Developer onboarding** facilitato (pattern chiari da seguire)
- ✅ **Bundle size:** -2KB grazie a tree-shaking
- ✅ **Code review:** Meno codice da revieware in future PR

### Negative
- ⚠️ **Learning curve:** Dev devono apprendere nuovi shared components
- ⚠️ **Abstraction overhead:** Shared components aggiungono layer indiretto
- ⚠️ **Breaking changes:** Modifiche a usePageTransition impattano 13 pages

### Rischi
- **Risk:** Shared components troppo opinati limitano flexibility
  - **Mitigation:** Props customizzabili, escape hatches con `className` override
- **Risk:** Refactoring introduce regressioni visual/behavioral
  - **Mitigation:** Build verification dopo ogni section, visual regression tests (futuro)

## Metriche Success

| Metrica | Before | After | Delta |
|---------|--------|-------|-------|
| Total LOC (13 pages) | 5,600 | 5,337 | -263 (-4.7%) |
| Inline animation variants | 26 | 0 | -26 |
| Shared components | 0 | 3 | +3 |
| Bundle size (gzip) | 145KB | 143KB | -2KB |
| Pages with consistent motion | 0 | 13 | +13 |

## Riferimenti

- [Phase UX Refactoring Documentation](../sprints/phase-ux-refactoring.md)
- PRs: [#56](https://github.com/ilnotocarlos/education-hub-mockup/pull/56), [#57](https://github.com/ilnotocarlos/education-hub-mockup/pull/57), [#58](https://github.com/ilnotocarlos/education-hub-mockup/pull/58), [#59](https://github.com/ilnotocarlos/education-hub-mockup/pull/59), [#60](https://github.com/ilnotocarlos/education-hub-mockup/pull/60)
- [Framer Motion Best Practices](https://www.framer.com/motion/)
- [React Hooks Best Practices](https://react.dev/learn/reusing-logic-with-custom-hooks)
