import type { FastifyPluginAsync } from "fastify";
import { prisma } from "@candidatazo/database";

export const healthRoutes: FastifyPluginAsync = async (app) => {
  app.get("/health", async (_request, reply) => {
    try {
      // Test database connection
      await prisma.$queryRaw`SELECT 1`;
      return reply.send({
        success: true,
        data: {
          status: "healthy",
          timestamp: new Date().toISOString(),
          database: "connected",
        },
      });
    } catch {
      return reply.status(503).send({
        success: false,
        error: "Database connection failed",
        statusCode: 503,
      });
    }
  });
};
