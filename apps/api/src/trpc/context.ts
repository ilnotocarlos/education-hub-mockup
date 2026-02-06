import type { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify"
import type { PrismaClient } from "@prisma/client"
import { prisma } from "../services/db.js"

export interface Context {
  prisma: PrismaClient
  userId?: string
}

export function createContext({ req, res }: CreateFastifyContextOptions): Context {
  // TODO: Extract userId from auth session (Sprint 4)
  return {
    prisma,
    userId: undefined,
  }
}
