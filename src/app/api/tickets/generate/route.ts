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

  // Levels 1-3 are Service Desk players.
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

export async function POST() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json(
        { error: "Not authenticated." },
        { status: 401 }
      );
    }

    const player = await prisma.player.findUnique({
      where: {
        userId: session.user.id,
      },
    });

    if (!player) {
      return NextResponse.json(
        { error: "Player not found." },
        { status: 404 }
      );
    }

    /*
     * Find players that are currently eligible to receive tickets.
     *
     * For now:
     * - player must not be bankrupt
     *
     * Later:
     * - we'll also filter by lastActiveAt
     */
    const availablePlayers = await prisma.player.findMany({
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
      getResolvableCategories(availablePlayers);

    if (resolvableCategories.length === 0) {
      return NextResponse.json(
        {
          error:
            "No resolver teams are currently available.",
        },
        { status: 400 }
      );
    }

    /*
     * Only use templates that somebody can eventually resolve.
     */
    const templates = await prisma.ticketTemplate.findMany({
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
        { status: 404 }
      );
    }

    /*
     * Pick a random valid ticket template.
     */
    const template =
      templates[
        Math.floor(Math.random() * templates.length)
      ];

    /*
     * Create the live ticket in the current player's queue.
     *
     * The category remains hidden in the UI.
     */
    const ticket = await prisma.ticket.create({
      data: {
        title: template.title,
        description: template.description,
        category: template.category,

        maxValue: template.maxValue,
        baseXp: template.baseXp,

        assignedToId: player.id,
      },
    });

    /*
     * Mark player as active.
     */
    await prisma.player.update({
      where: {
        id: player.id,
      },

      data: {
        lastActiveAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      ticket,
    });
  } catch (error) {
    console.error("Generate ticket error:", error);

    return NextResponse.json(
      {
        error: "Unable to generate ticket.",
      },
      {
        status: 500,
      }
    );
  }
}