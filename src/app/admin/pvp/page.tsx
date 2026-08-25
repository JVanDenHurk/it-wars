import Link from "next/link";

import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";

function formatAttackType(
  type: string
) {
  return type.replaceAll(
    "_",
    " "
  );
}

function formatDate(
  date: Date | null
) {
  if (!date) {
    return "—";
  }

  return date.toLocaleString(
    "en-AU",
    {
      dateStyle:
        "medium",

      timeStyle:
        "short",
    }
  );
}

function getStatusClasses(
  status: string
) {
  switch (status) {
    case "ACTIVE":
      return "text-purple-400";

    case "COMPLETED":
      return "text-green-400";

    case "CANCELLED":
      return "text-red-400";

    default:
      return "text-zinc-400";
  }
}

export default async function AdminPvPPage() {
  /*
   * ============================
   * ADMIN AUTH
   * ============================
   */
  await requireAdmin();

  /*
   * ============================
   * LOAD ATTACKS
   * ============================
   */
  const attacks =
    await prisma.pvPAttack.findMany({
      include: {
        attacker: {
          select: {
            id:
              true,

            userId:
              true,

            username:
              true,
          },
        },

        target: {
          select: {
            id:
              true,

            userId:
              true,

            username:
              true,
          },
        },

        tickets: {
          select: {
            id:
              true,

            status:
              true,

            isPoison:
              true,

            poisonEffect:
              true,
          },
        },
      },

      orderBy: {
        createdAt:
          "desc",
      },

      take:
        250,
    });

  /*
   * ============================
   * SUMMARY
   * ============================
   */
  const activeCount =
    attacks.filter(
      (attack) =>
        attack.status ===
        "ACTIVE"
    ).length;

  const completedCount =
    attacks.filter(
      (attack) =>
        attack.status ===
        "COMPLETED"
    ).length;

  const cancelledCount =
    attacks.filter(
      (attack) =>
        attack.status ===
        "CANCELLED"
    ).length;

  const bankruptcyCount =
    attacks.filter(
      (attack) =>
        attack.causedBankruptcy
    ).length;

  const totalCreditsSpent =
    attacks.reduce(
      (
        total,
        attack
      ) =>
        total +
        attack.cost,
      0
    );

  return (
    <main className="min-h-screen bg-black px-4 py-6 text-white md:px-6">

      <div className="mx-auto max-w-[1600px]">

        {/* ============================
            HEADER
            ============================ */}
        <div className="flex flex-wrap items-start justify-between gap-4">

          <div>

            <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-500">
              Administration
            </p>

            <h1 className="mt-2 text-4xl font-black">
              PvP
            </h1>

            <p className="mt-2 text-sm text-zinc-400">
              Monitor Poison attacks, attackers, victims and outcomes.
            </p>

          </div>

          <div className="flex flex-wrap gap-2">

            <Link
              href="/admin"
              className="border border-zinc-700 px-4 py-2 text-sm font-bold hover:bg-zinc-900"
            >
              Admin Home
            </Link>

            <Link
              href="/dashboard"
              className="border border-zinc-700 px-4 py-2 text-sm font-bold hover:bg-zinc-900"
            >
              Back to Game
            </Link>

          </div>

        </div>

        {/* ============================
            ADMIN NAV
            ============================ */}
        <div className="mt-6 flex flex-wrap gap-2">

          <Link
            href="/admin"
            className="border border-zinc-700 px-4 py-2 text-sm font-bold hover:bg-zinc-900"
          >
            Overview
          </Link>

          <Link
            href="/admin/players"
            className="border border-zinc-700 px-4 py-2 text-sm font-bold hover:bg-zinc-900"
          >
            Players
          </Link>

          <Link
            href="/admin/tickets"
            className="border border-zinc-700 px-4 py-2 text-sm font-bold hover:bg-zinc-900"
          >
            Tickets
          </Link>

          <Link
            href="/admin/pvp"
            className="bg-purple-300 px-4 py-2 text-sm font-black text-black"
          >
            PvP
          </Link>

          <Link
            href="/admin/templates"
            className="border border-zinc-700 px-4 py-2 text-sm font-bold hover:bg-zinc-900"
          >
            Templates
          </Link>

          <Link
            href="/admin/feedback"
            className="border border-blue-800 px-4 py-2 text-sm font-bold text-blue-300 hover:bg-blue-950/30"
          >
            Feedback
          </Link>

        </div>

        {/* ============================
            SUMMARY
            ============================ */}
        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-5">

          <div className="border border-purple-900 bg-purple-950/10 p-4">

            <p className="text-xs uppercase tracking-wide text-purple-500">
              Active
            </p>

            <p className="mt-1 text-2xl font-black text-purple-300">
              {
                activeCount
              }
            </p>

          </div>

          <div className="border border-green-900 bg-green-950/10 p-4">

            <p className="text-xs uppercase tracking-wide text-green-500">
              Completed
            </p>

            <p className="mt-1 text-2xl font-black text-green-300">
              {
                completedCount
              }
            </p>

          </div>

          <div className="border border-red-900 bg-red-950/10 p-4">

            <p className="text-xs uppercase tracking-wide text-red-500">
              Cancelled
            </p>

            <p className="mt-1 text-2xl font-black text-red-300">
              {
                cancelledCount
              }
            </p>

          </div>

          <div className="border border-red-900 bg-red-950/10 p-4">

            <p className="text-xs uppercase tracking-wide text-red-500">
              Bankruptcies
            </p>

            <p className="mt-1 text-2xl font-black text-red-300">
              {
                bankruptcyCount
              }
            </p>

          </div>

          <div className="border border-zinc-800 bg-zinc-950 p-4">

            <p className="text-xs uppercase tracking-wide text-zinc-500">
              Credits Spent
            </p>

            <p className="mt-1 text-2xl font-black">
              {
                totalCreditsSpent
              }{" "}
              CR
            </p>

          </div>

        </div>

        {/* ============================
            TABLE INFO
            ============================ */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">

          <p className="text-xs text-zinc-500">
            Showing the most recent{" "}
            <span className="font-bold text-white">
              {
                attacks.length
              }
            </span>{" "}
            attacks.
          </p>

          <p className="text-xs text-zinc-600">
            Click View to inspect the attack and generated Poison Tickets.
          </p>

        </div>

        {/* ============================
            ATTACK TABLE
            ============================ */}
        <div className="mt-3 overflow-x-auto border border-zinc-800">

          <table className="w-full min-w-[1450px] text-left text-sm">

            <thead className="border-b border-zinc-800 bg-zinc-950">

              <tr className="text-xs uppercase tracking-wide text-zinc-500">

                <th className="px-4 py-3">
                  Attack
                </th>

                <th className="px-4 py-3">
                  Type
                </th>

                <th className="px-4 py-3">
                  Attacker
                </th>

                <th className="px-4 py-3">
                  Target
                </th>

                <th className="px-4 py-3">
                  Cost
                </th>

                <th className="px-4 py-3">
                  Tickets
                </th>

                <th className="px-4 py-3">
                  Poison Effect
                </th>

                <th className="px-4 py-3">
                  Bankruptcy
                </th>

                <th className="px-4 py-3">
                  Status
                </th>

                <th className="px-4 py-3">
                  Created
                </th>

                <th className="px-4 py-3">
                  Completed
                </th>

                <th className="px-4 py-3 text-right">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {attacks.length ===
                0 && (
                <tr>

                  <td
                    colSpan={12}
                    className="px-4 py-10 text-center text-zinc-500"
                  >
                    No PvP attacks found.
                  </td>

                </tr>
              )}

              {attacks.map(
                (attack) => {
                  const poisonTickets =
                    attack.tickets.filter(
                      (ticket) =>
                        ticket.isPoison
                    );

                  const poisonEffects =
                    Array.from(
                      new Set(
                        poisonTickets.map(
                          (ticket) =>
                            ticket.poisonEffect
                        )
                      )
                    );

                  return (
                    <tr
                      key={
                        attack.id
                      }
                      className="border-b border-zinc-900 bg-purple-950/5 last:border-b-0 hover:bg-purple-950/10"
                    >

                      {/* ATTACK ID */}
                      <td className="whitespace-nowrap px-4 py-3">

                        <span className="font-mono text-xs font-black text-purple-300">
                          #
                          {
                            attack.id
                          }
                        </span>

                      </td>

                      {/* TYPE */}
                      <td className="max-w-[260px] px-4 py-3">

                        <p className="truncate font-bold text-purple-200">
                          {formatAttackType(
                            attack.type
                          )}
                        </p>

                      </td>

                      {/* ATTACKER */}
                      <td className="whitespace-nowrap px-4 py-3">

                        <Link
                          href={`/admin/players/${attack.attacker.userId}`}
                          className="font-bold text-purple-300 hover:text-purple-200 hover:underline"
                        >
                          {
                            attack
                              .attacker
                              .username
                          }
                        </Link>

                      </td>

                      {/* TARGET */}
                      <td className="whitespace-nowrap px-4 py-3">

                        <Link
                          href={`/admin/players/${attack.target.userId}`}
                          className="font-bold text-zinc-300 hover:text-white hover:underline"
                        >
                          {
                            attack
                              .target
                              .username
                          }
                        </Link>

                      </td>

                      {/* COST */}
                      <td className="whitespace-nowrap px-4 py-3 font-bold">

                        {
                          attack.cost
                        }{" "}
                        CR

                      </td>

                      {/* TICKETS */}
                      <td className="px-4 py-3">

                        <span
                          className={
                            poisonTickets.length >
                            0
                              ? "font-bold text-purple-400"
                              : "text-zinc-600"
                          }
                        >
                          {
                            poisonTickets.length
                          }
                        </span>

                      </td>

                      {/* POISON EFFECT */}
                      <td className="max-w-[240px] px-4 py-3">

                        {poisonEffects.length >
                        0 ? (
                          <div className="space-y-1">

                            {poisonEffects.map(
                              (effect) => (
                                <p
                                  key={
                                    effect
                                  }
                                  className="truncate text-xs font-bold text-purple-400"
                                >
                                  {formatAttackType(
                                    effect
                                  )}
                                </p>
                              )
                            )}

                          </div>
                        ) : (
                          <span className="text-zinc-700">
                            —
                          </span>
                        )}

                      </td>

                      {/* BANKRUPTCY */}
                      <td className="px-4 py-3">

                        {attack.causedBankruptcy ? (
                          <span className="font-black text-red-400">
                            YES
                          </span>
                        ) : (
                          <span className="text-zinc-600">
                            No
                          </span>
                        )}

                      </td>

                      {/* STATUS */}
                      <td className="whitespace-nowrap px-4 py-3">

                        <span
                          className={`text-xs font-black ${getStatusClasses(
                            attack.status
                          )}`}
                        >
                          {
                            attack.status
                          }
                        </span>

                      </td>

                      {/* CREATED */}
                      <td className="whitespace-nowrap px-4 py-3 text-xs text-zinc-500">

                        {formatDate(
                          attack.createdAt
                        )}

                      </td>

                      {/* COMPLETED */}
                      <td className="whitespace-nowrap px-4 py-3 text-xs text-zinc-500">

                        {formatDate(
                          attack.completedAt
                        )}

                      </td>

                      {/* ACTION */}
                      <td className="whitespace-nowrap px-4 py-3 text-right">

                        <Link
                          href={`/admin/pvp/${attack.id}`}
                          className="inline-block border border-purple-800 px-3 py-2 text-xs font-bold text-purple-300 hover:bg-purple-950/30"
                        >
                          View
                        </Link>

                      </td>

                    </tr>
                  );
                }
              )}

            </tbody>

          </table>

        </div>

      </div>

    </main>
  );
}