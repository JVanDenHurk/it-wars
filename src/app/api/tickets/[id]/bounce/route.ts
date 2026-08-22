import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import {
  getCareerValueDecayMultiplier,
  getWrongBouncePenalty,
} from "@/lib/career-abilities";
import {
  finalizeExpiredMaintenanceWindows,
} from "@/lib/maintenance-window";
import { applyCreditPenalty } from "@/lib/player-bankruptcy";
import { getLevelFromXp } from "@/lib/player-level";
import { prisma } from "@/lib/prisma";
import { calculateTicketValue } from "@/lib/ticket-value";

function canPlayerResolve(
  level: number,
  careerPath: string | null,
  ticketCategory: string
) {
  if (ticketCategory === "SERVICE_DESK") {
    return true;
  }

  if (
    level < 4 ||
    !careerPath
  ) {
    return false;
  }

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

function getDnsFailureMessage() {
  const messages = [
    "DNS failed to resolve the destination. The ticket has gone absolutely nowhere.",
    "The bounce failed. DNS has decided the other resolver group does not exist.",
    "Unable to route ticket. Apparently DNS is now responsible for Service Management too.",
    "The ticket tried to leave your queue. DNS had other plans.",
    "Routing request failed. It's DNS. Of course it's DNS.",
    "The destination could not be resolved. Your ticket remains exactly where you did not want it.",
    "Bounce failed successfully. DNS cannot find the team, the server, or apparently the will to continue.",
    "The resolver group is definitely real. DNS simply disagrees.",
    "Ticket transfer failed. Have you tried flushing DNS and lowering your expectations?",
    "DNS has prevented the bounce. The ticket remains your problem for at least a little longer.",
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
    params: Promise<{
      id: string;
    }>;
  }
) {
  try {
    const session =
      await auth.api.getSession({
        headers:
          await headers(),
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
      !Number.isInteger(
        ticketId
      ) ||
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

    await finalizeExpiredMaintenanceWindows(
      player.id
    );

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

    const dnsFailurePoison =
      await prisma.ticket.findFirst({
        where: {
          assignedToId:
            player.id,

          status:
            "OPEN",

          isPoison:
            true,

          poisonEffect:
            "BOUNCE_FAILURE",
        },

        select: {
          id:
            true,
        },
      });

    const dnsFailureActive =
      dnsFailurePoison !==
      null;

    if (
      dnsFailureActive
    ) {
      const bounceFailed =
        Math.random() <
        0.5;

      if (
        bounceFailed
      ) {
        await prisma.player.update({
          where: {
            id:
              player.id,
          },

          data: {
            lastActiveAt:
              new Date(),
          },
        });

        return NextResponse.json({
          success:
            true,

          outcome:
            "DNS_BOUNCE_FAILURE",

          transferred:
            false,

          dnsFailureActive:
            true,

          target:
            target.username,

          message:
            getDnsFailureMessage(),
        });
      }
    }

    const valueDecayPoison =
      await prisma.ticket.findFirst({
        where: {
          assignedToId:
            player.id,

          status:
            "OPEN",

          isPoison:
            true,

          poisonEffect:
            "VALUE_DECAY",
        },

        select: {
          id:
            true,
        },
      });

    const valueDecayActive =
      valueDecayPoison !==
      null;

    const careerDecayMultiplier =
      getCareerValueDecayMultiplier(
        player.careerPath
      );

    const poisonDecayMultiplier =
      valueDecayActive
        ? 1.25
        : 1;

    const finalDecayMultiplier =
      careerDecayMultiplier *
      poisonDecayMultiplier;

    const systemsPassiveActive =
      player.careerPath ===
      "SYSTEMS";

    const networkPassiveActive =
      player.careerPath ===
      "NETWORK";

    const maintenanceActive =
      ticket.maintenanceUntil !==
        null &&
      ticket.maintenanceUntil >
        new Date();

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
              increment:
                1,
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
              increment:
                1,
            },

            lastActiveAt:
              new Date(),
          },
        }),
      ]);

      return NextResponse.json({
        success:
          true,

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

        isPoison:
          ticket.isPoison,

        poisonEffect:
          ticket.poisonEffect,

        maintenanceActive,

        maintenanceUntil:
          ticket
            .maintenanceUntil,

        maintenancePausedMinutes:
          ticket
            .maintenancePausedMinutes,

        message:
          ticket.isPoison
            ? `Poison Ticket routed to ${target.username}. Its effect now follows the ticket.`
            : `Service Desk ticket handed to ${target.username}.`,
      });
    }

    if (
      senderCanResolve &&
      targetCanResolve
    ) {
      const queuePenaltyUntil =
        new Date(
          Date.now() +
            5 *
              60 *
              1000
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
              increment:
                1,
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
              increment:
                1,
            },

            lastActiveAt:
              new Date(),
          },
        }),
      ]);

      return NextResponse.json({
        success:
          true,

        outcome:
          "OWNERSHIP_WARNING",

        target:
          target.username,

        queuePenaltyUntil,

        isPoison:
          ticket.isPoison,

        poisonEffect:
          ticket.poisonEffect,

        maintenanceActive,

        maintenanceUntil:
          ticket
            .maintenanceUntil,

        maintenancePausedMinutes:
          ticket
            .maintenancePausedMinutes,

        message:
          "You transferred a ticket that you could have resolved. Your queue priority has been reduced for 5 minutes.",
      });
    }

    if (
      !senderCanResolve &&
      targetCanResolve
    ) {
      const currentValue =
        ticket.isPoison
          ? 0
          : calculateTicketValue(
              ticket.maxValue,
              ticket.createdAt,
              finalDecayMultiplier,
              ticket
                .slaAgeOffsetMinutes,
              ticket
                .maintenanceUntil,
              ticket
                .maintenancePausedMinutes
            );

      const reward =
        ticket.isPoison
          ? 0
          : Math.max(
              0,
              Math.floor(
                currentValue *
                  0.25
              )
            );

      const xpReward =
        ticket.isPoison
          ? 0
          : 5;

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
              increment:
                1,
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
              increment:
                1,
            },

            careerCorrectBounces: {
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

      return NextResponse.json({
        success:
          true,

        outcome:
          "CORRECT_BOUNCE",

        correct:
          true,

        target:
          target.username,

        isPoison:
          ticket.isPoison,

        poisonEffect:
          ticket.poisonEffect,

        slaAgeOffsetMinutes:
          ticket
            .slaAgeOffsetMinutes,

        maintenanceActive,

        maintenanceUntil:
          ticket
            .maintenanceUntil,

        maintenancePausedMinutes:
          ticket
            .maintenancePausedMinutes,

        reward,

        xp:
          xpReward,

        level:
          newLevel,

        levelledUp,

        careerUnlocked,

        valueDecayActive,

        poisonDecayMultiplier,

        systemsPassiveActive,

        systemsPassiveName:
          systemsPassiveActive
            ? "Automation"
            : null,

        careerDecayMultiplier,

        finalDecayMultiplier,

        message:
          ticket.isPoison
            ? `Poison Ticket successfully routed to ${target.username}. You escaped it, but there is no reward for passing the problem along.`
            : undefined,
      });
    }

    const basePenalty =
      100;

    const penalty =
      getWrongBouncePenalty(
        player.careerPath,
        basePenalty
      );

    const networkPenaltyReduced =
      networkPassiveActive &&
      penalty <
        basePenalty;

    const networkPenaltySaved =
      networkPenaltyReduced
        ? basePenalty -
          penalty
        : 0;

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
          increment:
            1,
        },
      },
    });

    const penaltyResult =
      await applyCreditPenalty(
        player.id,
        player.credits,
        penalty,
        {
          attackSourcePlayerId:
            ticket
              .attackSourcePlayerId,

          pvpAttackId:
            ticket.pvpAttackId,
        }
      );

    /*
     * ============================
     * RECORD WRONG BOUNCE
     * ============================
     *
     * Lifetime stat always increases.
     *
     * Current-career stat increases
     * only if this mistake did NOT
     * bankrupt the player.
     *
     * If bankruptcy happened,
     * applyCreditPenalty has already
     * reset careerIncorrectBounces
     * back to 0 for the new run.
     */
    if (
      penaltyResult.bankrupt
    ) {
      await prisma.player.update({
        where: {
          id:
            player.id,
        },

        data: {
          incorrectBounces: {
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
    } else {
      await prisma.player.update({
        where: {
          id:
            player.id,
        },

        data: {
          incorrectBounces: {
            increment:
              1,
          },

          careerIncorrectBounces: {
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
    }

    const wrongBounceMessage =
      getWrongBounceMessage();

    return NextResponse.json({
      success:
        true,

      outcome:
        "WRONG_BOUNCE",

      correct:
        false,

      target:
        target.username,

      isPoison:
        ticket.isPoison,

      poisonEffect:
        ticket.poisonEffect,

      slaAgeOffsetMinutes:
        ticket
          .slaAgeOffsetMinutes,

      maintenanceActive,

      maintenanceUntil:
        ticket
          .maintenanceUntil,

      maintenancePausedMinutes:
        ticket
          .maintenancePausedMinutes,

      basePenalty,

      penalty,

      networkPassiveActive,

      networkPassiveName:
        networkPassiveActive
          ? "Routing Specialist"
          : null,

      networkPenaltyReduced,

      networkPenaltySaved,

      credits:
        penaltyResult.player
          .credits,

      bankrupt:
        penaltyResult.bankrupt,

      resetToServiceDesk:
        penaltyResult.bankrupt,

      killAwarded:
        penaltyResult.killAwarded,

      attackSourcePlayerId:
        ticket
          .attackSourcePlayerId,

      pvpAttackId:
        ticket.pvpAttackId,

      message:
        penaltyResult.bankrupt
          ? "You bounced the ticket to the wrong team, lost your remaining Credits, and got yourself sent back to Service Desk. Outstanding work."
          : networkPenaltyReduced
            ? `${wrongBounceMessage} Routing Specialist reduced the penalty by ${networkPenaltySaved} CR.`
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