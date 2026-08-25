import Link from "next/link";
import { notFound } from "next/navigation";

import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";

import {
    updateTemplate,
} from "../actions";

type AdminTemplatePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AdminTemplatePage({
  params,
}: AdminTemplatePageProps) {
  /*
   * ============================
   * ADMIN AUTH
   * ============================
   */
  await requireAdmin();

  const { id } =
    await params;

  const templateId =
    Number(id);

  if (
    !Number.isInteger(
      templateId
    ) ||
    templateId <= 0
  ) {
    notFound();
  }

  /*
   * ============================
   * LOAD TEMPLATE
   * ============================
   */
  const template =
    await prisma.ticketTemplate.findUnique({
      where: {
        id:
          templateId,
      },
    });

  if (!template) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black px-4 py-6 text-white md:px-6">

      <div className="mx-auto max-w-4xl">

        {/* ============================
            HEADER
            ============================ */}
        <div className="flex flex-wrap items-start justify-between gap-4">

          <div>

            <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-500">
              Administration / Templates
            </p>

            <h1 className="mt-2 text-4xl font-black">
              Edit Template
            </h1>

            <p className="mt-2 text-sm text-zinc-400">
              Template #{template.id}
            </p>

          </div>

          <div className="flex flex-wrap gap-2">

            <Link
              href="/admin/templates"
              className="border border-zinc-700 px-4 py-2 text-sm font-bold hover:bg-zinc-900"
            >
              Templates
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
            STATUS
            ============================ */}
        <div
          className={`mt-6 border p-4 ${
            template.active
              ? "border-green-900 bg-green-950/10"
              : "border-red-900 bg-red-950/10"
          }`}
        >

          <div className="flex flex-wrap items-center justify-between gap-3">

            <div>

              <p className="text-xs uppercase tracking-wide text-zinc-500">
                Template Status
              </p>

              <p
                className={`mt-1 font-black ${
                  template.active
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {template.active
                  ? "ACTIVE"
                  : "DISABLED"}
              </p>

            </div>

            <p className="text-xs text-zinc-500">
              Disabled templates are ignored by the ticket generator.
            </p>

          </div>

        </div>

        {/* ============================
            EDIT FORM
            ============================ */}
        <form
          action={
            updateTemplate
          }
          className="mt-4 space-y-4"
        >

          <input
            type="hidden"
            name="templateId"
            value={
              template.id
            }
          />

          {/* ============================
              BASIC INFORMATION
              ============================ */}
          <section className="border border-zinc-800 bg-zinc-950 p-5">

            <p className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">
              Ticket Information
            </p>

            <div className="mt-4 space-y-4">

              {/* TITLE */}
              <div>

                <label
                  htmlFor="title"
                  className="text-sm font-bold text-zinc-300"
                >
                  Title
                </label>

                <input
                  id="title"
                  name="title"
                  type="text"
                  required
                  defaultValue={
                    template.title
                  }
                  className="mt-2 w-full border border-zinc-700 bg-black px-4 py-3 text-white outline-none focus:border-white"
                />

              </div>

              {/* DESCRIPTION */}
              <div>

                <label
                  htmlFor="description"
                  className="text-sm font-bold text-zinc-300"
                >
                  Description
                </label>

                <textarea
                  id="description"
                  name="description"
                  required
                  rows={5}
                  defaultValue={
                    template.description
                  }
                  className="mt-2 w-full resize-y border border-zinc-700 bg-black px-4 py-3 text-white outline-none focus:border-white"
                />

                <p className="mt-2 text-xs text-zinc-600">
                  This is the problem description shown to the player.
                </p>

              </div>

            </div>

          </section>

          {/* ============================
              ROUTING / DIFFICULTY
              ============================ */}
          <section className="border border-zinc-800 bg-zinc-950 p-5">

            <p className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">
              Routing & Difficulty
            </p>

            <div className="mt-4 grid gap-4 md:grid-cols-3">

              {/* CATEGORY */}
              <div>

                <label
                  htmlFor="category"
                  className="text-sm font-bold text-zinc-300"
                >
                  Correct Resolver
                </label>

                <select
                  id="category"
                  name="category"
                  defaultValue={
                    template.category
                  }
                  className="mt-2 w-full border border-zinc-700 bg-black px-4 py-3 text-white outline-none focus:border-white"
                >
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

              </div>

              {/* SEVERITY */}
              <div>

                <label
                  htmlFor="severity"
                  className="text-sm font-bold text-zinc-300"
                >
                  Severity
                </label>

                <select
                  id="severity"
                  name="severity"
                  defaultValue={
                    template.severity
                  }
                  className="mt-2 w-full border border-zinc-700 bg-black px-4 py-3 text-white outline-none focus:border-white"
                >
                  <option value="P1">
                    P1
                  </option>

                  <option value="P2">
                    P2
                  </option>

                  <option value="P3">
                    P3
                  </option>

                  <option value="P4">
                    P4
                  </option>

                </select>

              </div>

              {/* DIFFICULTY */}
              <div>

                <label
                  htmlFor="difficulty"
                  className="text-sm font-bold text-zinc-300"
                >
                  Difficulty
                </label>

                <select
                  id="difficulty"
                  name="difficulty"
                  defaultValue={
                    String(
                      template.difficulty
                    )
                  }
                  className="mt-2 w-full border border-zinc-700 bg-black px-4 py-3 text-white outline-none focus:border-white"
                >
                  <option value="1">
                    1 — Easy
                  </option>

                  <option value="2">
                    2 — Standard
                  </option>

                  <option value="3">
                    3 — Hard
                  </option>

                  <option value="4">
                    4 — Expert
                  </option>

                  <option value="5">
                    5 — Nightmare
                  </option>

                </select>

              </div>

            </div>

          </section>

          {/* ============================
              REWARDS
              ============================ */}
          <section className="border border-zinc-800 bg-zinc-950 p-5">

            <p className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">
              Rewards
            </p>

            <div className="mt-4 grid gap-4 md:grid-cols-2">

              {/* CREDITS */}
              <div>

                <label
                  htmlFor="maxValue"
                  className="text-sm font-bold text-zinc-300"
                >
                  Maximum Credit Value
                </label>

                <input
                  id="maxValue"
                  name="maxValue"
                  type="number"
                  min="0"
                  required
                  defaultValue={
                    template.maxValue
                  }
                  className="mt-2 w-full border border-zinc-700 bg-black px-4 py-3 text-white outline-none focus:border-white"
                />

                <p className="mt-2 text-xs text-zinc-600">
                  Maximum CR value before ticket decay.
                </p>

              </div>

              {/* XP */}
              <div>

                <label
                  htmlFor="baseXp"
                  className="text-sm font-bold text-zinc-300"
                >
                  Base XP
                </label>

                <input
                  id="baseXp"
                  name="baseXp"
                  type="number"
                  min="0"
                  required
                  defaultValue={
                    template.baseXp
                  }
                  className="mt-2 w-full border border-zinc-700 bg-black px-4 py-3 text-white outline-none focus:border-white"
                />

                <p className="mt-2 text-xs text-zinc-600">
                  XP awarded for correctly handling the ticket.
                </p>

              </div>

            </div>

          </section>

          {/* ============================
              OUTCOME MESSAGES
              ============================ */}
          <section className="border border-zinc-800 bg-zinc-950 p-5">

            <p className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">
              Outcome Messages
            </p>

            <div className="mt-4 space-y-4">

              {/* SUCCESS */}
              <div>

                <label
                  htmlFor="successMessage"
                  className="text-sm font-bold text-green-400"
                >
                  Success Message
                </label>

                <textarea
                  id="successMessage"
                  name="successMessage"
                  rows={3}
                  defaultValue={
                    template.successMessage ??
                    ""
                  }
                  placeholder="Shown when the player handles the ticket correctly."
                  className="mt-2 w-full resize-y border border-green-900 bg-black px-4 py-3 text-white outline-none focus:border-green-500"
                />

              </div>

              {/* FAILURE */}
              <div>

                <label
                  htmlFor="failureMessage"
                  className="text-sm font-bold text-red-400"
                >
                  Failure Message
                </label>

                <textarea
                  id="failureMessage"
                  name="failureMessage"
                  rows={3}
                  defaultValue={
                    template.failureMessage ??
                    ""
                  }
                  placeholder="Shown when the player handles the ticket incorrectly."
                  className="mt-2 w-full resize-y border border-red-900 bg-black px-4 py-3 text-white outline-none focus:border-red-500"
                />

              </div>

            </div>

          </section>

          {/* ============================
              ACTIVE
              ============================ */}
          <section className="border border-zinc-800 bg-zinc-950 p-5">

            <label className="flex cursor-pointer items-start gap-3">

              <input
                type="checkbox"
                name="active"
                defaultChecked={
                  template.active
                }
                className="mt-1 h-4 w-4"
              />

              <div>

                <p className="font-black">
                  Template Active
                </p>

                <p className="mt-1 text-xs text-zinc-500">
                  Allow this template to be selected when the game generates new tickets.
                </p>

              </div>

            </label>

          </section>

          {/* ============================
              SAVE
              ============================ */}
          <div className="flex flex-wrap justify-end gap-3">

            <Link
              href="/admin/templates"
              className="border border-zinc-700 px-5 py-3 text-sm font-bold hover:bg-zinc-900"
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="bg-white px-5 py-3 text-sm font-black text-black hover:bg-zinc-200"
            >
              Save Template
            </button>

          </div>

        </form>

      </div>

    </main>
  );
}