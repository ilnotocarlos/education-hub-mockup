import { z } from "zod"
import { router, publicProcedure } from "../trpc/trpc.js"

export const coursesRouter = router({
  list: publicProcedure
    .input(
      z
        .object({
          category: z.string().optional(),
          level: z.enum(["beginner", "intermediate", "advanced"]).optional(),
        })
        .optional()
    )
    .query(async ({ ctx, input }) => {
      return ctx.prisma.course.findMany({
        where: {
          ...(input?.category && { category: input.category }),
          ...(input?.level && { level: input.level }),
          published: true,
        },
        include: {
          modules: { orderBy: { order: "asc" } },
          _count: { select: { enrollments: true } },
        },
        orderBy: { createdAt: "desc" },
      })
    }),

  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.prisma.course.findUnique({
        where: { slug: input.slug },
        include: {
          modules: {
            orderBy: { order: "asc" },
            include: {
              lessons: { orderBy: { order: "asc" } },
            },
          },
          _count: { select: { enrollments: true } },
        },
      })
    }),
})
