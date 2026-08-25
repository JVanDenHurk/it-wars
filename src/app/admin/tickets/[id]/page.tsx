import Link from "next/link";
import { notFound } from "next/navigation";

import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";

type AdminTicketPageProps = {
  params: Promise<{
    id: string;
  }>;
};

/*
 * ============================
 * FORMAT TICKET ID
 * ============================
 */
function formatTicketId(id: number) {
  return `INC${id
    .toString()
    .padStart(5, "0")}`;
}

/*
 * ============================
 * FORMAT ENUM
 * ============================
 */
function formatEnum(
  value: string
) {
  return value
    .replaceAll("_", " ");
}

/*
 * ============================
 * FORMAT DATE
 * ============================
 */
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

/*
 * ============================
 * FORMAT AGE
 * ============================
 */
function formatAge(
  createdAt: Date
) {
  const minutes =
    Math.max(
      0,
      Math.floor(
        (
          Date.now() -
          createdAt.getTime()
        ) /
          60000
      )
    );

  if (minutes < 60) {
    return `${minutes}m`;
  }

  const hours =
    Math.floor(
      minutes / 60
    );

  const remainingMinutes =
    minutes % 60;

  if (hours < 24) {
    return `${hours}h ${remainingMinutes}m`;
  }

  const days =
    Math.floor(
      hours / 24
    );

  const remainingHours =
    hours % 24;

  return `${days}d ${remainingHours}h`;
}

/*
 * ============================
 * SEVERITY STYLE
 * ============================
 */
function getSeverityClasses(
  severity: string
) {
  switch (severity) {
    case "P1":
      return "border-red-700 bg-red-950/30 text-red-300";

    case "P2":
      return "border-orange-800 bg-orange-950/20 text-orange-300";

    case "P3":
      return "border-yellow-800 bg-yellow-950/20 text-yellow-300";

    default:
      return "border-zinc-700 bg-zinc-900 text-zinc-300";
  }
}

/*
 * ============================
 * STATUS STYLE
 * ============================
 */
function getStatusClasses(
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

export default async function AdminTicketPage({
  params,
}: AdminTicketPageProps) {
  /*
   * ============================
   * ADMIN AUTH
   * ============================
   */
  await requireAdmin();

  const { id } =
    await params;

  /*
   * ============================
   * VALIDATE ID
   * ============================
   */
  const ticketId =
    Number(id);

  if (
    !Number.isInteger(
      ticketId
    ) ||
    ticketId <= 0
  ) {
    notFound();
  }

  /*
   * ============================
   * LOAD TICKET
   * ============================
   */
  const ticket =
    await prisma.ticket.findUnique({
      where: {
        id:
          ticketId,
      },

      include: {
        assignedTo: {
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
          },
        },

        lastSentBy: {
          select: {
            id:
              true,

            userId:
              true,

            username:
              true,
          },
        },

        attackSourcePlayer: {
          select: {
            id:
              true,

            userId:
              true,

            username:
              true,
          },
        },

        pvpAttack: {
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
          },
        },
      },
    });

  if (!ticket) {
    notFound();
  }

  const displayId =
    formatTicketId(
      ticket.id
    );

  /*
   * ============================
   * EFFECTIVE AGE
   * ============================
   *
   * Shows the artificial SLA age
   * added by poison separately from
   * the ticket's real age.
   */
  const realAgeMinutes =
    Math.max(
      0,
      Math.floor(
        (
          Date.now() -
          ticket.createdAt.getTime()
        ) /
          60000
      )
    );

  const effectiveAgeMinutes =
    Math.max(
      0,
      realAgeMinutes +
        ticket.slaAgeOffsetMinutes -
        ticket.maintenancePausedMinutes
    );

  /*
   * ============================
   * MAINTENANCE STATUS
   * ============================
   */
  const now =
    new Date();

  const maintenanceActive =
    ticket.maintenanceUntil !==
      null &&
    ticket.maintenanceUntil >
      now;

  return (
    <main className="min-h-screen bg-black px-4 py-6 text-white md:px-6">

      <div className="mx-auto max-w-6xl">

        {/* ============================
            HEADER
            ============================ */}
        <div className="flex flex-wrap items-start justify-between gap-4">

          <div>

            <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-500">
              Administration / Ticket
            </p>

            <div className="mt-2 flex flex-wrap items-center gap-3">

              {ticket.isPoison && (
                <span className="text-3xl text-purple-400">
                  ☣
                </span>
              )}

              <h1 className="font-mono text-4xl font-black">
                {displayId}
              </h1>

            </div>

            <h2 className="mt-3 text-xl font-black">
              {ticket.title}
            </h2>

          </div>

          <div className="flex flex-wrap gap-2">

            <Link
              href="/admin/tickets"
              className="border border-zinc-700 px-4 py-2 text-sm font-bold hover:bg-zinc-900"
            >
              Tickets
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
            PRIMARY STATUS
            ============================ */}
        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-6">

          <InfoCard
            label="Status"
          >
            <span
              className={`text-xl font-black ${getStatusClasses(
                ticket.status
              )}`}
            >
              {ticket.status}
            </span>
          </InfoCard>

          <InfoCard
            label="Severity"
          >
            <span
              className={`inline-block border px-2 py-1 text-sm font-black ${getSeverityClasses(
                ticket.severity
              )}`}
            >
              {ticket.severity}
            </span>
          </InfoCard>

          <InfoCard
            label="Category"
          >
            <span className="text-sm font-black">
              {formatEnum(
                ticket.category
              )}
            </span>
          </InfoCard>

          <InfoCard
            label="Difficulty"
          >
            <span className="text-xl font-black">
              {ticket.difficulty}
            </span>
          </InfoCard>

          <InfoCard
            label="Value"
          >
            <span
              className={`text-xl font-black ${
                ticket.isPoison
                  ? "text-purple-400"
                  : ""
              }`}
            >
              {ticket.maxValue} CR
            </span>
          </InfoCard>

          <InfoCard
            label="Base XP"
          >
            <span className="text-xl font-black">
              {ticket.baseXp}
            </span>
          </InfoCard>

        </div>

        {/* ============================
            DESCRIPTION
            ============================ */}
        <section className="mt-6 border border-zinc-800 bg-zinc-950 p-5">

          <p className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">
            Ticket Description
          </p>

          <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-zinc-300">
            {ticket.description}
          </p>

        </section>

        {/* ============================
            OWNER / ROUTING
            ============================ */}
        <section className="mt-6">

          <p className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">
            Ownership & Routing
          </p>

          <div className="mt-3 overflow-x-auto border border-zinc-800">

            <table className="w-full min-w-[800px] text-left text-sm">

              <thead className="border-b border-zinc-800 bg-zinc-950">

                <tr className="text-xs uppercase tracking-wide text-zinc-500">

                  <th className="px-4 py-3">
                    Current Owner
                  </th>

                  <th className="px-4 py-3">
                    Career
                  </th>

                  <th className="px-4 py-3">
                    Level
                  </th>

                  <th className="px-4 py-3">
                    Credits
                  </th>

                  <th className="px-4 py-3">
                    Last Sent By
                  </th>

                  <th className="px-4 py-3">
                    Bounces
                  </th>

                </tr>

              </thead>

              <tbody>

                <tr>

                  <td className="px-4 py-3">

                    <Link
                      href={`/admin/players/${ticket.assignedTo.userId}`}
                      className="font-black hover:underline"
                    >
                      {ticket.assignedTo.username}
                    </Link>

                  </td>

                  <td className="px-4 py-3 text-zinc-400">
                    {ticket.assignedTo.careerPath
                      ? formatEnum(
                          ticket.assignedTo.careerPath
                        )
                      : "SERVICE DESK"}
                  </td>

                  <td className="px-4 py-3 font-bold">
                    {ticket.assignedTo.level}
                  </td>

                  <td className="px-4 py-3 font-bold">
                    {ticket.assignedTo.credits} CR
                  </td>

                  <td className="px-4 py-3">

                    {ticket.lastSentBy ? (
                      <Link
                        href={`/admin/players/${ticket.lastSentBy.userId}`}
                        className="font-bold text-yellow-400 hover:underline"
                      >
                        {ticket.lastSentBy.username}
                      </Link>
                    ) : (
                      <span className="text-zinc-600">
                        System
                      </span>
                    )}

                  </td>

                  <td className="px-4 py-3">

                    <span
                      className={
                        ticket.bounceCount >
                        0
                          ? "font-black text-yellow-400"
                          : "text-zinc-500"
                      }
                    >
                      {ticket.bounceCount}
                    </span>

                  </td>

                </tr>

              </tbody>

            </table>

          </div>

        </section>

        {/* ============================
            SLA / TIMING
            ============================ */}
        <section className="mt-6">

          <p className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">
            SLA & Timing
          </p>

          <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-4">

            <InfoCard
              label="Real Age"
            >
              <span className="text-xl font-black">
                {formatAge(
                  ticket.createdAt
                )}
              </span>
            </InfoCard>

            <InfoCard
              label="SLA Offset"
            >
              <span
                className={`text-xl font-black ${
                  ticket.slaAgeOffsetMinutes >
                  0
                    ? "text-red-400"
                    : ""
                }`}
              >
                +
                {
                  ticket.slaAgeOffsetMinutes
                }m
              </span>
            </InfoCard>

            <InfoCard
              label="Effective Age"
            >
              <span className="text-xl font-black">
                {effectiveAgeMinutes}m
              </span>
            </InfoCard>

            <InfoCard
              label="Maintenance"
            >
              <span
                className={`text-sm font-black ${
                  maintenanceActive
                    ? "text-blue-400"
                    : "text-zinc-400"
                }`}
              >
                {maintenanceActive
                  ? "ACTIVE"
                  : "INACTIVE"}
              </span>
            </InfoCard>

          </div>

          <div className="mt-3 grid gap-3 md:grid-cols-2">

            <DataRow
              label="Created"
              value={formatDate(
                ticket.createdAt
              )}
            />

            <DataRow
              label="Updated"
              value={formatDate(
                ticket.updatedAt
              )}
            />

            <DataRow
              label="Resolved"
              value={formatDate(
                ticket.resolvedAt
              )}
            />

            <DataRow
              label="Expired"
              value={formatDate(
                ticket.expiredAt
              )}
            />

            <DataRow
              label="Maintenance Until"
              value={formatDate(
                ticket.maintenanceUntil
              )}
            />

            <DataRow
              label="Maintenance Paused"
              value={`${ticket.maintenancePausedMinutes} minutes`}
            />

          </div>

        </section>

        {/* ============================
            ABANDONMENT
            ============================ */}
        <section className="mt-6 border border-zinc-800 bg-zinc-950 p-5">

          <p className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">
            Abandonment
          </p>

          <div className="mt-4 grid gap-3 md:grid-cols-2">

            <DataRow
              label="Penalty Applied"
              value={
                ticket.abandonmentPenaltyApplied
                  ? "YES"
                  : "NO"
              }
            />

            <DataRow
              label="Penalty Time"
              value={formatDate(
                ticket.abandonmentPenaltyAt
              )}
            />

          </div>

        </section>

        {/* ============================
            POISON TICKET
            ============================ */}
        {ticket.isPoison && (
          <section className="mt-6 border border-purple-800 bg-purple-950/10 p-5">

            <div className="flex items-center gap-3">

              <span className="text-3xl text-purple-400">
                ☣
              </span>

              <div>

                <p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-500">
                  Poison Ticket
                </p>

                <h2 className="mt-1 text-xl font-black text-purple-200">
                  {formatEnum(
                    ticket.poisonEffect
                  )}
                </h2>

              </div>

            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-2">

              <DataRow
                label="Poison Effect"
                value={formatEnum(
                  ticket.poisonEffect
                )}
              />

              <DataRow
                label="Attack ID"
                value={
                  ticket.pvpAttack
                    ? `#${ticket.pvpAttack.id}`
                    : "—"
                }
              />

              <DataRow
                label="Attack Type"
                value={
                  ticket.pvpAttack
                    ? formatEnum(
                        ticket.pvpAttack.type
                      )
                    : "—"
                }
              />

              <DataRow
                label="Attack Status"
                value={
                  ticket.pvpAttack
                    ?.status ??
                  "—"
                }
              />

            </div>

            {ticket.attackSourcePlayer && (
              <div className="mt-4 border-t border-purple-900/50 pt-4">

                <p className="text-xs text-zinc-500">
                  Original Attack Source
                </p>

                <Link
                  href={`/admin/players/${ticket.attackSourcePlayer.userId}`}
                  className="mt-1 inline-block font-black text-purple-300 hover:underline"
                >
                  {
                    ticket
                      .attackSourcePlayer
                      .username
                  }
                </Link>

              </div>
            )}

          </section>
        )}

        {/* ============================
            PVP ATTACK
            ============================ */}
        {ticket.pvpAttack && (
          <section className="mt-6 border border-zinc-800 bg-zinc-950 p-5">

            <p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-500">
              PvP Attack Event
            </p>

            <div className="mt-4 grid gap-3 md:grid-cols-2">

              <DataRow
                label="Attack"
                value={`#${ticket.pvpAttack.id}`}
              />

              <DataRow
                label="Type"
                value={formatEnum(
                  ticket.pvpAttack.type
                )}
              />

              <DataRow
                label="Status"
                value={
                  ticket.pvpAttack.status
                }
              />

              <DataRow
                label="Cost"
                value={`${ticket.pvpAttack.cost} CR`}
              />

              <DataRow
                label="Created"
                value={formatDate(
                  ticket.pvpAttack.createdAt
                )}
              />

              <DataRow
                label="Completed"
                value={formatDate(
                  ticket.pvpAttack.completedAt
                )}
              />

            </div>

            <div className="mt-4 grid gap-3 md:grid-cols-2">

              <div className="border border-zinc-800 bg-black p-4">

                <p className="text-xs uppercase tracking-wide text-zinc-500">
                  Attacker
                </p>

                <Link
                  href={`/admin/players/${ticket.pvpAttack.attacker.userId}`}
                  className="mt-2 inline-block font-black text-purple-300 hover:underline"
                >
                  {
                    ticket
                      .pvpAttack
                      .attacker
                      .username
                  }
                </Link>

              </div>

              <div className="border border-zinc-800 bg-black p-4">

                <p className="text-xs uppercase tracking-wide text-zinc-500">
                  Original Target
                </p>

                <Link
                  href={`/admin/players/${ticket.pvpAttack.target.userId}`}
                  className="mt-2 inline-block font-black hover:underline"
                >
                  {
                    ticket
                      .pvpAttack
                      .target
                      .username
                  }
                </Link>

              </div>

            </div>

            {ticket.pvpAttack.causedBankruptcy && (
              <div className="mt-4 border border-red-900 bg-red-950/20 p-4">

                <p className="font-black text-red-300">
                  This attack caused a bankruptcy.
                </p>

              </div>
            )}

          </section>
        )}

        {/* ============================
            OUTCOME MESSAGES
            ============================ */}
        {(ticket.successMessage ||
          ticket.failureMessage) && (
          <section className="mt-6">

            <p className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">
              Outcome Messages
            </p>

            <div className="mt-3 grid gap-3 md:grid-cols-2">

              <div className="border border-green-900 bg-green-950/10 p-4">

                <p className="text-xs font-bold uppercase text-green-500">
                  Success
                </p>

                <p className="mt-2 text-sm text-zinc-300">
                  {ticket.successMessage ??
                    "No custom success message."}
                </p>

              </div>

              <div className="border border-red-900 bg-red-950/10 p-4">

                <p className="text-xs font-bold uppercase text-red-500">
                  Failure
                </p>

                <p className="mt-2 text-sm text-zinc-300">
                  {ticket.failureMessage ??
                    "No custom failure message."}
                </p>

              </div>

            </div>

          </section>
        )}

        {/* ============================
            DATABASE INFO
            ============================ */}
        <section className="mt-6 border border-zinc-900 bg-zinc-950/50 p-5">

          <p className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-600">
            Database Information
          </p>

          <div className="mt-4 grid gap-3 md:grid-cols-3">

            <DataRow
              label="Ticket ID"
              value={String(
                ticket.id
              )}
            />

            <DataRow
              label="Player ID"
              value={String(
                ticket.assignedToId
              )}
            />

            <DataRow
              label="PvP Attack ID"
              value={
                ticket.pvpAttackId
                  ? String(
                      ticket.pvpAttackId
                    )
                  : "—"
              }
            />

          </div>

        </section>

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