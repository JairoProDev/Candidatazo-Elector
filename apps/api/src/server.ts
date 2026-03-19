import Fastify from "fastify";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import rateLimit from "@fastify/rate-limit";
import { prisma } from "@candidatazo/database";
import { candidateRoutes } from "./routes/candidates.js";
import { dnaRoutes } from "./routes/dna.js";
import { factCheckRoutes } from "./routes/factchecks.js";
import { matchRoutes } from "./routes/matches.js";
import { userRoutes } from "./routes/users.js";
import { healthRoutes } from "./routes/health.js";

// Default API port is kept away from Next's common dev ports to avoid races when
// turborepo starts both apps concurrently. Override with PORT=... if desired.
const PORT = parseInt(process.env.PORT || "4000", 10);
const HOST = process.env.HOST || "0.0.0.0";

async function buildServer() {
  const app = Fastify({
    logger: {
      level: process.env.NODE_ENV === "production" ? "info" : "debug",
      transport:
        process.env.NODE_ENV !== "production"
          ? { target: "pino-pretty", options: { colorize: true } }
          : undefined,
    },
  });

  // Security
  await app.register(helmet, {
    contentSecurityPolicy: false,
  });

  // CORS
  await app.register(cors, {
    origin: process.env.NODE_ENV === "production"
      ? ["https://candidatazo.pe", "https://www.candidatazo.pe"]
      : true,
    credentials: true,
  });

  // Rate limiting
  await app.register(rateLimit, {
    max: 100,
    timeWindow: "1 minute",
  });

  // Decorate with prisma
  app.decorate("prisma", prisma);

  // Graceful shutdown
  app.addHook("onClose", async () => {
    await prisma.$disconnect();
  });

  // Error handler
  app.setErrorHandler((error: { statusCode?: number; message?: string }, _request, reply) => {
    app.log.error(error);

    const statusCode = error.statusCode || 500;
    const message =
      statusCode === 500
        ? "Error interno del servidor"
        : error.message || "Error desconocido";

    reply.status(statusCode).send({
      success: false,
      error: message,
      statusCode,
    });
  });

  // Base routes (avoid noisy 404s when someone hits API port in a browser)
  app.get("/", async () => {
    return {
      success: true,
      service: "candidatazo-api",
      version: "v1",
    };
  });

  app.get("/favicon.ico", async (_request, reply) => {
    reply.status(204).send();
  });

  // Register routes
  await app.register(healthRoutes, { prefix: "/api/v1" });
  await app.register(userRoutes, { prefix: "/api/v1/users" });
  await app.register(candidateRoutes, { prefix: "/api/v1/candidates" });
  await app.register(dnaRoutes, { prefix: "/api/v1/dna" });
  await app.register(matchRoutes, { prefix: "/api/v1/matches" });
  await app.register(factCheckRoutes, { prefix: "/api/v1/factchecks" });

  return app;
}

async function start() {
  try {
    const app = await buildServer();
    const maxAttempts = parseInt(process.env.PORT_SCAN_ATTEMPTS || "25", 10);
    let port = PORT;

    for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
      try {
        // eslint-disable-next-line no-await-in-loop
        await app.listen({ port, host: HOST });
        app.log.info(`Candidatazo API running on http://${HOST}:${port}`);
        return;
      } catch (err) {
        const e = err as { code?: string };
        if (e?.code === "EADDRINUSE") {
          port += 1;
          continue;
        }
        throw err;
      }
    }

    throw new Error(`No available port found starting at ${PORT} after ${maxAttempts} attempts`);
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

start();

export { buildServer };
