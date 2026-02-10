import type { FastifyPluginAsync } from "fastify";
import { prisma } from "@candidatazo/database";
import { calculateDnaScores, determineTribe, calculateMatchScore } from "@candidatazo/utils";
import type { DnaAnswer, CandidatePositions } from "@candidatazo/types";

export const dnaRoutes: FastifyPluginAsync = async (app) => {
  // GET /dna/questions - Get all active DNA test questions
  app.get("/questions", async (_request, reply) => {
    const questions = await prisma.dnaQuestion.findMany({
      where: { active: true },
      orderBy: [{ dimension: "asc" }, { order: "asc" }],
    });

    return reply.send({ success: true, data: questions });
  });

  // POST /dna/start - Start a new DNA test
  app.post("/start", async (request, reply) => {
    const { userId } = request.body as { userId?: string };

    const totalQuestions = await prisma.dnaQuestion.count({
      where: { active: true },
    });

    const test = await prisma.dnaTest.create({
      data: {
        userId: userId || "anonymous",
        totalSteps: totalQuestions,
        answers: [],
      },
    });

    const questions = await prisma.dnaQuestion.findMany({
      where: { active: true },
      orderBy: [{ dimension: "asc" }, { order: "asc" }],
    });

    return reply.status(201).send({
      success: true,
      data: {
        testId: test.id,
        totalSteps: totalQuestions,
        questions,
      },
    });
  });

  // POST /dna/:id/answer - Submit an answer
  app.post("/:id/answer", async (request, reply) => {
    const { id } = request.params as { id: string };
    const { questionId, value, importance } = request.body as {
      questionId: string;
      value: number;
      importance: number;
    };

    const test = await prisma.dnaTest.findUnique({ where: { id } });
    if (!test) {
      return reply.status(404).send({
        success: false,
        error: "Test no encontrado",
        statusCode: 404,
      });
    }

    if (test.status === "COMPLETED") {
      return reply.status(400).send({
        success: false,
        error: "Este test ya fue completado",
        statusCode: 400,
      });
    }

    const currentAnswers = (test.answers as DnaAnswer[]) || [];
    const existingIndex = currentAnswers.findIndex(
      (a) => a.questionId === questionId
    );

    if (existingIndex >= 0) {
      currentAnswers[existingIndex] = { questionId, value, importance };
    } else {
      currentAnswers.push({ questionId, value, importance });
    }

    const updated = await prisma.dnaTest.update({
      where: { id },
      data: {
        answers: currentAnswers as unknown as Record<string, unknown>[],
        currentStep: currentAnswers.length,
      },
    });

    return reply.send({
      success: true,
      data: {
        testId: updated.id,
        currentStep: updated.currentStep,
        totalSteps: updated.totalSteps,
        progress: Math.round((updated.currentStep / updated.totalSteps) * 100),
      },
    });
  });

  // POST /dna/:id/complete - Complete the test and get results
  app.post("/:id/complete", async (request, reply) => {
    const { id } = request.params as { id: string };

    const test = await prisma.dnaTest.findUnique({ where: { id } });
    if (!test) {
      return reply.status(404).send({
        success: false,
        error: "Test no encontrado",
        statusCode: 404,
      });
    }

    if (test.status === "COMPLETED") {
      return reply.status(400).send({
        success: false,
        error: "Este test ya fue completado",
        statusCode: 400,
      });
    }

    const answers = test.answers as DnaAnswer[];
    if (answers.length < 5) {
      return reply.status(400).send({
        success: false,
        error: "Debes responder al menos 5 preguntas para obtener resultados",
        statusCode: 400,
      });
    }

    // Get question dimensions for calculation
    const questions = await prisma.dnaQuestion.findMany({
      where: { active: true },
      select: { id: true, dimension: true },
    });

    const questionDimensions: Record<string, string> = {};
    for (const q of questions) {
      questionDimensions[q.id] = q.dimension;
    }

    // Calculate scores
    const scores = calculateDnaScores(answers, questionDimensions);
    const tribe = determineTribe(scores);

    // Calculate matches with all active candidates
    const candidates = await prisma.candidate.findMany({
      where: { active: true },
      select: { id: true, name: true, photo: true, party: true, positions: true },
    });

    const matches = candidates
      .map((candidate) => {
        const positions = candidate.positions as unknown as CandidatePositions;
        const { overallScore, breakdown } = calculateMatchScore(scores, positions);

        return {
          candidateId: candidate.id,
          candidateName: candidate.name,
          candidatePhoto: candidate.photo,
          candidateParty: candidate.party,
          overallScore,
          breakdown,
        };
      })
      .sort((a, b) => b.overallScore - a.overallScore);

    // Save results
    const updated = await prisma.dnaTest.update({
      where: { id },
      data: {
        status: "COMPLETED",
        scores: scores as unknown as Record<string, unknown>,
        tribe,
        completedAt: new Date(),
      },
    });

    // Save matches to database if user is registered
    if (test.userId && test.userId !== "anonymous") {
      const matchOps = matches.map((m) =>
        prisma.match.upsert({
          where: {
            userId_candidateId: {
              userId: test.userId,
              candidateId: m.candidateId,
            },
          },
          create: {
            userId: test.userId,
            candidateId: m.candidateId,
            overallScore: m.overallScore,
            breakdown: m.breakdown as unknown as Record<string, unknown>,
            agreements: [],
            disagreements: [],
          },
          update: {
            overallScore: m.overallScore,
            breakdown: m.breakdown as unknown as Record<string, unknown>,
          },
        })
      );
      await Promise.all(matchOps);
    }

    return reply.send({
      success: true,
      data: {
        testId: updated.id,
        scores,
        tribe,
        topMatches: matches.slice(0, 5),
        allMatches: matches,
      },
    });
  });

  // GET /dna/:id/results - Get test results
  app.get("/:id/results", async (request, reply) => {
    const { id } = request.params as { id: string };

    const test = await prisma.dnaTest.findUnique({ where: { id } });
    if (!test) {
      return reply.status(404).send({
        success: false,
        error: "Test no encontrado",
        statusCode: 404,
      });
    }

    if (test.status !== "COMPLETED") {
      return reply.status(400).send({
        success: false,
        error: "Este test aun no ha sido completado",
        statusCode: 400,
      });
    }

    // Recalculate matches (they might have changed if candidates were updated)
    const candidates = await prisma.candidate.findMany({
      where: { active: true },
      select: { id: true, name: true, photo: true, party: true, positions: true },
    });

    const scores = test.scores as unknown as Record<string, number>;
    const matches = candidates
      .map((candidate) => {
        const positions = candidate.positions as unknown as CandidatePositions;
        const { overallScore, breakdown } = calculateMatchScore(
          scores as CandidatePositions,
          positions
        );
        return {
          candidateId: candidate.id,
          candidateName: candidate.name,
          candidatePhoto: candidate.photo,
          candidateParty: candidate.party,
          overallScore,
          breakdown,
        };
      })
      .sort((a, b) => b.overallScore - a.overallScore);

    return reply.send({
      success: true,
      data: {
        testId: test.id,
        scores: test.scores,
        tribe: test.tribe,
        summary: test.summary,
        topMatches: matches.slice(0, 5),
        allMatches: matches,
        completedAt: test.completedAt,
      },
    });
  });
};
