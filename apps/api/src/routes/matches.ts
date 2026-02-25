import type { FastifyPluginAsync } from "fastify";
import { prisma } from "@candidatazo/database";

export const matchRoutes: FastifyPluginAsync = async (app) => {
  // GET /matches?userId= - Get all matches for a user
  app.get("/", async (request, reply) => {
    const { userId } = request.query as { userId: string };

    if (!userId) {
      return reply.status(400).send({
        success: false,
        error: "userId es requerido",
        statusCode: 400,
      });
    }

    const matches = await prisma.match.findMany({
      where: { userId },
      include: {
        candidate: {
          select: {
            id: true,
            name: true,
            slug: true,
            party: true,
            photo: true,
            positions: true,
            truthScore: true,
          },
        },
      },
      orderBy: { overallScore: "desc" },
    });

    return reply.send({ success: true, data: matches });
  });

  // GET /matches/:userId/:candidateSlug - Get detailed match with a specific candidate
  app.get("/:userId/:candidateSlug", async (request, reply) => {
    const { userId, candidateSlug } = request.params as {
      userId: string;
      candidateSlug: string;
    };

    const candidate = await prisma.candidate.findUnique({
      where: { slug: candidateSlug },
      include: { promises: true },
    });

    if (!candidate) {
      return reply.status(404).send({
        success: false,
        error: "Candidato no encontrado",
        statusCode: 404,
      });
    }

    const match = await prisma.match.findUnique({
      where: {
        userId_candidateId: {
          userId,
          candidateId: candidate.id,
        },
      },
    });

    if (!match) {
      return reply.status(404).send({
        success: false,
        error: "No hay match calculado. Completa el test de ADN primero.",
        statusCode: 404,
      });
    }

    // Get user's ADN test for comparison
    const dnaTest = await prisma.dnaTest.findFirst({
      where: { userId, status: "COMPLETED" },
      orderBy: { completedAt: "desc" },
    });

    return reply.send({
      success: true,
      data: {
        match,
        candidate,
        userScores: dnaTest?.scores || null,
      },
    });
  });
};
