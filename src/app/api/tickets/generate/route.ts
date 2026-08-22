import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  getPvPAttackDefinition,
  type PvPAttackType,
} from "@/lib/pvp-attacks";

type ResolvableCategory =
  | "SERVICE_DESK"
  | "NETWORK"
  | "SYSTEMS"
  | "SECURITY";

type PlayerCareerInfo = {
  level: number;
  careerPath: string | null;
};

function randomSeconds(
  min: number,
  max: number
) {
  return Math.floor(
    Math.random() *
      (max - min + 1) +
      min
  );
}

/*
 * ============================
 * NEXT TICKET TIME
 * ============================
 *
 * Normal:
 * 60-120 seconds
 *
 * Ownership warning:
 * 180-300 seconds
 *
 * Queue-speed poison:
 * multiplier comes from
 * pvp-attacks.ts
 */
function getNextTicketTime(
  queuePenaltyActive: boolean,
  queueSpeedMultiplier = 1
) {
  let seconds =
    queuePenaltyActive
      ? randomSeconds(
          180,
          300
        )
      : randomSeconds(
          60,
          120
        );

  /*
   * Self-Service Portal Outage.
   *
   * Example:
   *
   * queueSpeedMultiplier = 0.7
   *
   * 100 seconds
   *      ↓
   * 70 seconds
   */
  const safeMultiplier =
    Math.max(
      0.1,
      queueSpeedMultiplier
    );

  seconds =
    Math.max(
      15,
      Math.floor(
        seconds *
          safeMultiplier
      )
    );

  return new Date(
    Date.now() +
      seconds *
        1000
  );
}

/*
 * ============================
 * TEAM COUNTS
 * ============================
 */
function getTeamCounts(
  players: PlayerCareerInfo[]
) {
  return {
    SERVICE_DESK:
      players.filter(
        (player) =>
          player.level < 4 ||
          !player.careerPath
      ).length,

    NETWORK:
      players.filter(
        (player) =>
          player.level >= 4 &&
          player.careerPath ===
            "NETWORK"
      ).length,

    SYSTEMS:
      players.filter(
        (player) =>
          player.level >= 4 &&
          player.careerPath ===
            "SYSTEMS"
      ).length,

    SECURITY:
      players.filter(
        (player) =>
          player.level >= 4 &&
          player.careerPath ===
            "SECURITY"
      ).length,
  };
}

/*
 * ============================
 * CATEGORY WEIGHTS
 * ============================
 */
function getCategoryWeights(
  players: PlayerCareerInfo[]
): Record<
  ResolvableCategory,
  number
> {
  const counts =
    getTeamCounts(
      players
    );

  return {
    SERVICE_DESK:
      counts.SERVICE_DESK +
      2,

    NETWORK:
      counts.NETWORK,

    SYSTEMS:
      counts.SYSTEMS,

    SECURITY:
      counts.SECURITY,
  };
}

/*
 * ============================
 * WEIGHTED CATEGORY PICK
 * ============================
 */
function chooseWeightedCategory(
  weights: Record<
    ResolvableCategory,
    number
  >
): ResolvableCategory | null {
  const entries =
    Object.entries(
      weights
    ).filter(
      ([, weight]) =>
        weight > 0
    ) as [
      ResolvableCategory,
      number,
    ][];

  if (
    entries.length ===
    0
  ) {
    return null;
  }

  const totalWeight =
    entries.reduce(
      (
        sum,
        [, weight]
      ) =>
        sum +
        weight,
      0
    );

  let roll =
    Math.random() *
    totalWeight;

  for (
    const [
      category,
      weight,
    ] of entries
  ) {
    roll -=
      weight;

    if (
      roll <
      0
    ) {
      return category;
    }
  }

  return entries[
    entries.length -
      1
  ][0];
}

/*
 * ============================
 * RANDOM TEMPLATE
 * ============================
 */
async function getRandomTemplate(
  categoryWeights: Record<
    ResolvableCategory,
    number
  >
) {
  const selectedCategory =
    chooseWeightedCategory(
      categoryWeights
    );

  if (
    !selectedCategory
  ) {
    return null;
  }

  let templates =
    await prisma.ticketTemplate.findMany({
      where: {
        active:
          true,

        category:
          selectedCategory,
      },
    });

  let finalCategory =
    selectedCategory;

  /*
   * Safety fallback.
   */
  if (
    templates.length ===
      0 &&
    selectedCategory !==
      "SERVICE_DESK"
  ) {
    finalCategory =
      "SERVICE_DESK";

    templates =
      await prisma.ticketTemplate.findMany({
        where: {
          active:
            true,

          category:
            "SERVICE_DESK",
        },
      });
  }

  if (
    templates.length ===
    0
  ) {
    return null;
  }

  const template =
    templates[
      Math.floor(
        Math.random() *
          templates.length
      )
    ];

  return {
    template,
    category:
      finalCategory,
  };
}

export async function POST() {
  try {
    /*
     * ============================
     * AUTHENTICATION
     * ============================
     */
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

    const now =
      new Date();

    const activeCutoff =
      new Date(
        now.getTime() -
          2 *
            60 *
            1000
      );

    /*
     * ============================
     * TICKET TIMER
     * ============================
     */
    if (
      player.nextTicketAt &&
      player.nextTicketAt >
        now
    ) {
      return NextResponse.json({
        success:
          true,

        generated:
          false,

        nextTicketAt:
          player.nextTicketAt,
      });
    }

    /*
     * ============================
     * OWNERSHIP PENALTY
     * ============================
     */
    const queuePenaltyActive =
      player.queuePenaltyUntil !==
        null &&
      player.queuePenaltyUntil >
        now;

    /*
     * ============================
     * SELF-SERVICE PORTAL OUTAGE
     * ============================
     *
     * Find the active Poison Ticket.
     *
     * We load its PvP attack so the
     * actual multiplier can come from
     * pvp-attacks.ts rather than being
     * duplicated here.
     */
    const queueSpeedPoison =
      await prisma.ticket.findFirst({
        where: {
          assignedToId:
            player.id,

          status:
            "OPEN",

          isPoison:
            true,

          poisonEffect:
            "QUEUE_SPEED",
        },

        select: {
          id:
            true,

          pvpAttack: {
            select: {
              type:
                true,
            },
          },
        },
      });

    const queueSpeedPoisonActive =
      queueSpeedPoison !==
      null;

    let queueSpeedMultiplier =
      1;

    if (
      queueSpeedPoisonActive &&
      queueSpeedPoison
        .pvpAttack
    ) {
      const definition =
        getPvPAttackDefinition(
          queueSpeedPoison
            .pvpAttack
            .type as
            PvPAttackType
        );

      queueSpeedMultiplier =
        definition
          ?.queueSpeedMultiplier ??
        1;
    }

    /*
     * ============================
     * MAIL QUEUE BACKLOG
     * ============================
     *
     * The Poison Ticket stays open
     * until the player deals with it,
     * but the burst itself only fires
     * once.
     *
     * PvPAttack ACTIVE:
     * burst hasn't fired yet
     *
     * PvPAttack COMPLETED:
     * burst already consumed
     */
    const mailBacklogPoison =
      await prisma.ticket.findFirst({
        where: {
          assignedToId:
            player.id,

          status:
            "OPEN",

          isPoison:
            true,

          poisonEffect:
            "MAIL_BACKLOG",

          pvpAttack: {
            is: {
              status:
                "ACTIVE",
            },
          },
        },

        select: {
          id:
            true,

          pvpAttackId:
            true,

          pvpAttack: {
            select: {
              type:
                true,
            },
          },
        },
      });

    const mailBacklogActive =
      mailBacklogPoison !==
        null &&
      mailBacklogPoison
        .pvpAttackId !==
        null;

    /*
     * Get burst count from
     * pvp-attacks.ts.
     */
    let backlogTicketCount =
      1;

    if (
      mailBacklogActive &&
      mailBacklogPoison
        ?.pvpAttack
    ) {
      const definition =
        getPvPAttackDefinition(
          mailBacklogPoison
            .pvpAttack
            .type as
            PvPAttackType
        );

      backlogTicketCount =
        Math.max(
          1,
          definition
            ?.backlogTicketCount ??
            3
        );
    }

    /*
     * ============================
     * ACTIVE PLAYERS
     * ============================
     */
    const activePlayers =
      await prisma.player.findMany({
        where: {
          credits: {
            gt:
              0,
          },

          lastActiveAt: {
            gt:
              activeCutoff,
          },

          user: {
            sessions: {
              some: {
                expiresAt: {
                  gt:
                    now,
                },
              },
            },
          },
        },

        select: {
          level:
            true,

          careerPath:
            true,
        },
      });

    if (
      activePlayers.length ===
      0
    ) {
      return NextResponse.json(
        {
          error:
            "No active players are currently available.",
        },
        {
          status: 400,
        }
      );
    }

    /*
     * ============================
     * CATEGORY WEIGHTS
     * ============================
     */
    const categoryWeights =
      getCategoryWeights(
        activePlayers
      );

    /*
     * ============================
     * NUMBER OF NORMAL TICKETS
     * ============================
     *
     * Normal delivery:
     * 1
     *
     * Mail Queue Backlog:
     * configured burst amount.
     */
    const ticketCount =
      mailBacklogActive
        ? backlogTicketCount
        : 1;

    /*
     * ============================
     * LOAD TEMPLATES
     * ============================
     *
     * Every legitimate ticket gets
     * its own category/template roll.
     */
    const chosenTemplates = [];

    for (
      let i = 0;
      i < ticketCount;
      i++
    ) {
      const chosen =
        await getRandomTemplate(
          categoryWeights
        );

      if (!chosen) {
        return NextResponse.json(
          {
            error:
              "No ticket templates are available.",
          },
          {
            status: 404,
          }
        );
      }

      chosenTemplates.push(
        chosen
      );
    }

    /*
     * ============================
     * NEXT TICKET TIME
     * ============================
     *
     * Ownership slowdown is applied
     * first.
     *
     * Self-Service Portal Outage then
     * reduces whatever interval was
     * generated.
     *
     * This means poison can partially
     * counteract an ownership slowdown.
     */
    const nextTicketAt =
      getNextTicketTime(
        queuePenaltyActive,
        queueSpeedMultiplier
      );

    /*
     * ============================
     * CREATE LIVE TICKETS
     * ============================
     */
    const transactionResult =
      await prisma.$transaction(
        async (tx) => {
          const createdTickets =
            [];

          for (
            const chosen of
            chosenTemplates
          ) {
            const template =
              chosen.template;

            const ticket =
              await tx.ticket.create({
                data: {
                  title:
                    template.title,

                  description:
                    template.description,

                  category:
                    template.category,

                  severity:
                    template.severity,

                  difficulty:
                    template.difficulty,

                  maxValue:
                    template.maxValue,

                  baseXp:
                    template.baseXp,

                  /*
                   * ============================
                   * NORMAL SYSTEM TICKET
                   * ============================
                   */
                  isPoison:
                    false,

                  poisonEffect:
                    "NONE",

                  successMessage:
                    template
                      .successMessage,

                  failureMessage:
                    template
                      .failureMessage,

                  assignedToId:
                    player.id,

                  /*
                   * Not bounced.
                   */
                  lastSentById:
                    null,

                  /*
                   * Not PvP generated.
                   */
                  attackSourcePlayerId:
                    null,

                  pvpAttackId:
                    null,

                  /*
                   * New legitimate tickets
                   * begin with no artificial
                   * SLA pressure.
                   */
                  slaAgeOffsetMinutes:
                    0,
                },
              });

            createdTickets.push(
              ticket
            );
          }

          /*
           * ============================
           * NEXT DELIVERY TIMER
           * ============================
           */
          await tx.player.update({
            where: {
              id:
                player.id,
            },

            data: {
              nextTicketAt,

              lastActiveAt:
                now,
            },
          });

          /*
           * ============================
           * CONSUME MAIL BACKLOG
           * ============================
           *
           * Important:
           *
           * We mark the ATTACK as
           * completed, not the Poison
           * Ticket.
           *
           * The ticket still sits in
           * the victim's queue and can
           * still be resolved/bounced.
           *
           * But it cannot trigger a
           * second burst.
           */
          if (
            mailBacklogActive &&
            mailBacklogPoison
              ?.pvpAttackId
          ) {
            await tx.pvPAttack.update({
              where: {
                id:
                  mailBacklogPoison
                    .pvpAttackId,
              },

              data: {
                status:
                  "COMPLETED",

                completedAt:
                  now,
              },
            });
          }

          return {
            createdTickets,
          };
        }
      );

    /*
     * ============================
     * RESPONSE
     * ============================
     */
    return NextResponse.json({
      success:
        true,

      generated:
        true,

      /*
       * Compatibility with the
       * existing TicketTimer.
       */
      ticketId:
        transactionResult
          .createdTickets[0]
          ?.id,

      severity:
        transactionResult
          .createdTickets[0]
          ?.severity,

      generatedCategory:
        chosenTemplates[0]
          ?.category,

      /*
       * Burst information.
       */
      ticketsCreated:
        transactionResult
          .createdTickets
          .length,

      ticketIds:
        transactionResult
          .createdTickets
          .map(
            (ticket) =>
              ticket.id
          ),

      generatedCategories:
        chosenTemplates.map(
          (chosen) =>
            chosen.category
        ),

      nextTicketAt,

      /*
       * Current queue modifiers.
       */
      queuePenaltyActive,

      queueSpeedPoisonActive,

      queueSpeedMultiplier,

      mailBacklogTriggered:
        mailBacklogActive,

      mailBacklogTicketCount:
        mailBacklogActive
          ? backlogTicketCount
          : 0,

      categoryWeights,

      activePlayerCount:
        activePlayers.length,
    });
  } catch (error) {
    console.error(
      "Generate ticket error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Unable to generate ticket.",
      },
      {
        status: 500,
      }
    );
  }
}