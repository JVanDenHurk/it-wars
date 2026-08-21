import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

import PlayerHeartbeat from "@/components/PlayerHeartbeat";
import PvPAttackButton from "@/components/PvPAttackButton";
import { auth } from "@/lib/auth";
import { getRoleTitle } from "@/lib/player-level";
import { prisma } from "@/lib/prisma";
import {
    PVP_ATTACKS,
} from "@/lib/pvp-attacks";

export default async function PvPPage() {
  const session =
    await auth.api.getSession({
      headers: await headers(),
    });

  if (!session) {
    redirect("/");
  }

  const player =
    await prisma.player.findUnique({
      where: {
        userId:
          session.user.id,
      },
    });

  if (!player) {
    redirect("/dashboard");
  }

  const now =
    new Date();

  const activeCutoff =
    new Date(
      now.getTime() -
        2 * 60 * 1000
    );

  /*
   * ============================
   * ONLINE TARGETS
   * ============================
   */
  const targets =
    await prisma.player.findMany({
      where: {
        id: {
          not:
            player.id,
        },

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

      select: {
        id: true,
        username: true,

        level: true,
        careerPath: true,

        credits: true,

        assignedTickets: {
          where: {
            status:
              "OPEN",
          },

          select: {
            id: true,
          },
        },
      },

      orderBy: {
        username:
          "asc",
      },
    });

  /*
   * Convert Prisma target data into
   * the shape expected by the client
   * attack button.
   */
  const targetOptions =
    targets.map(
      (target) => ({
        id:
          target.id,

        username:
          target.username,

        level:
          target.level,

        careerPath:
          target.careerPath,

        credits:
          target.credits,

        queueSize:
          target.assignedTickets.length,
      })
    );

  return (
    <main className="min-h-screen bg-black p-8 text-white">

      <PlayerHeartbeat />

      <div className="mx-auto max-w-6xl">

        {/* ============================
            HEADER
            ============================ */}
        <div className="flex items-start justify-between gap-6">

          <div>

            <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-500">
              PvP
            </p>

            <h1 className="mt-2 text-4xl font-black">
              Queue Warfare
            </h1>

            <p className="mt-2 max-w-2xl text-zinc-400">
              Spend Credits to poison another player&apos;s queue.
              Pick your victim carefully — every attack costs you
              survival money too.
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
            PLAYER SUMMARY
            ============================ */}
        <div className="mt-8 grid gap-4 md:grid-cols-3">

          <div className="border border-zinc-800 bg-zinc-950 p-5">

            <p className="text-xs uppercase tracking-wide text-zinc-500">
              Your Credits
            </p>

            <p className="mt-2 text-3xl font-black">
              {player.credits}
            </p>

            <p className="text-xs text-zinc-500">
              CR
            </p>

          </div>

          <div className="border border-zinc-800 bg-zinc-950 p-5">

            <p className="text-xs uppercase tracking-wide text-zinc-500">
              Online Targets
            </p>

            <p className="mt-2 text-3xl font-black">
              {targets.length}
            </p>

          </div>

          <div className="border border-zinc-800 bg-zinc-950 p-5">

            <p className="text-xs uppercase tracking-wide text-zinc-500">
              PvP Kills
            </p>

            <p className="mt-2 text-3xl font-black">
              {player.kills}
            </p>

          </div>

        </div>

        {/* ============================
            TARGETS
            ============================ */}
        <div className="mt-4 border border-zinc-800 bg-zinc-950 p-6">

          <p className="text-xs uppercase tracking-wide text-zinc-500">
            Potential Victims
          </p>

          <h2 className="mt-2 text-2xl font-bold">
            Online Players
          </h2>

          {targets.length === 0 ? (
            <div className="mt-5 border border-zinc-800 bg-black p-5 text-sm text-zinc-500">
              Nobody else is online right now. Your coworkers have escaped.
            </div>
          ) : (
            <div className="mt-5 grid gap-3 md:grid-cols-2">

              {targets.map((target) => {
                const role =
                  getRoleTitle(
                    target.level,
                    target.careerPath
                  );

                const queueSize =
                  target.assignedTickets.length;

                return (
                  <div
                    key={
                      target.id
                    }
                    className="border border-zinc-800 bg-black p-4"
                  >

                    <div className="flex items-start justify-between gap-4">

                      <div className="min-w-0">

                        <div className="flex items-center gap-2">

                          <span className="h-2 w-2 rounded-full bg-green-400" />

                          <p className="truncate font-bold">
                            {
                              target.username
                            }
                          </p>

                        </div>

                        <p className="mt-1 text-sm text-zinc-500">
                          {role}
                        </p>

                      </div>

                      <div className="text-right">

                        <p className="text-xs uppercase tracking-wide text-zinc-600">
                          Credits
                        </p>

                        <p
                          className={`mt-1 font-bold ${
                            target.credits <= 300
                              ? "text-red-400"
                              : "text-zinc-300"
                          }`}
                        >
                          {
                            target.credits
                          }{" "}
                          CR
                        </p>

                      </div>

                    </div>

                    <div className="mt-4 border-t border-zinc-900 pt-4">

                      <p className="text-xs uppercase tracking-wide text-zinc-600">
                        Queue
                      </p>

                      <p
                        className={`mt-1 text-xl font-black ${
                          queueSize >= 8
                            ? "text-red-400"
                            : queueSize >= 4
                              ? "text-yellow-400"
                              : "text-zinc-300"
                        }`}
                      >
                        {
                          queueSize
                        }
                      </p>

                    </div>

                  </div>
                );
              })}

            </div>
          )}

        </div>

        {/* ============================
            ATTACK STORE
            ============================ */}
        <div className="mt-4">

          <div className="mb-4">

            <p className="text-xs uppercase tracking-wide text-zinc-500">
              Attack Store
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              Choose Your Weapon
            </h2>

            <p className="mt-2 text-sm text-zinc-500">
              Spend carefully. Those Credits are also keeping your own career alive.
            </p>

          </div>

          <div className="grid gap-4 md:grid-cols-2">

            {PVP_ATTACKS.map(
              (attack) => {
                const affordable =
                  player.credits >=
                  attack.cost;

                return (
                  <div
                    key={
                      attack.type
                    }
                    className="border border-zinc-800 bg-zinc-950 p-6"
                  >

                    <div className="flex items-start justify-between gap-4">

                      <div>

                        <p className="text-xs font-bold uppercase tracking-wide text-red-500">
                          {attack.type.replaceAll(
                            "_",
                            " "
                          )}
                        </p>

                        <h3 className="mt-2 text-2xl font-black">
                          {
                            attack.name
                          }
                        </h3>

                      </div>

                      <div className="shrink-0 text-right">

                        <p
                          className={`text-xl font-black ${
                            affordable
                              ? "text-white"
                              : "text-red-400"
                          }`}
                        >
                          {
                            attack.cost
                          }{" "}
                          CR
                        </p>

                      </div>

                    </div>

                    <p className="mt-4 text-zinc-400">
                      {
                        attack.description
                      }
                    </p>

                    <div className="mt-5 grid grid-cols-2 gap-3">

                      <div className="border border-zinc-800 bg-black p-3">

                        <p className="text-xs uppercase tracking-wide text-zinc-600">
                          Tickets
                        </p>

                        <p className="mt-1 font-bold">
                          {
                            attack.ticketCount
                          }
                        </p>

                      </div>

                      <div className="border border-zinc-800 bg-black p-3">

                        <p className="text-xs uppercase tracking-wide text-zinc-600">
                          Severity
                        </p>

                        <p className="mt-1 font-bold">
                          {
                            attack.severity
                          }
                        </p>

                      </div>

                    </div>

                    <div className="mt-5 border border-zinc-800 bg-black p-4">

                      <p className="text-sm italic text-zinc-500">
                        {
                          attack.flavourText
                        }
                      </p>

                    </div>

                    {/*
                     * ============================
                     * ATTACK CONTROL
                     * ============================
                     */}
                    <PvPAttackButton
                      attackType={
                        attack.type
                      }
                      attackName={
                        attack.name
                      }
                      attackCost={
                        attack.cost
                      }
                      playerCredits={
                        player.credits
                      }
                      targets={
                        targetOptions
                      }
                    />

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