import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

import BounceTicketButton from "@/components/BounceTicketButton";
import ResolveTicketButton from "@/components/ResolveTicketButton";
import TicketTimer from "@/components/TicketTimer";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { calculateTicketValue } from "@/lib/ticket-value";

export default async function TicketsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/");
  }

  const player = await prisma.player.findUnique({
    where: {
      userId: session.user.id,
    },
  });

  if (!player) {
    redirect("/dashboard");
  }

  const tickets = await prisma.ticket.findMany({
    where: {
      assignedToId: player.id,
      status: "OPEN",
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  const now = new Date();

  const queuePenaltyActive =
    player.queuePenaltyUntil !== null &&
    player.queuePenaltyUntil > now;

  return (
    <main className="min-h-screen bg-black p-8 text-white">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black">
              Ticket Queue
            </h1>

            <p className="mt-2 text-zinc-400">
              {tickets.length} open ticket
              {tickets.length === 1 ? "" : "s"}
            </p>
          </div>

          <Link
            href="/dashboard"
            className="border border-zinc-700 px-4 py-2 text-sm hover:bg-zinc-900"
          >
            Dashboard
          </Link>
        </div>

        {/* Ticket Timer */}
        <div className="mt-8 border border-zinc-800 bg-zinc-950 p-5">
          <TicketTimer
            nextTicketAt={player.nextTicketAt}
            queuePenaltyActive={queuePenaltyActive}
          />
        </div>

        {/* Ticket Queue */}
        <div className="mt-8 space-y-4">

          {/* Empty Queue */}
          {tickets.length === 0 && (
            <div className="border border-zinc-800 bg-zinc-950 p-8 text-center">
              <h2 className="text-xl font-bold">
                Queue Empty
              </h2>

              <p className="mt-2 text-zinc-400">
                Waiting for your next ticket...
              </p>
            </div>
          )}

          {/* Tickets */}
          {tickets.map((ticket) => {
            const value = calculateTicketValue(
              ticket.maxValue,
              ticket.createdAt
            );

            const ageMinutes = Math.floor(
              (Date.now() - ticket.createdAt.getTime()) /
                60000
            );

            return (
              <div
                key={ticket.id}
                className="border border-zinc-800 bg-zinc-950 p-6"
              >
                {/* Ticket Header */}
                <div className="flex justify-between gap-4">
                  <div>
                    <p className="text-xs text-zinc-500">
                      INC
                      {ticket.id
                        .toString()
                        .padStart(5, "0")}
                    </p>

                    <h2 className="mt-1 text-xl font-bold">
                      {ticket.title}
                    </h2>
                  </div>

                  {/* Current Value */}
                  <div className="text-right">
                    <p
                      className={`text-xl font-bold ${
                        value === 0
                          ? "text-red-400"
                          : ""
                      }`}
                    >
                      {value} CR
                    </p>

                    <p className="text-xs text-zinc-500">
                      Max {ticket.maxValue} CR
                    </p>
                  </div>
                </div>

                {/* Ticket Description */}
                <p className="mt-4 text-zinc-300">
                  {ticket.description}
                </p>

                {/* Ticket Information */}
                <div className="mt-4 flex gap-4 text-sm text-zinc-500">
                  <span>
                    Age: {ageMinutes}m
                  </span>

                  {value === 0 && (
                    <span className="font-bold text-red-400">
                      No credit value remaining
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="mt-6 flex items-start gap-3">
                  <ResolveTicketButton
                    ticketId={ticket.id}
                  />

                  <BounceTicketButton
                    ticketId={ticket.id}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}