import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

import ClearQueuePenaltyButton from "@/components/ClearQueuePenaltyButton";
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
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/");
  }

  let player = await prisma.player.findUnique({
    where: {
      userId: session.user.id,
    },
  });

  if (!player) {
    player = await prisma.player.create({
      data: {
        userId: session.user.id,
        username: session.user.name,
      },
    });
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

  /*
   * ============================
   * CURRENT PLAYER STATS
   * ============================
   */
  const openTickets = await prisma.ticket.count({
    where: {
      assignedToId: player.id,
      status: "OPEN",
    },
  });

  const resolvedTickets = await prisma.ticket.count({
    where: {
      assignedToId: player.id,
      status: "RESOLVED",
    },
  });

  /*
   * ============================
   * ACTIVE PLAYERS
   * ============================
   *
   * Online requires:
   *
   * 1. Valid authentication session
   * 2. Heartbeat/activity within
   *    the last 2 minutes
   */
  const activePlayers =
    await prisma.player.findMany({
      where: {
        lastActiveAt: {
          gt: activeCutoff,
        },

        user: {
          sessions: {
            some: {
              expiresAt: {
                gt: now,
              },
            },
          },
        },
      },

      select: {
        id: true,
      },
    });

  /*
   * ============================
   * LEADERBOARD
   * ============================
   */
  const leaderboardPlayers =
    await prisma.player.findMany({
      select: {
        username: true,

        xp: true,

        lifetimeCreditsEarned: true,

        ticketsResolved: true,

        correctBounces: true,

        kills: true,

        bankruptcies: true,
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
          b.score - a.score
      );

  const leaderboardLeader =
    leaderboard[0] ?? null;

  /*
   * ============================
   * ROLE
   * ============================
   */
  const roleTitle = getRoleTitle(
    player.level,
    player.careerPath
  );

  /*
   * ============================
   * QUEUE PENALTY
   * ============================
   */
  const queuePenaltyActive =
    player.queuePenaltyUntil !== null &&
    player.queuePenaltyUntil > now;

  const queuePenaltyMinutesRemaining =
    queuePenaltyActive &&
    player.queuePenaltyUntil
      ? Math.max(
          1,
          Math.ceil(
            (
              player.queuePenaltyUntil.getTime() -
              now.getTime()
            ) /
              60000
          )
        )
      : 0;

  return (
    <main className="min-h-screen bg-black p-8 text-white">

      {/*
       * Sends a heartbeat immediately,
       * then every 60 seconds while
       * this dashboard is open.
       */}
      <PlayerHeartbeat />

      <div className="mx-auto max-w-6xl">

        {/* ============================
            HEADER
            ============================ */}
        <div className="flex items-start justify-between">

          <div>
            <h1 className="text-4xl font-black">
              IT WARS
            </h1>

            <p className="mt-2 text-zinc-400">
              Welcome back, {player.username}
            </p>

            <p className="mt-1 text-sm font-semibold text-zinc-500">
              {roleTitle}
            </p>
          </div>

          <SignOutButton />

        </div>

        {/* ============================
            CORE STATS
            ============================ */}
        <div className="mt-8 grid gap-4 md:grid-cols-4">

          <div className="border border-zinc-800 bg-zinc-950 p-5">

            <p className="text-xs uppercase tracking-wide text-zinc-500">
              Level
            </p>

            <p className="mt-2 text-3xl font-bold">
              {player.level}
            </p>

          </div>

          <div className="border border-zinc-800 bg-zinc-950 p-5">

            <p className="text-xs uppercase tracking-wide text-zinc-500">
              Career XP
            </p>

            <p className="mt-2 text-3xl font-bold">
              {player.xp}
            </p>

          </div>

          <div className="border border-zinc-800 bg-zinc-950 p-5">

            <p className="text-xs uppercase tracking-wide text-zinc-500">
              Credits
            </p>

            <p className="mt-2 text-3xl font-bold">
              {player.credits}
            </p>

            <p className="text-xs text-zinc-500">
              CR
            </p>

          </div>

          <div className="border border-zinc-800 bg-zinc-950 p-5">

            <p className="text-xs uppercase tracking-wide text-zinc-500">
              Open Tickets
            </p>

            <p className="mt-2 text-3xl font-bold">
              {openTickets}
            </p>

          </div>

        </div>

        {/* ============================
            OWNERSHIP WARNING
            ============================ */}
        {queuePenaltyActive && (
          <div className="mt-4 border border-yellow-900 bg-yellow-950/20 p-6">

            <p className="text-xs uppercase tracking-wide text-yellow-500">
              Ownership Warning
            </p>

            <h2 className="mt-2 text-xl font-bold text-yellow-300">
              Your queue priority has been reduced
            </h2>

            <p className="mt-2 text-sm text-zinc-300">
              You transferred a ticket that you could have resolved.
            </p>

            <p className="mt-2 text-sm text-zinc-400">
              New tickets will arrive less frequently while this warning is active.
            </p>

            <p className="mt-3 text-sm font-bold text-yellow-400">
              Approximately{" "}
              {queuePenaltyMinutesRemaining} minute
              {queuePenaltyMinutesRemaining === 1
                ? ""
                : "s"}{" "}
              remaining.
            </p>

            <ClearQueuePenaltyButton />

          </div>
        )}

        {/* ============================
            PVP / PERFORMANCE
            ============================ */}
        <div className="mt-4 grid gap-4 md:grid-cols-2">

          <div className="border border-zinc-800 bg-zinc-950 p-6">

            <p className="text-xs uppercase tracking-wide text-zinc-500">
              PvP Record
            </p>

            <div className="mt-4 grid grid-cols-2 gap-4">

              <div>
                <p className="text-sm text-zinc-500">
                  Kills
                </p>

                <p className="text-3xl font-bold">
                  {player.kills}
                </p>
              </div>

              <div>
                <p className="text-sm text-zinc-500">
                  Bankruptcies
                </p>

                <p className="text-3xl font-bold">
                  {player.bankruptcies}
                </p>
              </div>

            </div>

          </div>

          <div className="border border-zinc-800 bg-zinc-950 p-6">

            <p className="text-xs uppercase tracking-wide text-zinc-500">
              Ticket Performance
            </p>

            <div className="mt-4 space-y-2">

              <p>
                Resolved: {resolvedTickets}
              </p>

              <p>
                Correct Bounces:{" "}
                {player.correctBounces}
              </p>

              <p>
                Incorrect Bounces:{" "}
                {player.incorrectBounces}
              </p>

            </div>

          </div>

        </div>

        {/* ============================
            PLAYERS / LEADERBOARD
            ============================ */}
        <div className="mt-4 grid gap-4 md:grid-cols-2">

          {/* Active Players */}
          <div className="border border-zinc-800 bg-zinc-950 p-6">

            <div className="flex items-start justify-between gap-6">

              <div>

                <p className="text-xs uppercase tracking-wide text-zinc-500">
                  Active Players
                </p>

                <div className="mt-3 flex items-center gap-3">

                  <span className="h-3 w-3 rounded-full bg-green-400" />

                  <p className="text-3xl font-black">
                    {activePlayers.length}
                  </p>

                </div>

                <p className="mt-1 text-sm text-zinc-500">
                  Online now
                </p>

              </div>

              <Link
                href="/players"
                className="border border-zinc-700 px-4 py-2 text-sm font-bold hover:bg-zinc-900"
              >
                View Players
              </Link>

            </div>

            <p className="mt-5 border-t border-zinc-800 pt-4 text-xs text-zinc-600">
              Online specialist players affect which ticket types can enter the global queue.
            </p>

          </div>

          {/* Leaderboard */}
          <div className="border border-zinc-800 bg-zinc-950 p-6">

            <div className="flex items-start justify-between gap-6">

              <div>

                <p className="text-xs uppercase tracking-wide text-zinc-500">
                  Leaderboard
                </p>

                {leaderboardLeader ? (
                  <>
                    <div className="mt-3 flex items-center gap-3">

                      <span className="text-2xl font-black text-yellow-400">
                        #1
                      </span>

                      <p className="text-2xl font-black">
                        {
                          leaderboardLeader.username
                        }
                      </p>

                    </div>

                    <p className="mt-2 text-sm text-zinc-500">
                      {
                        leaderboardLeader.score
                      }{" "}
                      Score
                    </p>
                  </>
                ) : (
                  <p className="mt-3 text-zinc-500">
                    No rankings yet.
                  </p>
                )}

              </div>

              <Link
                href="/leaderboard"
                className="border border-zinc-700 px-4 py-2 text-sm font-bold hover:bg-zinc-900"
              >
                View Leaderboard
              </Link>

            </div>

            <p className="mt-5 border-t border-zinc-800 pt-4 text-xs text-zinc-600">
              Earn score from XP, resolved tickets, correct routing, credits and PvP.
            </p>

          </div>

        </div>

        {/* ============================
            QUEUE
            ============================ */}
        <div className="mt-4 border border-zinc-800 bg-zinc-950 p-6">

          <div className="flex items-start justify-between gap-6">

            <div>

              <p className="text-xs uppercase tracking-wide text-zinc-500">
                Your Queue
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                {openTickets} Open Ticket
                {openTickets === 1
                  ? ""
                  : "s"}
              </h2>

              <p className="mt-2 text-zinc-400">
                Ticket value decreases while it remains in your queue.
              </p>

              <div className="mt-5 border-t border-zinc-800 pt-4">

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
              className="rounded bg-white px-5 py-3 font-bold text-black hover:bg-zinc-200"
            >
              Open Queue
            </Link>

          </div>

        </div>

        {/* ============================
            CAREER
            ============================ */}
        <div className="mt-4 border border-zinc-800 bg-zinc-950 p-6">

          <p className="text-xs uppercase tracking-wide text-zinc-500">
            Career
          </p>

          <h2 className="mt-2 text-2xl font-bold">
            {roleTitle}
          </h2>

          {player.level < 4 && (
            <p className="mt-2 text-sm text-zinc-400">
              Reach Level 4 to choose your specialist career path.
            </p>
          )}

          {player.level >= 4 &&
            !player.careerPath && (
              <div className="mt-4">

                <p className="text-sm text-yellow-400">
                  Career specialisation available.
                </p>

                <Link
                  href="/choose-career"
                  className="mt-3 inline-block border border-zinc-700 px-4 py-2 font-bold hover:bg-zinc-900"
                >
                  Choose Career Path
                </Link>

              </div>
            )}

        </div>

      </div>
    </main>
  );
}