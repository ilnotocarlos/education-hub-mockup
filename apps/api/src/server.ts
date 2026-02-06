import Fastify from "fastify"
import cors from "@fastify/cors"
import helmet from "@fastify/helmet"
import rateLimit from "@fastify/rate-limit"
import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify"
import { appRouter } from "./routes/index.js"
import { createContext } from "./trpc/context.js"

const PORT = Number(process.env.API_PORT) || 4000
const HOST = process.env.API_HOST || "0.0.0.0"
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:3333"

async function buildServer() {
  const server = Fastify({
    logger: {
      level: process.env.LOG_LEVEL || "info",
      transport:
        process.env.NODE_ENV === "development"
          ? { target: "pino-pretty" }
          : undefined,
    },
  })

  await server.register(cors, {
    origin: CORS_ORIGIN,
    credentials: true,
  })

  await server.register(helmet)

  await server.register(rateLimit, {
    max: 100,
    timeWindow: "1 minute",
  })

  // Health check
  server.get("/health", async () => ({
    status: "ok",
    timestamp: new Date().toISOString(),
  }))

  // tRPC
  await server.register(fastifyTRPCPlugin, {
    prefix: "/trpc",
    trpcOptions: {
      router: appRouter,
      createContext,
    },
  })

  return server
}

async function main() {
  const server = await buildServer()

  try {
    await server.listen({ port: PORT, host: HOST })
    server.log.info(`API server running on http://${HOST}:${PORT}`)
    server.log.info(`tRPC endpoint: http://${HOST}:${PORT}/trpc`)
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

main()
