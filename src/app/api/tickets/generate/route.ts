import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

type ResolvableCategory =
  | "SERVICE_DESK"
  | "NETWORK"
  | "SYSTEMS"
  | "SECURITY";

function getResolvableCategories(
  players: {
    level: number;
    careerPath: string | null;
  }[]
): ResolvableCategory[] {
  const categories = new Set<ResolvableCategory>();

  // Levels 1-3 count as Service Desk.
  if (players.some((player) => player.level < 4)) {
    categories.add("SERVICE_DESK");
  }

  // Level 4+ specialist paths.
  if (
    players.some(
      (player) =>
        player.level >= 4 &&
        player.careerPath === "NETWORK"
    )
  ) {
    categories.add("NETWORK");
  }

  if (
    players.some(
      (player) =>
        player.level >= 4 &&
        player.careerPath === "SYSTEMS"
    )
  ) {
    categories.add("SYSTEMS");
  }

  if (
    players.some(
      (player) =>
        player.level >= 4 &&
        player.careerPath === "SECURITY"
    )
  ) {
    categories.add("SECURITY");
  }

  return Array.from(categories);
}

function randomSeconds(min: number, max: number) {
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

export async function POST() {
  try {
    /*
     * Authentication
     */
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json(
        {
          error: "Not authenticated.",
        },
        {
          status: 401,
        }
      );
    }

    /*
     * Current player
     */
    const player =
      await prisma.player.findUnique({
        where: {
          userId: session.user.id,
        },
      });

    if (!player) {
      return NextResponse.json(
        {
          error: "Player not found.",
        },
        {
          status: 404,
        }
      );
    }

    const now = new Date();

    /*
     * If the player is not due a new
     * ticket yet, don't generate one.
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
     * Check whether THIS PLAYER has
     * an active queue penalty.
     *
     * It does not affect other players.
     */
    const queuePenaltyActive =
      player.queuePenaltyUntil !== null &&
      player.queuePenaltyUntil > now;

    /*
     * Find all non-bankrupt players.
     *
     * Their roles determine which
     * ticket categories are allowed
     * to exist in the game.
     */
    const availablePlayers =
      await prisma.player.findMany({
        where: {
          credits: {
            gt: 0,
          },
        },

        select: {
          level: true,
          careerPath: true,
        },
      });

    const resolvableCategories =
      getResolvableCategories(
        availablePlayers
      );

    if (
      resolvableCategories.length === 0
    ) {
      return NextResponse.json(
        {
          error:
            "No resolver teams are currently available.",
        },
        {
          status: 400,
        }
      );
    }

    /*
     * Only load templates that somebody
     * in the game can eventually resolve.
     */
    const templates =
      await prisma.ticketTemplate.findMany({
        where: {
          active: true,

          category: {
            in: resolvableCategories,
          },
        },
      });

    if (templates.length === 0) {
      return NextResponse.json(
        {
          error:
            "No ticket templates are available for the current resolver teams.",
        },
        {
          status: 404,
        }
      );
    }

    /*
     * Pick a random valid ticket template.
     */
    const template =
      templates[
        Math.floor(
          Math.random() *
            templates.length
        )
      ];

    /*
     * Calculate this player's next
     * allowed system-ticket time.
     */
    const nextTicketAt =
      getNextTicketTime(
        queuePenaltyActive
      );

    /*
     * Create the ticket and update
     * the player's timer together.
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

            maxValue:
              template.maxValue,

            baseXp:
              template.baseXp,

            assignedToId:
              player.id,

            /*
             * null means this came from
             * the game, not another player.
             */
            lastSentById: null,
          },
        }),

        prisma.player.update({
          where: {
            id: player.id,
          },

          data: {
            nextTicketAt,
            lastActiveAt: now,
          },
        }),
      ]);

    return NextResponse.json({
      success: true,
      generated: true,
      ticketId: ticket.id,
      nextTicketAt,
      queuePenaltyActive,
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