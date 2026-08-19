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
  if (ticketCategory === "SERVICE_DESK") {
    return true;
  }

  /*
   * Players without a specialist
   * path cannot resolve specialist
   * tickets.
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

function isServiceDeskPlayer(
  level: number,
  careerPath: string | null
) {
  return (
    level < 4 ||
    !careerPath
  );
}

function isSpecialistPlayer(
  level: number,
  careerPath: string | null
) {
  return (
    level >= 4 &&
    careerPath !== null
  );
}

/*
 * ============================
 * WRONG TEAM MESSAGES
 * ============================
 *
 * Randomised so the player
 * doesn't see the exact same
 * message every time.
 */
function getWrongBounceMessage() {
  const messages = [
    "You successfully routed the ticket to a team that has absolutely nothing to do with it. Impressive, in a way.",

    "The receiving team opened the ticket, sighed, and immediately started a private Teams chat about your routing skills.",

    "Wrong queue. The receiving team would like to know which part of their job title made this look like their problem.",

    "You have created unnecessary cross-team collaboration. Nobody asked for this.",

    "The ticket reached the wrong team. Their response was professional. Their internal chat was not.",

    "Routing failed successfully. The ticket moved somewhere, just nowhere useful.",

    "The receiving team has reviewed the ticket and politely requested that you never do this again.",

    "You bounced the ticket into the wrong queue. Somewhere, someone just typed 'why is this with us?' into Teams.",

    "The ticket is now owned by people who cannot fix it. Your contribution to operational efficiency has been noted.",

    "Congratulations. You have turned one person's problem into two teams' problem.",

    "The wrong team now owns the ticket. They are currently deciding whether to send it back or frame it as evidence.",

    "You routed the ticket confidently, quickly, and completely incorrectly.",

    "The ticket has arrived at the wrong resolver group. Everyone involved is now slightly more annoyed than before.",

    "Your routing decision has been reviewed by the receiving team. The review contained several question marks.",

    "The ticket went to the wrong team. They would bounce it back immediately, but they're still laughing.",

    "You have successfully demonstrated why resolver groups exist.",

    "The ticket has been transferred to a team that cannot help. At least the bounce count went up.",

    "Wrong team. Somebody has already added 'please educate Service Desk' to the internal notes.",

    "The receiving team has accepted the ticket in the same way someone accepts an unexpected parking fine.",

    "You routed the ticket somewhere. Technically, that is half of routing.",
  ];

  return messages[
    Math.floor(
      Math.random() *
        messages.length
    )
  ];
}

export async function POST(
  request: Request,
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
     * TICKET ID + TARGET
     * ============================
     */
    const { id } =
      await context.params;

    const ticketId =
      Number(id);

    const body =
      await request.json();

    const targetPlayerId =
      Number(
        body.targetPlayerId
      );

    if (
      !Number.isInteger(ticketId) ||
      !Number.isInteger(
        targetPlayerId
      )
    ) {
      return NextResponse.json(
        {
          error:
            "Invalid request.",
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
     * Cannot bounce to yourself.
     */
    if (
      player.id ===
      targetPlayerId
    ) {
      return NextResponse.json(
        {
          error:
            "You cannot bounce a ticket to yourself.",
        },
        {
          status: 400,
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
            "Ticket not found.",
        },
        {
          status: 404,
        }
      );
    }

    /*
     * Ticket must belong to the
     * current player and be OPEN.
     */
    if (
      ticket.assignedToId !==
        player.id ||
      ticket.status !==
        "OPEN"
    ) {
      return NextResponse.json(
        {
          error:
            "Ticket is not in your open queue.",
        },
        {
          status: 400,
        }
      );
    }

    /*
     * ============================
     * TARGET PLAYER
     * ============================
     */
    const target =
      await prisma.player.findUnique({
        where: {
          id:
            targetPlayerId,
        },
      });

    if (!target) {
      return NextResponse.json(
        {
          error:
            "Target player not found.",
        },
        {
          status: 404,
        }
      );
    }

    /*
     * ============================
     * RESOLVER CAPABILITY
     * ============================
     */
    const senderCanResolve =
      canPlayerResolve(
        player.level,
        player.careerPath,
        ticket.category
      );

    const targetCanResolve =
      canPlayerResolve(
        target.level,
        target.careerPath,
        ticket.category
      );

    /*
     * ============================
     * PLAYER TYPES
     * ============================
     */
    const senderIsSpecialist =
      isSpecialistPlayer(
        player.level,
        player.careerPath
      );

    const targetIsServiceDesk =
      isServiceDeskPlayer(
        target.level,
        target.careerPath
      );

    /*
     * ==================================
     * SPECIALIST -> SERVICE DESK HANDOFF
     * ==================================
     */
    const specialistReturningToServiceDesk =
      ticket.category ===
        "SERVICE_DESK" &&
      senderIsSpecialist &&
      targetIsServiceDesk;

    if (
      specialistReturningToServiceDesk
    ) {
      await prisma.$transaction([
        prisma.ticket.update({
          where: {
            id:
              ticket.id,
          },

          data: {
            assignedToId:
              target.id,

            lastSentById:
              player.id,

            bounceCount: {
              increment: 1,
            },
          },
        }),

        prisma.player.update({
          where: {
            id:
              player.id,
          },

          data: {
            lifetimeTicketsHandled: {
              increment: 1,
            },

            lastActiveAt:
              new Date(),
          },
        }),
      ]);

      return NextResponse.json({
        success: true,

        outcome:
          "SERVICE_DESK_HANDOFF",

        correct:
          true,

        target:
          target.username,

        reward:
          0,

        xp:
          0,

        message:
          `Service Desk ticket handed to ${target.username}.`,
      });
    }

    /*
     * ==================================
     * OWNERSHIP WARNING
     * ==================================
     */
    if (
      senderCanResolve &&
      targetCanResolve
    ) {
      const queuePenaltyUntil =
        new Date(
          Date.now() +
            5 * 60 * 1000
        );

      await prisma.$transaction([
        prisma.ticket.update({
          where: {
            id:
              ticket.id,
          },

          data: {
            assignedToId:
              target.id,

            lastSentById:
              player.id,

            bounceCount: {
              increment: 1,
            },
          },
        }),

        prisma.player.update({
          where: {
            id:
              player.id,
          },

          data: {
            queuePenaltyUntil,

            lifetimeTicketsHandled: {
              increment: 1,
            },

            lastActiveAt:
              new Date(),
          },
        }),
      ]);

      return NextResponse.json({
        success: true,

        outcome:
          "OWNERSHIP_WARNING",

        target:
          target.username,

        queuePenaltyUntil,

        message:
          "You transferred a ticket that you could have resolved. Your queue priority has been reduced for 5 minutes.",
      });
    }

    /*
     * ==================================
     * CORRECT ESCALATION
     * ==================================
     */
    if (
      !senderCanResolve &&
      targetCanResolve
    ) {
      const currentValue =
        calculateTicketValue(
          ticket.maxValue,
          ticket.createdAt
        );

      const reward =
        Math.max(
          0,
          Math.floor(
            currentValue *
              0.25
          )
        );

      const xpReward =
        5;

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
            assignedToId:
              target.id,

            lastSentById:
              player.id,

            bounceCount: {
              increment: 1,
            },
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

            correctBounces: {
              increment: 1,
            },

            lifetimeTicketsHandled: {
              increment: 1,
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

      return NextResponse.json({
        success: true,

        outcome:
          "CORRECT_BOUNCE",

        correct:
          true,

        target:
          target.username,

        reward,

        xp:
          xpReward,

        level:
          newLevel,

        levelledUp,

        careerUnlocked,
      });
    }

    /*
     * ==================================
     * WRONG TEAM
     * ==================================
     */
    const penalty =
      100;

    /*
     * Transfer the ticket first.
     */
    await prisma.ticket.update({
      where: {
        id:
          ticket.id,
      },

      data: {
        assignedToId:
          target.id,

        lastSentById:
          player.id,

        bounceCount: {
          increment: 1,
        },
      },
    });

    /*
     * Apply penalty.
     */
    const penaltyResult =
      await applyCreditPenalty(
        player.id,
        player.credits,
        penalty
      );

    /*
     * Record incorrect bounce.
     */
    await prisma.player.update({
      where: {
        id:
          player.id,
      },

      data: {
        incorrectBounces: {
          increment: 1,
        },

        lifetimeTicketsHandled: {
          increment: 1,
        },

        lastActiveAt:
          new Date(),
      },
    });

    /*
     * Pick a random funny message.
     */
    const wrongBounceMessage =
      getWrongBounceMessage();

    return NextResponse.json({
      success: true,

      outcome:
        "WRONG_BOUNCE",

      correct:
        false,

      target:
        target.username,

      penalty,

      credits:
        penaltyResult.player
          .credits,

      bankrupt:
        penaltyResult.bankrupt,

      resetToServiceDesk:
        penaltyResult.bankrupt,

      message:
        penaltyResult.bankrupt
          ? "You bounced the ticket to the wrong team, lost your remaining Credits, and got yourself sent back to Service Desk. Outstanding work."
          : wrongBounceMessage,
    });
  } catch (error) {
    console.error(
      "Bounce ticket error:",
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