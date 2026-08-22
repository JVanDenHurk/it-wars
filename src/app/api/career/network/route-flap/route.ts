import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import {
    getNextCareerAbilityReadyAt,
    isCareerAbilityReady,
    isCareerAbilityUnlocked,
} from "@/lib/career-abilities";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: Request
) {
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
     * REQUEST
     * ============================
     */
    const body =
      await request.json();

    const ticketId =
      Number(
        body.ticketId
      );

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
            "Invalid Route Flap request.",
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
     * Must actually be Network.
     */
    if (
      player.careerPath !==
      "NETWORK"
    ) {
      return NextResponse.json(
        {
          error:
            "Route Flap is only available to Network Engineers.",
        },
        {
          status: 403,
        }
      );
    }

    /*
     * Ability unlocks at Level 6.
     */
    if (
      !isCareerAbilityUnlocked(
        player.level,
        player.careerPath
      )
    ) {
      return NextResponse.json(
        {
          error:
            "Route Flap unlocks at Level 6.",
        },
        {
          status: 403,
        }
      );
    }

    /*
     * Cooldown check.
     */
    if (
      !isCareerAbilityReady(
        player.careerAbilityReadyAt
      )
    ) {
      return NextResponse.json(
        {
          error:
            "Route Flap is still on cooldown.",

          readyAt:
            player.careerAbilityReadyAt,
        },
        {
          status: 429,
        }
      );
    }

    /*
     * Cannot send to yourself.
     */
    if (
      player.id ===
      targetPlayerId
    ) {
      return NextResponse.json(
        {
          error:
            "You cannot Route Flap a ticket to yourself.",
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

    if (
      ticket.assignedToId !==
        player.id ||
      ticket.status !==
        "OPEN"
    ) {
      return NextResponse.json(
        {
          error:
            "That ticket is not in your open queue.",
        },
        {
          status: 400,
        }
      );
    }

    /*
     * ============================
     * TARGET
     * ============================
     */
    const target =
      await prisma.player.findUnique({
        where: {
          id:
            targetPlayerId,
        },

        select: {
          id:
            true,

          username:
            true,
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
     * USE ABILITY
     * ============================
     *
     * Route Flap deliberately ignores:
     *
     * - wrong-team penalties
     * - ownership warnings
     * - DNS bounce failure
     *
     * The ticket simply moves.
     */
    const now =
      new Date();

    const readyAt =
      getNextCareerAbilityReadyAt(
        "NETWORK"
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
          careerAbilityReadyAt:
            readyAt,

          lifetimeTicketsHandled: {
            increment:
              1,
          },

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
      success:
        true,

      outcome:
        "ROUTE_FLAP",

      ability:
        "Route Flap",

      ticketId:
        ticket.id,

      target:
        target.username,

      readyAt,

      cooldownMinutes:
        10,

      message:
        `Route Flap moved the ticket to ${target.username} with no routing penalty or ownership warning.`,
    });
  } catch (error) {
    console.error(
      "Route Flap error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Unable to use Route Flap.",
      },
      {
        status: 500,
      }
    );
  }
}
