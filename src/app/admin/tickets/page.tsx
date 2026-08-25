import Link from "next/link";

import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";

type AdminTicketsPageProps = {
  searchParams: Promise<{
    q?: string;
    status?: string;
    category?: string;
    poison?: string;
  }>;
};

function formatTicketId(id: number) {
  return `INC${id
    .toString()
    .padStart(5, "0")}`;
}

function formatAge(createdAt: Date) {
  const minutes =
    Math.max(
      0,
      Math.floor(
        (Date.now() -
          createdAt.getTime()) /
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

  return `${days}d`;
}

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

function formatCategory(
  category: string
) {
  return category.replaceAll(
    "_",
    " "
  );
}

export default async function AdminTicketsPage({
  searchParams,
}: AdminTicketsPageProps) {
  /*
   * ============================
   * ADMIN AUTH
   * ============================
   */
  await requireAdmin();

  const params =
    await searchParams;

  const search =
    params.q?.trim() ??
    "";

  const status =
    params.status ??
    "ALL";

  const category =
    params.category ??
    "ALL";

  const poison =
    params.poison ??
    "ALL";

  /*
   * ============================
   * BUILD FILTER
   * ============================
   */
  const where = {
    ...(status !== "ALL"
      ? {
          status:
            status as
              | "OPEN"
              | "RESOLVED"
              | "BOUNCED"
              | "FAILED"
              | "EXPIRED",
        }
      : {}),

    ...(category !== "ALL"
      ? {
          category:
            category as
              | "SERVICE_DESK"
              | "NETWORK"
              | "SYSTEMS"
              | "SECURITY",
        }
      : {}),

    ...(poison === "YES"
      ? {
          isPoison:
            true,
        }
      : {}),

    ...(poison === "NO"
      ? {
          isPoison:
            false,
        }
      : {}),

    ...(search
      ? {
          OR: [
            {
              title: {
                contains:
                  search,

                mode:
                  "insensitive" as const,
              },
            },

            {
              assignedTo: {
                username: {
                  contains:
                    search,

                  mode:
                    "insensitive" as const,
                },
              },
            },
          ],
        }
      : {}),
  };

  /*
   * ============================
   * LOAD TICKETS
   * ============================
   */
  const tickets =
    await prisma.ticket.findMany({
      where,

      include: {
        assignedTo: {
          select: {
            id: true,
            userId: true,
            username: true,
          },
        },

        lastSentBy: {
          select: {
            username: true,
          },
        },

        attackSourcePlayer: {
          select: {
            username: true,
          },
        },

        pvpAttack: {
          select: {
            id: true,
            type: true,
            status: true,
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
   * GLOBAL SUMMARY
   * ============================
   */
  const [
    openCount,
    poisonCount,
    resolvedCount,
    failedCount,
  ] =
    await Promise.all([
      prisma.ticket.count({
        where: {
          status:
            "OPEN",
        },
      }),

      prisma.ticket.count({
        where: {
          status:
            "OPEN",

          isPoison:
            true,
        },
      }),

      prisma.ticket.count({
        where: {
          status:
            "RESOLVED",
        },
      }),

      prisma.ticket.count({
        where: {
          status: {
            in: [
              "FAILED",
              "EXPIRED",
            ],
          },
        },
      }),
    ]);

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
              Tickets
            </h1>

            <p className="mt-2 text-sm text-zinc-400">
              Inspect live queues, ticket routing and poison activity.
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
            className="bg-white px-4 py-2 text-sm font-black text-black"
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
        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">

          <div className="border border-green-900 bg-green-950/10 p-4">

            <p className="text-xs uppercase tracking-wide text-green-500">
              Open
            </p>

            <p className="mt-1 text-2xl font-black text-green-400">
              {openCount}
            </p>

          </div>

          <div className="border border-purple-900 bg-purple-950/10 p-4">

            <p className="text-xs uppercase tracking-wide text-purple-500">
              Active Poison
            </p>

            <p className="mt-1 text-2xl font-black text-purple-300">
              {poisonCount}
            </p>

          </div>

          <div className="border border-blue-900 bg-blue-950/10 p-4">

            <p className="text-xs uppercase tracking-wide text-blue-500">
              Resolved
            </p>

            <p className="mt-1 text-2xl font-black text-blue-300">
              {resolvedCount}
            </p>

          </div>

          <div className="border border-red-900 bg-red-950/10 p-4">

            <p className="text-xs uppercase tracking-wide text-red-500">
              Failed / Expired
            </p>

            <p className="mt-1 text-2xl font-black text-red-300">
              {failedCount}
            </p>

          </div>

        </div>

        {/* ============================
            FILTERS
            ============================ */}
        <form
          method="GET"
          className="mt-4 grid gap-3 border border-zinc-800 bg-zinc-950 p-4 md:grid-cols-5"
        >

          <input
            type="text"
            name="q"
            defaultValue={
              search
            }
            placeholder="Search ticket or player..."
            className="border border-zinc-700 bg-black px-3 py-2 text-sm outline-none focus:border-white md:col-span-2"
          />

          <select
            name="status"
            defaultValue={
              status
            }
            className="border border-zinc-700 bg-black px-3 py-2 text-sm outline-none"
          >
            <option value="ALL">
              All Status
            </option>

            <option value="OPEN">
              Open
            </option>

            <option value="RESOLVED">
              Resolved
            </option>

            <option value="BOUNCED">
              Bounced
            </option>

            <option value="FAILED">
              Failed
            </option>

            <option value="EXPIRED">
              Expired
            </option>
          </select>

          <select
            name="category"
            defaultValue={
              category
            }
            className="border border-zinc-700 bg-black px-3 py-2 text-sm outline-none"
          >
            <option value="ALL">
              All Categories
            </option>

            <option value="SERVICE_DESK">
              Service Desk
            </option>

            <option value="NETWORK">
              Network
            </option>

            <option value="SYSTEMS">
              Systems
            </option>

            <option value="SECURITY">
              Security
            </option>
          </select>

          <select
            name="poison"
            defaultValue={
              poison
            }
            className="border border-zinc-700 bg-black px-3 py-2 text-sm outline-none"
          >
            <option value="ALL">
              All Tickets
            </option>

            <option value="YES">
              Poison Only
            </option>

            <option value="NO">
              Normal Only
            </option>
          </select>

          <div className="flex gap-2 md:col-span-5">

            <button
              type="submit"
              className="bg-white px-4 py-2 text-sm font-black text-black hover:bg-zinc-200"
            >
              Apply Filters
            </button>

            <Link
              href="/admin/tickets"
              className="border border-zinc-700 px-4 py-2 text-sm font-bold hover:bg-zinc-900"
            >
              Clear
            </Link>

          </div>

        </form>

        {/* ============================
            TABLE INFO
            ============================ */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">

          <p className="text-xs text-zinc-500">
            Showing{" "}
            <span className="font-bold text-white">
              {tickets.length}
            </span>{" "}
            ticket
            {tickets.length ===
            1
              ? ""
              : "s"}
            .
          </p>

          <p className="text-xs text-zinc-600">
            Purple rows are Poison Tickets.
          </p>

        </div>

        {/* ============================
            TICKET TABLE
            ============================ */}
        <div className="mt-3 overflow-x-auto border border-zinc-800">

          <table className="w-full min-w-[1300px] text-left text-sm">

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
                  Category
                </th>

                <th className="px-4 py-3">
                  Sev
                </th>

                <th className="px-4 py-3">
                  Value
                </th>

                <th className="px-4 py-3">
                  Age
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

              {tickets.length ===
                0 && (
                <tr>

                  <td
                    colSpan={10}
                    className="px-4 py-10 text-center text-zinc-500"
                  >
                    No tickets match the selected filters.
                  </td>

                </tr>
              )}

              {tickets.map(
                (ticket) => {
                  const ticketId =
                    formatTicketId(
                      ticket.id
                    );

                  return (
                    <tr
                      key={
                        ticket.id
                      }
                      className={`border-b border-zinc-900 last:border-b-0 ${
                        ticket.isPoison
                          ? "bg-purple-950/10 hover:bg-purple-950/20"
                          : "hover:bg-zinc-950"
                      }`}
                    >

                      {/* TICKET */}
                      <td className="whitespace-nowrap px-4 py-3">

                        <div className="flex items-center gap-2">

                          {ticket.isPoison && (
                            <span
                              className="text-purple-400"
                              title={
                                ticket.poisonEffect
                              }
                            >
                              ☣
                            </span>
                          )}

                          <span className="font-mono text-xs font-bold text-zinc-300">
                            {
                              ticketId
                            }
                          </span>

                        </div>

                      </td>

                      {/* TITLE */}
                      <td className="max-w-[320px] px-4 py-3">

                        <p
                          className="truncate font-bold"
                          title={
                            ticket.title
                          }
                        >
                          {
                            ticket.title
                          }
                        </p>

                        {ticket.isPoison && (
                          <p className="mt-1 truncate text-[10px] font-bold text-purple-500">
                            {ticket.poisonEffect.replaceAll(
                              "_",
                              " "
                            )}
                          </p>
                        )}

                        {ticket.lastSentBy && (
                          <p className="mt-1 text-[10px] text-zinc-600">
                            Sent by{" "}
                            {
                              ticket
                                .lastSentBy
                                .username
                            }
                          </p>
                        )}

                      </td>

                      {/* OWNER */}
                      <td className="whitespace-nowrap px-4 py-3">

                        <Link
                          href={`/admin/players/${ticket.assignedTo.userId}`}
                          className="font-bold text-zinc-300 hover:text-white hover:underline"
                        >
                          {
                            ticket
                              .assignedTo
                              .username
                          }
                        </Link>

                      </td>

                      {/* CATEGORY */}
                      <td className="whitespace-nowrap px-4 py-3">

                        <span className="text-xs font-bold text-zinc-400">
                          {formatCategory(
                            ticket.category
                          )}
                        </span>

                      </td>

                      {/* SEVERITY */}
                      <td className="px-4 py-3">

                        <span
                          className={`inline-block border px-2 py-1 text-xs font-black ${getSeverityClasses(
                            ticket.severity
                          )}`}
                        >
                          {
                            ticket.severity
                          }
                        </span>

                      </td>

                      {/* VALUE */}
                      <td className="whitespace-nowrap px-4 py-3">

                        {ticket.isPoison ? (
                          <span className="font-bold text-purple-400">
                            0 CR
                          </span>
                        ) : (
                          <span className="font-bold">
                            {
                              ticket.maxValue
                            }{" "}
                            CR
                          </span>
                        )}

                      </td>

                      {/* AGE */}
                      <td className="whitespace-nowrap px-4 py-3 text-zinc-400">

                        {formatAge(
                          ticket.createdAt
                        )}

                      </td>

                      {/* BOUNCES */}
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

                      {/* STATUS */}
                      <td className="whitespace-nowrap px-4 py-3">

                        <span
                          className={`text-xs font-black ${getStatusClasses(
                            ticket.status
                          )}`}
                        >
                          {
                            ticket.status
                          }
                        </span>

                      </td>

                      {/* ACTION */}
                      <td className="whitespace-nowrap px-4 py-3 text-right">

                        <Link
                          href={`/admin/tickets/${ticket.id}`}
                          className="inline-block border border-zinc-700 px-3 py-2 text-xs font-bold hover:bg-zinc-900"
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