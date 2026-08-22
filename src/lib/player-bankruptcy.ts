import { STARTING_CREDITS } from "@/lib/game-balance";
import { prisma } from "@/lib/prisma";

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
  /*
   * Never allow a negative penalty.
   */
  const safePenalty =
    Math.max(
      0,
      penalty
    );

  const remainingCredits =
    Math.max(
      0,
      currentCredits -
        safePenalty
    );

  /*
   * ============================
   * NORMAL PENALTY
   * ============================
   *
   * Player survives.
   */
  if (
    remainingCredits >
    0
  ) {
    const player =
      await prisma.player.update({
        where: {
          id:
            playerId,
        },

        data: {
          credits:
            remainingCredits,

          lastActiveAt:
            new Date(),
        },
      });

    return {
      player,

      bankrupt:
        false,

      penalty:
        safePenalty,

      killAwarded:
        false,
    };
  }

  /*
   * ============================
   * BANKRUPTCY
   * ============================
   */
  const now =
    new Date();

  const result =
    await prisma.$transaction(
      async (tx) => {
        /*
         * ============================
         * CLEAR CURRENT QUEUE
         * ============================
         *
         * Bankruptcy starts a completely
         * new career/run.
         *
         * Nothing currently assigned to
         * the player should survive into
         * the new career.
         *
         * This includes:
         *
         * - normal tickets
         * - Poison Tickets
         * - Maintenance Window tickets
         */
        await tx.ticket.updateMany({
          where: {
            assignedToId:
              playerId,

            status:
              "OPEN",
          },

          data: {
            status:
              "EXPIRED",

            expiredAt:
              now,

            /*
             * Clear temporary
             * Maintenance Window state.
             *
             * The ticket is expired anyway,
             * but clearing this prevents old
             * career state hanging around.
             */
            maintenanceUntil:
              null,
          },
        });

        /*
         * ============================
         * RESET PLAYER CAREER
         * ============================
         *
         * Lifetime statistics are NOT
         * touched here.
         */
        const player =
          await tx.player.update({
            where: {
              id:
                playerId,
            },

            data: {
              /*
               * ============================
               * CURRENT CAREER
               * ============================
               */
              credits:
                STARTING_CREDITS,

              level:
                1,

              xp:
                0,

              careerPath:
                null,


              /*
               * ============================
               * BANKRUPTCY COUNT
               * ============================
               *
               * Lifetime statistic.
               */
              bankruptcies: {
                increment:
                  1,
              },

              /*
               * ============================
               * CAREER ABILITY
               * ============================
               *
               * Player is no longer a
               * specialist, so remove any
               * remaining ability cooldown.
               */
              careerAbilityReadyAt:
                null,

              /*
               * ============================
               * QUEUE PENALTY
               * ============================
               */
              queuePenaltyUntil:
                null,

              /*
               * ============================
               * NEXT TICKET
               * ============================
               *
               * Start the new career with
               * a fresh queue timer.
               */
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
         * PVP KILL
         * ============================
         *
         * Only award a kill when:
         *
         * - there is an original PvP attacker
         * - attacker is not the victim
         */
        if (
          source
            ?.attackSourcePlayerId &&
          source
            .attackSourcePlayerId !==
            playerId
        ) {
          /*
           * updateMany is intentional.
           *
           * If the attacker was somehow
           * deleted before bankruptcy,
           * the victim's bankruptcy can
           * still complete successfully.
           */
          const attackerUpdate =
            await tx.player.updateMany({
              where: {
                id:
                  source
                    .attackSourcePlayerId,

                NOT: {
                  id:
                    playerId,
                },
              },

              data: {
                kills: {
                  increment:
                    1,
                },
              },
            });

          killAwarded =
            attackerUpdate.count ===
            1;
        }

        /*
         * ============================
         * PVP ATTACK RESULT
         * ============================
         *
         * Mark the originating attack
         * as the one that caused the
         * bankruptcy.
         */
        if (
          source
            ?.pvpAttackId
        ) {
          await tx.pvPAttack.updateMany({
            where: {
              id:
                source
                  .pvpAttackId,
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

    penalty:
      safePenalty,

    killAwarded:
      result.killAwarded,
  };
}