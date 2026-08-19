import { prisma } from "@/lib/prisma";

const STARTING_CREDITS = 1000;

export async function applyCreditPenalty(
  playerId: number,
  currentCredits: number,
  penalty: number
) {
  const remainingCredits = Math.max(
    0,
    currentCredits - penalty
  );

  if (remainingCredits > 0) {
    const player = await prisma.player.update({
      where: {
        id: playerId,
      },
      data: {
        credits: remainingCredits,
        lastActiveAt: new Date(),
      },
    });

    return {
      player,
      bankrupt: false,
      penalty,
    };
  }

  const player = await prisma.player.update({
    where: {
      id: playerId,
    },
    data: {
      credits: STARTING_CREDITS,

      level: 1,
      xp: 0,
      careerPath: null,

      bankruptcies: {
        increment: 1,
      },

      queuePenaltyUntil: null,
      nextTicketAt: null,

      lastActiveAt: new Date(),
    },
  });

  return {
    player,
    bankrupt: true,
    penalty,
  };
}