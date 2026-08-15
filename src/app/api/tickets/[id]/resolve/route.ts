import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { getLevelFromXp } from "@/lib/player-level";
import { prisma } from "@/lib/prisma";

function getPlayerCategory(
  level: number,
  careerPath: string | null
) {
  // Levels 1-3 are Service Desk
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

  // Lose 2% of the maximum value every minute.
  const lossPerMinute = maxValue * 0.02;

  const value = Math.floor(
    maxValue - ageMinutes * lossPerMinute
  );

  // Minimum ticket value is 10%.
  return Math.max(
    Math.floor(maxValue * 0.1),
    value
  );
}

export async function POST(
  _request: Request,
  context: {
    params: Promise<{ id: string }>;
  }
) {
  try {
    /*
     * Authentication
     */
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json(
        { error: "Not authenticated." },
        { status: 401 }
      );
    }

    /*
     * Ticket ID
     */
    const { id } = await context.params;
    const ticketId = Number(id);

    if (!Number.isInteger(ticketId)) {
      return NextResponse.json(
        { error: "Invalid ticket ID." },
        { status: 400 }
      );
    }

    /*
     * Current player
     */
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

    /*
     * Ticket
     */
    const ticket = await prisma.ticket.findUnique({
      where: {
        id: ticketId,
      },
    });

    if (!ticket) {
      return NextResponse.json(
        { error: "Ticket does not exist." },
        { status: 404 }
      );
    }

    /*
     * Make sure the ticket belongs to this player
     */
    if (ticket.assignedToId !== player.id) {
      return NextResponse.json(
        { error: "Ticket belongs to another player." },
        { status: 403 }
      );
    }

    /*
     * Ticket must still be open
     */
    if (ticket.status !== "OPEN") {
      return NextResponse.json(
        {
          error: `Ticket is ${ticket.status}, not OPEN.`,
        },
        { status: 400 }
      );
    }

    /*
     * Determine what category this player can resolve
     */
    const playerCategory = getPlayerCategory(
      player.level,
      player.careerPath
    );

    const correct =
      playerCategory === ticket.category;

    /*
     * ============================
     * CORRECT RESOLUTION
     * ============================
     */
    if (correct) {
      const reward = calculateTicketValue(
        ticket.maxValue,
        ticket.createdAt
      );

      const xpReward = ticket.baseXp;

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
        /*
         * Close ticket
         */
        prisma.ticket.update({
          where: {
            id: ticket.id,
          },
          data: {
            status: "RESOLVED",
            resolvedAt: new Date(),
          },
        }),

        /*
         * Reward player
         */
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

            ticketsResolved: {
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
        correct: true,

        reward,

        xp: xpReward,
        totalXp: newXp,

        level: newLevel,
        levelledUp,

        careerUnlocked,
      });
    }

    /*
     * ============================
     * WRONG RESOLUTION
     * ============================
     */

    const penalty = 100;

    const newCredits = Math.max(
      0,
      player.credits - penalty
    );

    await prisma.player.update({
      where: {
        id: player.id,
      },
      data: {
        credits: newCredits,

        incorrectResolves: {
          increment: 1,
        },

        lifetimeTicketsHandled: {
          increment: 1,
        },

        lastActiveAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      correct: false,

      penalty,

      credits: newCredits,

      bankrupt:
        newCredits === 0,
    });
  } catch (error) {
    console.error(
      "Resolve ticket error:",
      error
    );

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