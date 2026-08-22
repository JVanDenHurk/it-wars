import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import {
  getCareerValueDecayMultiplier,
  getPoisonPenalty,
} from "@/lib/career-abilities";
import {
  finalizeExpiredMaintenanceWindows,
} from "@/lib/maintenance-window";
import { applyCreditPenalty } from "@/lib/player-bankruptcy";
import { getLevelFromXp } from "@/lib/player-level";
import { prisma } from "@/lib/prisma";
import { canPlayerResolve } from "@/lib/resolver-capability";
import { calculateTicketValue } from "@/lib/ticket-value";

export async function POST(
  _request: Request,
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

    if (
      !Number.isInteger(
        ticketId
      )
    ) {
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
            "Ticket does not exist.",
        },
        {
          status: 404,
        }
      );
    }

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

    const resolutionPenaltyPoison =
      await prisma.ticket.findFirst({
        where: {
          assignedToId:
            player.id,

          status:
            "OPEN",

          isPoison:
            true,

          poisonEffect:
            "RESOLUTION_PENALTY",
        },

        select: {
          id:
            true,
        },
      });

    const resolutionPenaltyActive =
      resolutionPenaltyPoison !==
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

    const securityPassiveActive =
      player.careerPath ===
      "SECURITY";

    const maintenanceActive =
      ticket.maintenanceUntil !==
        null &&
      ticket.maintenanceUntil >
        new Date();

    const correct =
      canPlayerResolve(
        player.level,
        player.careerPath,
        ticket.category
      );

    const ticketNumber =
      `INC${ticket.id
        .toString()
        .padStart(
          5,
          "0"
        )}`;

    if (correct) {
      const reward =
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

      const xpReward =
        ticket.isPoison
          ? 0
          : ticket.baseXp;

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

      const resolvedAt =
        new Date();

      await prisma.$transaction([
        prisma.ticket.update({
          where: {
            id:
              ticket.id,
          },

          data: {
            status:
              "RESOLVED",

            resolvedAt,
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
              resolvedAt,
          },
        }),
      ]);

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

        totalXp:
          newXp,

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

        securityPassiveActive,

        securityPassiveName:
          securityPassiveActive
            ? "Incident Hardened"
            : null,

        successMessage:
          ticket.successMessage ??
          undefined,
      });
    }

    const basePenalty =
      100;

    const poisonAdjustedPenalty =
      resolutionPenaltyActive
        ? Math.floor(
            basePenalty *
              1.5
          )
        : basePenalty;

    const penalty =
      ticket.isPoison
        ? getPoisonPenalty(
            player.careerPath,
            poisonAdjustedPenalty
          )
        : poisonAdjustedPenalty;

    const securityPenaltyReduced =
      ticket.isPoison &&
      securityPassiveActive &&
      penalty <
        poisonAdjustedPenalty;

    const securityPenaltySaved =
      securityPenaltyReduced
        ? poisonAdjustedPenalty -
          penalty
        : 0;

    const failureMessage =
      ticket.failureMessage ??
      "Your attempted resolution somehow made the situation worse.";

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

      poisonAdjustedPenalty,

      penalty,

      resolutionPenaltyActive,

      securityPassiveActive,

      securityPassiveName:
        securityPassiveActive
          ? "Incident Hardened"
          : null,

      securityPenaltyReduced,

      securityPenaltySaved,

      credits:
        penaltyResult.player
          .credits,

      failureMessage,

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