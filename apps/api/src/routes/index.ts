import { router } from "../trpc/trpc.js"
import { usersRouter } from "./users.js"
import { coursesRouter } from "./courses.js"
import { lessonsRouter } from "./lessons.js"

export const appRouter = router({
  users: usersRouter,
  courses: coursesRouter,
  lessons: lessonsRouter,
})

export type AppRouter = typeof appRouter
