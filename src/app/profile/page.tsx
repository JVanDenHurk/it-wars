import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

import EditUsernameForm from "@/components/EditUsernameForm";
import PlayerHeartbeat from "@/components/PlayerHeartbeat";
import { auth } from "@/lib/auth";
import { getRoleTitle } from "@/lib/player-level";
import { prisma } from "@/lib/prisma";

export default async function ProfilePage() {
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
        userId: session.user.id,
      },

      include: {
        user: true,
      },
    });

  if (!player) {
    redirect("/dashboard");
  }

  const roleTitle =
    getRoleTitle(
      player.level,
      player.careerPath
    );

  return (
    <main className="min-h-screen bg-black px-4 py-8 text-white md:px-8">

      <PlayerHeartbeat />

      <div className="mx-auto max-w-4xl">

        {/* ============================
            HEADER
            ============================ */}
        <div className="flex flex-wrap items-start justify-between gap-4">

          <div>

            <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
              Account
            </p>

            <h1 className="mt-2 text-4xl font-black">
              Profile
            </h1>

            <p className="mt-2 text-zinc-400">
              Manage your account and view your lifetime IT WARS record.
            </p>

          </div>

          <Link
            href="/dashboard"
            className="border border-zinc-700 px-4 py-2 text-sm font-bold hover:bg-zinc-900"
          >
            Dashboard
          </Link>

        </div>

        {/* ============================
            PROFILE
            ============================ */}
        <div className="mt-8 border border-zinc-800 bg-zinc-950 p-6">

          <p className="text-xs font-bold uppercase tracking-wide text-zinc-500">
            Player Profile
          </p>

          {/* Username */}
          <div className="mt-6">

            <p className="text-xs uppercase tracking-wide text-zinc-600">
              Username
            </p>

            <EditUsernameForm
              currentUsername={
                player.username
              }
            />

          </div>

          {/* Email */}
          <div className="mt-6 border-t border-zinc-800 pt-6">

            <p className="text-xs uppercase tracking-wide text-zinc-600">
              Email
            </p>

            <p className="mt-2 text-zinc-300">
              {player.user.email}
            </p>

            <p className="mt-1 text-xs text-zinc-600">
              Email changes are not enabled yet.
            </p>

          </div>

          {/* Current Position */}
          <div className="mt-6 border-t border-zinc-800 pt-6">

            <p className="text-xs uppercase tracking-wide text-zinc-600">
              Current Position
            </p>

            <p className="mt-2 text-xl font-bold">
              {roleTitle}
            </p>

            <div className="mt-3 flex flex-wrap gap-4 text-sm text-zinc-500">

              <span>
                Level {player.level}
              </span>

              <span>
                {player.xp} XP
              </span>

              <span>
                {player.credits} CR
              </span>

            </div>

          </div>

          {/* Joined */}
          <div className="mt-6 border-t border-zinc-800 pt-6">

            <p className="text-xs uppercase tracking-wide text-zinc-600">
              Account Created
            </p>

            <p className="mt-2 text-zinc-300">
              {player.createdAt.toLocaleDateString(
                "en-AU",
                {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                }
              )}
            </p>

          </div>

        </div>

        {/* ============================
            LIFETIME STATISTICS
            ============================ */}
        <div className="mt-4 border border-zinc-800 bg-zinc-950 p-6">

          <div>

            <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
              Lifetime Statistics
            </p>

            <h2 className="mt-2 text-2xl font-black">
              Career Record
            </h2>

            <p className="mt-2 text-sm text-zinc-500">
              These stats remain permanently, even after bankruptcy and career resets.
            </p>

          </div>

          {/* Main lifetime totals */}
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

            <div className="border border-zinc-800 bg-black p-4">

              <p className="text-xs uppercase tracking-wide text-zinc-600">
                Tickets Handled
              </p>

              <p className="mt-2 text-3xl font-black">
                {player.lifetimeTicketsHandled}
              </p>

            </div>

            <div className="border border-zinc-800 bg-black p-4">

              <p className="text-xs uppercase tracking-wide text-zinc-600">
                Tickets Resolved
              </p>

              <p className="mt-2 text-3xl font-black text-green-400">
                {player.ticketsResolved}
              </p>

            </div>

            <div className="border border-zinc-800 bg-black p-4">

              <p className="text-xs uppercase tracking-wide text-zinc-600">
                Credits Earned
              </p>

              <p className="mt-2 text-3xl font-black">
                {player.lifetimeCreditsEarned}
              </p>

              <p className="text-xs text-zinc-600">
                CR
              </p>

            </div>

            <div className="border border-zinc-800 bg-black p-4">

              <p className="text-xs uppercase tracking-wide text-zinc-600">
                Bankruptcies
              </p>

              <p className="mt-2 text-3xl font-black text-red-400">
                {player.bankruptcies}
              </p>

            </div>

          </div>

          {/* Routing / resolution stats */}
          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

            <div className="border border-zinc-800 bg-black p-4">

              <p className="text-xs uppercase tracking-wide text-zinc-600">
                Correct Bounces
              </p>

              <p className="mt-2 text-3xl font-black text-green-400">
                {player.correctBounces}
              </p>

            </div>

            <div className="border border-zinc-800 bg-black p-4">

              <p className="text-xs uppercase tracking-wide text-zinc-600">
                Wrong Bounces
              </p>

              <p className="mt-2 text-3xl font-black text-red-400">
                {player.incorrectBounces}
              </p>

            </div>

            <div className="border border-zinc-800 bg-black p-4">

              <p className="text-xs uppercase tracking-wide text-zinc-600">
                Wrong Resolves
              </p>

              <p className="mt-2 text-3xl font-black text-red-400">
                {player.incorrectResolves}
              </p>

            </div>

            <div className="border border-zinc-800 bg-black p-4">

              <p className="text-xs uppercase tracking-wide text-zinc-600">
                PvP Kills
              </p>

              <p className="mt-2 text-3xl font-black text-purple-400">
                {player.kills}
              </p>

            </div>

          </div>

        </div>

        {/* ============================
            CURRENT RUN
            ============================ */}
        <div className="mt-4 border border-zinc-800 bg-zinc-950 p-6">

          <div className="flex flex-wrap items-start justify-between gap-4">

            <div>

              <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
                Current Run
              </p>

              <h2 className="mt-2 text-xl font-black">
                Current Career Performance
              </h2>

              <p className="mt-2 text-sm text-zinc-500">
                These reset when your Credits reach 0.
              </p>

            </div>

          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

            <div className="border border-zinc-800 bg-black p-4">

              <p className="text-xs uppercase tracking-wide text-zinc-600">
                Resolved
              </p>

              <p className="mt-2 text-2xl font-black">
                {player.careerTicketsResolved}
              </p>

            </div>

            <div className="border border-zinc-800 bg-black p-4">

              <p className="text-xs uppercase tracking-wide text-zinc-600">
                Correct Bounces
              </p>

              <p className="mt-2 text-2xl font-black">
                {player.careerCorrectBounces}
              </p>

            </div>

            <div className="border border-zinc-800 bg-black p-4">

              <p className="text-xs uppercase tracking-wide text-zinc-600">
                Wrong Bounces
              </p>

              <p className="mt-2 text-2xl font-black">
                {player.careerIncorrectBounces}
              </p>

            </div>

            <div className="border border-zinc-800 bg-black p-4">

              <p className="text-xs uppercase tracking-wide text-zinc-600">
                Wrong Resolves
              </p>

              <p className="mt-2 text-2xl font-black">
                {player.careerIncorrectResolves}
              </p>

            </div>

          </div>

        </div>

        {/* ============================
            SECURITY
            ============================ */}
        <div className="mt-4 border border-zinc-800 bg-zinc-950 p-6">

          <p className="text-xs font-bold uppercase tracking-wide text-zinc-500">
            Security
          </p>

          <h2 className="mt-2 text-2xl font-black">
            Change Password
          </h2>

          <p className="mt-2 text-sm text-zinc-400">
            Update the password used to sign in to your account.
          </p>

          <Link
            href="/profile/change-password"
            className="mt-5 inline-block border border-zinc-700 px-4 py-2 font-bold hover:bg-zinc-900"
          >
            Change Password
          </Link>

        </div>

      </div>

    </main>
  );
}