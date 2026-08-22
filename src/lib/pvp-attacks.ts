export type PvPAttackType =
  | "PASSWORD_RESET_FLOOD"
  | "SELF_SERVICE_PORTAL_OUTAGE"
  | "NETWORK_OUTAGE"
  | "FAILED_DEPLOYMENT"
  | "PHISHING_CAMPAIGN"
  | "MONITORING_FAILURE"
  | "DNS_FAILURE"
  | "MAJOR_INCIDENT"
  | "EXECUTIVE_ESCALATION"
  | "MAIL_QUEUE_BACKLOG";

export type PoisonEffect =
  | "NONE"
  | "QUEUE_SPEED"
  | "SLA_PRESSURE"
  | "VALUE_DECAY"
  | "RESOLUTION_PENALTY"
  | "MONITORING_FAILURE"
  | "BOUNCE_FAILURE"
  | "ABANDONMENT_PENALTY"
  | "EXECUTIVE_ESCALATION"
  | "MAIL_BACKLOG";

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

  /*
   * Poison tickets themselves
   * give no Credits or XP.
   *
   * These remain here for display/
   * future tuning but the attack API
   * should create poison tickets with
   * maxValue = 0 and baseXp = 0.
   */
  maxValue: number;
  baseXp: number;

  poisonEffect: PoisonEffect;

  /*
   * Human-readable explanation shown
   * in the Poison Store and eventually
   * on the Poison Ticket itself.
   */
  effectDescription: string;

  flavourText: string;

  /*
   * Extra config used by certain
   * poison effects.
   */
  queueSpeedMultiplier?: number;

  slaAgeMinutes?: number;

  slaAffectedTicketCount?: number;

  valueDecayMultiplier?: number;

  resolutionPenaltyMultiplier?: number;

  bounceFailureChance?: number;

  abandonmentPenaltyMultiplier?: number;

  backlogTicketCount?: number;
};

export const PVP_ATTACKS: PvPAttackDefinition[] = [
  {
    type:
      "PASSWORD_RESET_FLOOD",

    name:
      "Password Reset Flood",

    description:
      "Dump several useless password reset tickets directly into another player's queue.",

    cost:
      350,

    ticketCount:
      3,

    category:
      "SERVICE_DESK",

    severity:
      "P4",

    difficulty:
      1,

    maxValue:
      0,

    baseXp:
      0,

    poisonEffect:
      "NONE",

    effectDescription:
      "Immediately adds 3 zero-value Poison Tickets to the target's queue.",

    flavourText:
      "Three users forgot their passwords at the exact same time. Completely normal.",
  },

  {
    type:
      "SELF_SERVICE_PORTAL_OUTAGE",

    name:
      "Self-Service Portal Outage",

    description:
      "Take away the thing users were supposed to use before calling IT.",

    cost:
      250,

    ticketCount:
      1,

    category:
      "SYSTEMS",

    severity:
      "P3",

    difficulty:
      2,

    maxValue:
      0,

    baseXp:
      0,

    poisonEffect:
      "QUEUE_SPEED",

    effectDescription:
      "Normal system tickets arrive 30% faster while this Poison Ticket remains open.",

    queueSpeedMultiplier:
      0.7,

    flavourText:
      "The self-service portal is down. Every problem is now officially a Service Desk problem.",
  },

  {
    type:
      "NETWORK_OUTAGE",

    name:
      "Network Outage",

    description:
      "Apply immediate SLA pressure to a handful of tickets already sitting in the victim's queue.",

    cost:
      300,

    ticketCount:
      1,

    category:
      "NETWORK",

    severity:
      "P2",

    difficulty:
      3,

    maxValue:
      0,

    baseXp:
      0,

    poisonEffect:
      "SLA_PRESSURE",

    effectDescription:
      "Immediately ages up to 3 random open tickets by 5 minutes.",

    slaAgeMinutes:
      5,

    slaAffectedTicketCount:
      3,

    flavourText:
      "The network issue has spread. So has everyone's urgency.",
  },

  {
    type:
      "FAILED_DEPLOYMENT",

    name:
      "Failed Deployment",

    description:
      "Make the victim's legitimate queue worth less the longer this problem remains unresolved.",

    cost:
      150,

    ticketCount:
      1,

    category:
      "SYSTEMS",

    severity:
      "P3",

    difficulty:
      3,

    maxValue:
      0,

    baseXp:
      0,

    poisonEffect:
      "VALUE_DECAY",

    effectDescription:
      "Normal ticket Credit rewards decay 25% faster while this Poison Ticket remains open.",

    valueDecayMultiplier:
      1.25,

    flavourText:
      "The deployment passed testing. Production has chosen not to recognise those results.",
  },

  {
    type:
      "PHISHING_CAMPAIGN",

    name:
      "Phishing Campaign",

    description:
      "Make panic-driven resolution mistakes much more expensive.",

    cost:
      200,

    ticketCount:
      1,

    category:
      "SECURITY",

    severity:
      "P2",

    difficulty:
      3,

    maxValue:
      0,

    baseXp:
      0,

    poisonEffect:
      "RESOLUTION_PENALTY",

    effectDescription:
      "Wrong-resolution penalties are increased by 50% while this Poison Ticket remains open.",

    resolutionPenaltyMultiplier:
      1.5,

    flavourText:
      "Sales clicked it. Finance clicked it. Someone forwarded it to Payroll for verification.",
  },

  {
    type:
      "MONITORING_FAILURE",

    name:
      "Monitoring Failure",

    description:
      "Remove one of the victim's most useful visual warnings while their queue keeps ageing.",

    cost:
      100,

    ticketCount:
      1,

    category:
      "SYSTEMS",

    severity:
      "P3",

    difficulty:
      2,

    maxValue:
      0,

    baseXp:
      0,

    poisonEffect:
      "MONITORING_FAILURE",

    effectDescription:
      "BREACHING warnings are hidden while this Poison Ticket remains open.",

    flavourText:
      "Monitoring is green. Everything is on fire, but monitoring is definitely green.",
  },

  {
    type:
      "DNS_FAILURE",

    name:
      "DNS Failure",

    description:
      "Make routing tickets away less reliable while the DNS problem remains in the queue.",

    cost:
      250,

    ticketCount:
      1,

    category:
      "NETWORK",

    severity:
      "P2",

    difficulty:
      3,

    maxValue:
      0,

    baseXp:
      0,

    poisonEffect:
      "BOUNCE_FAILURE",

    effectDescription:
      "Bounce attempts have a 50% chance to fail while this Poison Ticket remains open.",

    bounceFailureChance:
      0.5,

    flavourText:
      "It's always DNS. This time it is also preventing you from escaping your own tickets.",
  },

  {
    type:
      "MAJOR_INCIDENT",

    name:
      "Major Incident",

    description:
      "Turn every SLA breach into a much more dangerous financial problem.",

    cost:
      400,

    ticketCount:
      1,

    category:
      "MIXED",

    severity:
      "P1",

    difficulty:
      4,

    maxValue:
      0,

    baseXp:
      0,

    poisonEffect:
      "ABANDONMENT_PENALTY",

    effectDescription:
      "Abandonment penalties are increased by 50% while this Poison Ticket remains open.",

    abandonmentPenaltyMultiplier:
      1.5,

    flavourText:
      "Management has joined the bridge call. Your evening plans have been reassigned.",
  },

  {
    type:
      "EXECUTIVE_ESCALATION",

    name:
      "Executive Escalation",

    description:
      "Send one dangerous high-pressure ticket designed to demand immediate attention.",

    cost:
      500,

    ticketCount:
      1,

    category:
      "SERVICE_DESK",

    severity:
      "P2",

    difficulty:
      4,

    maxValue:
      0,

    baseXp:
      0,

    poisonEffect:
      "EXECUTIVE_ESCALATION",

    effectDescription:
      "Adds a dangerous P2 Poison Ticket with a short SLA and a heavy abandonment penalty.",

    flavourText:
      "The executive has used the phrase 'business critical'. Three managers are already typing.",
  },

  {
    type:
      "MAIL_QUEUE_BACKLOG",

    name:
      "Mail Queue Backlog",

    description:
      "Build up the target's next few normal tickets and release them as one unpleasant burst.",

    cost:
      300,

    ticketCount:
      1,

    category:
      "SYSTEMS",

    severity:
      "P3",

    difficulty:
      3,

    maxValue:
      0,

    baseXp:
      0,

    poisonEffect:
      "MAIL_BACKLOG",

    effectDescription:
      "The target's next 3 normal system tickets arrive together instead of separately.",

    backlogTicketCount:
      3,

    flavourText:
      "The mail queue finally started moving. Unfortunately, it moved everything at once.",
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

export function getPoisonEffectLabel(
  effect: PoisonEffect
) {
  switch (effect) {
    case "QUEUE_SPEED":
      return "Queue Speed";

    case "SLA_PRESSURE":
      return "SLA Pressure";

    case "VALUE_DECAY":
      return "Reward Decay";

    case "RESOLUTION_PENALTY":
      return "Resolution Penalty";

    case "MONITORING_FAILURE":
      return "Monitoring Failure";

    case "BOUNCE_FAILURE":
      return "Bounce Failure";

    case "ABANDONMENT_PENALTY":
      return "Abandonment Penalty";

    case "EXECUTIVE_ESCALATION":
      return "Executive Escalation";

    case "MAIL_BACKLOG":
      return "Mail Backlog";

    case "NONE":
    default:
      return "Queue Poison";
  }
}