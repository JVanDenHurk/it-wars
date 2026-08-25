import Link from "next/link";

import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";

export default async function AdminPlayersPage() {
  /*
   * ============================
   * ADMIN AUTH
   * ============================
   */
  await requireAdmin();

  /*
   * ============================
   * ACTIVE PLAYER CUTOFF
   * ============================
   */
  const now = new Date();

  const activeCutoff = new Date(
    now.getTime() - 2 * 60 * 1000
  );

  /*
   * ============================
   * LOAD USERS
   * ============================
   */
  const users = await prisma.user.findMany({
    include: {
      player: {
        select: {
          id: true,
          username: true,
          level: true,
          xp: true,
          careerPath: true,
          credits: true,
          ticketsResolved: true,
          kills: true,
          bankruptcies: true,
          lastActiveAt: true,
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  /*
   * ============================
   * SUMMARY
   * ============================
   */
  const totalAccounts = users.length;

  const onlinePlayers = users.filter((user) => {
    if (!user.player) {
      return false;
    }

    return user.player.lastActiveAt > activeCutoff;
  }).length;

  const bannedAccounts = users.filter(
    (user) => user.banned === true
  ).length;

  return (
    <main className="min-h-screen bg-black px-4 py-6 text-white md:px-6">
      <div className="mx-auto max-w-7xl">

        {/* ============================
            HEADER
            ============================ */}
        <div className="flex flex-wrap items-start justify-between gap-4">

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-500">
              Administration
            </p>

            <h1 className="mt-2 text-4xl font-black">
              Players
            </h1>

            <p className="mt-2 text-sm text-zinc-400">
              Player accounts and current game state.
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
            className="bg-white px-4 py-2 text-sm font-black text-black"
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
            className="border border-purple-800 px-4 py-2 text-sm font-bold text-purple-300 hover:bg-purple-950/30"
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
        <div className="mt-6 grid grid-cols-3 gap-3">

          {/* ACCOUNTS */}
          <div className="border border-zinc-800 bg-zinc-950 p-4">

            <p className="text-xs uppercase tracking-wide text-zinc-500">
              Accounts
            </p>

            <p className="mt-1 text-2xl font-black">
              {totalAccounts}
            </p>

          </div>

          {/* ONLINE */}
          <div className="border border-green-900 bg-green-950/10 p-4">

            <p className="text-xs uppercase tracking-wide text-green-500">
              Online
            </p>

            <p className="mt-1 text-2xl font-black text-green-400">
              {onlinePlayers}
            </p>

          </div>

          {/* BANNED */}
          <div className="border border-red-900 bg-red-950/10 p-4">

            <p className="text-xs uppercase tracking-wide text-red-500">
              Banned
            </p>

            <p className="mt-1 text-2xl font-black text-red-400">
              {bannedAccounts}
            </p>

          </div>

        </div>

        {/* ============================
            PLAYERS TABLE
            ============================ */}
        <div className="mt-4 overflow-x-auto border border-zinc-800">

          <table className="w-full min-w-[1200px] text-left text-sm">

            <thead className="border-b border-zinc-800 bg-zinc-950 text-xs uppercase tracking-wide text-zinc-500">

              <tr>

                <th className="px-4 py-3">
                  Username
                </th>

                <th className="px-4 py-3">
                  Email
                </th>

                <th className="px-4 py-3">
                  Role
                </th>

                <th className="px-4 py-3">
                  Level
                </th>

                <th className="px-4 py-3">
                  Career
                </th>

                <th className="px-4 py-3">
                  XP
                </th>

                <th className="px-4 py-3">
                  Credits
                </th>

                <th className="px-4 py-3">
                  Resolved
                </th>

                <th className="px-4 py-3">
                  Kills
                </th>

                <th className="px-4 py-3">
                  Bankruptcies
                </th>

                <th className="px-4 py-3">
                  Status
                </th>

                <th className="px-4 py-3">
                  Online
                </th>

                <th className="px-4 py-3 text-right">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {users.map((user) => {
                const player = user.player;

                const online =
                  player !== null &&
                  player.lastActiveAt > activeCutoff;

                return (
                  <tr
                    key={user.id}
                    className="border-b border-zinc-900 last:border-b-0 hover:bg-zinc-950"
                  >

                    {/* USERNAME */}
                    <td className="px-4 py-3 font-bold">

                      {player?.username ?? user.name}

                    </td>

                    {/* EMAIL */}
                    <td className="px-4 py-3 text-zinc-500">

                      {user.email}

                    </td>

                    {/* ROLE */}
                    <td className="px-4 py-3">

                      {user.role === "admin" ? (
                        <span className="border border-red-800 bg-red-950/20 px-2 py-1 text-xs font-black text-red-300">
                          ADMIN
                        </span>
                      ) : (
                        <span className="text-zinc-400">
                          USER
                        </span>
                      )}

                    </td>

                    {/* LEVEL */}
                    <td className="px-4 py-3">

                      {player?.level ?? "-"}

                    </td>

                    {/* CAREER */}
                    <td className="px-4 py-3">

                      {player
                        ? player.careerPath ?? "SERVICE DESK"
                        : "-"}

                    </td>

                    {/* XP */}
                    <td className="px-4 py-3">

                      {player?.xp ?? "-"}

                    </td>

                    {/* CREDITS */}
                    <td className="px-4 py-3 font-bold">

                      {player
                        ? `${player.credits} CR`
                        : "-"}

                    </td>

                    {/* RESOLVED */}
                    <td className="px-4 py-3">

                      {player?.ticketsResolved ?? "-"}

                    </td>

                    {/* KILLS */}
                    <td className="px-4 py-3">

                      {player?.kills ?? "-"}

                    </td>

                    {/* BANKRUPTCIES */}
                    <td className="px-4 py-3">

                      {player?.bankruptcies ?? "-"}

                    </td>

                    {/* ACCOUNT STATUS */}
                    <td className="px-4 py-3">

                      {user.banned ? (
                        <span className="font-bold text-red-400">
                          BANNED
                        </span>
                      ) : (
                        <span className="font-bold text-green-400">
                          ACTIVE
                        </span>
                      )}

                    </td>

                    {/* ONLINE STATUS */}
                    <td className="px-4 py-3">

                      {online ? (
                        <span className="flex items-center gap-2 text-green-400">

                          <span className="h-2 w-2 rounded-full bg-green-400" />

                          Online

                        </span>
                      ) : (
                        <span className="text-zinc-600">
                          Offline
                        </span>
                      )}

                    </td>

                    {/* ACTION */}
                    <td className="px-4 py-3 text-right">

                      <Link
                        href={`/admin/players/${user.id}`}
                        className="inline-block border border-zinc-700 px-3 py-2 text-xs font-bold hover:bg-zinc-900"
                      >
                        Manage
                      </Link>

                    </td>

                  </tr>
                );
              })}

            </tbody>

          </table>

        </div>

      </div>
    </main>
  );
}