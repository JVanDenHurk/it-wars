import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
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

    const player =
      await prisma.player.findUnique({
        where: {
          userId:
            session.user.id,
        },

        select: {
          id:
            true,

          credits:
            true,

          kills:
            true,

          bankruptcies:
            true,
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

    const openTickets =
      await prisma.ticket.count({
        where: {
          assignedToId:
            player.id,

          status:
            "OPEN",
        },
      });

    return NextResponse.json({
      success:
        true,

      openTickets,

      credits:
        player.credits,

      kills:
        player.kills,

      bankruptcies:
        player.bankruptcies,
    });
  } catch (error) {
    console.error(
      "Dashboard status error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Unable to load dashboard status.",
      },
      {
        status: 500,
      }
    );
  }
}