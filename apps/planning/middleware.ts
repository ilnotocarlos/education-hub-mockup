import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

/**
 * RBAC Middleware for Planning App
 *
 * Allowed roles: ADMIN, EDUCATION_TEAM
 *
 * TODO: Integrate with NextAuth session when auth is fully configured
 * For now, this is a placeholder structure
 */

export function middleware(request: NextRequest) {
  // TODO: Get user from NextAuth session
  // const session = await getServerSession(authOptions)
  // const user = session?.user

  // For now, allow all requests (will be restricted once auth is integrated)
  // In production, check:
  // if (!user || !["ADMIN", "EDUCATION_TEAM"].includes(user.role)) {
  //   return NextResponse.redirect(new URL(process.env.MAIN_APP_URL + "/login", request.url))
  // }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
}
