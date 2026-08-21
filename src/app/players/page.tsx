import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

import PlayerHeartbeat from "@/components/PlayerHeartbeat";
import { auth } from "@/lib/auth";
import { getRoleTitle } from "@/lib/player-level";
import { prisma } from "@/lib/prisma";

export default async function PlayersPage() {
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

  const players = await prisma.player.findMany({
    select: {
      id: true,
      userId: true,
      username: true,

      level: true,
      careerPath: true,

      credits: true,
      xp: true,

      lastActiveAt: true,

      ticketsResolved: true,
      correctBounces: true,
      incorrectBounces: true,

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

  const playerList = players
    .map((player) => {
      /*
       * Online requires:
       *
       * 1. Valid authentication session
       * 2. Recent heartbeat/activity
       */
      const hasValidSession =
        player.user.sessions.length > 0;

      const recentlyActive =
        player.lastActiveAt >
        activeCutoff;

      return {
        ...player,

        online:
          hasValidSession &&
          recentlyActive,

        queueSize:
          player.assignedTickets.length,
      };
    })
    .sort((a, b) => {
      /*
       * Online players first.
       */
      if (a.online !== b.online) {
        return a.online ? -1 : 1;
      }

      /*
       * Then alphabetical.
       */
      return a.username.localeCompare(
        b.username
      );
    });

  const onlineCount =
    playerList.filter(
      (player) =>
        player.online
    ).length;

  return (
    <main className="min-h-screen bg-black p-8 text-white">

      {/*
       * Keep the current player active
       * while they are on this page too.
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
              Players
            </h1>

            <p className="mt-2 text-zinc-400">
              See who is online, what team they belong to,
              and how much work is currently ruining their day.
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

          <div className="border border-zinc-800 bg-zinc-950 p-5">

            <p className="text-xs uppercase tracking-wide text-zinc-500">
              Players
            </p>

            <p className="mt-2 text-3xl font-black">
              {playerList.length}
            </p>

          </div>

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

          <div className="border border-zinc-800 bg-zinc-950 p-5">

            <p className="text-xs uppercase tracking-wide text-zinc-500">
              Offline
            </p>

            <p className="mt-2 text-3xl font-black">
              {
                playerList.length -
                onlineCount
              }
            </p>

          </div>

        </div>

        {/* ============================
            PLAYER LIST
            ============================ */}
        <div className="mt-4 border border-zinc-800 bg-zinc-950">

          <div className="border-b border-zinc-800 p-6">

            <p className="text-xs uppercase tracking-wide text-zinc-500">
              IT Department
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              Player Directory
            </h2>

          </div>

          {playerList.length === 0 && (
            <div className="p-8 text-center text-zinc-500">
              Nobody has joined yet.
            </div>
          )}

          <div className="divide-y divide-zinc-800">

            {playerList.map(
              (listedPlayer) => {
                const role =
                  getRoleTitle(
                    listedPlayer.level,
                    listedPlayer.careerPath
                  );

                const isCurrentPlayer =
                  listedPlayer.userId ===
                  session.user.id;

                return (
                  <div
                    key={
                      listedPlayer.id
                    }
                    className={`p-5 ${
                      isCurrentPlayer
                        ? "bg-zinc-900/60"
                        : ""
                    }`}
                  >

                    <div className="flex flex-col gap-5 md:flex-row md:items-center">

                      {/* PLAYER */}
                      <div className="min-w-0 flex-1">

                        <div className="flex items-center gap-3">

                          <span
                            className={`h-2.5 w-2.5 shrink-0 rounded-full ${
                              listedPlayer.online
                                ? "bg-green-400"
                                : "bg-zinc-700"
                            }`}
                          />

                          <p className="truncate text-lg font-bold">
                            {
                              listedPlayer.username
                            }
                          </p>

                          {isCurrentPlayer && (
                            <span className="text-xs font-bold uppercase tracking-wide text-zinc-600">
                              You
                            </span>
                          )}

                        </div>

                        <p className="mt-1 text-sm text-zinc-500">
                          {role}
                        </p>

                      </div>

                      {/* LEVEL */}
                      <div className="min-w-20">

                        <p className="text-xs uppercase tracking-wide text-zinc-600">
                          Level
                        </p>

                        <p className="mt-1 font-bold">
                          {
                            listedPlayer.level
                          }
                        </p>

                      </div>

                      {/* XP */}
                      <div className="min-w-24">

                        <p className="text-xs uppercase tracking-wide text-zinc-600">
                          XP
                        </p>

                        <p className="mt-1 font-bold">
                          {
                            listedPlayer.xp
                          }
                        </p>

                      </div>

                      {/* QUEUE */}
                      <div className="min-w-24">

                        <p className="text-xs uppercase tracking-wide text-zinc-600">
                          Queue
                        </p>

                        <p
                          className={`mt-1 font-bold ${
                            listedPlayer.queueSize >= 10
                              ? "text-red-400"
                              : listedPlayer.queueSize >= 5
                                ? "text-yellow-400"
                                : "text-zinc-300"
                          }`}
                        >
                          {
                            listedPlayer.queueSize
                          }
                        </p>

                      </div>

                      {/* CREDITS */}
                      <div className="min-w-28">

                        <p className="text-xs uppercase tracking-wide text-zinc-600">
                          Credits
                        </p>

                        <p
                          className={`mt-1 font-bold ${
                            listedPlayer.credits <= 250
                              ? "text-red-400"
                              : "text-zinc-300"
                          }`}
                        >
                          {
                            listedPlayer.credits
                          }{" "}
                          CR
                        </p>

                      </div>

                      {/* STATUS */}
                      <div className="min-w-24 text-right">

                        <span
                          className={`inline-block border px-3 py-1 text-xs font-bold ${
                            listedPlayer.online
                              ? "border-green-900 bg-green-950/20 text-green-400"
                              : "border-zinc-800 bg-black text-zinc-600"
                          }`}
                        >
                          {listedPlayer.online
                            ? "ONLINE"
                            : "OFFLINE"}
                        </span>

                      </div>

                    </div>

                    {/* EXTRA STATS */}
                    <div className="mt-4 grid grid-cols-3 gap-3 border-t border-zinc-900 pt-4 text-sm">

                      <div>
                        <p className="text-xs text-zinc-600">
                          Resolved
                        </p>

                        <p className="font-bold text-zinc-300">
                          {
                            listedPlayer.ticketsResolved
                          }
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-zinc-600">
                          Correct Routes
                        </p>

                        <p className="font-bold text-zinc-300">
                          {
                            listedPlayer.correctBounces
                          }
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-zinc-600">
                          Bad Routes
                        </p>

                        <p className="font-bold text-zinc-300">
                          {
                            listedPlayer.incorrectBounces
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

      </div>
    </main>
  );
}