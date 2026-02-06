import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

/**
 * Middleware temporaneo per mockup
 * TODO Sprint 4: Ripristinare auth middleware quando NextAuth.js sarà configurato
 *
 * Per ora bypassa tutto per permettere navigazione libera durante sviluppo mockup.
 * Questo riduce il bundle size del middleware (era 1.02MB > limite 1MB Vercel Free).
 */
export function middleware(request: NextRequest) {
  // Durante fase mockup: permetti accesso a tutte le route
  return NextResponse.next()
}

// Configure which routes use this middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
