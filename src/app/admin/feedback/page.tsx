import Link from "next/link";

import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";

/*
 * ============================
 * FEEDBACK TYPE
 * ============================
 */
function formatFeedbackType(
  type: string
) {
  switch (type) {
    case "BUG":
      return "Bug";

    case "SUGGESTION":
      return "Suggestion";

    case "BALANCE":
      return "Game Balance";

    default:
      return "Other";
  }
}

/*
 * ============================
 * TYPE STYLING
 * ============================
 */
function getTypeClasses(
  type: string
) {
  switch (type) {
    case "BUG":
      return "border-red-800 bg-red-950/20 text-red-300";

    case "SUGGESTION":
      return "border-blue-800 bg-blue-950/20 text-blue-300";

    case "BALANCE":
      return "border-purple-800 bg-purple-950/20 text-purple-300";

    default:
      return "border-zinc-700 bg-zinc-900 text-zinc-300";
  }
}

/*
 * ============================
 * DATE FORMAT
 * ============================
 */
function formatDate(
  date: Date
) {
  return date.toLocaleString(
    "en-AU",
    {
      dateStyle: "medium",
      timeStyle: "short",
    }
  );
}

/*
 * ============================
 * PAGE
 * ============================
 */
export default async function AdminFeedbackPage() {
  /*
   * ============================
   * ADMIN AUTH
   * ============================
   */
  await requireAdmin();

  /*
   * ============================
   * LOAD FEEDBACK
   * ============================
   */
  const feedbackItems =
    await prisma.feedback.findMany({
      include: {
        player: {
          select: {
            id: true,
            userId: true,
            username: true,
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },

      take: 250,
    });

  /*
   * ============================
   * SUMMARY COUNTS
   * ============================
   */
  const totalCount =
    feedbackItems.length;

  const bugCount =
    feedbackItems.filter(
      (item) =>
        item.type === "BUG"
    ).length;

  const suggestionCount =
    feedbackItems.filter(
      (item) =>
        item.type ===
        "SUGGESTION"
    ).length;

  const balanceCount =
    feedbackItems.filter(
      (item) =>
        item.type ===
        "BALANCE"
    ).length;

  return (
    <main className="min-h-screen bg-black px-4 py-6 text-white md:px-6">

      <div className="mx-auto max-w-[1500px]">

        {/* ============================
            HEADER
            ============================ */}
        <div className="flex flex-wrap items-start justify-between gap-4">

          <div>

            <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-500">
              Administration
            </p>

            <h1 className="mt-2 text-4xl font-black">
              Feedback
            </h1>

            <p className="mt-2 text-sm text-zinc-400">
              Review player bug reports,
              suggestions and balance
              feedback.
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
            className="bg-blue-300 px-4 py-2 text-sm font-black text-black"
          >
            Feedback
          </Link>

        </div>

        {/* ============================
            SUMMARY
            ============================ */}
        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">

          {/* TOTAL */}
          <div className="border border-zinc-800 bg-zinc-950 p-4">

            <p className="text-xs uppercase tracking-wide text-zinc-500">
              Total Feedback
            </p>

            <p className="mt-1 text-2xl font-black">
              {totalCount}
            </p>

          </div>

          {/* BUGS */}
          <div className="border border-red-900 bg-red-950/10 p-4">

            <p className="text-xs uppercase tracking-wide text-red-500">
              Bugs
            </p>

            <p className="mt-1 text-2xl font-black text-red-300">
              {bugCount}
            </p>

          </div>

          {/* SUGGESTIONS */}
          <div className="border border-blue-900 bg-blue-950/10 p-4">

            <p className="text-xs uppercase tracking-wide text-blue-500">
              Suggestions
            </p>

            <p className="mt-1 text-2xl font-black text-blue-300">
              {suggestionCount}
            </p>

          </div>

          {/* BALANCE */}
          <div className="border border-purple-900 bg-purple-950/10 p-4">

            <p className="text-xs uppercase tracking-wide text-purple-500">
              Balance
            </p>

            <p className="mt-1 text-2xl font-black text-purple-300">
              {balanceCount}
            </p>

          </div>

        </div>

        {/* ============================
            TABLE INFO
            ============================ */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">

          <p className="text-xs text-zinc-500">
            Showing{" "}
            <span className="font-bold text-white">
              {feedbackItems.length}
            </span>{" "}
            feedback submission
            {feedbackItems.length === 1
              ? ""
              : "s"}
            .
          </p>

          <p className="text-xs text-zinc-600">
            Feedback remains here until
            you delete it.
          </p>

        </div>

        {/* ============================
            FEEDBACK TABLE
            ============================ */}
        <div className="mt-3 overflow-x-auto border border-zinc-800">

          <table className="w-full min-w-[1000px] text-left text-sm">

            <thead className="border-b border-zinc-800 bg-zinc-950">

              <tr className="text-xs uppercase tracking-wide text-zinc-500">

                <th className="px-4 py-3">
                  ID
                </th>

                <th className="px-4 py-3">
                  Player
                </th>

                <th className="px-4 py-3">
                  Type
                </th>

                <th className="px-4 py-3">
                  Feedback
                </th>

                <th className="px-4 py-3">
                  Submitted
                </th>

                <th className="px-4 py-3 text-right">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {feedbackItems.length ===
                0 && (
                <tr>

                  <td
                    colSpan={6}
                    className="px-4 py-10 text-center text-zinc-500"
                  >
                    No player feedback has
                    been submitted yet.
                  </td>

                </tr>
              )}

              {feedbackItems.map(
                (feedback) => (
                  <tr
                    key={
                      feedback.id
                    }
                    className="border-b border-zinc-900 last:border-b-0 hover:bg-zinc-950"
                  >

                    {/* ID */}
                    <td className="whitespace-nowrap px-4 py-3">

                      <span className="font-mono text-xs font-bold text-zinc-500">
                        #
                        {
                          feedback.id
                        }
                      </span>

                    </td>

                    {/* PLAYER */}
                    <td className="whitespace-nowrap px-4 py-3">

                      <Link
                        href={`/admin/players/${feedback.player.userId}`}
                        className="font-bold text-zinc-300 hover:text-white hover:underline"
                      >
                        {
                          feedback.player.username
                        }
                      </Link>

                    </td>

                    {/* TYPE */}
                    <td className="whitespace-nowrap px-4 py-3">

                      <span
                        className={`inline-block border px-2 py-1 text-xs font-black ${getTypeClasses(
                          feedback.type
                        )}`}
                      >
                        {formatFeedbackType(
                          feedback.type
                        )}
                      </span>

                    </td>

                    {/* MESSAGE */}
                    <td className="max-w-[600px] px-4 py-3">

                      <p
                        className="truncate text-zinc-300"
                        title={
                          feedback.message
                        }
                      >
                        {
                          feedback.message
                        }
                      </p>

                    </td>

                    {/* CREATED */}
                    <td className="whitespace-nowrap px-4 py-3 text-xs text-zinc-500">

                      {formatDate(
                        feedback.createdAt
                      )}

                    </td>

                    {/* ACTION */}
                    <td className="whitespace-nowrap px-4 py-3 text-right">

                      <Link
                        href={`/admin/feedback/${feedback.id}`}
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

      </div>

    </main>
  );
}