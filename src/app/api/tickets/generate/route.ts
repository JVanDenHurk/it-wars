import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

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
    Math.random() * (max - min + 1) + min
  );
}

function getNextTicketTime(
  queuePenaltyActive: boolean
) {
  /*
   * Normal queue:
   * 60-120 seconds
   *
   * Ownership warning:
   * 180-300 seconds
   */
  const seconds = queuePenaltyActive
    ? randomSeconds(180, 300)
    : randomSeconds(60, 120);

  return new Date(
    Date.now() + seconds * 1000
  );
}

/*
 * ============================
 * TEAM COUNTS
 * ============================
 *
 * Players without a specialist
 * career are still Service Desk.
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
          player.careerPath === "NETWORK"
      ).length,

    SYSTEMS:
      players.filter(
        (player) =>
          player.level >= 4 &&
          player.careerPath === "SYSTEMS"
      ).length,

    SECURITY:
      players.filter(
        (player) =>
          player.level >= 4 &&
          player.careerPath === "SECURITY"
      ).length,
  };
}

/*
 * ============================
 * CATEGORY WEIGHTS
 * ============================
 *
 * Demand scales with the number
 * of currently active players
 * in each resolver team.
 *
 * Service Desk gets +2 baseline
 * weight so it remains the main
 * intake category.
 */
function getCategoryWeights(
  players: PlayerCareerInfo[]
): Record<ResolvableCategory, number> {
  const counts =
    getTeamCounts(players);

  return {
    SERVICE_DESK:
      counts.SERVICE_DESK + 2,

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
    Object.entries(weights).filter(
      ([, weight]) =>
        weight > 0
    ) as [
      ResolvableCategory,
      number,
    ][];

  if (entries.length === 0) {
    return null;
  }

  const totalWeight =
    entries.reduce(
      (sum, [, weight]) =>
        sum + weight,
      0
    );

  let roll =
    Math.random() *
    totalWeight;

  for (const [
    category,
    weight,
  ] of entries) {
    roll -= weight;

    if (roll < 0) {
      return category;
    }
  }

  return entries[
    entries.length - 1
  ][0];
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

    /*
     * Player is considered active if
     * they have sent a heartbeat within
     * the last 2 minutes.
     */
    const activeCutoff =
      new Date(
        now.getTime() -
          2 * 60 * 1000
      );

    /*
     * ============================
     * TICKET TIMER
     * ============================
     */
    if (
      player.nextTicketAt &&
      player.nextTicketAt > now
    ) {
      return NextResponse.json({
        success: true,
        generated: false,
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
      player.queuePenaltyUntil !== null &&
      player.queuePenaltyUntil > now;

    /*
     * ============================
     * CURRENTLY ACTIVE PLAYERS
     * ============================
     *
     * A player only contributes to
     * the global ticket pool when:
     *
     * 1. They still have Credits
     * 2. They have a valid auth session
     * 3. Their heartbeat was received
     *    within the last 2 minutes
     */
    const activePlayers =
      await prisma.player.findMany({
        where: {
          credits: {
            gt: 0,
          },

          lastActiveAt: {
            gt: activeCutoff,
          },

          user: {
            sessions: {
              some: {
                expiresAt: {
                  gt: now,
                },
              },
            },
          },
        },

        select: {
          level: true,
          careerPath: true,
        },
      });

    /*
     * The current player should normally
     * be included because their heartbeat
     * is running while playing.
     *
     * This remains as a safety check.
     */
    if (
      activePlayers.length === 0
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
     * SCALED TICKET POOL
     * ============================
     */
    const categoryWeights =
      getCategoryWeights(
        activePlayers
      );

    const selectedCategory =
      chooseWeightedCategory(
        categoryWeights
      );

    if (!selectedCategory) {
      return NextResponse.json(
        {
          error:
            "No ticket categories are currently available.",
        },
        {
          status: 400,
        }
      );
    }

    /*
     * ============================
     * LOAD TEMPLATES
     * ============================
     *
     * Category is chosen BEFORE
     * the template.
     *
     * This stops categories with
     * more templates from receiving
     * an accidental spawn advantage.
     */
    let templates =
      await prisma.ticketTemplate.findMany({
        where: {
          active: true,

          category:
            selectedCategory,
        },
      });

    let finalCategory =
      selectedCategory;

    /*
     * Safety fallback.
     *
     * If the chosen specialist
     * category has no templates,
     * fall back to Service Desk.
     */
    if (
      templates.length === 0 &&
      selectedCategory !==
        "SERVICE_DESK"
    ) {
      finalCategory =
        "SERVICE_DESK";

      templates =
        await prisma.ticketTemplate.findMany({
          where: {
            active: true,

            category:
              "SERVICE_DESK",
          },
        });
    }

    if (
      templates.length === 0
    ) {
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

    /*
     * ============================
     * RANDOM TEMPLATE
     * ============================
     */
    const template =
      templates[
        Math.floor(
          Math.random() *
            templates.length
        )
      ];

    /*
     * ============================
     * NEXT TICKET TIME
     * ============================
     */
    const nextTicketAt =
      getNextTicketTime(
        queuePenaltyActive
      );

    /*
     * ============================
     * CREATE LIVE TICKET
     * ============================
     */
    const [ticket] =
      await prisma.$transaction([
        prisma.ticket.create({
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

            successMessage:
              template.successMessage,

            failureMessage:
              template.failureMessage,

            /*
             * System ticket enters
             * the current player's queue.
             *
             * The player then decides
             * whether to resolve it
             * or route it elsewhere.
             */
            assignedToId:
              player.id,

            /*
             * null means generated
             * by the game.
             */
            lastSentById:
              null,
          },
        }),

        /*
         * Start the next timer and
         * also refresh activity.
         */
        prisma.player.update({
          where: {
            id:
              player.id,
          },

          data: {
            nextTicketAt,

            lastActiveAt:
              now,
          },
        }),
      ]);

    /*
     * ============================
     * RESPONSE
     * ============================
     */
    return NextResponse.json({
      success: true,
      generated: true,

      ticketId:
        ticket.id,

      severity:
        ticket.severity,

      /*
       * Development/testing info.
       *
       * This does not need to be
       * shown to the player.
       */
      generatedCategory:
        finalCategory,

      nextTicketAt,

      queuePenaltyActive,

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