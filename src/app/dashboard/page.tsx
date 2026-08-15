import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

import SignOutButton from "@/components/SignOutButton";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

function getRoleTitle(level: number, careerPath: string | null) {
  if (level === 1) return "Service Desk Analyst";
  if (level === 2) return "Service Desk Analyst II";
  if (level === 3) return "Senior Service Desk Analyst";

  if (careerPath === "NETWORK") {
    if (level === 4) return "Network Engineer";
    if (level === 5) return "Senior Network Engineer";
    return "Network Specialist";
  }

  if (careerPath === "SYSTEMS") {
    if (level === 4) return "Systems Engineer";
    if (level === 5) return "Senior Systems Engineer";
    return "Systems Specialist";
  }

  if (careerPath === "SECURITY") {
    if (level === 4) return "Security Analyst";
    if (level === 5) return "Security Engineer";
    return "Security Specialist";
  }

  return "Career Path Required";
}

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

  const roleTitle = getRoleTitle(
    player.level,
    player.careerPath
  );

  return (
    <main className="min-h-screen bg-black p-8 text-white">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
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

        {/* Core Stats */}
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

        {/* PvP */}
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
                Correct Bounces: {player.correctBounces}
              </p>

              <p>
                Incorrect Bounces: {player.incorrectBounces}
              </p>
            </div>
          </div>

        </div>

        {/* Queue */}
        <div className="mt-4 border border-zinc-800 bg-zinc-950 p-6">
          <div className="flex items-start justify-between gap-6">

            <div>
              <p className="text-xs uppercase tracking-wide text-zinc-500">
                Your Queue
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                {openTickets} Open Ticket
                {openTickets === 1 ? "" : "s"}
              </h2>

              <p className="mt-2 text-zinc-400">
                Ticket value decreases while it remains in your queue.
              </p>
            </div>

            <Link
              href="/tickets"
              className="rounded bg-white px-5 py-3 font-bold text-black hover:bg-zinc-200"
            >
              Open Queue
            </Link>

          </div>
        </div>

        {/* Career */}
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

          {player.level >= 4 && !player.careerPath && (
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