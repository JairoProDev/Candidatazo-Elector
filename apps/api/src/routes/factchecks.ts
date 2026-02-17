import type { FastifyPluginAsync } from "fastify";
import { prisma } from "@candidatazo/database";

export const factCheckRoutes: FastifyPluginAsync = async (app) => {
  // GET /factchecks - List fact-checks with filters
  app.get("/", async (request, reply) => {
    const {
      page = "1",
      limit = "10",
      verdict,
      featured,
      candidateSlug,
    } = request.query as {
      page?: string;
      limit?: string;
      verdict?: string;
      featured?: string;
      candidateSlug?: string;
    };

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.min(50, Math.max(1, parseInt(limit, 10) || 10));
    const skip = (pageNum - 1) * limitNum;

    const where: Record<string, unknown> = {};

    if (verdict) {
      where.verdict = verdict;
    }

    if (featured === "true") {
      where.featured = true;
    }

    if (candidateSlug) {
      const candidate = await prisma.candidate.findUnique({
        where: { slug: candidateSlug },
        select: { id: true },
      });
      if (candidate) {
        where.candidateId = candidate.id;
      }
    }

    const [factChecks, total] = await Promise.all([
      prisma.factCheck.findMany({
        where,
        skip,
        take: limitNum,
        orderBy: { publishedAt: "desc" },
        include: {
          candidate: {
            select: {
              id: true,
              name: true,
              slug: true,
              party: true,
              photo: true,
            },
          },
        },
      }),
      prisma.factCheck.count({ where }),
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

  // GET /factchecks/featured - Get featured fact-checks
  app.get("/featured", async (_request, reply) => {
    const factChecks = await prisma.factCheck.findMany({
      where: { featured: true },
      take: 10,
      orderBy: { publishedAt: "desc" },
      include: {
        candidate: {
          select: {
            id: true,
            name: true,
            slug: true,
            party: true,
            photo: true,
          },
        },
      },
    });

    return reply.send({ success: true, data: factChecks });
  });

  // GET /factchecks/:id - Get a single fact-check
  app.get("/:id", async (request, reply) => {
    const { id } = request.params as { id: string };

    const factCheck = await prisma.factCheck.findUnique({
      where: { id },
      include: {
        candidate: {
          select: {
            id: true,
            name: true,
            slug: true,
            party: true,
            photo: true,
          },
        },
      },
    });

    if (!factCheck) {
      return reply.status(404).send({
        success: false,
        error: "Fact-check no encontrado",
        statusCode: 404,
      });
    }

    return reply.send({ success: true, data: factCheck });
  });

  // POST /factchecks/:id/vote - Vote on a fact-check
  app.post("/:id/vote", async (request, reply) => {
    const { id } = request.params as { id: string };
    const { userId, agrees } = request.body as {
      userId: string;
      agrees: boolean;
    };

    if (!userId) {
      return reply.status(400).send({
        success: false,
        error: "userId es requerido",
        statusCode: 400,
      });
    }

    const factCheck = await prisma.factCheck.findUnique({ where: { id } });
    if (!factCheck) {
      return reply.status(404).send({
        success: false,
        error: "Fact-check no encontrado",
        statusCode: 404,
      });
    }

    // Upsert the vote
    const existingVote = await prisma.factCheckVote.findUnique({
      where: { userId_factCheckId: { userId, factCheckId: id } },
    });

    if (existingVote) {
      // Update existing vote
      await prisma.factCheckVote.update({
        where: { id: existingVote.id },
        data: { agrees },
      });

      // Recalculate counts
      if (existingVote.agrees !== agrees) {
        await prisma.factCheck.update({
          where: { id },
          data: {
            upvotes: { increment: agrees ? 1 : -1 },
            downvotes: { increment: agrees ? -1 : 1 },
          },
        });
      }
    } else {
      // Create new vote
      await prisma.factCheckVote.create({
        data: { userId, factCheckId: id, agrees },
      });

      await prisma.factCheck.update({
        where: { id },
        data: {
          [agrees ? "upvotes" : "downvotes"]: { increment: 1 },
        },
      });
    }

    const updated = await prisma.factCheck.findUnique({
      where: { id },
      select: { upvotes: true, downvotes: true },
    });

    return reply.send({
      success: true,
      data: { upvotes: updated!.upvotes, downvotes: updated!.downvotes },
    });
  });

  // GET /factchecks/stats/summary - Get overall fact-check statistics
  app.get("/stats/summary", async (_request, reply) => {
    const [total, byVerdict, byCandidateRaw] = await Promise.all([
      prisma.factCheck.count(),
      prisma.factCheck.groupBy({
        by: ["verdict"],
        _count: { id: true },
      }),
      prisma.factCheck.groupBy({
        by: ["candidateId"],
        _count: { id: true },
        _avg: { confidence: true },
        where: { candidateId: { not: null } },
      }),
    ]);

    // Get candidate names for the stats
    const candidateIds: string[] = byCandidateRaw
      .map((b: { candidateId: string | null }) => b.candidateId)
      .filter((id): id is string => id !== null);

    const candidateNames = await prisma.candidate.findMany({
      where: { id: { in: candidateIds } },
      select: { id: true, name: true, slug: true },
    });

    const nameMap = new Map(candidateNames.map((c) => [c.id, c]));

    const byCandidate = byCandidateRaw.map((b: { candidateId: string | null; _count: { id: number }; _avg: { confidence: number | null } }) => ({
      candidate: nameMap.get(b.candidateId!) || { name: "Desconocido" },
      count: b._count.id,
      avgConfidence: b._avg.confidence,
    }));

    return reply.send({
      success: true,
      data: {
        total,
        byVerdict: byVerdict.map((v: { verdict: string; _count: { id: number } }) => ({
          verdict: v.verdict,
          count: v._count.id,
        })),
        byCandidate,
      },
    });
  });
};
