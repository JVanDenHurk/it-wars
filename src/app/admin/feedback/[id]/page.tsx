import Link from "next/link";
import { notFound } from "next/navigation";

import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";

import { deleteFeedback } from "../actions";

type AdminFeedbackDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

/*
 * ============================
 * FEEDBACK TYPE
 * ============================
 */
function formatFeedbackType(type: string) {
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
function getTypeClasses(type: string) {
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
function formatDate(date: Date) {
  return date.toLocaleString("en-AU", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/*
 * ============================
 * PAGE
 * ============================
 */
export default async function AdminFeedbackDetailPage({
  params,
}: AdminFeedbackDetailPageProps) {
  /*
   * ============================
   * ADMIN AUTH
   * ============================
   */
  await requireAdmin();

  /*
   * ============================
   * PARAMS
   * ============================
   */
  const { id } = await params;

  const feedbackId = Number(id);

  if (
    !Number.isInteger(feedbackId) ||
    feedbackId <= 0
  ) {
    notFound();
  }

  /*
   * ============================
   * LOAD FEEDBACK
   * ============================
   */
  const feedback =
    await prisma.feedback.findUnique({
      where: {
        id: feedbackId,
      },

      include: {
        player: {
          select: {
            id: true,
            username: true,

            user: {
              select: {
                id: true,
                email: true,
                banned: true,
              },
            },
          },
        },
      },
    });

  if (!feedback) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black px-4 py-6 text-white md:px-6">
      <div className="mx-auto max-w-4xl">

        {/* ============================
            HEADER
            ============================ */}
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-zinc-800 pb-5">

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-500">
              Administration / Feedback
            </p>

            <div className="mt-2 flex flex-wrap items-center gap-3">

              <h1 className="text-3xl font-black">
                Feedback #{feedback.id}
              </h1>

              <span
                className={`border px-2 py-1 text-xs font-black ${getTypeClasses(
                  feedback.type
                )}`}
              >
                {formatFeedbackType(
                  feedback.type
                )}
              </span>

            </div>

            <p className="mt-2 text-sm text-zinc-500">
              Submitted {formatDate(feedback.createdAt)}
            </p>
          </div>

          <div className="flex gap-2">

            <Link
              href="/admin/feedback"
              className="border border-zinc-700 px-4 py-2 text-sm font-bold text-zinc-300 hover:bg-zinc-900 hover:text-white"
            >
              ← Feedback
            </Link>

            <Link
              href="/admin"
              className="border border-zinc-700 px-4 py-2 text-sm font-bold text-zinc-300 hover:bg-zinc-900 hover:text-white"
            >
              Admin Home
            </Link>

          </div>

        </div>

        {/* ============================
            SUBMITTED BY
            ============================ */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border border-zinc-800 bg-zinc-950 px-5 py-4">

          <div className="flex items-center gap-4">

            <div className="flex h-10 w-10 items-center justify-center bg-zinc-900 text-sm font-black text-zinc-400">
              {feedback.player.username
                .slice(0, 2)
                .toUpperCase()}
            </div>

            <div>

              <div className="flex flex-wrap items-center gap-2">

                <p className="font-black">
                  {feedback.player.username}
                </p>

                {feedback.player.user.banned && (
                  <span className="text-[10px] font-black uppercase text-red-400">
                    Banned
                  </span>
                )}

              </div>

              <p className="mt-0.5 text-xs text-zinc-500">
                {feedback.player.user.email}
              </p>

            </div>

          </div>

          <Link
            href={`/admin/players/${feedback.player.user.id}`}
            className="text-xs font-bold text-zinc-500 hover:text-white"
          >
            View Player →
          </Link>

        </div>

        {/* ============================
            FEEDBACK
            ============================ */}
        <div className="mt-5">

          <p className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">
            Player Feedback
          </p>

          <div className="mt-3 border border-zinc-800 bg-zinc-950 p-6 md:p-8">

            <p className="whitespace-pre-wrap break-words text-base leading-8 text-zinc-200">
              {feedback.message}
            </p>

          </div>

        </div>

        {/* ============================
            DETAILS
            ============================ */}
        <div className="mt-4 flex flex-wrap gap-x-8 gap-y-2 border-b border-zinc-900 pb-4 text-xs text-zinc-600">

          <p>
            Feedback ID{" "}
            <span className="font-mono text-zinc-400">
              #{feedback.id}
            </span>
          </p>

          <p>
            Player ID{" "}
            <span className="font-mono text-zinc-400">
              {feedback.player.id}
            </span>
          </p>

          <p>
            Updated{" "}
            <span className="text-zinc-400">
              {formatDate(feedback.updatedAt)}
            </span>
          </p>

        </div>

        {/* ============================
            DELETE
            ============================ */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-4">

          <div>
            <p className="text-sm font-bold text-zinc-300">
              Finished with this feedback?
            </p>

            <p className="mt-1 text-xs text-zinc-600">
              Deleting it permanently removes it from the queue.
            </p>
          </div>

          <form action={deleteFeedback}>

            <input
              type="hidden"
              name="feedbackId"
              value={feedback.id}
            />

            <button
              type="submit"
              className="border border-red-900 px-4 py-2 text-xs font-bold text-red-400 transition hover:border-red-700 hover:bg-red-950/30 hover:text-red-300"
            >
              Delete Feedback
            </button>

          </form>

        </div>

      </div>
    </main>
  );
}