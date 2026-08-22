export function canPlayerResolve(
  level: number,
  careerPath: string | null,
  ticketCategory: string
) {
  if (ticketCategory === "SERVICE_DESK") {
    return true;
  }

  if (level < 4 || !careerPath) {
    return false;
  }

  return careerPath === ticketCategory;
}

export function isServiceDeskPlayer(
  level: number,
  careerPath: string | null
) {
  return level < 4 || !careerPath;
}

export function isSpecialistPlayer(
  level: number,
  careerPath: string | null
) {
  return level >= 4 && careerPath !== null;
}
