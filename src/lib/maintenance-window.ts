import { prisma } from "@/lib/prisma";

/*
 * ============================
 * MAINTENANCE WINDOW
 * ============================
 *
 * Maintenance Window freezes
 * ticket SLA/value ageing for
 * 5 minutes.
 *
 * While active:
 *
 * maintenanceUntil contains
 * the expiry time.
 *
 * Once expired:
 *
 * maintenancePausedMinutes += 5
 * maintenanceUntil = null
 *
 * This permanently preserves
 * the 5 minutes of frozen time.
 */

const MAINTENANCE_MINUTES =
  5;

/*
 * ============================
 * FINALIZE EXPIRED WINDOWS
 * ============================
 *
 * Call this before loading or
 * processing a player's tickets.
 */
export async function finalizeExpiredMaintenanceWindows(
  playerId: number
) {
  const now =
    new Date();

  const result =
    await prisma.ticket.updateMany({
      where: {
        assignedToId:
          playerId,

        status:
          "OPEN",

        maintenanceUntil: {
          not:
            null,

          lte:
            now,
        },
      },

      data: {
        maintenancePausedMinutes: {
          increment:
            MAINTENANCE_MINUTES,
        },

        maintenanceUntil:
          null,
      },
    });

  return {
    finalized:
      result.count,
  };
}

/*
 * ============================
 * MAINTENANCE ACTIVE
 * ============================
 */
export function isMaintenanceWindowActive(
  maintenanceUntil:
    | Date
    | null
) {
  if (
    !maintenanceUntil
  ) {
    return false;
  }

  return (
    maintenanceUntil.getTime() >
    Date.now()
  );
}

/*
 * ============================
 * CONSTANT
 * ============================
 */
export function getMaintenanceWindowMinutes() {
  return MAINTENANCE_MINUTES;
}