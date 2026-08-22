import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import {
    getNextCareerAbilityReadyAt,
    isCareerAbilityReady,
    isCareerAbilityUnlocked,
} from "@/lib/career-abilities";
import { prisma } from "@/lib/prisma";

const MAX_TICKETS =
  2;

const MAINTENANCE_MINUTES =
  5;

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

    const rawTicketIds =
      Array.isArray(
        body.ticketIds
      )
        ? body.ticketIds
        : [];

    const ticketIds =
      rawTicketIds
        .map(
          (id) =>
            Number(id)
        )
        .filter(
          (id) =>
            Number.isInteger(
              id
            )
        );

    const uniqueTicketIds =
      [
        ...new Set(
          ticketIds
        ),
      ];

    if (
      uniqueTicketIds.length <
        1 ||
      uniqueTicketIds.length >
        MAX_TICKETS
    ) {
      return NextResponse.json(
        {
          error:
            `Choose between 1 and ${MAX_TICKETS} tickets.`,
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
     * CAREER CHECK
     * ============================
     */
    if (
      player.careerPath !==
      "SYSTEMS"
    ) {
      return NextResponse.json(
        {
          error:
            "Maintenance Window is only available to Systems Engineers.",
        },
        {
          status: 403,
        }
      );
    }

    /*
     * ============================
     * LEVEL CHECK
     * ============================
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
            "Maintenance Window unlocks at Level 6.",
        },
        {
          status: 403,
        }
      );
    }

    /*
     * ============================
     * COOLDOWN CHECK
     * ============================
     */
    if (
      !isCareerAbilityReady(
        player
          .careerAbilityReadyAt
      )
    ) {
      return NextResponse.json(
        {
          error:
            "Maintenance Window is still on cooldown.",

          readyAt:
            player
              .careerAbilityReadyAt,
        },
        {
          status: 429,
        }
      );
    }

    /*
     * ============================
     * LOAD TICKETS
     * ============================
     */
    const tickets =
      await prisma.ticket.findMany({
        where: {
          id: {
            in:
              uniqueTicketIds,
          },

          assignedToId:
            player.id,

          status:
            "OPEN",
        },
      });

    if (
      tickets.length !==
      uniqueTicketIds.length
    ) {
      return NextResponse.json(
        {
          error:
            "One or more selected tickets are not in your open queue.",
        },
        {
          status: 400,
        }
      );
    }

    /*
     * ============================
     * PREVENT DOUBLE FREEZE
     * ============================
     */
    const now =
      new Date();

    const alreadyProtected =
      tickets.find(
        (ticket) =>
          ticket
            .maintenanceUntil !==
            null &&
          ticket
            .maintenanceUntil >
            now
      );

    if (
      alreadyProtected
    ) {
      return NextResponse.json(
        {
          error:
            `INC${alreadyProtected.id
              .toString()
              .padStart(
                5,
                "0"
              )} is already inside a Maintenance Window.`,
        },
        {
          status: 400,
        }
      );
    }

    /*
     * ============================
     * MAINTENANCE WINDOW
     * ============================
     *
     * Freeze SLA ageing for
     * 5 minutes.
     */
    const maintenanceUntil =
      new Date(
        now.getTime() +
          MAINTENANCE_MINUTES *
            60 *
            1000
      );

    const readyAt =
      getNextCareerAbilityReadyAt(
        "SYSTEMS"
      );

    /*
     * ============================
     * APPLY ABILITY
     * ============================
     */
    await prisma.$transaction(
      async (tx) => {
        /*
         * Apply freeze to each
         * selected ticket.
         */
        for (
          const ticket of
          tickets
        ) {
          await tx.ticket.update({
            where: {
              id:
                ticket.id,
            },

            data: {
              maintenanceUntil,
            },
          });
        }

        /*
         * Start career ability
         * cooldown.
         */
        await tx.player.update({
          where: {
            id:
              player.id,
          },

          data: {
            careerAbilityReadyAt:
              readyAt,

            lastActiveAt:
              now,
          },
        });
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

      outcome:
        "MAINTENANCE_WINDOW",

      ability:
        "Maintenance Window",

      ticketsProtected:
        tickets.length,

      ticketIds:
        tickets.map(
          (ticket) =>
            ticket.id
        ),

      maintenanceMinutes:
        MAINTENANCE_MINUTES,

      maintenanceUntil,

      readyAt,

      cooldownMinutes:
        15,

      message:
        `Maintenance Window activated on ${tickets.length} ticket${
          tickets.length === 1
            ? ""
            : "s"
        }. SLA ageing is frozen for ${MAINTENANCE_MINUTES} minutes.`,
    });
  } catch (error) {
    console.error(
      "Maintenance Window error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Unable to activate Maintenance Window.",
      },
      {
        status: 500,
      }
    );
  }
}