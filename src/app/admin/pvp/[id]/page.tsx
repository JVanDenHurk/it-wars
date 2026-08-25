import Link from "next/link";
import { notFound } from "next/navigation";

import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";

type AdminPvPDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

function formatEnum(
  value: string
) {
  return value.replaceAll(
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
        "medium",
    }
  );
}

function formatTicketId(
  id: number
) {
  return `INC${id
    .toString()
    .padStart(5, "0")}`;
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

function getTicketStatusClasses(
  status: string
) {
  switch (status) {
    case "OPEN":
      return "text-green-400";

    case "RESOLVED":
      return "text-blue-400";

    case "BOUNCED":
      return "text-yellow-400";

    case "FAILED":
    case "EXPIRED":
      return "text-red-400";

    default:
      return "text-zinc-400";
  }
}

export default async function AdminPvPDetailPage({
  params,
}: AdminPvPDetailPageProps) {
  /*
   * ============================
   * ADMIN AUTH
   * ============================
   */
  await requireAdmin();

  const { id } =
    await params;

  const attackId =
    Number(id);

  if (
    !Number.isInteger(
      attackId
    ) ||
    attackId <= 0
  ) {
    notFound();
  }

  /*
   * ============================
   * LOAD ATTACK
   * ============================
   */
  const attack =
    await prisma.pvPAttack.findUnique({
      where: {
        id:
          attackId,
      },

      include: {
        attacker: {
          select: {
            id:
              true,

            userId:
              true,

            username:
              true,

            level:
              true,

            careerPath:
              true,

            credits:
              true,

            kills:
              true,

            bankruptcies:
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

            level:
              true,

            careerPath:
              true,

            credits:
              true,

            kills:
              true,

            bankruptcies:
              true,
          },
        },

        tickets: {
          include: {
            assignedTo: {
              select: {
                id:
                  true,

                userId:
                  true,

                username:
                  true,
              },
            },

            lastSentBy: {
              select: {
                userId:
                  true,

                username:
                  true,
              },
            },
          },

          orderBy: {
            createdAt:
              "asc",
          },
        },
      },
    });

  if (!attack) {
    notFound();
  }

  const poisonTickets =
    attack.tickets.filter(
      (ticket) =>
        ticket.isPoison
    );

  const openPoisonTickets =
    poisonTickets.filter(
      (ticket) =>
        ticket.status ===
        "OPEN"
    ).length;

  const resolvedPoisonTickets =
    poisonTickets.filter(
      (ticket) =>
        ticket.status ===
        "RESOLVED"
    ).length;

  const expiredPoisonTickets =
    poisonTickets.filter(
      (ticket) =>
        ticket.status ===
          "EXPIRED" ||
        ticket.status ===
          "FAILED"
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
              Administration / PvP
            </p>

            <h1 className="mt-2 text-4xl font-black">
              Attack #{attack.id}
            </h1>

            <p className="mt-2 text-lg font-bold text-purple-300">
              {formatEnum(
                attack.type
              )}
            </p>

          </div>

          <div className="flex flex-wrap gap-2">

            <Link
              href="/admin/pvp"
              className="border border-purple-800 px-4 py-2 text-sm font-bold text-purple-300 hover:bg-purple-950/30"
            >
              PvP
            </Link>

            <Link
              href="/admin"
              className="border border-zinc-700 px-4 py-2 text-sm font-bold hover:bg-zinc-900"
            >
              Admin Home
            </Link>

          </div>

        </div>

        {/* ============================
            ATTACK SUMMARY
            ============================ */}
        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-5">

          <InfoCard
            label="Status"
          >
            <span
              className={`text-lg font-black ${getStatusClasses(
                attack.status
              )}`}
            >
              {attack.status}
            </span>
          </InfoCard>

          <InfoCard
            label="Cost"
          >
            <span className="text-2xl font-black">
              {attack.cost} CR
            </span>
          </InfoCard>

          <InfoCard
            label="Poison Tickets"
          >
            <span className="text-2xl font-black text-purple-300">
              {poisonTickets.length}
            </span>
          </InfoCard>

          <InfoCard
            label="Bankruptcy"
          >
            <span
              className={`text-lg font-black ${
                attack.causedBankruptcy
                  ? "text-red-400"
                  : "text-zinc-400"
              }`}
            >
              {attack.causedBankruptcy
                ? "YES"
                : "NO"}
            </span>
          </InfoCard>

          <InfoCard
            label="Created"
          >
            <span className="text-sm font-bold">
              {formatDate(
                attack.createdAt
              )}
            </span>
          </InfoCard>

        </div>

        {/* ============================
            ATTACKER / TARGET
            ============================ */}
        <div className="mt-6 grid gap-4 md:grid-cols-2">

          {/* ATTACKER */}
          <section className="border border-purple-900 bg-purple-950/10 p-5">

            <p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-500">
              Attacker
            </p>

            <Link
              href={`/admin/players/${attack.attacker.userId}`}
              className="mt-2 inline-block text-2xl font-black text-purple-200 hover:underline"
            >
              {attack.attacker.username}
            </Link>

            <div className="mt-4 grid grid-cols-2 gap-3">

              <DataRow
                label="Level"
                value={String(
                  attack.attacker.level
                )}
              />

              <DataRow
                label="Career"
                value={
                  attack.attacker
                    .careerPath
                    ? formatEnum(
                        attack.attacker
                          .careerPath
                      )
                    : "SERVICE DESK"
                }
              />

              <DataRow
                label="Credits"
                value={`${attack.attacker.credits} CR`}
              />

              <DataRow
                label="Kills"
                value={String(
                  attack.attacker.kills
                )}
              />

            </div>

          </section>

          {/* TARGET */}
          <section className="border border-zinc-800 bg-zinc-950 p-5">

            <p className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">
              Original Target
            </p>

            <Link
              href={`/admin/players/${attack.target.userId}`}
              className="mt-2 inline-block text-2xl font-black hover:underline"
            >
              {attack.target.username}
            </Link>

            <div className="mt-4 grid grid-cols-2 gap-3">

              <DataRow
                label="Level"
                value={String(
                  attack.target.level
                )}
              />

              <DataRow
                label="Career"
                value={
                  attack.target
                    .careerPath
                    ? formatEnum(
                        attack.target
                          .careerPath
                      )
                    : "SERVICE DESK"
                }
              />

              <DataRow
                label="Credits"
                value={`${attack.target.credits} CR`}
              />

              <DataRow
                label="Bankruptcies"
                value={String(
                  attack.target
                    .bankruptcies
                )}
              />

            </div>

          </section>

        </div>

        {/* ============================
            TIMING
            ============================ */}
        <section className="mt-6 border border-zinc-800 bg-zinc-950 p-5">

          <p className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">
            Attack Timing
          </p>

          <div className="mt-4 grid gap-3 md:grid-cols-2">

            <DataRow
              label="Created"
              value={formatDate(
                attack.createdAt
              )}
            />

            <DataRow
              label="Completed"
              value={formatDate(
                attack.completedAt
              )}
            />

          </div>

        </section>

        {/* ============================
            TICKET SUMMARY
            ============================ */}
        <section className="mt-6">

          <p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-500">
            Poison Ticket Outcome
          </p>

          <div className="mt-3 grid grid-cols-3 gap-3">

            <div className="border border-green-900 bg-green-950/10 p-4">

              <p className="text-xs uppercase tracking-wide text-green-500">
                Open
              </p>

              <p className="mt-1 text-2xl font-black text-green-400">
                {openPoisonTickets}
              </p>

            </div>

            <div className="border border-blue-900 bg-blue-950/10 p-4">

              <p className="text-xs uppercase tracking-wide text-blue-500">
                Resolved
              </p>

              <p className="mt-1 text-2xl font-black text-blue-300">
                {resolvedPoisonTickets}
              </p>

            </div>

            <div className="border border-red-900 bg-red-950/10 p-4">

              <p className="text-xs uppercase tracking-wide text-red-500">
                Failed / Expired
              </p>

              <p className="mt-1 text-2xl font-black text-red-300">
                {expiredPoisonTickets}
              </p>

            </div>

          </div>

        </section>

        {/* ============================
            GENERATED TICKETS
            ============================ */}
        <section className="mt-6">

          <div className="flex flex-wrap items-center justify-between gap-3">

            <div>

              <p className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">
                Generated Tickets
              </p>

              <p className="mt-1 text-sm text-zinc-400">
                Tickets associated with this attack.
              </p>

            </div>

            <p className="text-xs text-zinc-500">
              {attack.tickets.length} total
            </p>

          </div>

          <div className="mt-3 overflow-x-auto border border-zinc-800">

            <table className="w-full min-w-[1100px] text-left text-sm">

              <thead className="border-b border-zinc-800 bg-zinc-950">

                <tr className="text-xs uppercase tracking-wide text-zinc-500">

                  <th className="px-4 py-3">
                    Ticket
                  </th>

                  <th className="px-4 py-3">
                    Title
                  </th>

                  <th className="px-4 py-3">
                    Owner
                  </th>

                  <th className="px-4 py-3">
                    Effect
                  </th>

                  <th className="px-4 py-3">
                    Bounce
                  </th>

                  <th className="px-4 py-3">
                    Status
                  </th>

                  <th className="px-4 py-3 text-right">
                    Action
                  </th>

                </tr>

              </thead>

              <tbody>

                {attack.tickets.length ===
                  0 && (
                  <tr>

                    <td
                      colSpan={7}
                      className="px-4 py-10 text-center text-zinc-500"
                    >
                      This attack has no associated tickets.
                    </td>

                  </tr>
                )}

                {attack.tickets.map(
                  (ticket) => (
                    <tr
                      key={
                        ticket.id
                      }
                      className={`border-b border-zinc-900 last:border-b-0 ${
                        ticket.isPoison
                          ? "bg-purple-950/10"
                          : ""
                      }`}
                    >

                      <td className="whitespace-nowrap px-4 py-3">

                        <div className="flex items-center gap-2">

                          {ticket.isPoison && (
                            <span className="text-purple-400">
                              ☣
                            </span>
                          )}

                          <span className="font-mono text-xs font-black">
                            {formatTicketId(
                              ticket.id
                            )}
                          </span>

                        </div>

                      </td>

                      <td className="max-w-[320px] px-4 py-3">

                        <p className="truncate font-bold">
                          {ticket.title}
                        </p>

                        {ticket.lastSentBy && (
                          <p className="mt-1 text-[10px] text-zinc-600">
                            Last sent by{" "}
                            {
                              ticket
                                .lastSentBy
                                .username
                            }
                          </p>
                        )}

                      </td>

                      <td className="px-4 py-3">

                        <Link
                          href={`/admin/players/${ticket.assignedTo.userId}`}
                          className="font-bold hover:underline"
                        >
                          {
                            ticket
                              .assignedTo
                              .username
                          }
                        </Link>

                      </td>

                      <td className="px-4 py-3">

                        {ticket.isPoison ? (
                          <span className="text-xs font-bold text-purple-400">
                            {formatEnum(
                              ticket.poisonEffect
                            )}
                          </span>
                        ) : (
                          <span className="text-zinc-600">
                            —
                          </span>
                        )}

                      </td>

                      <td className="px-4 py-3">

                        <span
                          className={
                            ticket.bounceCount >
                            0
                              ? "font-bold text-yellow-400"
                              : "text-zinc-600"
                          }
                        >
                          {
                            ticket.bounceCount
                          }
                        </span>

                      </td>

                      <td className="px-4 py-3">

                        <span
                          className={`text-xs font-black ${getTicketStatusClasses(
                            ticket.status
                          )}`}
                        >
                          {
                            ticket.status
                          }
                        </span>

                      </td>

                      <td className="px-4 py-3 text-right">

                        <Link
                          href={`/admin/tickets/${ticket.id}`}
                          className="inline-block border border-zinc-700 px-3 py-2 text-xs font-bold hover:bg-zinc-900"
                        >
                          View
                        </Link>

                      </td>

                    </tr>
                  )
                )}

              </tbody>

            </table>

          </div>

        </section>

        {/* ============================
            BANKRUPTCY WARNING
            ============================ */}
        {attack.causedBankruptcy && (
          <section className="mt-6 border border-red-800 bg-red-950/20 p-5">

            <p className="text-xs font-black uppercase tracking-[0.18em] text-red-500">
              Kill Confirmed
            </p>

            <h2 className="mt-2 text-xl font-black text-red-200">
              This attack caused a bankruptcy
            </h2>

            <p className="mt-2 text-sm text-zinc-400">
              The attack was credited as a PvP kill to{" "}
              <span className="font-bold text-purple-300">
                {attack.attacker.username}
              </span>
              .
            </p>

          </section>
        )}

      </div>

    </main>
  );
}

/*
 * ============================
 * INFO CARD
 * ============================
 */
function InfoCard({
  label,
  children,
}: {
  label: string;
  children:
    React.ReactNode;
}) {
  return (
    <div className="border border-zinc-800 bg-zinc-950 p-4">

      <p className="text-xs uppercase tracking-wide text-zinc-500">
        {label}
      </p>

      <div className="mt-2">
        {children}
      </div>

    </div>
  );
}

/*
 * ============================
 * DATA ROW
 * ============================
 */
function DataRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border border-zinc-800 bg-black px-4 py-3">

      <span className="text-xs text-zinc-500">
        {label}
      </span>

      <span className="text-right text-sm font-bold text-zinc-300">
        {value}
      </span>

    </div>
  );
}