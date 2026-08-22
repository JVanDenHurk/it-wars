import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

import PlayerHeartbeat from "@/components/PlayerHeartbeat";
import PvPAttackButton from "@/components/PvPAttackButton";
import { auth } from "@/lib/auth";
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

  return (
    <main className="min-h-screen bg-black px-4 py-8 text-white md:px-8">

      <PlayerHeartbeat />

      <div className="mx-auto max-w-6xl">

        {/* ============================
            HEADER
            ============================ */}
        <div className="flex items-start justify-between gap-6">

          <div>

            <p className="text-xs font-bold uppercase tracking-[0.25em] text-purple-500">
              PvP
            </p>

            <h1 className="mt-2 text-4xl font-black">
              Queue Poisoning
            </h1>

            <p className="mt-2 max-w-2xl text-zinc-400">
              Spend Credits to inject Poison Tickets into another
              player&apos;s queue. Overwhelm their workload while
              keeping your own queue under control.
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
        <div className="mt-8 grid gap-4 md:grid-cols-2">

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
              PvP Kills
            </p>

            <p className="mt-2 text-3xl font-black">
              {player.kills}
            </p>

          </div>

        </div>

        {/* ============================
            POISON STORE
            ============================ */}
        <div className="mt-8">

          <div className="mb-4">

            <p className="text-xs font-bold uppercase tracking-[0.2em] text-purple-500">
              Poison Store
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              Choose Your Poison
            </h2>

            <p className="mt-2 max-w-2xl text-sm text-zinc-500">
              Choose an attack, then search for an online target.
              Every poison costs Credits, so spending aggressively
              can make you vulnerable too.
            </p>

          </div>

          <div className="grid gap-4 md:grid-cols-2">

            {PVP_ATTACKS.map(
              (attack) => {
                /*
                 * PvP API requires the
                 * player to retain at least
                 * 1 Credit after purchase.
                 */
                const affordable =
                  player.credits >
                  attack.cost;

                return (
                  <div
                    key={
                      attack.type
                    }
                    className="border border-zinc-800 bg-zinc-950 p-6 transition hover:border-purple-800"
                  >

                    {/* ============================
                        POISON HEADER
                        ============================ */}
                    <div className="flex items-start justify-between gap-4">

                      <div>

                        <p className="text-xs font-bold uppercase tracking-wide text-purple-500">
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
                              ? "text-purple-300"
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

                    {/* ============================
                        DESCRIPTION
                        ============================ */}
                    <p className="mt-4 text-zinc-400">
                      {
                        attack.description
                      }
                    </p>

                    {/* ============================
                        POISON DETAILS
                        ============================ */}
                    <div className="mt-5 grid grid-cols-2 gap-3">

                      <div className="border border-zinc-800 bg-black p-3">

                        <p className="text-xs uppercase tracking-wide text-zinc-600">
                          Poison Tickets
                        </p>

                        <p className="mt-1 font-bold text-purple-300">
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

                    {/* ============================
                        EFFECT
                        ============================ */}
                    <div className="mt-3 border border-purple-900/70 bg-purple-950/20 p-4">

                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-500">
                        Poison Effect
                      </p>

                      <p className="mt-2 text-sm text-zinc-300">
                        {
                          attack.effectDescription
                        }
                      </p>

                    </div>

                    {/* ============================
                        FLAVOUR TEXT
                        ============================ */}
                    <div className="mt-3 border border-purple-950 bg-purple-950/10 p-4">

                      <p className="text-sm italic text-purple-300/70">
                        {
                          attack.flavourText
                        }
                      </p>

                    </div>

                    {!affordable && (
                      <p className="mt-4 text-sm font-bold text-red-400">
                        You cannot afford this poison without spending your final Credits.
                      </p>
                    )}

                    {/* ============================
                        TARGET SELECTOR
                        ============================ */}
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