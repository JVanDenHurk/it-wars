export function getResolveCreditMultiplier(
  level: number,
  careerPath: string | null,
  ticketCategory: string
) {
  let multiplier = 1;

  if (level >= 2) {
    multiplier += 0.05;
  }

  if (level >= 3) {
    multiplier += 0.05;
  }

  if (
    level >= 4 &&
    careerPath === ticketCategory
  ) {
    multiplier += 0.15;
  }

  if (
    level >= 5 &&
    careerPath === ticketCategory
  ) {
    multiplier += 0.05;
  }

  return multiplier;
}