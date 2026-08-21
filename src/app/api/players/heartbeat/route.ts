import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

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

    /*
     * ============================
     * HEARTBEAT
     * ============================
     *
     * Update the player's activity
     * timestamp whenever their browser
     * sends a heartbeat.
     */
    const now =
      new Date();

    await prisma.player.update({
      where: {
        id:
          player.id,
      },

      data: {
        lastActiveAt:
          now,
      },
    });

    return NextResponse.json({
      success:
        true,

      lastActiveAt:
        now,
    });
  } catch (error) {
    console.error(
      "Player heartbeat error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Unable to update player activity.",
      },
      {
        status: 500,
      }
    );
  }
}