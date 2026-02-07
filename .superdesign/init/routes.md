# Routes - Education Hub

Mappa completa delle route Next.js App Router del progetto Education Hub.

---

## Marketing Routes

### Homepage
- **URL**: `/`
- **File**: `/apps/web/src/app/page.tsx`
- **Layout**: Root + Navigation + Footer components
- **Summary**: Homepage con hero section, course showcase, stats, areas, CTA

### Discover (Tarocchi Assessment)
- **URL**: `/discover`
- **File**: `/apps/web/src/app/(marketing)/discover/page.tsx`
- **Layout**: MarketingLayout
- **Summary**: Interactive tarocchi-style assessment con 6 domande progressive e risultati personalizzati

### Courses Listing
- **URL**: `/courses`
- **File**: `/apps/web/src/app/(marketing)/courses/page.tsx`
- **Layout**: MarketingLayout
- **Summary**: Catalogo corsi con filters e cards

### Course Detail
- **URL**: `/courses/:slug`
- **File**: `/apps/web/src/app/(marketing)/courses/[slug]/page.tsx`
- **Layout**: MarketingLayout
- **Summary**: Pagina dettaglio corso con curriculum, instructor, pricing, CTA

### Application Form
- **URL**: `/apply`
- **File**: `/apps/web/src/app/(marketing)/apply/page.tsx`
- **Layout**: MarketingLayout
- **Summary**: Multi-step application form (5 steps) con validation

### About
- **URL**: `/about`
- **File**: `/apps/web/src/app/(marketing)/about/page.tsx`
- **Layout**: MarketingLayout
- **Summary**: Chi siamo, team, mission

### Method
- **URL**: `/method`
- **File**: `/apps/web/src/app/(marketing)/method/page.tsx`
- **Layout**: MarketingLayout
- **Summary**: Metodologia didattica, approccio flipped classroom

---

## Platform Routes (Student Dashboard)

### Dashboard
- **URL**: `/dashboard`
- **File**: `/apps/web/src/app/(platform)/dashboard/page.tsx`
- **Layout**: PlatformLayout
- **Summary**: Dashboard studente con stats, prework, upcoming lessons, skills progress, community sidebar

### My Courses
- **URL**: `/my-courses`
- **File**: `/apps/web/src/app/(platform)/my-courses/page.tsx`
- **Layout**: PlatformLayout
- **Summary**: Lista corsi iscritti

### Lesson View (Dynamic ID)
- **URL**: `/lessons/:id`
- **File**: `/apps/web/src/app/(platform)/lessons/[id]/page.tsx`
- **Layout**: PlatformLayout
- **Summary**: Lesson mashup view con video/audio/text, accessibility modes, quiz inline

### Lesson View (Static Demo)
- **URL**: `/lessons/1`
- **File**: `/apps/web/src/app/(platform)/lessons/1/page.tsx`
- **Layout**: PlatformLayout
- **Summary**: Static demo lesson

### Community
- **URL**: `/community`
- **File**: `/apps/web/src/app/(platform)/community/page.tsx`
- **Layout**: PlatformLayout
- **Summary**: Community feed, alumni network

### Placement Portal
- **URL**: `/placement`
- **File**: `/apps/web/src/app/(platform)/placement/page.tsx`
- **Layout**: PlatformLayout
- **Summary**: Job matching, career services

### Profile
- **URL**: `/profile`
- **File**: `/apps/web/src/app/(platform)/profile/page.tsx`
- **Layout**: PlatformLayout
- **Summary**: User profile management

### Settings
- **URL**: `/settings`
- **File**: `/apps/web/src/app/(platform)/settings/page.tsx`
- **Layout**: PlatformLayout
- **Summary**: Account settings con tabs (Profile, Notifications, Privacy, Billing, Accessibility, Connections)

### Certificates
- **URL**: `/certificates`
- **File**: `/apps/web/src/app/(platform)/certificates/page.tsx`
- **Layout**: PlatformLayout
- **Summary**: Blockchain certificates NFT wallet

### Onboarding
- **URL**: `/onboarding`
- **File**: `/apps/web/src/app/(platform)/onboarding/page.tsx`
- **Layout**: PlatformLayout
- **Summary**: First-time user onboarding flow

### Pre-assessment
- **URL**: `/pre-assessment`
- **File**: `/apps/web/src/app/(platform)/pre-assessment/page.tsx`
- **Layout**: PlatformLayout
- **Summary**: Pre-course assessment quiz

### AI Tutor
- **URL**: `/ai-tutor`
- **File**: `/apps/web/src/app/(platform)/ai-tutor/page.tsx`
- **Layout**: PlatformLayout
- **Summary**: AI tutor chat interface

---

## Auth Routes

### Sign Up
- **URL**: `/signup`
- **File**: `/apps/web/src/app/(auth)/signup/page.tsx`
- **Layout**: Auth layout (no nav/footer)
- **Summary**: Registration form

### Login
- **URL**: `/login`
- **File**: `/apps/web/src/app/(auth)/login/page.tsx`
- **Layout**: Auth layout (no nav/footer)
- **Summary**: Login form con social providers

### Forgot Password
- **URL**: `/forgot-password`
- **File**: `/apps/web/src/app/(auth)/forgot-password/page.tsx`
- **Layout**: Auth layout (no nav/footer)
- **Summary**: Password reset flow

---

## Error Pages

### 404 Not Found
- **File**: `/apps/web/src/app/not-found.tsx`
- **Summary**: Custom 404 page

### Error Boundary
- **File**: `/apps/web/src/app/error.tsx`
- **Summary**: Global error boundary

### Marketing Error
- **File**: `/apps/web/src/app/(marketing)/error.tsx`
- **Summary**: Marketing section error boundary

### Platform Error
- **File**: `/apps/web/src/app/(platform)/error.tsx`
- **Summary**: Platform section error boundary

### Apply Error
- **File**: `/apps/web/src/app/(marketing)/apply/error.tsx`
- **Summary**: Application form specific error handler

---

## Route Groups

- `(marketing)`: Public pages (homepage, discover, courses, apply, about, method)
- `(platform)`: Authenticated student dashboard pages
- `(auth)`: Authentication pages (login, signup, forgot-password)

---

## Notes

- All routes use Next.js 16 App Router
- Route groups in parentheses don't affect URL structure
- Platform routes require authentication (handled by middleware or layout)
- Dynamic routes use `[param]` syntax
- All pages are React Server Components by default, client components use `"use client"` directive
