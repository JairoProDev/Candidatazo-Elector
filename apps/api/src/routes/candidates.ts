import type { FastifyPluginAsync } from "fastify";
import { prisma } from "@candidatazo/database";

export const candidateRoutes: FastifyPluginAsync = async (app) => {
  // GET /candidates - List all active candidates
  app.get("/", async (request, reply) => {
    const { page = "1", limit = "20", search } = request.query as {
      page?: string;
      limit?: string;
      search?: string;
    };

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.min(50, Math.max(1, parseInt(limit, 10) || 20));
    const skip = (pageNum - 1) * limitNum;

    const where: Record<string, unknown> = { active: true };
    if (search && typeof search === "string") {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { party: { contains: search, mode: "insensitive" } },
      ];
    }

    const [candidates, total] = await Promise.all([
      prisma.candidate.findMany({
        where,
        skip,
        take: limitNum,
        orderBy: { name: "asc" },
        include: {
          _count: { select: { promises: true, factChecks: true } },
        },
      }),
      prisma.candidate.count({ where }),
    ]);

    return reply.send({
      success: true,
      data: candidates,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum),
      },
    });
  });

  // GET /candidates/:slug - Get candidate by slug
  app.get("/:slug", async (request, reply) => {
    const { slug } = request.params as { slug: string };

    const candidate = await prisma.candidate.findUnique({
      where: { slug },
      include: {
        promises: {
          orderBy: { category: "asc" },
        },
        factChecks: {
          where: { featured: true },
          take: 5,
          orderBy: { publishedAt: "desc" },
        },
        _count: {
          select: { promises: true, factChecks: true, matches: true },
        },
      },
    });

    if (!candidate) {
      return reply.status(404).send({
        success: false,
        error: "Candidato no encontrado",
        statusCode: 404,
      });
    }

    return reply.send({ success: true, data: candidate });
  });

  // GET /candidates/:slug/promises - Get candidate promises
  app.get("/:slug/promises", async (request, reply) => {
    const { slug } = request.params as { slug: string };
    const { category } = request.query as { category?: string };

    const candidate = await prisma.candidate.findUnique({
      where: { slug },
      select: { id: true },
    });

    if (!candidate) {
      return reply.status(404).send({
        success: false,
        error: "Candidato no encontrado",
        statusCode: 404,
      });
    }

    const where: Record<string, unknown> = { candidateId: candidate.id };
    if (category) {
      where.category = category;
    }

    const promises = await prisma.promise.findMany({
      where,
      orderBy: [{ category: "asc" }, { createdAt: "desc" }],
    });

    return reply.send({ success: true, data: promises });
  });

  // GET /candidates/:slug/factchecks - Get fact-checks for a candidate
  app.get("/:slug/factchecks", async (request, reply) => {
    const { slug } = request.params as { slug: string };
    const { page = "1", limit = "10" } = request.query as {
      page?: string;
      limit?: string;
    };

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.min(50, Math.max(1, parseInt(limit, 10) || 10));
    const skip = (pageNum - 1) * limitNum;

    const candidate = await prisma.candidate.findUnique({
      where: { slug },
      select: { id: true },
    });

    if (!candidate) {
      return reply.status(404).send({
        success: false,
        error: "Candidato no encontrado",
        statusCode: 404,
      });
    }

    const [factChecks, total] = await Promise.all([
      prisma.factCheck.findMany({
        where: { candidateId: candidate.id },
        skip,
        take: limitNum,
        orderBy: { publishedAt: "desc" },
      }),
      prisma.factCheck.count({ where: { candidateId: candidate.id } }),
    ]);

    return reply.send({
      success: true,
      data: factChecks,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum),
      },
    });
  });
};
