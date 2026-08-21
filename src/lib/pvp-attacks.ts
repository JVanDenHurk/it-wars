export type PvPAttackType =
  | "PASSWORD_RESET_FLOOD"
  | "NETWORK_OUTAGE"
  | "FAILED_DEPLOYMENT"
  | "PHISHING_CAMPAIGN"
  | "TICKET_STORM"
  | "MAJOR_INCIDENT";

export type PvPAttackDefinition = {
  type: PvPAttackType;

  name: string;

  description: string;

  cost: number;

  ticketCount: number;

  category:
    | "SERVICE_DESK"
    | "NETWORK"
    | "SYSTEMS"
    | "SECURITY"
    | "MIXED";

  severity:
    | "P1"
    | "P2"
    | "P3"
    | "P4"
    | "MIXED";

  difficulty: number;

  maxValue: number;

  baseXp: number;

  /*
   * Optional delay between tickets.
   *
   * Useful later for attacks like
   * Ticket Storm where tickets arrive
   * over time instead of instantly.
   */
  deliverySpacingSeconds?: number;

  /*
   * Short text shown in the attack store.
   */
  flavourText: string;
};

export const PVP_ATTACKS: PvPAttackDefinition[] = [
  {
    type:
      "PASSWORD_RESET_FLOOD",

    name:
      "Password Reset Flood",

    description:
      "Flood another player's queue with a pile of low-level Service Desk work.",

    cost:
      350,

    ticketCount:
      4,

    category:
      "SERVICE_DESK",

    severity:
      "P4",

    difficulty:
      1,

    maxValue:
      60,

    baseXp:
      5,

    flavourText:
      "Apparently everyone forgot their password at exactly the same time.",
  },

  {
    type:
      "NETWORK_OUTAGE",

    name:
      "Network Outage",

    description:
      "Send a difficult Network incident directly into another player's queue.",

    cost:
      600,

    ticketCount:
      1,

    category:
      "NETWORK",

    severity:
      "P2",

    difficulty:
      3,

    maxValue:
      250,

    baseXp:
      20,

    flavourText:
      "Half the office is offline. Networking says it definitely wasn't them.",
  },

  {
    type:
      "FAILED_DEPLOYMENT",

    name:
      "Failed Deployment",

    description:
      "Drop a broken Systems deployment into somebody else's queue.",

    cost:
      600,

    ticketCount:
      1,

    category:
      "SYSTEMS",

    severity:
      "P2",

    difficulty:
      3,

    maxValue:
      250,

    baseXp:
      20,

    flavourText:
      "The deployment succeeded perfectly, except for the part where everything stopped working.",
  },

  {
    type:
      "PHISHING_CAMPAIGN",

    name:
      "Phishing Campaign",

    description:
      "Send a serious Security incident to another player and let them deal with the consequences.",

    cost:
      650,

    ticketCount:
      1,

    category:
      "SECURITY",

    severity:
      "P2",

    difficulty:
      3,

    maxValue:
      275,

    baseXp:
      20,

    flavourText:
      "Someone clicked the link. Then forwarded it to Finance. Then Finance clicked it too.",
  },

  {
    type:
      "TICKET_STORM",

    name:
      "Ticket Storm",

    description:
      "Send a burst of mixed tickets over a short period to overload another player's queue.",

    cost:
      1000,

    ticketCount:
      5,

    category:
      "MIXED",

    severity:
      "MIXED",

    difficulty:
      2,

    maxValue:
      100,

    baseXp:
      10,

    deliverySpacingSeconds:
      25,

    flavourText:
      "One ticket is work. Five tickets arriving back-to-back is character development.",
  },

  {
    type:
      "MAJOR_INCIDENT",

    name:
      "Major Incident",

    description:
      "Launch a brutal high-severity incident with a short SLA and a huge abandonment penalty.",

    cost:
      1500,

    ticketCount:
      1,

    category:
      "MIXED",

    severity:
      "P1",

    difficulty:
      5,

    maxValue:
      500,

    baseXp:
      40,

    flavourText:
      "Management has joined the Teams call. Things are now officially bad.",
  },
];

export function getPvPAttackDefinition(
  type: PvPAttackType
) {
  return (
    PVP_ATTACKS.find(
      (attack) =>
        attack.type === type
    ) ?? null
  );
}