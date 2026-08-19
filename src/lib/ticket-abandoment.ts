import type { TicketSeverity } from "@/generated/prisma";

export function getAbandonmentRules(
  severity: TicketSeverity
) {
  switch (severity) {
    case "P1":
      return {
        abandonAfterMinutes: 15,
        penalty: 750,
      };

    case "P2":
      return {
        abandonAfterMinutes: 30,
        penalty: 400,
      };

    case "P3":
      return {
        abandonAfterMinutes: 45,
        penalty: 200,
      };

    case "P4":
    default:
      return {
        abandonAfterMinutes: 60,
        penalty: 100,
      };
  }
}

export function isTicketAbandoned(
  severity: TicketSeverity,
  createdAt: Date
) {
  const rules = getAbandonmentRules(severity);

  const ageMs =
    Date.now() - createdAt.getTime();

  const ageMinutes =
    Math.floor(ageMs / 60000);

  return (
    ageMinutes >=
    rules.abandonAfterMinutes
  );
}