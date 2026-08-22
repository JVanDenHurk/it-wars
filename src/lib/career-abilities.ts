export type CareerPath =
  | "NETWORK"
  | "SYSTEMS"
  | "SECURITY";

export type CareerAbilityDefinition = {
  careerPath: CareerPath;

  careerName: string;

  passiveName: string;

  passiveDescription: string;

  activeName: string;

  activeDescription: string;

  unlockLevel: number;

  cooldownMinutes: number;
};

export const CAREER_ABILITIES: Record<
  CareerPath,
  CareerAbilityDefinition
> = {
  /*
   * ============================
   * NETWORK
   * ============================
   */
  NETWORK: {
    careerPath:
      "NETWORK",

    careerName:
      "Network Engineer",

    passiveName:
      "Routing Specialist",

    passiveDescription:
      "Wrong-team bounce penalties are reduced by 25%.",

    activeName:
      "Route Flap",

    activeDescription:
      "Transfer one ticket to another player without triggering a wrong-team penalty or ownership slowdown.",

    unlockLevel:
      6,

    cooldownMinutes:
      10,
  },

  /*
   * ============================
   * SYSTEMS
   * ============================
   */
  SYSTEMS: {
    careerPath:
      "SYSTEMS",

    careerName:
      "Systems Engineer",

    passiveName:
      "Automation",

    passiveDescription:
      "Normal ticket Credit value decays 25% slower.",

    activeName:
      "Maintenance Window",

    activeDescription:
      "Pause SLA ageing on up to 2 tickets for 5 minutes.",

    unlockLevel:
      6,

    cooldownMinutes:
      15,
  },

  /*
   * ============================
   * SECURITY
   * ============================
   */
  SECURITY: {
    careerPath:
      "SECURITY",

    careerName:
      "Security Analyst",

    passiveName:
      "Incident Hardened",

    passiveDescription:
      "Credit penalties caused by Poison Tickets are reduced by 25%.",

    activeName:
      "Quarantine",

    activeDescription:
      "Immediately remove one Poison Ticket from your queue for no Credits or XP.",

    unlockLevel:
      6,

    cooldownMinutes:
      15,
  },
};

/*
 * ============================
 * GET CAREER
 * ============================
 */
export function getCareerAbility(
  careerPath: string | null
) {
  if (
    careerPath !== "NETWORK" &&
    careerPath !== "SYSTEMS" &&
    careerPath !== "SECURITY"
  ) {
    return null;
  }

  return CAREER_ABILITIES[
    careerPath
  ];
}

/*
 * ============================
 * ACTIVE ABILITY UNLOCK
 * ============================
 */
export function isCareerAbilityUnlocked(
  level: number,
  careerPath: string | null
) {
  const career =
    getCareerAbility(
      careerPath
    );

  if (!career) {
    return false;
  }

  return (
    level >=
    career.unlockLevel
  );
}

/*
 * ============================
 * COOLDOWN READY
 * ============================
 */
export function isCareerAbilityReady(
  careerAbilityReadyAt:
    | Date
    | null
) {
  if (
    !careerAbilityReadyAt
  ) {
    return true;
  }

  return (
    careerAbilityReadyAt.getTime() <=
    Date.now()
  );
}

/*
 * ============================
 * NEXT COOLDOWN
 * ============================
 */
export function getNextCareerAbilityReadyAt(
  careerPath: CareerPath
) {
  const ability =
    CAREER_ABILITIES[
      careerPath
    ];

  return new Date(
    Date.now() +
      ability.cooldownMinutes *
        60 *
        1000
  );
}

/*
 * ============================
 * COOLDOWN REMAINING
 * ============================
 */
export function getCareerAbilityCooldownSeconds(
  careerAbilityReadyAt:
    | Date
    | null
) {
  if (
    !careerAbilityReadyAt
  ) {
    return 0;
  }

  return Math.max(
    0,
    Math.ceil(
      (
        careerAbilityReadyAt.getTime() -
        Date.now()
      ) /
        1000
    )
  );
}

/*
 * ============================
 * NETWORK PASSIVE
 * ============================
 *
 * Normal wrong-bounce penalty:
 * 100 CR
 *
 * Network Engineer:
 * 75 CR
 */
export function getWrongBouncePenalty(
  careerPath: string | null,
  basePenalty = 100
) {
  if (
    careerPath ===
    "NETWORK"
  ) {
    return Math.floor(
      basePenalty *
        0.75
    );
  }

  return basePenalty;
}

/*
 * ============================
 * SYSTEMS PASSIVE
 * ============================
 *
 * Normal decay multiplier:
 * 1
 *
 * Systems Engineer:
 * 0.75
 *
 * This means the normal 2%
 * loss per minute effectively
 * becomes 1.5%.
 */
export function getCareerValueDecayMultiplier(
  careerPath: string | null
) {
  if (
    careerPath ===
    "SYSTEMS"
  ) {
    return 0.75;
  }

  return 1;
}

/*
 * ============================
 * SECURITY PASSIVE
 * ============================
 *
 * Poison-related penalties are
 * reduced by 25%.
 */
export function getPoisonPenalty(
  careerPath: string | null,
  penalty: number
) {
  const safePenalty =
    Math.max(
      0,
      penalty
    );

  if (
    careerPath ===
    "SECURITY"
  ) {
    return Math.floor(
      safePenalty *
        0.75
    );
  }

  return safePenalty;
}