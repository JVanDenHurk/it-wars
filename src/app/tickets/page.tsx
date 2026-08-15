import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

import BounceTicketButton from "@/components/BounceTicketButton";
import GenerateTicketButton from "@/components/GenerateTicketButton";
import ResolveTicketButton from "@/components/ResolveTicketButton";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

function calculateTicketValue(
  maxValue: number,
  createdAt: Date
) {
  const ageMs = Date.now() - createdAt.getTime();
  const ageMinutes = Math.floor(ageMs / 60000);

  // Ticket loses 2% of its maximum value every minute.
  const lossPerMinute = maxValue * 0.02;

  const currentValue = Math.floor(
    maxValue - ageMinutes * lossPerMinute
  );

  // Ticket can never be worth less than 10% of its original value.
  return Math.max(
    Math.floor(maxValue * 0.1),
    currentValue
  );
}

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

        {/* Generate Ticket */}
        <div className="mt-8">
          <GenerateTicketButton />
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
                Pull a ticket to start working.
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
                    <p className="text-xl font-bold">
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