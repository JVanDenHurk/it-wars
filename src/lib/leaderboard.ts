export interface LeaderboardStats {
  xp: number;
  lifetimeCreditsEarned: number;
  ticketsResolved: number;
  correctBounces: number;
  kills: number;
  bankruptcies: number;
}

export function calculateLeaderboardScore(
  player: LeaderboardStats
) {
  const score =
    player.xp +
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