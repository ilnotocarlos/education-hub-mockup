import { createTRPCReact } from "@trpc/react-query"
import type { AppRouter } from "@edu-hub/api/src/routes/index"

export const trpc = createTRPCReact<AppRouter>()

export type { AppRouter }
