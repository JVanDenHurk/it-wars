import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import {
  getNextCareerAbilityReadyAt,
  isCareerAbilityReady,
  isCareerAbilityUnlocked,
} from "@/lib/career-abilities";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
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

    const body = await request.json();
    const ticketId = Number(body.ticketId);

    if (!Number.isInteger(ticketId)) {
      return NextResponse.json(
        { error: "Invalid Quarantine request." },
        { status: 400 }
      );
    }

    const player = await prisma.player.findUnique({
      where: { userId: session.user.id },
    });

    if (!player) {
      return NextResponse.json(
        { error: "Player not found." },
        { status: 404 }
      );
    }

    if (player.careerPath !== "SECURITY") {
      return NextResponse.json(
        { error: "Quarantine is only available to Security specialists." },
        { status: 403 }
      );
    }

    if (!isCareerAbilityUnlocked(player.level, player.careerPath)) {
      return NextResponse.json(
        { error: "Quarantine unlocks at Level 6." },
        { status: 403 }
      );
    }

    if (!isCareerAbilityReady(player.careerAbilityReadyAt)) {
      return NextResponse.json(
        {
          error: "Quarantine is still on cooldown.",
          readyAt: player.careerAbilityReadyAt,
        },
        { status: 429 }
      );
    }

    const ticket = await prisma.ticket.findUnique({
      where: { id: ticketId },
    });

    if (!ticket) {
      return NextResponse.json(
        { error: "Ticket not found." },
        { status: 404 }
      );
    }

    if (
      ticket.assignedToId !== player.id ||
      ticket.status !== "OPEN"
    ) {
      return NextResponse.json(
        { error: "That ticket is not in your open queue." },
        { status: 400 }
      );
    }

    if (!ticket.isPoison) {
      return NextResponse.json(
        { error: "Quarantine can only remove Poison Tickets." },
        { status: 400 }
      );
    }

    const now = new Date();
    const readyAt = getNextCareerAbilityReadyAt("SECURITY");

    await prisma.$transaction(async (tx) => {
      await tx.ticket.update({
        where: { id: ticket.id },
        data: {
          status: "RESOLVED",
          resolvedAt: now,
          maintenanceUntil: null,
        },
      });

      await tx.player.update({
        where: { id: player.id },
        data: {
          careerAbilityReadyAt: readyAt,
          lifetimeTicketsHandled: {
            increment: 1,
          },
          lastActiveAt: now,
        },
      });

      if (ticket.pvpAttackId) {
        const remainingAttackTickets = await tx.ticket.count({
          where: {
            pvpAttackId: ticket.pvpAttackId,
            status: "OPEN",
          },
        });

        if (remainingAttackTickets === 0) {
          await tx.pvPAttack.updateMany({
            where: {
              id: ticket.pvpAttackId,
              status: "ACTIVE",
            },
            data: {
              status: "COMPLETED",
              completedAt: now,
            },
          });
        }
      }
    });

    return NextResponse.json({
      success: true,
      outcome: "QUARANTINED",
      ability: "Quarantine",
      ticketId: ticket.id,
      ticketTitle: ticket.title,
      readyAt,
      cooldownMinutes: 15,
      message: "Poison Ticket quarantined. No Credits or Career XP awarded.",
    });
  } catch (error) {
    console.error("Quarantine error:", error);

    return NextResponse.json(
      { error: "Unable to quarantine Poison Ticket." },
      { status: 500 }
    );
  }
}
