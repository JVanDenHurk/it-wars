import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { applyCreditPenalty } from "@/lib/player-bankruptcy";
import { getLevelFromXp } from "@/lib/player-level";
import { prisma } from "@/lib/prisma";
import { calculateTicketValue } from "@/lib/ticket-value";

function canPlayerResolve(
  level: number,
  careerPath: string | null,
  ticketCategory: string
) {
  /*
   * Everyone can resolve
   * Service Desk tickets.
   */
  if (
    ticketCategory ===
    "SERVICE_DESK"
  ) {
    return true;
  }

  /*
   * Players who have not yet
   * selected a specialist path
   * cannot resolve specialist work.
   */
  if (
    level < 4 ||
    !careerPath
  ) {
    return false;
  }

  /*
   * Specialists can resolve
   * tickets belonging to their
   * own career path.
   */
  if (
    careerPath === "NETWORK" &&
    ticketCategory === "NETWORK"
  ) {
    return true;
  }

  if (
    careerPath === "SYSTEMS" &&
    ticketCategory === "SYSTEMS"
  ) {
    return true;
  }

  if (
    careerPath === "SECURITY" &&
    ticketCategory === "SECURITY"
  ) {
    return true;
  }

  return false;
}

export async function POST(
  _request: Request,
  context: {
    params: Promise<{ id: string }>;
  }
) {
  try {
    /*
     * ============================
     * AUTHENTICATION
     * ============================
     */
    const session =
      await auth.api.getSession({
        headers: await headers(),
      });

    if (!session) {
      return NextResponse.json(
        {
          error:
            "Not authenticated.",
        },
        {
          status: 401,
        }
      );
    }

    /*
     * ============================
     * TICKET ID
     * ============================
     */
    const { id } =
      await context.params;

    const ticketId =
      Number(id);

    if (!Number.isInteger(ticketId)) {
      return NextResponse.json(
        {
          error:
            "Invalid ticket ID.",
        },
        {
          status: 400,
        }
      );
    }

    /*
     * ============================
     * CURRENT PLAYER
     * ============================
     */
    const player =
      await prisma.player.findUnique({
        where: {
          userId:
            session.user.id,
        },
      });

    if (!player) {
      return NextResponse.json(
        {
          error:
            "Player not found.",
        },
        {
          status: 404,
        }
      );
    }

    /*
     * ============================
     * TICKET
     * ============================
     */
    const ticket =
      await prisma.ticket.findUnique({
        where: {
          id:
            ticketId,
        },
      });

    if (!ticket) {
      return NextResponse.json(
        {
          error:
            "Ticket does not exist.",
        },
        {
          status: 404,
        }
      );
    }

    /*
     * Ticket must belong to
     * the current player.
     */
    if (
      ticket.assignedToId !==
      player.id
    ) {
      return NextResponse.json(
        {
          error:
            "Ticket belongs to another player.",
        },
        {
          status: 403,
        }
      );
    }

    /*
     * Ticket must still be open.
     */
    if (
      ticket.status !==
      "OPEN"
    ) {
      return NextResponse.json(
        {
          error:
            `Ticket is ${ticket.status}, not OPEN.`,
        },
        {
          status: 400,
        }
      );
    }

    /*
     * ============================
     * RESOLVER CHECK
     * ============================
     */
    const correct =
      canPlayerResolve(
        player.level,
        player.careerPath,
        ticket.category
      );

    const ticketNumber =
      `INC${ticket.id
        .toString()
        .padStart(5, "0")}`;

    /*
     * ============================
     * CORRECT RESOLUTION
     * ============================
     */
    if (correct) {
      const reward =
        calculateTicketValue(
          ticket.maxValue,
          ticket.createdAt
        );

      const xpReward =
        ticket.baseXp;

      const newXp =
        player.xp +
        xpReward;

      const newLevel =
        getLevelFromXp(
          newXp
        );

      const levelledUp =
        newLevel >
        player.level;

      const careerUnlocked =
        player.level < 4 &&
        newLevel >= 4 &&
        !player.careerPath;

      await prisma.$transaction([
        prisma.ticket.update({
          where: {
            id:
              ticket.id,
          },

          data: {
            status:
              "RESOLVED",

            resolvedAt:
              new Date(),
          },
        }),

        prisma.player.update({
          where: {
            id:
              player.id,
          },

          data: {
            credits: {
              increment:
                reward,
            },

            xp:
              newXp,

            level:
              newLevel,

            ticketsResolved: {
              increment:
                1,
            },

            lifetimeTicketsHandled: {
              increment:
                1,
            },

            lifetimeCreditsEarned: {
              increment:
                reward,
            },

            lastActiveAt:
              new Date(),
          },
        }),
      ]);

      /*
       * ============================
       * SUCCESS RESPONSE
       * ============================
       */
      return NextResponse.json({
        success:
          true,

        correct:
          true,

        ticketId:
          ticket.id,

        ticketNumber,

        ticketTitle:
          ticket.title,

        ticketCategory:
          ticket.category,

        severity:
          ticket.severity,

        reward,

        xp:
          xpReward,

        totalXp:
          newXp,

        level:
          newLevel,

        levelledUp,

        careerUnlocked,

        successMessage:
          ticket.successMessage ??
          undefined,
      });
    }

    /*
     * ============================
     * WRONG RESOLUTION
     * ============================
     */
    const penalty =
      100;

    const failureMessage =
      ticket.failureMessage ??
      "Your attempted resolution somehow made the situation worse.";

    /*
     * Close ticket as FAILED.
     */
    await prisma.ticket.update({
      where: {
        id:
          ticket.id,
      },

      data: {
        status:
          "FAILED",
      },
    });

    /*
     * ============================
     * APPLY CREDIT PENALTY
     * ============================
     *
     * If this ticket originated
     * from a PvP attack, pass the
     * original attack information
     * to the bankruptcy helper.
     *
     * If this penalty reduces the
     * player to 0 Credits, the
     * attacker receives the kill.
     */
    const penaltyResult =
      await applyCreditPenalty(
        player.id,
        player.credits,
        penalty,
        {
          attackSourcePlayerId:
            ticket.attackSourcePlayerId,

          pvpAttackId:
            ticket.pvpAttackId,
        }
      );

    /*
     * ============================
     * RECORD FAILED RESOLUTION
     * ============================
     */
    await prisma.player.update({
      where: {
        id:
          player.id,
      },

      data: {
        incorrectResolves: {
          increment:
            1,
        },

        lifetimeTicketsHandled: {
          increment:
            1,
        },

        lastActiveAt:
          new Date(),
      },
    });

    /*
     * ============================
     * FAILURE RESPONSE
     * ============================
     */
    return NextResponse.json({
      success:
        true,

      correct:
        false,

      failed:
        true,

      ticketId:
        ticket.id,

      ticketNumber,

      ticketTitle:
        ticket.title,

      ticketCategory:
        ticket.category,

      severity:
        ticket.severity,

      penalty,

      credits:
        penaltyResult.player
          .credits,

      failureMessage,

      bankrupt:
        penaltyResult.bankrupt,

      resetToServiceDesk:
        penaltyResult.bankrupt,

      /*
       * PvP information.
       *
       * We can use this later for
       * messages such as:
       *
       * "Justin caused your bankruptcy."
       */
      killAwarded:
        penaltyResult.killAwarded,

      attackSourcePlayerId:
        ticket.attackSourcePlayerId,

      pvpAttackId:
        ticket.pvpAttackId,
    });
  } catch (error) {
    console.error(
      "Resolve ticket error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Internal server error.",
      },
      {
        status: 500,
      }
    );
  }
}