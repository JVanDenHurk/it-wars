export function getLevelFromXp(xp: number): number {
  if (xp >= 6000) {
    return 10;
  }

  if (xp >= 4500) {
    return 9;
  }

  if (xp >= 3400) {
    return 8;
  }

  if (xp >= 2500) {
    return 7;
  }

  if (xp >= 1800) {
    return 6;
  }

  if (xp >= 1200) {
    return 5;
  }

  if (xp >= 700) {
    return 4;
  }

  if (xp >= 350) {
    return 3;
  }

  if (xp >= 150) {
    return 2;
  }

  return 1;
}

export function getXpForNextLevel(
  level: number
): number | null {
  switch (level) {
    case 1:
      return 150;

    case 2:
      return 350;

    case 3:
      return 700;

    case 4:
      return 1200;

    case 5:
      return 1800;

    case 6:
      return 2500;

    case 7:
      return 3400;

    case 8:
      return 4500;

    case 9:
      return 6000;

    default:
      return null;
  }
}

export function getRoleTitle(
  level: number,
  careerPath: string | null
): string {
  /*
   * ============================
   * SERVICE DESK
   * ============================
   */
  if (level === 1) {
    return "Service Desk Analyst";
  }

  if (level === 2) {
    return "Service Desk Analyst II";
  }

  if (level === 3) {
    return "Senior Service Desk Analyst";
  }

  /*
   * Level 4+ requires a specialist
   * career path.
   */
  if (!careerPath) {
    return "Career Path Required";
  }

  /*
   * ============================
   * NETWORK
   * ============================
   */
  if (careerPath === "NETWORK") {
    if (level === 4) {
      return "Junior Network Engineer";
    }

    if (level === 5) {
      return "Network Engineer";
    }

    if (level === 6) {
      return "Network Engineer II";
    }

    if (level === 7) {
      return "Senior Network Engineer";
    }

    if (level === 8) {
      return "Lead Network Engineer";
    }

    if (level === 9) {
      return "Principal Network Engineer";
    }

    return "Network Architect";
  }

  /*
   * ============================
   * SYSTEMS
   * ============================
   */
  if (careerPath === "SYSTEMS") {
    if (level === 4) {
      return "Junior Systems Administrator";
    }

    if (level === 5) {
      return "Systems Administrator";
    }

    if (level === 6) {
      return "Systems Engineer";
    }

    if (level === 7) {
      return "Senior Systems Engineer";
    }

    if (level === 8) {
      return "Lead Infrastructure Engineer";
    }

    if (level === 9) {
      return "Principal Infrastructure Engineer";
    }

    return "Infrastructure Architect";
  }

  /*
   * ============================
   * SECURITY
   * ============================
   */
  if (careerPath === "SECURITY") {
    if (level === 4) {
      return "Junior Security Analyst";
    }

    if (level === 5) {
      return "Security Analyst";
    }

    if (level === 6) {
      return "Security Engineer";
    }

    if (level === 7) {
      return "Senior Security Engineer";
    }

    if (level === 8) {
      return "Lead Security Engineer";
    }

    if (level === 9) {
      return "Principal Security Engineer";
    }

    return "Security Architect";
  }

  return "Unknown Role";
}