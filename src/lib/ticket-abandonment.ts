export type TicketSeverity =
  | "P1"
  | "P2"
  | "P3"
  | "P4";

export function getAbandonmentRule(
  severity: TicketSeverity
) {
  switch (severity) {
    case "P1":
      return {
        minutes: 10,
        penalty: 500,
      };

    case "P2":
      return {
        minutes: 20,
        penalty: 300,
      };

    case "P3":
      return {
        minutes: 30,
        penalty: 200,
      };

    case "P4":
    default:
      return {
        minutes: 44,
        penalty: 100,
      };
  }
}

export function getAbandonmentMinutes(
  severity: TicketSeverity
) {
  return getAbandonmentRule(
    severity
  ).minutes;
}
