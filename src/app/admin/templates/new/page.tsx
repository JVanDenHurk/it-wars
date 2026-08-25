import Link from "next/link";

import { requireAdmin } from "@/lib/admin";

import { createTemplate } from "../actions";

export default async function NewTemplatePage() {
  /*
   * ============================
   * ADMIN AUTH
   * ============================
   */
  await requireAdmin();

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
              Create Ticket Template
            </h1>

            <p className="mt-2 text-sm text-zinc-400">
              Create a new ticket for the automatic ticket generator.
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
            CREATE FORM
            ============================ */}
        <form
          action={createTemplate}
          className="mt-6 space-y-4"
        >

          {/* ============================
              TICKET INFORMATION
              ============================ */}
          <section className="border border-zinc-800 bg-zinc-950 p-5">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">
              Ticket Information
            </p>

            <div className="mt-4">
              <label
                htmlFor="title"
                className="text-sm font-bold text-zinc-300"
              >
                Ticket Title
              </label>

              <input
                id="title"
                name="title"
                type="text"
                required
                placeholder="VPN connection fails remotely"
                className="mt-2 w-full border border-zinc-700 bg-black px-4 py-3 text-white outline-none focus:border-white"
              />
            </div>

            <div className="mt-4">
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
                rows={6}
                placeholder="User reports that they cannot connect to the corporate VPN while working remotely..."
                className="mt-2 w-full resize-y border border-zinc-700 bg-black px-4 py-3 text-white outline-none focus:border-white"
              />

              <p className="mt-2 text-xs text-zinc-600">
                This is the information the player sees when deciding
                whether to resolve or route the ticket.
              </p>
            </div>
          </section>

          {/* ============================
              ROUTING
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
                  defaultValue="SERVICE_DESK"
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

                <p className="mt-2 text-xs text-zinc-600">
                  Hidden from the player.
                </p>
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
                  defaultValue="P4"
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
                  defaultValue="1"
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

                <div className="mt-2 flex">
                  <input
                    id="maxValue"
                    name="maxValue"
                    type="number"
                    min="0"
                    step="1"
                    required
                    defaultValue={100}
                    className="min-w-0 flex-1 border border-zinc-700 bg-black px-4 py-3 text-white outline-none focus:border-white"
                  />

                  <div className="flex items-center border border-l-0 border-zinc-700 bg-zinc-900 px-4 text-sm font-bold text-zinc-400">
                    CR
                  </div>
                </div>

                <p className="mt-2 text-xs text-zinc-600">
                  Starting Credit value before ticket value decay.
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
                  step="1"
                  required
                  defaultValue={10}
                  className="mt-2 w-full border border-zinc-700 bg-black px-4 py-3 text-white outline-none focus:border-white"
                />

                <p className="mt-2 text-xs text-zinc-600">
                  Career XP awarded for correctly handling the ticket.
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

            {/* SUCCESS */}
            <div className="mt-4">
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
                placeholder="Correct. The VPN profile was repaired and connectivity was restored."
                className="mt-2 w-full resize-y border border-green-900 bg-black px-4 py-3 text-white outline-none focus:border-green-500"
              />

              <p className="mt-2 text-xs text-zinc-600">
                Optional feedback shown after the correct action.
              </p>
            </div>

            {/* FAILURE */}
            <div className="mt-4">
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
                placeholder="The ticket was handled incorrectly and the issue remains unresolved."
                className="mt-2 w-full resize-y border border-red-900 bg-black px-4 py-3 text-white outline-none focus:border-red-500"
              />

              <p className="mt-2 text-xs text-zinc-600">
                Optional feedback shown after an incorrect action.
              </p>
            </div>
          </section>

          {/* ============================
              STATUS
              ============================ */}
          <section className="border border-green-900/60 bg-green-950/10 p-5">
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                name="active"
                defaultChecked
                className="mt-1 h-4 w-4"
              />

              <div>
                <p className="font-black text-green-300">
                  Activate Immediately
                </p>

                <p className="mt-1 text-xs text-zinc-500">
                  Active templates can be selected by the automatic
                  ticket generator.
                </p>
              </div>
            </label>
          </section>

          {/* ============================
              BUTTONS
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
              Create Template
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}