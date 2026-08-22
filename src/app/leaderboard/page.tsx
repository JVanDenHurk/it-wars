import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

import PlayerHeartbeat from "@/components/PlayerHeartbeat";
import { auth } from "@/lib/auth";
import {
  calculateLeaderboardScore,
} from "@/lib/leaderboard";
import { getRoleTitle } from "@/lib/player-level";
import { prisma } from "@/lib/prisma";

export default async function LeaderboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/");
  }

  const now = new Date();

  /*
   * Player is considered online if
   * they have been active within
   * the last 2 minutes.
   */
  const activeCutoff = new Date(
    now.getTime() -
      2 * 60 * 1000
  );

  const players =
    await prisma.player.findMany({
      select: {
        id: true,
        userId: true,
        username: true,

        level: true,
        xp: true,
        careerPath: true,

        credits: true,

        lastActiveAt: true,

        ticketsResolved: true,
        correctBounces: true,
        incorrectBounces: true,

        kills: true,
        bankruptcies: true,

        lifetimeCreditsEarned: true,

        assignedTickets: {
          where: {
            status: "OPEN",
          },

          select: {
            id: true,
          },
        },

        user: {
          select: {
            sessions: {
              where: {
                expiresAt: {
                  gt: now,
                },
              },

              select: {
                id: true,
              },
            },
          },
        },
      },
    });

  /*
   * ============================
   * BUILD LEADERBOARD
   * ============================
   */
  const leaderboard =
    players
      .map((player) => {
        const hasValidSession =
          player.user.sessions.length > 0;

        const recentlyActive =
          player.lastActiveAt >
          activeCutoff;

        return {
          ...player,

          score:
            calculateLeaderboardScore({
              lifetimeCreditsEarned:
                player.lifetimeCreditsEarned,

              ticketsResolved:
                player.ticketsResolved,

              correctBounces:
                player.correctBounces,

              kills:
                player.kills,

              bankruptcies:
                player.bankruptcies,
            }),

          online:
            hasValidSession &&
            recentlyActive,

          queueSize:
            player.assignedTickets.length,
        };
      })
      .sort((a, b) => {
        /*
         * Primary ranking:
         * leaderboard score.
         */
        if (b.score !== a.score) {
          return b.score - a.score;
        }

        /*
         * Tie breaker:
         * lifetime Credits earned.
         */
        if (
          b.lifetimeCreditsEarned !==
          a.lifetimeCreditsEarned
        ) {
          return (
            b.lifetimeCreditsEarned -
            a.lifetimeCreditsEarned
          );
        }

        /*
         * Final tie breaker:
         * resolved tickets.
         */
        return (
          b.ticketsResolved -
          a.ticketsResolved
        );
      });

  const onlineCount =
    leaderboard.filter(
      (player) =>
        player.online
    ).length;

  return (
    <main className="min-h-screen bg-black p-8 text-white">

      {/*
       * Keeps this player marked active
       * while they are viewing the
       * leaderboard.
       */}
      <PlayerHeartbeat />

      <div className="mx-auto max-w-6xl">

        {/* ============================
            HEADER
            ============================ */}
        <div className="flex items-start justify-between gap-6">

          <div>

            <p className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-500">
              IT WARS
            </p>

            <h1 className="mt-2 text-4xl font-black">
              Leaderboard
            </h1>

            <p className="mt-2 text-zinc-400">
              See who is carrying IT and who is one bad routing decision away from Service Desk.
            </p>

          </div>

          <Link
            href="/dashboard"
            className="border border-zinc-700 px-4 py-2 font-bold hover:bg-zinc-900"
          >
            Dashboard
          </Link>

        </div>

        {/* ============================
            SUMMARY
            ============================ */}
        <div className="mt-8 grid gap-4 md:grid-cols-3">

          {/* Players */}
          <div className="border border-zinc-800 bg-zinc-950 p-5">

            <p className="text-xs uppercase tracking-wide text-zinc-500">
              Players
            </p>

            <p className="mt-2 text-3xl font-black">
              {leaderboard.length}
            </p>

          </div>

          {/* Online */}
          <div className="border border-zinc-800 bg-zinc-950 p-5">

            <p className="text-xs uppercase tracking-wide text-zinc-500">
              Online
            </p>

            <div className="mt-2 flex items-center gap-3">

              <span className="h-3 w-3 rounded-full bg-green-400" />

              <p className="text-3xl font-black">
                {onlineCount}
              </p>

            </div>

          </div>

          {/* Leader */}
          <div className="border border-zinc-800 bg-zinc-950 p-5">

            <p className="text-xs uppercase tracking-wide text-zinc-500">
              Current Leader
            </p>

            <p className="mt-2 truncate text-2xl font-black">
              {leaderboard[0]?.username ??
                "Nobody"}
            </p>

            {leaderboard[0] && (
              <p className="mt-1 text-sm text-zinc-500">
                {leaderboard[0].score} Score
              </p>
            )}

          </div>

        </div>

        {/* ============================
            RANKINGS
            ============================ */}
        <div className="mt-4 border border-zinc-800 bg-zinc-950">

          <div className="border-b border-zinc-800 p-6">

            <p className="text-xs uppercase tracking-wide text-zinc-500">
              Global Rankings
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              IT Department
            </h2>

          </div>

          {leaderboard.length === 0 && (
            <div className="p-8 text-center text-zinc-500">
              Nobody has joined the IT department yet.
            </div>
          )}

          <div className="divide-y divide-zinc-800">

            {leaderboard.map(
              (
                rankedPlayer,
                index
              ) => {
                const rank =
                  index + 1;

                const role =
                  getRoleTitle(
                    rankedPlayer.level,
                    rankedPlayer.careerPath
                  );

                const isCurrentPlayer =
                  rankedPlayer.userId ===
                  session.user.id;

                return (
                  <div
                    key={
                      rankedPlayer.id
                    }
                    className={`p-5 ${
                      isCurrentPlayer
                        ? "bg-zinc-900/60"
                        : ""
                    }`}
                  >

                    <div className="flex items-center gap-5">

                      {/* RANK */}
                      <div className="w-12 shrink-0 text-center">

                        <p
                          className={`text-2xl font-black ${
                            rank === 1
                              ? "text-yellow-400"
                              : rank === 2
                                ? "text-zinc-300"
                                : rank === 3
                                  ? "text-orange-400"
                                  : "text-zinc-600"
                          }`}
                        >
                          #{rank}
                        </p>

                      </div>

                      {/* PLAYER */}
                      <div className="min-w-0 flex-1">

                        <div className="flex items-center gap-2">

                          <span
                            className={`h-2 w-2 shrink-0 rounded-full ${
                              rankedPlayer.online
                                ? "bg-green-400"
                                : "bg-zinc-700"
                            }`}
                          />

                          <p className="truncate text-lg font-bold">
                            {
                              rankedPlayer.username
                            }
                          </p>

                          {isCurrentPlayer && (
                            <span className="text-xs font-bold uppercase tracking-wide text-zinc-600">
                              You
                            </span>
                          )}

                        </div>

                        <p className="mt-1 text-sm text-zinc-500">
                          {role} · Level{" "}
                          {
                            rankedPlayer.level
                          }
                        </p>

                      </div>

                      {/* QUEUE */}
                      <div className="hidden min-w-20 text-center md:block">

                        <p className="text-xs uppercase tracking-wide text-zinc-600">
                          Queue
                        </p>

                        <p
                          className={`mt-1 font-bold ${
                            rankedPlayer.queueSize >= 10
                              ? "text-red-400"
                              : rankedPlayer.queueSize >= 5
                                ? "text-yellow-400"
                                : "text-zinc-300"
                          }`}
                        >
                          {
                            rankedPlayer.queueSize
                          }
                        </p>

                      </div>

                      {/* CREDITS */}
                      <div className="hidden min-w-28 text-right md:block">

                        <p className="text-xs uppercase tracking-wide text-zinc-600">
                          Credits
                        </p>

                        <p
                          className={`mt-1 font-bold ${
                            rankedPlayer.credits <= 250
                              ? "text-red-400"
                              : "text-zinc-300"
                          }`}
                        >
                          {
                            rankedPlayer.credits
                          }{" "}
                          CR
                        </p>

                      </div>

                      {/* SCORE */}
                      <div className="w-28 shrink-0 text-right">

                        <p className="text-xs uppercase tracking-wide text-zinc-600">
                          Score
                        </p>

                        <p className="mt-1 text-xl font-black">
                          {
                            rankedPlayer.score
                          }
                        </p>

                      </div>

                    </div>

                    {/* EXTRA STATS */}
                    <div className="mt-4 grid grid-cols-2 gap-3 border-t border-zinc-900 pt-4 text-sm sm:grid-cols-5">

                      <div>
                        <p className="text-xs text-zinc-600">
                          Resolved
                        </p>

                        <p className="font-bold text-zinc-300">
                          {
                            rankedPlayer.ticketsResolved
                          }
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-zinc-600">
                          Correct Routes
                        </p>

                        <p className="font-bold text-zinc-300">
                          {
                            rankedPlayer.correctBounces
                          }
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-zinc-600">
                          Bad Routes
                        </p>

                        <p className="font-bold text-zinc-300">
                          {
                            rankedPlayer.incorrectBounces
                          }
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-zinc-600">
                          Kills
                        </p>

                        <p className="font-bold text-zinc-300">
                          {
                            rankedPlayer.kills
                          }
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-zinc-600">
                          Bankruptcies
                        </p>

                        <p className="font-bold text-zinc-300">
                          {
                            rankedPlayer.bankruptcies
                          }
                        </p>
                      </div>

                    </div>

                  </div>
                );
              }
            )}

          </div>

        </div>

        {/* ============================
            SCORE EXPLANATION
            ============================ */}
        <div className="mt-4 border border-zinc-800 bg-zinc-950 p-6">

          <p className="text-xs uppercase tracking-wide text-zinc-500">
            How Score Works
          </p>

          <p className="mt-3 text-sm text-zinc-400">
            XP, resolved tickets, correct routing,
            lifetime earnings and PvP kills increase
            your score. Bankruptcies reduce it.
          </p>

        </div>

      </div>
    </main>
  );
}