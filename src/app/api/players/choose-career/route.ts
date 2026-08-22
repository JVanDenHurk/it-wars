import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import {
  getInDemandCareer,
  IN_DEMAND_CAREER_XP_BONUS,
  type CareerCounts,
  type SpecialistCareer,
} from "@/lib/career-demand";
import { getLevelFromXp } from "@/lib/player-level";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: Request
) {
  try {
    const session =
      await auth.api.getSession({
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

    if (player.level < 4) {
      return NextResponse.json(
        {
          error:
            "You must reach Level 4 before choosing a career path.",
        },
        {
          status: 400,
        }
      );
    }

    if (player.careerPath) {
      return NextResponse.json(
        {
          error:
            "You have already chosen a career path.",
        },
        {
          status: 400,
        }
      );
    }

    const body =
      await request.json();

    const careerPath =
      body.careerPath as
        | SpecialistCareer
        | undefined;

    if (
      careerPath !== "NETWORK" &&
      careerPath !== "SYSTEMS" &&
      careerPath !== "SECURITY"
    ) {
      return NextResponse.json(
        {
          error:
            "Invalid career path.",
        },
        {
          status: 400,
        }
      );
    }

    const specialistPlayers =
      await prisma.player.findMany({
        where: {
          careerPath: {
            not: null,
          },
        },

        select: {
          careerPath: true,
        },
      });

    const careerCounts: CareerCounts = {
      NETWORK: 0,
      SYSTEMS: 0,
      SECURITY: 0,
    };

    for (const specialist of specialistPlayers) {
      if (
        specialist.careerPath === "NETWORK" ||
        specialist.careerPath === "SYSTEMS" ||
        specialist.careerPath === "SECURITY"
      ) {
        careerCounts[specialist.careerPath] += 1;
      }
    }

    const inDemandCareer =
      getInDemandCareer(
        careerCounts,
        player.id
      );

    const inDemand =
      careerPath ===
      inDemandCareer;

    const xpBonus =
      inDemand
        ? IN_DEMAND_CAREER_XP_BONUS
        : 0;

    const newXp =
      player.xp + xpBonus;

    const newLevel =
      getLevelFromXp(
        newXp
      );

    const updatedPlayer =
      await prisma.player.update({
        where: {
          id: player.id,

          /*
           * Atomic guard prevents two career-selection requests from both
           * succeeding before the first update becomes visible.
           */
          careerPath: null,
        },

        data: {
          careerPath,
          xp: newXp,
          level: newLevel,
          lastActiveAt: new Date(),
        },
      });

    return NextResponse.json({
      success: true,
      careerPath:
        updatedPlayer.careerPath,
      inDemand,
      xpBonus,
      xp: updatedPlayer.xp,
      level: updatedPlayer.level,
    });
  } catch (error) {
    console.error(
      "Choose career error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Unable to choose career path.",
      },
      {
        status: 500,
      }
    );
  }
}
