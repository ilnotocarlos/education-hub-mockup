import "@testing-library/jest-dom/vitest"
import { vi } from "vitest"

// --- Next.js mocks ---

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
  notFound: vi.fn(),
}))

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode
    href: string
    [key: string]: unknown
  }) => {
    const React = require("react")
    return React.createElement("a", { href, ...props }, children)
  },
}))

vi.mock("next/image", () => ({
  default: (props: Record<string, unknown>) => {
    const React = require("react")
    // eslint-disable-next-line @next/next/no-img-element
    return React.createElement("img", props)
  },
}))

// --- Framer Motion mock ---

vi.mock("framer-motion", () => ({
  motion: new Proxy(
    {},
    {
      get: (_target, prop) => {
        const React = require("react")
        return React.forwardRef(
          (
            {
              children,
              initial: _initial,
              animate: _animate,
              exit: _exit,
              variants: _variants,
              whileInView: _whileInView,
              whileHover: _whileHover,
              whileTap: _whileTap,
              viewport: _viewport,
              transition: _transition,
              layoutId: _layoutId,
              ...rest
            }: Record<string, unknown>,
            ref: unknown
          ) => React.createElement(prop as string, { ...rest, ref }, children)
        )
      },
    }
  ),
  AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
  useScroll: () => ({ scrollYProgress: { get: () => 0 } }),
  useTransform: () => 0,
  useMotionValue: () => ({ get: () => 0, set: vi.fn() }),
  useSpring: () => ({ get: () => 0, set: vi.fn() }),
}))

// --- NextAuth mock ---

vi.mock("next-auth/react", () => ({
  useSession: () => ({
    data: null,
    status: "unauthenticated",
  }),
  signIn: vi.fn(),
  signOut: vi.fn(),
  SessionProvider: ({ children }: { children: React.ReactNode }) => children,
}))

// --- Browser API mocks ---

if (typeof window !== "undefined") {
  window.ResizeObserver =
    window.ResizeObserver ||
    class ResizeObserver {
      observe() {}
      unobserve() {}
      disconnect() {}
    }

  window.IntersectionObserver =
    window.IntersectionObserver ||
    class IntersectionObserver {
      root = null
      rootMargin = ""
      thresholds = [0]
      observe() {}
      unobserve() {}
      disconnect() {}
      takeRecords() {
        return []
      }
    }

  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  })

  Object.defineProperty(window, "scrollTo", {
    writable: true,
    value: vi.fn(),
  })

  Element.prototype.scrollIntoView = vi.fn()
}
