import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json(
      { error: "Not authenticated." },
      { status: 401 }
    );
  }

  const currentPlayer = await prisma.player.findUnique({
    where: {
      userId: session.user.id,
    },
  });

  if (!currentPlayer) {
    return NextResponse.json(
      { error: "Player not found." },
      { status: 404 }
    );
  }

  const players = await prisma.player.findMany({
    where: {
      id: {
        not: currentPlayer.id,
      },
    },

    orderBy: {
      username: "asc",
    },

    include: {
      _count: {
        select: {
          assignedTickets: {
            where: {
              status: "OPEN",
            },
          },
        },
      },
    },
  });

  return NextResponse.json({
    players: players.map((player) => ({
      id: player.id,
      username: player.username,
      level: player.level,
      careerPath: player.careerPath,
      queueSize: player._count.assignedTickets,
    })),
  });
}