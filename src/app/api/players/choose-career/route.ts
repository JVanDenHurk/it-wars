import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

type CareerPath =
  | "NETWORK"
  | "SYSTEMS"
  | "SECURITY";

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
        | CareerPath
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

    const updatedPlayer =
      await prisma.player.update({
        where: {
          id:
            player.id,
        },

        data: {
          careerPath,

          lastActiveAt:
            new Date(),
        },
      });

    return NextResponse.json({
      success: true,

      careerPath:
        updatedPlayer.careerPath,
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