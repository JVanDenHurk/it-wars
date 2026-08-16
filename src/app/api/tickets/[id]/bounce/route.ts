import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { getLevelFromXp } from "@/lib/player-level";
import { prisma } from "@/lib/prisma";

function getPlayerCategory(
  level: number,
  careerPath: string | null
) {
  if (level < 4) {
    return "SERVICE_DESK";
  }

  if (careerPath === "NETWORK") {
    return "NETWORK";
  }

  if (careerPath === "SYSTEMS") {
    return "SYSTEMS";
  }

  if (careerPath === "SECURITY") {
    return "SECURITY";
  }

  return null;
}

function calculateTicketValue(
  maxValue: number,
  createdAt: Date
) {
  const ageMs = Date.now() - createdAt.getTime();
  const ageMinutes = Math.floor(ageMs / 60000);

  const lossPerMinute = maxValue * 0.02;

  const value = Math.floor(
    maxValue - ageMinutes * lossPerMinute
  );

  return Math.max(
    Math.floor(maxValue * 0.1),
    value
  );
}

export async function POST(
  request: Request,
  context: {
    params: Promise<{ id: string }>;
  }
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json(
        { error: "Not authenticated." },
        { status: 401 }
      );
    }

    const { id } = await context.params;
    const ticketId = Number(id);

    const body = await request.json();
    const targetPlayerId = Number(body.targetPlayerId);

    if (
      !Number.isInteger(ticketId) ||
      !Number.isInteger(targetPlayerId)
    ) {
      return NextResponse.json(
        { error: "Invalid request." },
        { status: 400 }
      );
    }

    const player = await prisma.player.findUnique({
      where: {
        userId: session.user.id,
      },
    });

    if (!player) {
      return NextResponse.json(
        { error: "Player not found." },
        { status: 404 }
      );
    }

    if (player.id === targetPlayerId) {
      return NextResponse.json(
        { error: "You cannot bounce a ticket to yourself." },
        { status: 400 }
      );
    }

    const ticket = await prisma.ticket.findUnique({
      where: {
        id: ticketId,
      },
    });

    if (!ticket) {
      return NextResponse.json(
        { error: "Ticket not found." },
        { status: 404 }
      );
    }

    if (
      ticket.assignedToId !== player.id ||
      ticket.status !== "OPEN"
    ) {
      return NextResponse.json(
        { error: "Ticket is not in your open queue." },
        { status: 400 }
      );
    }

    const target = await prisma.player.findUnique({
      where: {
        id: targetPlayerId,
      },
    });

    if (!target) {
      return NextResponse.json(
        { error: "Target player not found." },
        { status: 404 }
      );
    }

    const senderCategory = getPlayerCategory(
      player.level,
      player.careerPath
    );

    const targetCategory = getPlayerCategory(
      target.level,
      target.careerPath
    );

    /*
     * SAME-TEAM HANDOFF
     *
     * Example:
     * SDA -> SDA for an SDA ticket.
     *
     * Ticket still transfers.
     * No credit penalty.
     * Sender gets a 5 minute personal queue slowdown.
     */
    if (
      senderCategory === ticket.category &&
      targetCategory === ticket.category
    ) {
      const queuePenaltyUntil =
        new Date(Date.now() + 5 * 60 * 1000);

      await prisma.$transaction([
        prisma.ticket.update({
          where: {
            id: ticket.id,
          },
          data: {
            assignedToId: target.id,
            lastSentById: player.id,
            bounceCount: {
              increment: 1,
            },
          },
        }),

        prisma.player.update({
          where: {
            id: player.id,
          },
          data: {
            queuePenaltyUntil,

            lifetimeTicketsHandled: {
              increment: 1,
            },

            lastActiveAt: new Date(),
          },
        }),
      ]);

      return NextResponse.json({
        success: true,
        outcome: "OWNERSHIP_WARNING",
        target: target.username,
        queuePenaltyUntil,
        message:
          "You transferred a ticket that you could have resolved. Your queue priority has been reduced for 5 minutes.",
      });
    }

    /*
     * CORRECT ESCALATION
     *
     * Example:
     * SDA receives Network ticket
     * -> sends it to Network Engineer.
     */
    if (targetCategory === ticket.category) {
      const currentValue = calculateTicketValue(
        ticket.maxValue,
        ticket.createdAt
      );

      const reward = Math.max(
        1,
        Math.floor(currentValue * 0.25)
      );

      const xpReward = 5;

      const newXp =
        player.xp + xpReward;

      const newLevel =
        getLevelFromXp(newXp);

      const levelledUp =
        newLevel > player.level;

      const careerUnlocked =
        player.level < 4 &&
        newLevel >= 4 &&
        !player.careerPath;

      await prisma.$transaction([
        prisma.ticket.update({
          where: {
            id: ticket.id,
          },
          data: {
            assignedToId: target.id,
            lastSentById: player.id,
            bounceCount: {
              increment: 1,
            },
          },
        }),

        prisma.player.update({
          where: {
            id: player.id,
          },
          data: {
            credits: {
              increment: reward,
            },

            xp: newXp,
            level: newLevel,

            correctBounces: {
              increment: 1,
            },

            lifetimeTicketsHandled: {
              increment: 1,
            },

            lifetimeCreditsEarned: {
              increment: reward,
            },

            lastActiveAt: new Date(),
          },
        }),
      ]);

      return NextResponse.json({
        success: true,
        outcome: "CORRECT_BOUNCE",
        correct: true,
        target: target.username,
        reward,
        xp: xpReward,
        level: newLevel,
        levelledUp,
        careerUnlocked,
      });
    }

    /*
     * WRONG TEAM
     *
     * Ticket still transfers.
     * Sender loses credits.
     */
    const penalty = 100;

    const newCredits = Math.max(
      0,
      player.credits - penalty
    );

    await prisma.$transaction([
      prisma.ticket.update({
        where: {
          id: ticket.id,
        },
        data: {
          assignedToId: target.id,
          lastSentById: player.id,
          bounceCount: {
            increment: 1,
          },
        },
      }),

      prisma.player.update({
        where: {
          id: player.id,
        },
        data: {
          credits: newCredits,

          incorrectBounces: {
            increment: 1,
          },

          lifetimeTicketsHandled: {
            increment: 1,
          },

          lastActiveAt: new Date(),
        },
      }),
    ]);

    return NextResponse.json({
      success: true,
      outcome: "WRONG_BOUNCE",
      correct: false,
      target: target.username,
      penalty,
      credits: newCredits,
      bankrupt: newCredits === 0,
      message:
        "Wrong team. They are not happy about having to deal with your ticket.",
    });
  } catch (error) {
    console.error("Bounce ticket error:", error);

    return NextResponse.json(
      {
        error: "Internal server error.",
      },
      {
        status: 500,
      }
    );
  }
}