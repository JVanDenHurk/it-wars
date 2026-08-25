import Link from "next/link";

import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";

export default async function AdminPage() {
  /*
   * ============================
   * ADMIN AUTH
   * ============================
   */
  const adminUser =
    await requireAdmin();

  /*
   * ============================
   * TIME
   * ============================
   */
  const now =
    new Date();

  const activeCutoff =
    new Date(
      now.getTime() -
        2 * 60 * 1000
    );

  /*
   * ============================
   * ADMIN DASHBOARD DATA
   * ============================
   */
  const [
    totalPlayers,
    activePlayers,
    openTickets,
    activePvPAttacks,
    bannedUsers,
    ticketTemplates,
    newFeedback,
  ] =
    await Promise.all([
      prisma.player.count(),

      prisma.player.count({
        where: {
          lastActiveAt: {
            gt:
              activeCutoff,
          },
        },
      }),

      prisma.ticket.count({
        where: {
          status:
            "OPEN",
        },
      }),

      prisma.pvPAttack.count({
        where: {
          status:
            "ACTIVE",
        },
      }),

      prisma.user.count({
        where: {
          banned:
            true,
        },
      }),

      prisma.ticketTemplate.count({
        where: {
          active:
            true,
        },
      }),

      prisma.feedback.count({
        where: {
          status:
            "NEW",
        },
      }),
    ]);

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
              IT WARS Admin
            </h1>

            <p className="mt-2 text-sm text-zinc-400">
              Logged in as{" "}
              <span className="font-bold text-white">
                {
                  adminUser.name
                }
              </span>
            </p>

          </div>

          <Link
            href="/dashboard"
            className="border border-zinc-700 px-4 py-2 text-sm font-bold hover:bg-zinc-900"
          >
            Back to Game
          </Link>

        </div>

        {/* ============================
            NAVIGATION
            ============================ */}
        <div className="mt-6 flex flex-wrap gap-2">

          <Link
            href="/admin"
            className="bg-white px-4 py-2 text-sm font-black text-black"
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
            OVERVIEW STATS
            ============================ */}
        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-7">

          <div className="border border-zinc-800 bg-zinc-950 p-4">

            <p className="text-xs uppercase tracking-wide text-zinc-500">
              Players
            </p>

            <p className="mt-2 text-3xl font-black">
              {
                totalPlayers
              }
            </p>

          </div>

          <div className="border border-zinc-800 bg-zinc-950 p-4">

            <p className="text-xs uppercase tracking-wide text-zinc-500">
              Online
            </p>

            <p className="mt-2 text-3xl font-black text-green-400">
              {
                activePlayers
              }
            </p>

          </div>

          <div className="border border-zinc-800 bg-zinc-950 p-4">

            <p className="text-xs uppercase tracking-wide text-zinc-500">
              Open Tickets
            </p>

            <p className="mt-2 text-3xl font-black">
              {
                openTickets
              }
            </p>

          </div>

          <div className="border border-purple-900 bg-purple-950/10 p-4">

            <p className="text-xs uppercase tracking-wide text-purple-500">
              Active PvP
            </p>

            <p className="mt-2 text-3xl font-black text-purple-300">
              {
                activePvPAttacks
              }
            </p>

          </div>

          <div className="border border-red-900 bg-red-950/10 p-4">

            <p className="text-xs uppercase tracking-wide text-red-500">
              Banned
            </p>

            <p className="mt-2 text-3xl font-black text-red-300">
              {
                bannedUsers
              }
            </p>

          </div>

          <div className="border border-zinc-800 bg-zinc-950 p-4">

            <p className="text-xs uppercase tracking-wide text-zinc-500">
              Templates
            </p>

            <p className="mt-2 text-3xl font-black">
              {
                ticketTemplates
              }
            </p>

          </div>

          <div className="border border-blue-900 bg-blue-950/10 p-4">

            <p className="text-xs uppercase tracking-wide text-blue-500">
              New Feedback
            </p>

            <p className="mt-2 text-3xl font-black text-blue-300">
              {
                newFeedback
              }
            </p>

          </div>

        </div>

        {/* ============================
            ADMIN TOOLS
            ============================ */}
        <div className="mt-6">

          <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
            Admin Tools
          </p>

          <div className="mt-3 grid gap-3 md:grid-cols-2 lg:grid-cols-5">

            <Link
              href="/admin/players"
              className="border border-zinc-800 bg-zinc-950 p-5 transition hover:border-zinc-600 hover:bg-zinc-900"
            >

              <p className="text-xs font-bold uppercase tracking-wide text-zinc-500">
                User Management
              </p>

              <h2 className="mt-2 text-xl font-black">
                Players
              </h2>

              <p className="mt-2 text-sm text-zinc-400">
                Search players, inspect game state, ban accounts and repair broken progression.
              </p>

            </Link>

            <Link
              href="/admin/tickets"
              className="border border-zinc-800 bg-zinc-950 p-5 transition hover:border-zinc-600 hover:bg-zinc-900"
            >

              <p className="text-xs font-bold uppercase tracking-wide text-zinc-500">
                Queue Control
              </p>

              <h2 className="mt-2 text-xl font-black">
                Tickets
              </h2>

              <p className="mt-2 text-sm text-zinc-400">
                Inspect open tickets, poison state, routing and stuck work.
              </p>

            </Link>

            <Link
              href="/admin/pvp"
              className="border border-purple-900 bg-purple-950/10 p-5 transition hover:bg-purple-950/20"
            >

              <p className="text-xs font-bold uppercase tracking-wide text-purple-500">
                PvP Operations
              </p>

              <h2 className="mt-2 text-xl font-black text-purple-200">
                Poison Attacks
              </h2>

              <p className="mt-2 text-sm text-zinc-400">
                Inspect attackers, targets, active effects and attack status.
              </p>

            </Link>

            <Link
              href="/admin/templates"
              className="border border-zinc-800 bg-zinc-950 p-5 transition hover:border-zinc-600 hover:bg-zinc-900"
            >

              <p className="text-xs font-bold uppercase tracking-wide text-zinc-500">
                Game Content
              </p>

              <h2 className="mt-2 text-xl font-black">
                Ticket Templates
              </h2>

              <p className="mt-2 text-sm text-zinc-400">
                Create, edit, enable and disable ticket templates.
              </p>

            </Link>

            <Link
              href="/admin/feedback"
              className="border border-blue-900 bg-blue-950/10 p-5 transition hover:bg-blue-950/20"
            >

              <div className="flex items-start justify-between gap-3">

                <div>

                  <p className="text-xs font-bold uppercase tracking-wide text-blue-500">
                    Player Reports
                  </p>

                  <h2 className="mt-2 text-xl font-black text-blue-200">
                    Feedback
                  </h2>

                </div>

                {newFeedback > 0 && (
                  <span className="bg-blue-400 px-2 py-1 text-xs font-black text-black">
                    {newFeedback}
                  </span>
                )}

              </div>

              <p className="mt-2 text-sm text-zinc-400">
                Review bug reports, suggestions and game balance feedback.
              </p>

            </Link>

          </div>

        </div>

        {/* ============================
            SYSTEM STATUS
            ============================ */}
        <div className="mt-6 grid gap-3 md:grid-cols-2">

          <div className="border border-zinc-800 bg-zinc-950 p-5">

            <p className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">
              System Status
            </p>

            <div className="mt-4 space-y-3 text-sm">

              <div className="flex items-center justify-between gap-4">

                <span className="text-zinc-400">
                  Authentication
                </span>

                <span className="font-bold text-green-400">
                  Online
                </span>

              </div>

              <div className="flex items-center justify-between gap-4">

                <span className="text-zinc-400">
                  Ticket Engine
                </span>

                <span className="font-bold text-green-400">
                  Online
                </span>

              </div>

              <div className="flex items-center justify-between gap-4">

                <span className="text-zinc-400">
                  PvP Engine
                </span>

                <span className="font-bold text-green-400">
                  Online
                </span>

              </div>

              <div className="flex items-center justify-between gap-4">

                <span className="text-zinc-400">
                  Feedback
                </span>

                <span className="font-bold text-green-400">
                  Online
                </span>

              </div>

            </div>

          </div>

          <div className="border border-red-900/60 bg-red-950/10 p-5">

            <p className="text-xs font-bold uppercase tracking-[0.18em] text-red-500">
              Admin Access
            </p>

            <h2 className="mt-2 text-lg font-black text-red-200">
              Restricted Area
            </h2>

            <p className="mt-2 text-sm text-zinc-400">
              Administrative actions can change user accounts,
              progression and game state.
            </p>

            <p className="mt-2 text-xs text-zinc-500">
              Access is verified server-side using the authenticated user&apos;s admin role.
            </p>

          </div>

        </div>

      </div>

    </main>
  );
}