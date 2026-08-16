import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const CLEAR_PENALTY_COST = 100;

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

    const now = new Date();

    const penaltyActive =
      player.queuePenaltyUntil !== null &&
      player.queuePenaltyUntil > now;

    if (!penaltyActive) {
      return NextResponse.json(
        { error: "No queue penalty is currently active." },
        { status: 400 }
      );
    }

    if (player.credits < CLEAR_PENALTY_COST) {
      return NextResponse.json(
        {
          error: `You need ${CLEAR_PENALTY_COST} CR to restore queue priority.`,
        },
        { status: 400 }
      );
    }

    const updatedPlayer =
      await prisma.player.update({
        where: {
          id: player.id,
        },
        data: {
          credits: {
            decrement: CLEAR_PENALTY_COST,
          },
          queuePenaltyUntil: null,
          lastActiveAt: new Date(),
        },
      });

    return NextResponse.json({
      success: true,
      cost: CLEAR_PENALTY_COST,
      credits: updatedPlayer.credits,
    });
  } catch (error) {
    console.error(
      "Clear queue penalty error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Unable to restore queue priority.",
      },
      {
        status: 500,
      }
    );
  }
}