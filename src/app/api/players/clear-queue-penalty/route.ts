import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { applyCreditPenalty } from "@/lib/player-bankruptcy";
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
        {
          error:
            "No queue penalty is currently active.",
        },
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

    /*
     * Apply the 100 CR cost through
     * the shared bankruptcy system.
     */
    const penaltyResult =
      await applyCreditPenalty(
        player.id,
        player.credits,
        CLEAR_PENALTY_COST
      );

    /*
     * If the player survived the payment,
     * clear the queue penalty.
     *
     * If they went bankrupt, the bankruptcy
     * helper already clears queuePenaltyUntil.
     */
    if (!penaltyResult.bankrupt) {
      await prisma.player.update({
        where: {
          id: player.id,
        },
        data: {
          queuePenaltyUntil: null,
          lastActiveAt: new Date(),
        },
      });
    }

    return NextResponse.json({
      success: true,

      cost: CLEAR_PENALTY_COST,

      credits:
        penaltyResult.player.credits,

      bankrupt:
        penaltyResult.bankrupt,

      resetToServiceDesk:
        penaltyResult.bankrupt,

      message:
        penaltyResult.bankrupt
          ? "You spent your remaining Credits restoring queue priority and went bankrupt. Your career has been reset to Service Desk."
          : "Queue priority restored.",
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