import type { FastifyPluginAsync } from "fastify";
import { prisma } from "@candidatazo/database";
import { generateReferralCode } from "@candidatazo/utils";

export const userRoutes: FastifyPluginAsync = async (app) => {
  // POST /users - Create or sync user
  app.post("/", async (request, reply) => {
    const { email, name, clerkId, avatar } = request.body as {
      email: string;
      name?: string;
      clerkId?: string;
      avatar?: string;
    };

    if (!email) {
      return reply.status(400).send({
        success: false,
        error: "Email es requerido",
        statusCode: 400,
      });
    }

    const user = await prisma.user.upsert({
      where: { email },
      create: {
        email,
        name,
        clerkId,
        avatar,
      },
      update: {
        name: name || undefined,
        clerkId: clerkId || undefined,
        avatar: avatar || undefined,
        lastActive: new Date(),
      },
    });

    // Create referral code if doesn't exist
    const existingReferral = await prisma.referral.findFirst({
      where: { referrerId: user.id },
    });

    if (!existingReferral) {
      await prisma.referral.create({
        data: {
          referrerId: user.id,
          code: generateReferralCode(),
        },
      });
    }

    return reply.status(201).send({ success: true, data: user });
  });

  // GET /users/:id - Get user profile
  app.get("/:id", async (request, reply) => {
    const { id } = request.params as { id: string };

    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        location: true,
        dnaTests: {
          where: { status: "COMPLETED" },
          orderBy: { completedAt: "desc" },
          take: 1,
        },
        achievements: {
          include: { achievement: true },
          orderBy: { unlockedAt: "desc" },
        },
        tribes: {
          include: { tribe: true },
        },
        _count: {
          select: {
            matches: true,
            posts: true,
            factCheckVotes: true,
          },
        },
      },
    });

    if (!user) {
      return reply.status(404).send({
        success: false,
        error: "Usuario no encontrado",
        statusCode: 404,
      });
    }

    return reply.send({ success: true, data: user });
  });

  // PATCH /users/:id - Update user profile
  app.patch("/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const updates = request.body as {
      name?: string;
      avatar?: string;
      ageRange?: string;
      language?: string;
      onboardingDone?: boolean;
    };

    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      return reply.status(404).send({
        success: false,
        error: "Usuario no encontrado",
        statusCode: 404,
      });
    }

    const updated = await prisma.user.update({
      where: { id },
      data: {
        ...(updates.name !== undefined && { name: updates.name }),
        ...(updates.avatar !== undefined && { avatar: updates.avatar }),
        ...(updates.ageRange !== undefined && { ageRange: updates.ageRange as "RANGE_18_25" | "RANGE_26_40" | "RANGE_41_55" | "RANGE_56_PLUS" }),
        ...(updates.language !== undefined && { language: updates.language }),
        ...(updates.onboardingDone !== undefined && { onboardingDone: updates.onboardingDone }),
        lastActive: new Date(),
      },
    });

    return reply.send({ success: true, data: updated });
  });

  // GET /users/:id/stats - Get user statistics
  app.get("/:id/stats", async (request, reply) => {
    const { id } = request.params as { id: string };

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        xp: true,
        level: true,
        streak: true,
        _count: {
          select: {
            dnaTests: true,
            matches: true,
            posts: true,
            comments: true,
            factCheckVotes: true,
            achievements: true,
          },
        },
      },
    });

    if (!user) {
      return reply.status(404).send({
        success: false,
        error: "Usuario no encontrado",
        statusCode: 404,
      });
    }

    const referral = await prisma.referral.findFirst({
      where: { referrerId: id },
      select: { code: true, clicks: true, signups: true },
    });

    return reply.send({
      success: true,
      data: {
        xp: user.xp,
        level: user.level,
        streak: user.streak,
        testsCompleted: user._count.dnaTests,
        matchesCalculated: user._count.matches,
        postsCreated: user._count.posts,
        commentsWritten: user._count.comments,
        factChecksVoted: user._count.factCheckVotes,
        achievementsUnlocked: user._count.achievements,
        referral,
      },
    });
  });
};
