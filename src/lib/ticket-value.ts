import { TICKET_REWARD_MULTIPLIER } from "@/lib/game-balance";

/*
 * ============================
 * EFFECTIVE TICKET AGE
 * ============================
 *
 * Ticket age is made up of:
 *
 * real age
 * +
 * poison SLA pressure
 * -
 * completed maintenance time
 * -
 * currently active maintenance time
 *
 * Maintenance Window freezes the
 * ticket's effective age while active.
 */

export function calculateTicketAgeMinutes(
  createdAt: Date,
  slaAgeOffsetMinutes = 0,
  maintenanceUntil: Date | null = null,
  maintenancePausedMinutes = 0
) {
  const now =
    Date.now();

  const createdAtMs =
    createdAt.getTime();

  /*
   * ============================
   * REAL AGE
   * ============================
   */
  const realAgeMinutes =
    Math.max(
      0,
      Math.floor(
        (
          now -
          createdAtMs
        ) /
          60000
      )
    );

  /*
   * ============================
   * SLA PRESSURE
   * ============================
   */
  const safeSlaOffset =
    Math.max(
      0,
      slaAgeOffsetMinutes
    );

  /*
   * ============================
   * COMPLETED MAINTENANCE
   * ============================
   */
  const safePausedMinutes =
    Math.max(
      0,
      maintenancePausedMinutes
    );

  /*
   * ============================
   * ACTIVE MAINTENANCE
   * ============================
   *
   * If maintenanceUntil is still
   * in the future, work out how
   * much of the 5 minute freeze
   * has already elapsed.
   *
   * Example:
   *
   * Maintenance started 2 minutes ago
   * and has 3 minutes remaining.
   *
   * Effective age is reduced by
   * those 2 elapsed minutes.
   */
  let activeMaintenanceMinutes =
    0;

  if (
    maintenanceUntil &&
    maintenanceUntil.getTime() >
      now
  ) {
    /*
     * Maintenance Window always
     * lasts 5 minutes.
     */
    const totalWindowMs =
      5 *
      60 *
      1000;

    const remainingMs =
      maintenanceUntil.getTime() -
      now;

    const elapsedMs =
      Math.max(
        0,
        totalWindowMs -
          remainingMs
      );

    activeMaintenanceMinutes =
      Math.floor(
        elapsedMs /
          60000
      );
  }

  /*
   * ============================
   * EFFECTIVE AGE
   * ============================
   */
  const effectiveAge =
    realAgeMinutes +
    safeSlaOffset -
    safePausedMinutes -
    activeMaintenanceMinutes;

  return Math.max(
    0,
    effectiveAge
  );
}

/*
 * ============================
 * TICKET VALUE
 * ============================
 */
export function getTicketMaximumReward(
  maxValue: number
) {
  if (maxValue <= 0) {
    return 0;
  }

  return Math.max(
    0,
    Math.floor(
      maxValue *
        TICKET_REWARD_MULTIPLIER
    )
  );
}

export function calculateTicketValue(
  maxValue: number,
  createdAt: Date,
  decayMultiplier = 1,
  slaAgeOffsetMinutes = 0,
  maintenanceUntil: Date | null = null,
  maintenancePausedMinutes = 0
) {
  /*
   * ============================
   * POISON / ZERO VALUE
   * ============================
   */
  if (
    maxValue <= 0
  ) {
    return 0;
  }

  /*
   * Prevent invalid decay
   * multipliers.
   */
  const safeDecayMultiplier =
    Math.max(
      0,
      decayMultiplier
    );

  /*
   * ============================
   * EFFECTIVE AGE
   * ============================
   */
  const ageMinutes =
    calculateTicketAgeMinutes(
      createdAt,
      slaAgeOffsetMinutes,
      maintenanceUntil,
      maintenancePausedMinutes
    );

  /*
   * ============================
   * VALUE DECAY
   * ============================
   *
   * Normal:
   *
   * 2% of max value per minute.
   *
   * Systems Automation:
   *
   * multiplier = 0.75
   *
   * Failed Deployment:
   *
   * multiplier = 1.25
   */
  const rewardCap =
    getTicketMaximumReward(
      maxValue
    );

  const lossPerMinute =
    rewardCap *
    0.02 *
    safeDecayMultiplier;

  const currentValue =
    Math.floor(
      rewardCap -
        ageMinutes *
          lossPerMinute
    );

  /*
   * Ticket value can reach
   * 0 but never become negative.
   */
  return Math.max(
    0,
    currentValue
  );
}