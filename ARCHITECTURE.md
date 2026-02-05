# Architecture Guide 🏗️

Questa guida descrive l'architettura tecnica di Education Hub, decisioni di design, e pattern utilizzati.

## 📑 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Routing & Navigation](#routing--navigation)
- [Data Flow](#data-flow)
- [State Management](#state-management)
- [Styling Architecture](#styling-architecture)
- [Component Patterns](#component-patterns)
- [Performance Optimization](#performance-optimization)
- [Security](#security)
- [Future Architecture](#future-architecture)

## 🔭 Overview

Education Hub è costruita con **Next.js 16 App Router** seguendo principi di:
- **Server-First**: Massima resa server components, client solo dove necessario
- **Type-Safe**: TypeScript strict mode, zero `any` types
- **Component-Driven**: Atomic design con Radix UI primitives
- **Accessibility-First**: WCAG AA compliance, keyboard navigation
- **Performance**: Optimistic UI, code splitting, lazy loading

### Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        FRONTEND                               │
├─────────────────────────────────────────────────────────────┤
│  Next.js 16 App Router (React 19)                           │
│  ├── (marketing)/      Public routes                         │
│  └── (platform)/       Protected routes (future auth)        │
├─────────────────────────────────────────────────────────────┤
│  Components Layer                                            │
│  ├── UI Primitives     (Radix UI + Shadcn/ui)              │
│  ├── Shared            (Navigation, layouts)                 │
│  └── Business Logic    (Dashboard, Lessons, etc)            │
├─────────────────────────────────────────────────────────────┤
│  State Management                                            │
│  ├── Local State       (useState, useReducer)               │
│  ├── URL State         (Next.js router)                     │
│  └── Global State      (TODO: Zustand/Context)              │
├─────────────────────────────────────────────────────────────┤
│  Styling                                                     │
│  ├── Tailwind CSS v4   (Utility-first)                      │
│  ├── CSS Variables     (Design tokens)                      │
│  └── Framer Motion     (Animations)                         │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                    BACKEND (Future)                          │
├─────────────────────────────────────────────────────────────┤
│  Next.js API Routes / Server Actions                        │
│  ├── Authentication    (NextAuth.js)                        │
│  ├── Database          (Prisma + PostgreSQL)                │
│  ├── Payments          (Stripe)                              │
│  ├── Video             (Cloudinary API)                      │
│  ├── AI                (Claude API)                          │
│  └── Blockchain        (Polygon)                             │
└─────────────────────────────────────────────────────────────┘
```

## 🛠️ Tech Stack

### Core Framework
- **Next.js 16.1.6**: React framework con App Router
- **React 19**: UI library con Server Components
- **TypeScript 5.0**: Type-safe JavaScript

### Styling
- **Tailwind CSS v4**: Utility-first CSS framework
- **Radix UI**: Unstyled, accessible component primitives
- **Shadcn/ui**: Pre-styled Radix components
- **Framer Motion**: Animation library
- **Lucide React**: Icon library

### Development
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **Husky**: Git hooks (future)
- **TypeScript**: Strict mode

### Deployment
- **Vercel**: Hosting platform
- **GitHub**: Version control

## 📁 Project Structure

```
mockup/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── (marketing)/              # Route group: Public pages
│   │   │   ├── discover/
│   │   │   │   └── page.tsx          # Assessment "Tarocchi"
│   │   │   ├── courses/
│   │   │   │   └── ux-ui-design-master/
│   │   │   │       └── page.tsx      # Course detail page
│   │   │   └── apply/
│   │   │       └── page.tsx          # Application form
│   │   │
│   │   ├── (platform)/               # Route group: Authenticated pages
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx          # Student dashboard
│   │   │   ├── lessons/
│   │   │   │   ├── [id]/
│   │   │   │   │   └── page.tsx      # Dynamic lesson route
│   │   │   │   └── 1/
│   │   │   │       └── page.tsx      # Static lesson example
│   │   │   ├── ai-tutor/
│   │   │   │   └── page.tsx          # AI chat interface
│   │   │   ├── community/
│   │   │   │   └── page.tsx          # Forum & discussions
│   │   │   ├── certificates/
│   │   │   │   └── page.tsx          # Blockchain wallet
│   │   │   ├── placement/
│   │   │   │   └── page.tsx          # Job portal
│   │   │   ├── profile/
│   │   │   │   └── page.tsx          # User profile
│   │   │   ├── settings/
│   │   │   │   └── page.tsx          # Account settings
│   │   │   ├── onboarding/
│   │   │   │   └── page.tsx          # First-time setup
│   │   │   └── pre-assessment/
│   │   │       └── page.tsx          # Skill test
│   │   │
│   │   ├── layout.tsx                # Root layout
│   │   ├── page.tsx                  # Homepage
│   │   ├── not-found.tsx             # 404 page
│   │   └── globals.css               # Global styles + Tailwind
│   │
│   ├── components/
│   │   ├── ui/                       # Shadcn/ui components (30+)
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── tabs.tsx
│   │   │   └── ...
│   │   └── shared/                   # Custom shared components
│   │       └── navigation.tsx        # Main navigation bar
│   │
│   └── lib/
│       └── utils.ts                  # Utility functions (cn, etc)
│
├── public/                           # Static assets
│   └── avatars/                      # User avatars (mock)
│
├── .env.example                      # Environment variables template
├── .env.local                        # Environment variables (gitignored)
├── next.config.js                    # Next.js configuration
├── tailwind.config.ts                # Tailwind configuration
├── tsconfig.json                     # TypeScript configuration
├── package.json                      # Dependencies
└── README.md                         # Project documentation
```

### File Naming Conventions

- **Routes**: `page.tsx` (Next.js convention)
- **Layouts**: `layout.tsx` (Next.js convention)
- **Components**: `PascalCase.tsx` (e.g., `Button.tsx`)
- **UI components**: `lowercase.tsx` (Shadcn convention)
- **Utils**: `camelCase.ts` (e.g., `formatDate.ts`)

## 🗺️ Routing & Navigation

### Route Groups

Next.js 14+ usa **route groups** per organizzare routes senza aggiungere path segments:

```
app/
├── (marketing)/     → Routes pubbliche
│   ├── page.tsx     → /
│   ├── discover/    → /discover
│   └── courses/     → /courses/...
│
└── (platform)/      → Routes autenticate (future)
    ├── dashboard/   → /dashboard
    ├── lessons/     → /lessons/...
    └── settings/    → /settings
```

**Benefits:**
- Organizzazione logica senza influenzare URL
- Layout separati per marketing vs platform
- Middleware per auth può targetare solo `(platform)/*`

### Dynamic Routes

```typescript
// app/(platform)/lessons/[id]/page.tsx
interface PageProps {
  params: { id: string }
}

export default function LessonPage({ params }: PageProps) {
  const lessonId = params.id  // "1", "2", etc.
  // ...
}
```

### Navigation Component

```typescript
// src/components/shared/navigation.tsx
const navLinks = [
  { href: "/", label: "Home", icon: Sparkles },
  { href: "/discover", label: "Scopri", icon: GraduationCap },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/lessons/1", label: "Lezioni", icon: BookOpen },
]
```

**Features:**
- Client-side navigation con `next/link`
- Active state detection con `usePathname()`
- Scroll-aware glassmorphism effect
- Mobile responsive menu
- User dropdown con avatar

## 🔄 Data Flow

### Current State (MVP Mockup)

```
User Interaction
      ↓
Local State (useState)
      ↓
UI Update
```

**No backend integration** - Tutti i dati sono hardcoded mock data.

### Future State (Production)

```
User Interaction
      ↓
Client Action
      ↓
API Route / Server Action
      ↓
Database Query (Prisma)
      ↓
Data Transform
      ↓
Response
      ↓
UI Update
```

**With backend:**
- Server Actions per mutations
- API routes per external integrations
- Optimistic UI updates
- Error boundaries per error handling

## 🎯 State Management

### Local State

Usato per:
- Form inputs
- UI toggles (modals, dropdowns)
- Pagination state
- Tab selection

```typescript
// Example: Dashboard tabs
const [activeTab, setActiveTab] = useState("overview")

// Example: AI Tutor chat
const [messages, setMessages] = useState<Message[]>([])
const [inputValue, setInputValue] = useState("")
const [isTyping, setIsTyping] = useState(false)
```

### URL State

Usato per:
- Current page/route
- Dynamic route params
- Query parameters (future)

```typescript
// Reading current path
const pathname = usePathname()

// Navigation
const router = useRouter()
router.push("/dashboard")
```

### Global State (Future)

**Options considered:**
1. **Context API**: Per tema, user session
2. **Zustand**: Per complex state (user data, preferences)
3. **React Query**: Per server state caching

**Recommendation**: Zustand per semplicità e performance.

```typescript
// Future: store/useUserStore.ts
import create from 'zustand'

interface UserState {
  user: User | null
  setUser: (user: User) => void
  logout: () => void
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}))
```

## 🎨 Styling Architecture

### Design Tokens (CSS Variables)

```css
/* app/globals.css */
:root {
  /* Colors - HSL for easy manipulation */
  --indigo: 248 53% 32%;        /* Primary brand */
  --amber: 38 92% 50%;           /* Secondary accent */
  --sage: 160 19% 49%;           /* Success */
  --gold: 48 96% 53%;            /* Premium */

  /* Semantic colors */
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --card: 0 0% 100%;
  --muted: 210 40% 96.1%;

  /* Spacing scale (8pt grid) */
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-4: 1rem;      /* 16px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
}

/* Dark mode (future) */
@media (prefers-color-scheme: dark) {
  :root {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
  }
}
```

### Tailwind Configuration

```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        indigo: 'hsl(var(--indigo))',
        amber: 'hsl(var(--amber))',
        // ... other colors
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'serif'],
        sans: ['var(--font-inter)', 'sans-serif'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.5s ease-out',
        'stagger': 'stagger 0.1s ease-out',
      },
    },
  },
}
```

### Utility Classes

```css
/* Custom utilities in globals.css */
.editorial-grid {
  @apply container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl;
}

.grain-texture {
  @apply relative;
  background-image: url('data:image/svg+xml;base64,...');
}

.glass-effect {
  @apply backdrop-blur-lg bg-background/80 border-b;
}
```

### Component Styling Pattern

```tsx
// ✅ Recommended pattern
<Card className="border-2 hover:border-[hsl(var(--indigo)_/_0.3)] transition-all">
  <CardHeader>
    <CardTitle className="text-2xl font-display">Title</CardTitle>
  </CardHeader>
  <CardContent>
    Content
  </CardContent>
</Card>

// Use cn() for conditional classes
<div className={cn(
  'base-class',
  isActive && 'active-class',
  variant === 'primary' && 'primary-class'
)}>
```

## 🧩 Component Patterns

### Composition Pattern

```typescript
// ✅ Good: Composable components
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Content here</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>

// ❌ Bad: Monolithic component
<Card
  title="Title"
  description="Description"
  content="Content"
  actionLabel="Action"
  onAction={() => {}}
/>
```

### Server vs Client Components

```typescript
// ✅ Server Component (default in App Router)
// No "use client" directive
export default function DashboardPage() {
  // Can fetch data directly
  // Can use async/await
  // Cannot use hooks or browser APIs
}

// ✅ Client Component (interactive)
"use client"

export function InteractiveCard() {
  const [isExpanded, setIsExpanded] = useState(false)

  // Can use hooks
  // Can access browser APIs
  // Can handle user events
}
```

### Custom Hooks

```typescript
// lib/hooks/useMultiSelect.ts
export function useMultiSelect<T>(
  maxSelect: number
) {
  const [selected, setSelected] = useState<T[]>([])

  const toggle = (item: T) => {
    setSelected(prev =>
      prev.includes(item)
        ? prev.filter(i => i !== item)
        : prev.length < maxSelect
          ? [...prev, item]
          : prev
    )
  }

  return { selected, toggle }
}

// Usage in component
const { selected, toggle } = useMultiSelect<string>(3)
```

## ⚡ Performance Optimization

### Code Splitting

```typescript
// Dynamic imports for heavy components
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Skeleton />,
  ssr: false, // Client-only if needed
})
```

### Image Optimization

```typescript
// ✅ Use next/image
import Image from 'next/image'

<Image
  src="/avatar.jpg"
  alt="User avatar"
  width={128}
  height={128}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>

// ❌ Don't use <img> directly
<img src="/avatar.jpg" />
```

### Memoization

```typescript
// Expensive calculations
const totalProgress = useMemo(() => {
  return lessons.reduce((acc, lesson) =>
    acc + lesson.progress, 0
  ) / lessons.length
}, [lessons])

// Callbacks passed to children
const handleClick = useCallback(() => {
  setCount(c => c + 1)
}, [])

// Components that render often
const MemoizedCard = React.memo(Card)
```

### Bundle Size

**Current size estimate:**
- Next.js framework: ~90KB
- React: ~40KB
- Framer Motion: ~60KB
- Radix UI components: ~50KB
- Tailwind CSS: ~20KB (purged)
- **Total**: ~260KB gzipped

**Optimization opportunities:**
- Tree-shake Lucide icons (import only used)
- Lazy load Framer Motion
- Code split heavy pages

## 🔒 Security

### Current State (MVP)

- ✅ No sensitive data exposed
- ✅ No `dangerouslySetInnerHTML` usage
- ✅ React auto-escapes user input
- ⚠️ No authentication (all pages public)
- ⚠️ No rate limiting
- ⚠️ No CSRF protection (no POST forms yet)

### Future Production

**Must implement:**
1. **Authentication**: NextAuth.js + JWT
2. **Authorization**: Role-based access control
3. **HTTPS**: Enforce SSL (Vercel default)
4. **CSRF**: Tokens for mutations
5. **Rate Limiting**: API routes protection
6. **Input Validation**: Zod schemas
7. **SQL Injection**: Prisma prevents (parameterized)
8. **XSS**: Content Security Policy headers

```typescript
// Future: middleware.ts
export function middleware(request: NextRequest) {
  // Auth check
  const token = request.cookies.get('session-token')
  if (!token && request.nextUrl.pathname.startsWith('/(platform)')) {
    return NextResponse.redirect('/login')
  }

  // Rate limiting
  // CSP headers
  // CORS configuration
}
```

## 🚀 Future Architecture

### Phase 1: Backend Integration (MVP)

```
Frontend (Current)
      ↓
Next.js API Routes
      ↓
Prisma ORM
      ↓
PostgreSQL
```

**Add:**
- Database models (User, Course, Lesson, Progress)
- Authentication (NextAuth.js)
- API routes per CRUD operations
- Server Actions per mutations

### Phase 2: External Services

```
Frontend
      ↓
Next.js Backend
      ├→ Stripe (Payments)
      ├→ Cloudinary (Video)
      ├→ Claude API (AI)
      ├→ Resend (Email)
      └→ Polygon (Blockchain)
```

### Phase 3: Microservices (Scale)

```
Frontend (Next.js)
      ↓
API Gateway (Next.js API)
      ├→ Auth Service (NextAuth)
      ├→ Content Service (Node.js)
      ├→ Payment Service (Node.js + Stripe)
      ├→ AI Service (Python + Claude)
      └→ Blockchain Service (Node.js + ethers.js)
```

**Benefits:**
- Independent scaling
- Technology flexibility
- Fault isolation
- Team autonomy

## 📊 Monitoring & Observability (Future)

### Metrics to Track

**Performance:**
- Core Web Vitals (LCP, FID, CLS)
- Time to Interactive (TTI)
- First Contentful Paint (FCP)

**Business:**
- User signups
- Course completions
- Placement rate
- Churn rate

**Technical:**
- API response times
- Error rates
- Database query performance
- Cache hit rates

### Tools

- **Vercel Analytics**: Built-in performance monitoring
- **Sentry**: Error tracking & alerts
- **PostHog**: Product analytics
- **Prisma Studio**: Database inspection

---

## 📚 References

- [Next.js App Router Docs](https://nextjs.org/docs/app)
- [React Server Components](https://react.dev/blog/2023/03/22/react-labs-what-we-have-been-working-on-march-2023#react-server-components)
- [Tailwind CSS v4](https://tailwindcss.com/blog/tailwindcss-v4-alpha)
- [Radix UI Architecture](https://www.radix-ui.com/docs/primitives/overview/introduction)

---

**Document Version**: 1.0
**Last Updated**: 2026-02-05
**Maintainer**: Development Team
