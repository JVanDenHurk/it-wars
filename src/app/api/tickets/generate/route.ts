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

/*
 * Number of recent normal ticket
 * titles temporarily excluded from
 * the random template pool.
 *
 * This prevents things like:
 *
 * Account Locked
 * Outlook Won't Open
 * Account Locked
 * Outlook Won't Open
 */
const RECENT_TICKET_EXCLUSION_COUNT =
  8;

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
 * Queue pacing is deliberately
 * dynamic.
 *
 * Empty queue:
 * work arrives quickly.
 *
 * Growing queue:
 * arrivals slow down so the
 * player has room to recover.
 *
 * Ownership warning slows the
 * interval.
 *
 * Queue-speed poison is applied
 * last.
 */
function getNextTicketTime(
  openTicketCount: number,
  queuePenaltyActive: boolean,
  queueSpeedMultiplier = 1
) {
  let seconds: number;

  if (openTicketCount <= 0) {
    seconds =
      randomSeconds(
        8,
        16
      );
  } else if (
    openTicketCount ===
    1
  ) {
    seconds =
      randomSeconds(
        15,
        25
      );
  } else if (
    openTicketCount ===
    2
  ) {
    seconds =
      randomSeconds(
        25,
        40
      );
  } else if (
    openTicketCount ===
    3
  ) {
    seconds =
      randomSeconds(
        40,
        60
      );
  } else {
    seconds =
      randomSeconds(
        60,
        90
      );
  }

  /*
   * Ownership warning.
   */
  if (queuePenaltyActive) {
    seconds =
      Math.floor(
        seconds *
          1.75
      );
  }

  /*
   * Poison queue-speed modifier.
   */
  const safeMultiplier =
    Math.max(
      0.1,
      queueSpeedMultiplier
    );

  seconds =
    Math.max(
      5,
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
          player.level <
            4 ||
          !player.careerPath
      ).length,

    NETWORK:
      players.filter(
        (player) =>
          player.level >=
            4 &&
          player.careerPath ===
            "NETWORK"
      ).length,

    SYSTEMS:
      players.filter(
        (player) =>
          player.level >=
            4 &&
          player.careerPath ===
            "SYSTEMS"
      ).length,

    SECURITY:
      players.filter(
        (player) =>
          player.level >=
            4 &&
          player.careerPath ===
            "SECURITY"
      ).length,
  };
}

/*
 * ============================
 * CATEGORY WEIGHTS
 * ============================
 *
 * Service Desk always retains
 * some baseline weight.
 *
 * Specialist categories only
 * enter the normal system queue
 * when the corresponding team
 * exists.
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
        weight >
        0
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
 *
 * Recent ticket titles are
 * excluded where possible.
 *
 * This means a large template
 * pool actually feels large
 * during gameplay.
 *
 * If every template in a
 * category is currently excluded,
 * we fall back to the complete
 * category pool rather than
 * failing ticket generation.
 */
async function getRandomTemplate(
  categoryWeights: Record<
    ResolvableCategory,
    number
  >,
  excludedTitles: Set<string>
) {
  const selectedCategory =
    chooseWeightedCategory(
      categoryWeights
    );

  if (!selectedCategory) {
    return null;
  }

  /*
   * ============================
   * SELECT CATEGORY TEMPLATES
   * ============================
   */
  let allTemplates =
    await prisma.ticketTemplate.findMany({
      where: {
        active:
          true,

        category:
          selectedCategory,
      },
    });

  let finalCategory:
    ResolvableCategory =
      selectedCategory;

  /*
   * ============================
   * SERVICE DESK FALLBACK
   * ============================
   *
   * If a specialist category was
   * selected but has no templates,
   * fall back to Service Desk.
   */
  if (
    allTemplates.length ===
      0 &&
    selectedCategory !==
      "SERVICE_DESK"
  ) {
    finalCategory =
      "SERVICE_DESK";

    allTemplates =
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
    allTemplates.length ===
    0
  ) {
    return null;
  }

  /*
   * ============================
   * RECENT TICKET SUPPRESSION
   * ============================
   */
  const freshTemplates =
    allTemplates.filter(
      (template) =>
        !excludedTitles.has(
          template.title
        )
    );

  /*
   * Prefer templates that haven't
   * appeared recently.
   *
   * If everything is excluded,
   * fall back to the full pool.
   */
  const candidateTemplates =
    freshTemplates.length >
    0
      ? freshTemplates
      : allTemplates;

  const template =
    candidateTemplates[
      Math.floor(
        Math.random() *
          candidateTemplates.length
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
          status:
            401,
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
          status:
            404,
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
     * CURRENT QUEUE SIZE
     * ============================
     */
    const currentOpenTicketCount =
      await prisma.ticket.count({
        where: {
          assignedToId:
            player.id,

          status:
            "OPEN",
        },
      });

    /*
     * ============================
     * RECENT NORMAL TICKETS
     * ============================
     *
     * Keep the player's most recent
     * normal ticket titles out of the
     * random pool.
     *
     * Poison tickets deliberately do
     * NOT participate in this system.
     */
    const recentTickets =
      await prisma.ticket.findMany({
        where: {
          assignedToId:
            player.id,

          isPoison:
            false,
        },

        select: {
          title:
            true,
        },

        orderBy: {
          createdAt:
            "desc",
        },

        take:
          RECENT_TICKET_EXCLUSION_COUNT,
      });

    const excludedTitles =
      new Set<string>(
        recentTickets.map(
          (
            recentTicket: {
              title: string;
            }
          ) =>
            recentTicket.title
        )
      );

    /*
     * ============================
     * SELF-SERVICE PORTAL OUTAGE
     * ============================
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
     * ============================
     * BACKLOG BURST SIZE
     * ============================
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
          status:
            400,
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
     * Every ticket gets its own
     * category/template roll.
     *
     * Once a ticket is selected we
     * immediately add its title to
     * excludedTitles.
     *
     * This also means a Mail Queue
     * Backlog burst won't generate
     * the same ticket three times.
     */
    const chosenTemplates: NonNullable<
      Awaited<
        ReturnType<
          typeof getRandomTemplate
        >
      >
    >[] = [];

    for (
      let i =
        0;
      i <
      ticketCount;
      i++
    ) {
      const chosen =
        await getRandomTemplate(
          categoryWeights,
          excludedTitles
        );

      if (!chosen) {
        return NextResponse.json(
          {
            error:
              "No ticket templates are available.",
          },
          {
            status:
              404,
          }
        );
      }

      chosenTemplates.push(
        chosen
      );

      /*
       * Prevent duplicate templates
       * inside this same delivery.
       */
      excludedTitles.add(
        chosen.template.title
      );
    }

    /*
     * ============================
     * NEXT TICKET TIME
     * ============================
     *
     * Use the queue size AFTER this
     * delivery when determining how
     * soon another ticket should arrive.
     */
    const projectedOpenTicketCount =
      currentOpenTicketCount +
      ticketCount;

    const nextTicketAt =
      getNextTicketTime(
        projectedOpenTicketCount,
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
           * Mark the PvP attack itself
           * completed.
           *
           * Its Poison Ticket remains in
           * the queue until the victim
           * resolves, bounces or
           * quarantines it.
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
       * Compatibility with
       * TicketTimer.
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
            (
              ticket: {
                id: number;
              }
            ) =>
              ticket.id
          ),

      generatedCategories:
        chosenTemplates.map(
          (chosen) =>
            chosen.category
        ),

      /*
       * Useful while we're
       * playtesting variety.
       */
      generatedTitles:
        chosenTemplates.map(
          (chosen) =>
            chosen.template.title
        ),

      recentTicketExclusionCount:
        RECENT_TICKET_EXCLUSION_COUNT,

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
        status:
          500,
      }
    );
  }
}