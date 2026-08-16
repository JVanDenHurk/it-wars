export function calculateTicketValue(
  maxValue: number,
  createdAt: Date
) {
  const ageMs = Date.now() - createdAt.getTime();
  const ageMinutes = Math.floor(ageMs / 60000);

  const lossPerMinute = maxValue * 0.02;

  const currentValue = Math.floor(
    maxValue - ageMinutes * lossPerMinute
  );

  // Ticket value can fall all the way to 0.
  return Math.max(0, currentValue);
}