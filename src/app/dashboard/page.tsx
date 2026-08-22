import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

import ClearQueuePenaltyButton from "@/components/ClearQueuePenaltyButton";
import DashboardRefresh from "@/components/DashboardRefresh";
import PlayerHeartbeat from "@/components/PlayerHeartbeat";
import SignOutButton from "@/components/SignOutButton";
import TicketTimer from "@/components/TicketTimer";
import { auth } from "@/lib/auth";
import {
  calculateLeaderboardScore,
} from "@/lib/leaderboard";
import { getRoleTitle } from "@/lib/player-level";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const session =
    await auth.api.getSession({
      headers:
        await headers(),
    });

  if (!session) {
    redirect("/");
  }

  let player =
    await prisma.player.findUnique({
      where: {
        userId:
          session.user.id,
      },
    });

  if (!player) {
    player =
      await prisma.player.create({
        data: {
          userId:
            session.user.id,

          username:
            session.user.name,
        },
      });
  }

  const now =
    new Date();

  const activeCutoff =
    new Date(
      now.getTime() -
        2 *
          60 *
          1000
    );

  const openTickets =
    await prisma.ticket.count({
      where: {
        assignedToId:
          player.id,

        status:
          "OPEN",
      },
    });

  const activePlayers =
    await prisma.player.count({
      where: {
        lastActiveAt: {
          gt:
            activeCutoff,
        },

        user: {
          sessions: {
            some: {
              expiresAt: {
                gt:
                  now,
              },
            },
          },
        },
      },
    });

  const leaderboardPlayers =
    await prisma.player.findMany({
      select: {
        username:
          true,

        xp:
          true,

        lifetimeCreditsEarned:
          true,

        ticketsResolved:
          true,

        correctBounces:
          true,

        kills:
          true,

        bankruptcies:
          true,
      },
    });

  const leaderboard =
    leaderboardPlayers
      .map(
        (
          leaderboardPlayer
        ) => ({
          username:
            leaderboardPlayer.username,

          score:
            calculateLeaderboardScore({
              xp:
                leaderboardPlayer.xp,

              lifetimeCreditsEarned:
                leaderboardPlayer
                  .lifetimeCreditsEarned,

              ticketsResolved:
                leaderboardPlayer
                  .ticketsResolved,

              correctBounces:
                leaderboardPlayer
                  .correctBounces,

              kills:
                leaderboardPlayer.kills,

              bankruptcies:
                leaderboardPlayer
                  .bankruptcies,
            }),
        })
      )
      .sort(
        (a, b) =>
          b.score -
          a.score
      );

  const leaderboardLeader =
    leaderboard[0] ??
    null;

  const roleTitle =
    getRoleTitle(
      player.level,
      player.careerPath
    );

  const queuePenaltyActive =
    player.queuePenaltyUntil !==
      null &&
    player.queuePenaltyUntil >
      now;

  const queuePenaltyMinutesRemaining =
    queuePenaltyActive &&
    player.queuePenaltyUntil
      ? Math.max(
          1,
          Math.ceil(
            (
              player
                .queuePenaltyUntil
                .getTime() -
              now.getTime()
            ) /
              60000
          )
        )
      : 0;

  return (
    <main className="min-h-screen bg-black px-4 py-5 text-white md:px-6">

      <PlayerHeartbeat />

      <DashboardRefresh />

      <div className="mx-auto max-w-6xl">

        {/* ============================
            HEADER
            ============================ */}
        <div className="flex flex-wrap items-start justify-between gap-3">

          <div>

            <h1 className="text-3xl font-black">
              IT WARS
            </h1>

            <p className="mt-1 text-sm text-zinc-400">
              Welcome back,{" "}
              {
                player.username
              }
            </p>

            <p className="text-xs font-semibold text-zinc-500">
              {
                roleTitle
              }
            </p>

          </div>

          <div className="flex flex-wrap items-center gap-2">

            <Link
              href="/profile"
              className="border border-zinc-700 px-3 py-2 text-sm font-bold hover:bg-zinc-900"
            >
              Profile
            </Link>

            <Link
              href="/pvp"
              className="border border-purple-700 bg-purple-950/20 px-3 py-2 text-sm font-bold text-purple-300 hover:bg-purple-950/40"
            >
              ☣ Poison Store
            </Link>

            <SignOutButton />

          </div>

        </div>

        {/* ============================
            YOUR QUEUE
            ============================ */}
        <div className="mt-4 border border-zinc-700 bg-zinc-950 p-4">

          <div className="flex flex-wrap items-start justify-between gap-4">

            <div>

              <p className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">
                Your Queue
              </p>

              <h2 className="mt-1 text-3xl font-black">
                {
                  openTickets
                }{" "}
                Open Ticket
                {
                  openTickets ===
                  1
                    ? ""
                    : "s"
                }
              </h2>

              <p className="mt-1 text-sm text-zinc-400">
                Keep the queue moving. Ticket value drops while work remains unresolved.
              </p>

              <div className="mt-3 border-t border-zinc-800 pt-3">

                <TicketTimer
                  nextTicketAt={
                    player.nextTicketAt
                  }

                  queuePenaltyActive={
                    queuePenaltyActive
                  }
                />

              </div>

            </div>

            <Link
              href="/tickets"
              className="rounded bg-white px-5 py-2.5 text-sm font-black text-black hover:bg-zinc-200"
            >
              Open Queue
            </Link>

          </div>

        </div>

        {/* ============================
            OWNERSHIP WARNING
            ============================ */}
        {queuePenaltyActive && (
          <div className="mt-3 border border-yellow-900 bg-yellow-950/20 p-4">

            <p className="text-xs uppercase tracking-wide text-yellow-500">
              Ownership Warning
            </p>

            <h2 className="mt-1 text-lg font-bold text-yellow-300">
              Your queue priority has been reduced
            </h2>

            <p className="mt-1 text-sm text-zinc-300">
              You transferred a ticket that you could have resolved.
            </p>

            <p className="mt-1 text-sm text-zinc-400">
              New tickets will arrive less frequently while this warning is active.
            </p>

            <p className="mt-2 text-sm font-bold text-yellow-400">
              Approximately{" "}
              {
                queuePenaltyMinutesRemaining
              }{" "}
              minute
              {
                queuePenaltyMinutesRemaining ===
                1
                  ? ""
                  : "s"
              }{" "}
              remaining.
            </p>

            <ClearQueuePenaltyButton />

          </div>
        )}

        {/* ============================
            CURRENT CAREER CORE
            ============================ */}
        <div className="mt-3 grid gap-3 md:grid-cols-4">

          <div className="border border-zinc-800 bg-zinc-950 p-4">

            <p className="text-xs uppercase tracking-wide text-zinc-500">
              Level
            </p>

            <p className="mt-1 text-2xl font-black">
              {
                player.level
              }
            </p>

          </div>

          <div className="border border-zinc-800 bg-zinc-950 p-4">

            <p className="text-xs uppercase tracking-wide text-zinc-500">
              Career XP
            </p>

            <p className="mt-1 text-2xl font-black">
              {
                player.xp
              }
            </p>

          </div>

          <div className="border border-zinc-800 bg-zinc-950 p-4">

            <p className="text-xs uppercase tracking-wide text-zinc-500">
              Credits
            </p>

            <p className="mt-1 text-2xl font-black">
              {
                player.credits
              }
            </p>

            <p className="text-[10px] text-zinc-500">
              CR
            </p>

          </div>

          <div className="border border-zinc-800 bg-zinc-950 p-4">

            <p className="text-xs uppercase tracking-wide text-zinc-500">
              Position
            </p>

            <p className="mt-1 text-lg font-black">
              {
                roleTitle
              }
            </p>

          </div>

        </div>

        {/* ============================
            CURRENT RUN STATS
            ============================ */}
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

          <div className="border border-zinc-800 bg-zinc-950 p-4">

            <p className="text-xs uppercase tracking-wide text-zinc-500">
              Resolved This Run
            </p>

            <p className="mt-1 text-2xl font-black text-green-400">
              {
                player
                  .careerTicketsResolved
              }
            </p>

          </div>

          <div className="border border-zinc-800 bg-zinc-950 p-4">

            <p className="text-xs uppercase tracking-wide text-zinc-500">
              Correct Bounces
            </p>

            <p className="mt-1 text-2xl font-black text-green-400">
              {
                player
                  .careerCorrectBounces
              }
            </p>

          </div>

          <div className="border border-zinc-800 bg-zinc-950 p-4">

            <p className="text-xs uppercase tracking-wide text-zinc-500">
              Wrong Bounces
            </p>

            <p className="mt-1 text-2xl font-black text-red-400">
              {
                player
                  .careerIncorrectBounces
              }
            </p>

          </div>

          <div className="border border-zinc-800 bg-zinc-950 p-4">

            <p className="text-xs uppercase tracking-wide text-zinc-500">
              Wrong Resolves
            </p>

            <p className="mt-1 text-2xl font-black text-red-400">
              {
                player
                  .careerIncorrectResolves
              }
            </p>

          </div>

        </div>

        {/* ============================
            ACTIVE PLAYERS / LEADERBOARD
            ============================ */}
        <div className="mt-3 grid gap-3 md:grid-cols-2">

          <div className="border border-zinc-800 bg-zinc-950 p-4">

            <div className="flex items-start justify-between gap-4">

              <div>

                <p className="text-xs uppercase tracking-wide text-zinc-500">
                  Active Players
                </p>

                <div className="mt-2 flex items-center gap-2">

                  <span className="h-2.5 w-2.5 rounded-full bg-green-400" />

                  <p className="text-2xl font-black">
                    {
                      activePlayers
                    }
                  </p>

                </div>

                <p className="text-xs text-zinc-500">
                  Online now
                </p>

              </div>

              <Link
                href="/players"
                className="border border-zinc-700 px-3 py-2 text-xs font-bold hover:bg-zinc-900"
              >
                View Players
              </Link>

            </div>

            <p className="mt-3 border-t border-zinc-800 pt-3 text-[11px] text-zinc-600">
              Online specialists affect which resolver teams are available.
            </p>

          </div>

          <div className="border border-zinc-800 bg-zinc-950 p-4">

            <div className="flex items-start justify-between gap-4">

              <div>

                <p className="text-xs uppercase tracking-wide text-zinc-500">
                  Leaderboard
                </p>

                {leaderboardLeader ? (
                  <>

                    <div className="mt-2 flex items-center gap-2">

                      <span className="text-xl font-black text-yellow-400">
                        #1
                      </span>

                      <p className="text-xl font-black">
                        {
                          leaderboardLeader
                            .username
                        }
                      </p>

                    </div>

                    <p className="mt-1 text-xs text-zinc-500">
                      {
                        leaderboardLeader
                          .score
                      }{" "}
                      Score
                    </p>

                  </>
                ) : (
                  <p className="mt-2 text-sm text-zinc-500">
                    No rankings yet.
                  </p>
                )}

              </div>

              <Link
                href="/leaderboard"
                className="border border-zinc-700 px-3 py-2 text-xs font-bold hover:bg-zinc-900"
              >
                View Leaderboard
              </Link>

            </div>

            <p className="mt-3 border-t border-zinc-800 pt-3 text-[11px] text-zinc-600">
              Lifetime performance, Credits, routing and PvP contribute to score.
            </p>

          </div>

        </div>

        {/* ============================
            CAREER
            ============================ */}
        <div className="mt-3 border border-zinc-800 bg-zinc-950 p-4">

          <div className="flex flex-wrap items-start justify-between gap-3">

            <div>

              <p className="text-xs uppercase tracking-wide text-zinc-500">
                Career
              </p>

              <h2 className="mt-1 text-xl font-black">
                {
                  roleTitle
                }
              </h2>

              {player.level <
                4 && (
                <p className="mt-1 text-xs text-zinc-400">
                  Reach Level 4 to choose your specialist career path.
                </p>
              )}

              {player.level >=
                4 &&
                !player.careerPath && (
                  <p className="mt-1 text-xs text-yellow-400">
                    Career specialisation available.
                  </p>
                )}

              {player.careerPath && (
                <p className="mt-1 text-xs text-zinc-400">
                  Specialist passive and active abilities are active.
                </p>
              )}

            </div>

            {player.level >=
              4 &&
              !player.careerPath && (
                <Link
                  href="/choose-career"
                  className="border border-zinc-700 px-3 py-2 text-sm font-bold hover:bg-zinc-900"
                >
                  Choose Career Path
                </Link>
              )}

          </div>

        </div>

      </div>

    </main>
  );
}