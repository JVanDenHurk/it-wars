import { prisma } from "@/lib/prisma";

const STARTING_CREDITS = 1000;

type CreditPenaltySource = {
  attackSourcePlayerId?: number | null;
  pvpAttackId?: number | null;
};

export async function applyCreditPenalty(
  playerId: number,
  currentCredits: number,
  penalty: number,
  source?: CreditPenaltySource
) {
  const remainingCredits = Math.max(
    0,
    currentCredits - penalty
  );

  /*
   * ============================
   * NORMAL PENALTY
   * ============================
   *
   * Player survives, so just reduce
   * their Credits.
   */
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

      killAwarded: false,
    };
  }

  /*
   * ============================
   * BANKRUPTCY
   * ============================
   *
   * Player has reached 0 Credits.
   *
   * Reset their current career while
   * retaining lifetime statistics.
   */
  const now = new Date();

  const result = await prisma.$transaction(
    async (tx) => {
      /*
       * Reset bankrupt player.
       */
      const player =
        await tx.player.update({
          where: {
            id: playerId,
          },

          data: {
            credits:
              STARTING_CREDITS,

            level:
              1,

            xp:
              0,

            careerPath:
              null,

            bankruptcies: {
              increment:
                1,
            },

            queuePenaltyUntil:
              null,

            nextTicketAt:
              null,

            lastActiveAt:
              now,
          },
        });

      let killAwarded =
        false;

      /*
       * ============================
       * PVP KILL ATTRIBUTION
       * ============================
       *
       * Only award a kill when:
       *
       * 1. A PvP attacker exists
       * 2. The attacker is not the victim
       *
       * This prevents accidental
       * self-kill attribution.
       */
      if (
        source?.attackSourcePlayerId &&
        source.attackSourcePlayerId !==
          playerId
      ) {
        await tx.player.update({
          where: {
            id:
              source.attackSourcePlayerId,
          },

          data: {
            kills: {
              increment:
                1,
            },
          },
        });

        killAwarded =
          true;
      }

      /*
       * ============================
       * PVP ATTACK RESULT
       * ============================
       *
       * If this penalty came from
       * a recorded PvP attack, mark
       * that attack as the one that
       * caused bankruptcy.
       */
      if (
        source?.pvpAttackId
      ) {
        await tx.pvPAttack.update({
          where: {
            id:
              source.pvpAttackId,
          },

          data: {
            causedBankruptcy:
              true,

            status:
              "COMPLETED",

            completedAt:
              now,
          },
        });
      }

      return {
        player,

        killAwarded,
      };
    }
  );

  return {
    player:
      result.player,

    bankrupt:
      true,

    penalty,

    killAwarded:
      result.killAwarded,
  };
}