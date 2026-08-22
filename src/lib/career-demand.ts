import { IN_DEMAND_CAREER_XP_BONUS } from "@/lib/game-balance";

export type SpecialistCareer =
  | "NETWORK"
  | "SYSTEMS"
  | "SECURITY";

export type CareerCounts = Record<
  SpecialistCareer,
  number
>;

export const SPECIALIST_CAREERS: SpecialistCareer[] = [
  "NETWORK",
  "SYSTEMS",
  "SECURITY",
];

export { IN_DEMAND_CAREER_XP_BONUS };

/**
 * Pick one under-represented career. When multiple careers are tied, spread
 * players across the tied paths using their player id instead of always
 * highlighting the first option.
 */
export function getInDemandCareer(
  counts: CareerCounts,
  playerId: number
): SpecialistCareer {
  const minimum = Math.min(
    ...SPECIALIST_CAREERS.map(
      (career) => counts[career]
    )
  );

  const candidates =
    SPECIALIST_CAREERS.filter(
      (career) =>
        counts[career] === minimum
    );

  const index =
    Math.abs(playerId) %
    candidates.length;

  return candidates[index];
}
