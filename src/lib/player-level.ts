export function getLevelFromXp(xp: number): number {
  if (xp >= 1500) {
    return 6;
  }

  if (xp >= 900) {
    return 5;
  }

  if (xp >= 500) {
    return 4;
  }

  if (xp >= 250) {
    return 3;
  }

  if (xp >= 100) {
    return 2;
  }

  return 1;
}

export function getXpForNextLevel(level: number): number | null {
  switch (level) {
    case 1:
      return 100;

    case 2:
      return 250;

    case 3:
      return 500;

    case 4:
      return 900;

    case 5:
      return 1500;

    default:
      return null;
  }
}

export function getRoleTitle(
  level: number,
  careerPath: string | null
): string {
  if (level === 1) {
    return "Service Desk Analyst";
  }

  if (level === 2) {
    return "Service Desk Analyst II";
  }

  if (level === 3) {
    return "Senior Service Desk Analyst";
  }

  if (!careerPath) {
    return "Career Path Required";
  }

  if (careerPath === "NETWORK") {
    if (level === 4) {
      return "Network Engineer";
    }

    if (level === 5) {
      return "Senior Network Engineer";
    }

    return "Network Specialist";
  }

  if (careerPath === "SYSTEMS") {
    if (level === 4) {
      return "Systems Engineer";
    }

    if (level === 5) {
      return "Senior Systems Engineer";
    }

    return "Systems Specialist";
  }

  if (careerPath === "SECURITY") {
    if (level === 4) {
      return "Security Analyst";
    }

    if (level === 5) {
      return "Security Engineer";
    }

    return "Security Specialist";
  }

  return "Unknown Role";
}