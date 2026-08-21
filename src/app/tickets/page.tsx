import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

import BounceTicketButton from "@/components/BounceTicketButton";
import PlayerHeartbeat from "@/components/PlayerHeartbeat";
import ResolveTicketButton from "@/components/ResolveTicketButton";
import TicketTimer from "@/components/TicketTimer";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { calculateTicketValue } from "@/lib/ticket-value";

function getAbandonmentMinutes(
  severity: "P1" | "P2" | "P3" | "P4"
) {
  switch (severity) {
    case "P1":
      return 10;

    case "P2":
      return 20;

    case "P3":
      return 30;

    case "P4":
    default:
      return 45;
  }
}

function getSeverityClasses(
  severity: "P1" | "P2" | "P3" | "P4"
) {
  switch (severity) {
    case "P1":
    case "P2":
      return "border-red-700 bg-red-950/20 text-red-400";

    case "P3":
      return "border-yellow-700 bg-yellow-950/20 text-yellow-400";

    case "P4":
    default:
      return "border-zinc-700 bg-zinc-900 text-zinc-300";
  }
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

  const now = new Date();

  const queuePenaltyActive =
    player.queuePenaltyUntil !== null &&
    player.queuePenaltyUntil > now;

  return (
    <main className="min-h-screen bg-black px-4 py-8 text-white md:px-8">

      {/*
       * Keep the player marked active
       * while they are working inside
       * their ticket queue.
       */}
      <PlayerHeartbeat />

      <div className="mx-auto max-w-5xl">

        {/* ============================
            HEADER
            ============================ */}
        <div className="flex items-start justify-between gap-4">

          <div>
            <h1 className="text-4xl font-black">
              Ticket Queue
            </h1>

            <p className="mt-2 text-zinc-400">
              {tickets.length} open ticket
              {tickets.length === 1
                ? ""
                : "s"}
            </p>
          </div>

          <Link
            href="/dashboard"
            className="border border-zinc-700 px-4 py-2 text-sm hover:bg-zinc-900"
          >
            Dashboard
          </Link>

        </div>

        {/* ============================
            NEXT TICKET TIMER
            ============================ */}
        <div className="mt-8 border border-zinc-800 bg-zinc-950 p-5">

          <TicketTimer
            nextTicketAt={
              player.nextTicketAt
            }
            queuePenaltyActive={
              queuePenaltyActive
            }
          />

        </div>

        {/* ============================
            QUEUE
            ============================ */}
        <div className="mt-8 space-y-4">

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

          {tickets.map((ticket) => {
            const value =
              calculateTicketValue(
                ticket.maxValue,
                ticket.createdAt
              );

            const ageMinutes =
              Math.floor(
                (
                  Date.now() -
                  ticket.createdAt.getTime()
                ) /
                  60000
              );

            const abandonmentMinutes =
              getAbandonmentMinutes(
                ticket.severity
              );

            /*
             * Show BREACHING when the
             * ticket enters the final
             * 25% of its abandonment
             * window.
             */
            const breachingSoon =
              ageMinutes >=
              abandonmentMinutes *
                0.75;

            return (
              <div
                key={ticket.id}
                className="border border-zinc-800 bg-zinc-950 p-6"
              >

                {/* ============================
                    TICKET HEADER
                    ============================ */}
                <div className="flex items-start justify-between gap-4">

                  <div>

                    {/* Severity */}
                    <span
                      className={`inline-block border px-2 py-1 text-xs font-bold ${getSeverityClasses(
                        ticket.severity
                      )}`}
                    >
                      {
                        ticket.severity
                      }
                    </span>

                    {/* Incident Number */}
                    <p className="mt-2 text-xs text-zinc-500">
                      INC
                      {ticket.id
                        .toString()
                        .padStart(
                          5,
                          "0"
                        )}
                    </p>

                    {/* Title */}
                    <h2 className="mt-1 text-xl font-bold">
                      {
                        ticket.title
                      }
                    </h2>

                  </div>

                  {/* Current Value */}
                  <div className="shrink-0 text-right">

                    <p className="text-xl font-bold">
                      {value} CR
                    </p>

                    <p className="text-xs text-zinc-500">
                      Max{" "}
                      {
                        ticket.maxValue
                      }{" "}
                      CR
                    </p>

                  </div>

                </div>

                {/* ============================
                    DESCRIPTION
                    ============================ */}
                <p className="mt-5 leading-relaxed text-zinc-300">
                  {
                    ticket.description
                  }
                </p>

                {/* ============================
                    AGE / BREACHING
                    ============================ */}
                <div className="mt-5 flex items-center gap-3 text-sm">

                  <p className="text-zinc-500">
                    Age:{" "}
                    {ageMinutes}m
                  </p>

                  {breachingSoon && (
                    <p className="font-bold text-red-500">
                      BREACHING
                    </p>
                  )}

                </div>

                {/* ============================
                    ACTIONS
                    ============================ */}
                <div className="mt-6 flex items-start gap-3">

                  <ResolveTicketButton
                    ticketId={
                      ticket.id
                    }
                  />

                  <BounceTicketButton
                    ticketId={
                      ticket.id
                    }
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