import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

import { submitFeedback } from "./actions";

type FeedbackPageProps = {
  searchParams: Promise<{
    submitted?: string;
  }>;
};

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

function getStatusClasses(
  status: string
) {
  switch (status) {
    case "NEW":
      return "text-blue-400";

    case "REVIEWING":
      return "text-yellow-400";

    case "DONE":
      return "text-green-400";

    case "REJECTED":
      return "text-red-400";

    default:
      return "text-zinc-400";
  }
}

export default async function FeedbackPage({
  searchParams,
}: FeedbackPageProps) {
  /*
   * ============================
   * AUTHENTICATION
   * ============================
   */
  const session =
    await auth.api.getSession({
      headers: await headers(),
    });

  if (!session) {
    redirect("/");
  }

  /*
   * ============================
   * PLAYER
   * ============================
   */
  const player =
    await prisma.player.findUnique({
      where: {
        userId:
          session.user.id,
      },

      select: {
        id: true,
        username: true,

        feedback: {
          select: {
            id: true,
            type: true,
            status: true,
            message: true,
            createdAt: true,
          },

          orderBy: {
            createdAt: "desc",
          },

          take: 10,
        },
      },
    });

  if (!player) {
    redirect("/dashboard");
  }

  const {
    submitted,
  } = await searchParams;

  return (
    <main className="min-h-screen bg-black px-4 py-6 text-white md:px-6">

      <div className="mx-auto max-w-4xl">

        {/* ============================
            HEADER
            ============================ */}
        <div className="flex flex-wrap items-start justify-between gap-4">

          <div>

            <p className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-500">
              IT WARS
            </p>

            <h1 className="mt-2 text-4xl font-black">
              Feedback
            </h1>

            <p className="mt-2 text-sm text-zinc-400">
              Found a bug or have an idea?
              Send it through.
            </p>

          </div>

          <Link
            href="/dashboard"
            className="border border-zinc-700 px-4 py-2 text-sm font-bold hover:bg-zinc-900"
          >
            Back to Dashboard
          </Link>

        </div>

        {/* ============================
            SUCCESS
            ============================ */}
        {submitted ===
          "true" && (
          <div className="mt-6 border border-green-900 bg-green-950/20 p-4">

            <p className="font-bold text-green-300">
              Feedback submitted.
            </p>

            <p className="mt-1 text-sm text-zinc-400">
              Thanks. Your submission has been added to the admin review queue.
            </p>

          </div>
        )}

        {/* ============================
            FORM
            ============================ */}
        <div className="mt-6 border border-zinc-800 bg-zinc-950 p-6">

          <p className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">
            New Submission
          </p>

          <form
            action={
              submitFeedback
            }
            className="mt-5"
          >

            {/* TYPE */}
            <div>

              <label
                htmlFor="type"
                className="text-sm font-bold"
              >
                What is this about?
              </label>

              <select
                id="type"
                name="type"
                required
                defaultValue="SUGGESTION"
                className="mt-2 w-full border border-zinc-700 bg-black px-3 py-3 text-white outline-none focus:border-white"
              >
                <option value="BUG">
                  Bug
                </option>

                <option value="SUGGESTION">
                  Suggestion
                </option>

                <option value="BALANCE">
                  Game Balance
                </option>

                <option value="OTHER">
                  Other
                </option>
              </select>

            </div>

            {/* MESSAGE */}
            <div className="mt-5">

              <label
                htmlFor="message"
                className="text-sm font-bold"
              >
                Details
              </label>

              <p className="mt-1 text-xs text-zinc-500">
                Tell us what happened,
                what you expected or what
                you think should change.
              </p>

              <textarea
                id="message"
                name="message"
                required
                minLength={5}
                maxLength={2000}
                rows={8}
                placeholder="Enter your feedback..."
                className="mt-3 w-full resize-y border border-zinc-700 bg-black px-3 py-3 text-white outline-none placeholder:text-zinc-700 focus:border-white"
              />

            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3">

              <p className="text-xs text-zinc-600">
                Submitted as{" "}
                <span className="font-bold text-zinc-400">
                  {
                    player.username
                  }
                </span>
              </p>

              <button
                type="submit"
                className="bg-white px-5 py-2.5 text-sm font-black text-black hover:bg-zinc-200"
              >
                Submit Feedback
              </button>

            </div>

          </form>

        </div>

      </div>

    </main>
  );
}