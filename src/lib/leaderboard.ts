export interface LeaderboardStats {
  lifetimeCreditsEarned: number;
  ticketsResolved: number;
  correctBounces: number;
  kills: number;
  bankruptcies: number;
}

/**
 * Leaderboard score is lifetime-only. Bankruptcy can reset a player's current
 * level/XP/credits, but it does not erase the career record they built before
 * that reset.
 */
export function calculateLeaderboardScore(
  player: LeaderboardStats
) {
  const score =
    Math.floor(
      player.lifetimeCreditsEarned / 10
    ) +
    player.ticketsResolved * 20 +
    player.correctBounces * 10 +
    player.kills * 100 -
    player.bankruptcies * 100;

  return Math.max(
    0,
    score
  );
}
