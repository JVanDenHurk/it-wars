import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
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
    const currentPlayer =
      await prisma.player.findUnique({
        where: {
          userId:
            session.user.id,
        },
      });

    if (!currentPlayer) {
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
     * A player is considered online
     * if their heartbeat was received
     * within the last 2 minutes.
     */
    const activeCutoff =
      new Date(
        now.getTime() -
          2 * 60 * 1000
      );

    /*
     * ============================
     * AVAILABLE PLAYERS
     * ============================
     *
     * Only show players who:
     *
     * 1. Are not the current player
     * 2. Have a valid auth session
     * 3. Have been active in the
     *    last 2 minutes
     */
    const players =
      await prisma.player.findMany({
        where: {
          id: {
            not:
              currentPlayer.id,
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

        orderBy: {
          username:
            "asc",
        },

        include: {
          _count: {
            select: {
              assignedTickets: {
                where: {
                  status:
                    "OPEN",
                },
              },
            },
          },
        },
      });

    /*
     * ============================
     * RESPONSE
     * ============================
     */
    return NextResponse.json({
      players:
        players.map(
          (player) => ({
            id:
              player.id,

            username:
              player.username,

            level:
              player.level,

            careerPath:
              player.careerPath,

            queueSize:
              player._count
                .assignedTickets,
          })
        ),
    });
  } catch (error) {
    console.error(
      "Available players error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Unable to load available players.",
      },
      {
        status: 500,
      }
    );
  }
}